#!/usr/bin/env python3
"""
Download CV files from Formbricks, rename them, and upload to Firebase Storage.

This script:
1. Reads the CSV file with Formbricks URLs
2. Downloads the CV file for each participant
3. Renames the file using their email address with special formatting:
   - @ becomes "_at_"
   - . becomes "_dot_"
4. Uploads the CV file to Firebase Storage in the /cvs folder
5. Replaces the Formbricks URL with Firebase Storage URL in the CSV
6. Creates a local folder with all downloaded CV files
7. Can split the welcome column into separate surname, given name, and email columns

Prerequisites:
-------------
- Python 3.6 or higher
- firebase-admin Python package
- requests Python package
- python-dotenv package

Environment Variables (can be set in .env file):
-------------------------------------------
- GOOGLE_APPLICATION_CREDENTIALS: Path to Firebase service account JSON file
  Example: "/path/to/your/serviceAccountKey.json"
  For CDTM Hacks: "/Users/nils/Projects/cdtm/cdtm-hacks/platform/backend/functions/key_store/cdtm-hacks-key.json"

- FIREBASE_STORAGE_BUCKET: Firebase Storage bucket name
  Example: "cdtm-hacks.firebasestorage.app"

- FORMBRICKS_COOKIE: Formbricks authentication cookie value
  Example: "your_cookie_value"

Installation:
------------
1. Install the required Python packages:
   pip install firebase-admin requests python-dotenv

2. Create a .env file in the script directory with your credentials:
   GOOGLE_APPLICATION_CREDENTIALS="/path/to/your/serviceAccountKey.json"
   FIREBASE_STORAGE_BUCKET="your-bucket-name"
   FORMBRICKS_COOKIE="your_cookie_value"

Usage:
------
python3 download_and_upload_cvs.py <input_csv_file> [options]

Required Arguments:
- input_csv_file: Path to CSV file with Formbricks URLs (e.g., opt_in_for_talent_pool_applications.csv)

Optional Arguments:
- -o, --output: Path to save the updated CSV with Firebase URLs (default: updated_applications.csv)
- -d, --download-dir: Directory to save downloaded CV files (default: ./downloaded_cvs)
- -b, --bucket: Firebase Storage bucket name (default: cdtm-hacks.firebasestorage.app)
- -c, --cookie: Formbricks authentication cookie (can also be set via FORMBRICKS_COOKIE env var)
- --skip-firebase: Skip uploading to Firebase Storage, use local file paths instead
- --skip-download: Skip downloading CV files, use existing files in download directory

Example:
--------
# Using environment variables from .env:
python3 download_and_upload_cvs.py opt_in_for_talent_pool_applications.csv

# Using command line arguments:
python3 download_and_upload_cvs.py opt_in_for_talent_pool_applications.csv -c "your_cookie_value"

# Skip Firebase upload (just download and save locally):
python3 download_and_upload_cvs.py opt_in_for_talent_pool_applications.csv -c "your_cookie_value" --skip-firebase

# Skip download (use existing files) and process the CSV with column splitting:
python3 download_and_upload_cvs.py opt_in_for_talent_pool_applications.csv --skip-download --skip-firebase

Troubleshooting:
---------------
- If downloads fail, ensure your Formbricks cookie is valid and recent
- If Firebase uploads fail, check your GOOGLE_APPLICATION_CREDENTIALS environment variable
- For parsing issues, ensure your CSV has columns "16. Upload your CV" and "1. Welcome to the CDTM Hacks Application!"

Notes:
------
- Before running on all files, consider testing on a small subset
- The script handles PDF, JPG, and PNG files based on content type
- Files are made publicly accessible in Firebase Storage to generate download URLs
- The .env file should be added to .gitignore to avoid committing sensitive information
"""

import argparse
import csv
import os
import re
import requests
import tempfile
from pathlib import Path
from urllib.parse import urlparse, unquote
import sys
import time
import uuid  # Add UUID for token generation
import urllib.parse
import datetime  # Correct import for datetime and timedelta
from dotenv import load_dotenv  # Add dotenv support

# For Firebase Storage
import firebase_admin
from firebase_admin import credentials, storage

# Load environment variables from .env file
load_dotenv()

# Global variable to store the Firebase bucket reference
firebase_bucket = None


def format_email_for_filename(email):
    """Convert email to a filename-friendly format."""
    if not email:
        return "unknown_email"
    # Trim whitespace
    email = email.strip().lower()
    # Replace @ with _at_ and . with _dot_
    email = email.replace("@", "_at_").replace(".", "_dot_")
    return email


def extract_email_from_welcome_msg(welcome_msg):
    """Extract email from the welcome message column.

    Example formats:
    - "Lie Aditya; Bryan; adityabryan.lie@gmail.com"
    - "John Doe (john.doe@example.com)"
    - "Welcome, jane.smith@example.com!"
    """
    if not welcome_msg:
        return None

    # Try to find email pattern directly first (most reliable)
    email_pattern = r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
    match = re.search(email_pattern, welcome_msg)
    if match:
        return match.group(0).lower()

    # If no clear email pattern, try to parse different formats
    # Format: Name; Surname; email@example.com
    if ";" in welcome_msg:
        parts = welcome_msg.split(";")
        if len(parts) >= 3:
            # Check if the last part contains an @ symbol
            email_candidate = parts[-1].strip()
            if "@" in email_candidate:
                return email_candidate.lower()

    # No email found
    return None

def extract_parts_from_welcome_msg(welcome_msg):
    """Extract given name, surname, and email from the welcome message column.

    Expected format: "Given name; Surname; email@example.com"
    Returns a tuple of (given_name, surname, email)
    """
    if not welcome_msg:
        return None, None, None

    # Extract email first (most reliable)
    email_pattern = r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
    email_match = re.search(email_pattern, welcome_msg)
    email = email_match.group(0).lower() if email_match else None

    # Try to extract given name and surname
    given_name, surname = None, None

    # Format: Given name; Surname; email@example.com
    if ";" in welcome_msg:
        parts = welcome_msg.split(";")
        if len(parts) >= 3:
            given_name = parts[0].strip()
            surname = parts[1].strip()

    return given_name, surname, email


def extract_filename_from_url(url):
    """Extract the original filename from the Formbricks URL."""
    if not url or "formbricks.com/storage/" not in url:
        return None

    try:
        parsed_url = urlparse(url)
        path = unquote(parsed_url.path)

        # Extract the filename after private/ in the URL
        if "/private/" in path:
            filename = path.split("/private/", 1)[1]
            # If there's a file ID (--fid--), remove it
            if "--fid--" in filename:
                filename = filename.split("--fid--")[0].strip()
            return filename
        return "unknown_file.pdf"
    except Exception:
        return "unknown_file.pdf"


def get_file_extension_from_content_type(content_type):
    """Get file extension based on content type."""
    if "application/pdf" in content_type:
        return ".pdf"
    elif "image/jpeg" in content_type or "image/jpg" in content_type:
        return ".jpg"
    elif "image/png" in content_type:
        return ".png"
    else:
        return ".pdf"  # Default to PDF if no match found


def download_file(url, cookie, output_dir, max_retries=3, retry_delay=2):
    """Download a file from Formbricks using authentication cookie, with retries."""
    if not url or "formbricks.com/storage/" not in url:
        print(f"  Invalid URL: {url}")
        return None

    headers = {
        "Cookie": f"__Secure-next-auth.session-token={cookie}",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    }

    retries = 0
    while retries <= max_retries:
        try:
            response = requests.get(url, headers=headers, stream=True)
            response.raise_for_status()

            # Get content type to determine file extension
            content_type = response.headers.get("Content-Type", "").lower()
            ext = get_file_extension_from_content_type(content_type)

            # Create temporary file
            temp_file = tempfile.NamedTemporaryFile(
                delete=False, suffix=ext, dir=output_dir
            )

            # Download and save the file
            for chunk in response.iter_content(chunk_size=8192):
                temp_file.write(chunk)

            # Close the file
            temp_file.close()

            # Return the path to the temporary file
            return temp_file.name

        except requests.RequestException as e:
            retries += 1
            if retries <= max_retries:
                print(f"  Retry {retries}/{max_retries} due to error: {e}")
                time.sleep(retry_delay)
            else:
                print(f"  Failed after {max_retries} retries: {e}")
                return None
        except Exception as e:
            print(f"  Error downloading file: {e}")
            return None


def initialize_firebase(bucket_name=None):
    """Initialize Firebase Storage if not already initialized."""
    global firebase_bucket

    # If already initialized, return the existing bucket
    if firebase_bucket:
        return firebase_bucket

    try:
        # Get the credentials file path from environment variable
        creds_path = os.environ.get("GOOGLE_APPLICATION_CREDENTIALS")
        if not creds_path:
            print("Error: GOOGLE_APPLICATION_CREDENTIALS environment variable not set")
            return None

        if not os.path.exists(creds_path):
            print(f"Error: Credentials file not found at {creds_path}")
            return None

        # If bucket_name is not provided, use a default value
        if not bucket_name:
            # Try to use the bucket from environment variable
            bucket_name = os.environ.get("FIREBASE_STORAGE_BUCKET")
            if not bucket_name:
                print("Warning: No Firebase bucket specified. Using a default name.")
                bucket_name = "cdtm-hacks.firebasestorage.app"

        print(f"Initializing Firebase with bucket: {bucket_name}")
        print(f"Using credentials from: {creds_path}")

        # Initialize Firebase with explicit credentials
        cred = credentials.Certificate(creds_path)

        # Check if any app is already initialized
        try:
            app = firebase_admin.get_app()
        except ValueError:
            # No app exists, initialize a new one
            app = firebase_admin.initialize_app(cred, {"storageBucket": bucket_name})

        # Get the bucket
        firebase_bucket = storage.bucket(name=bucket_name)
        return firebase_bucket

    except Exception as e:
        print(f"Error initializing Firebase: {e}")
        return None


def upload_to_firebase(file_path, email):
    """Upload a file to Firebase Storage and return the download URL."""
    if not os.path.exists(file_path):
        print(f"  File does not exist: {file_path}")
        return None

    # Use the global bucket
    global firebase_bucket
    if not firebase_bucket:
        print("  Firebase not initialized correctly.")
        return None

    try:
        # Create blob name from the email (already formatted in file_path)
        blob_name = f"cvs/{os.path.basename(file_path)}"

        # Generate a UUID for the download token
        uuid_token = str(uuid.uuid4())

        # Upload file with metadata containing the download token
        blob = firebase_bucket.blob(blob_name)
        blob.metadata = {"firebaseStorageDownloadTokens": uuid_token}
        blob.upload_from_filename(file_path)

        # Construct the Firebase Storage download URL
        firebase_url = f"https://firebasestorage.googleapis.com/v0/b/{firebase_bucket.name}/o/{urllib.parse.quote(blob_name, safe='')}?alt=media&token={uuid_token}"

        print(f"  Uploaded to Firebase: {blob_name}")
        return firebase_url
    except Exception as e:
        print(f"  Error uploading to Firebase: {e}")
        return None


def parse_args():
    parser = argparse.ArgumentParser(
        description="Download CV files from Formbricks, rename them, and upload to Firebase Storage"
    )
    parser.add_argument(
        "input_csv",
        type=str,
        help="Path to CSV file with Formbricks URLs (e.g., opt_in_for_talent_pool_applications.csv)",
    )
    parser.add_argument(
        "-o",
        "--output",
        type=str,
        help="Path to save the updated CSV with Firebase URLs (default: updated_applications.csv)",
        default="updated_applications.csv",
    )
    parser.add_argument(
        "-c",
        "--cookie",
        type=str,
        help="Formbricks authentication cookie value (__Secure-next-auth.session-token). "
        "Can also be set via FORMBRICKS_COOKIE environment variable. "
        "Required unless --skip-download is used.",
    )
    parser.add_argument(
        "-d",
        "--download-dir",
        type=str,
        help="Directory to save downloaded CVs (default: ./downloaded_cvs)",
        default="./downloaded_cvs",
    )
    parser.add_argument(
        "-b",
        "--bucket",
        type=str,
        help="Firebase Storage bucket name (default: cdtm-hacks.firebasestorage.app)",
        default="cdtm-hacks.firebasestorage.app",
    )
    parser.add_argument(
        "-cv",
        "--cv-column",
        type=str,
        help="Name of the column containing CV URLs (default: '16. Upload your CV')",
        default="16. Upload your CV",
    )
    parser.add_argument(
        "-e",
        "--email-column",
        type=str,
        help="Name of the column containing welcome message with email (default: '1. Welcome to the CDTM Hacks Application!')",
        default="1. Welcome to the CDTM Hacks Application!",
    )
    parser.add_argument(
        "-p",
        "--participants-csv",
        type=str,
        help="Path to CSV file containing participant emails (should have an 'email' column)",
    )
    parser.add_argument(
        "--skip-firebase",
        action="store_true",
        help="Skip uploading to Firebase Storage, use local file paths instead",
    )
    parser.add_argument(
        "--skip-download",
        action="store_true",
        help="Skip downloading CV files, use existing files in download directory",
    )
    return parser.parse_args()


def load_participant_emails(participants_csv):
    """Load participant emails from CSV file."""
    if not participants_csv or not os.path.exists(participants_csv):
        return set()
    
    participant_emails = set()
    try:
        with open(participants_csv, "r", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            if "email" not in reader.fieldnames:
                print(f"Warning: No 'email' column found in {participants_csv}")
                return set()
            
            for row in reader:
                email = row.get("email", "").strip().lower()
                if email:
                    participant_emails.add(email)
        
        print(f"Loaded {len(participant_emails)} participant emails from {participants_csv}")
        return participant_emails
    except Exception as e:
        print(f"Error loading participant emails: {e}")
        return set()


def process_csv(
    input_csv,
    output_csv,
    cookie,
    download_dir,
    cv_column="16. Upload your CV",
    email_column="1. Welcome to the CDTM Hacks Application!",
    skip_firebase=False,
    skip_download=False,
    participant_emails=None,
):
    """Process the CSV file, download the CV files, and update the CSV with Firebase URLs."""
    # Ensure download directory exists
    os.makedirs(download_dir, exist_ok=True)
    
    # Read CSV
    print(f"Reading CSV from {input_csv}...")
    rows = []
    with open(input_csv, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        headers = reader.fieldnames
        
        if not headers:
            print("Error: CSV file has no headers.")
            return
        
        if cv_column not in headers:
            print(f"Error: CSV file does not have a '{cv_column}' column.")
            return
        
        if email_column not in headers:
            print(f"Error: CSV file does not have a '{email_column}' column.")
            return
        
        for row in reader:
            rows.append(row)
    
    print(f"Processing {len(rows)} rows...")
    
    # Create new headers with the added columns
    new_headers = list(headers)
    # Insert the new columns after the original email column
    email_idx = new_headers.index(email_column)
    new_headers.insert(email_idx + 1, "Surname")
    new_headers.insert(email_idx + 2, "Given Name")
    new_headers.insert(email_idx + 3, "Email")
    new_headers.insert(email_idx + 4, "Participant at CDTM Hacks")
    
    # Process each row
    output_rows = []
    for i, row in enumerate(rows):
        print(f"Processing row {i+1}/{len(rows)}...")
        
        # Get CV URL from row
        cv_url = row.get(cv_column, "").strip()
        
        # Extract email from welcome message
        welcome_msg = row.get(email_column, "").strip()
        given_name, surname, email = extract_parts_from_welcome_msg(welcome_msg)
        
        if not email and welcome_msg:
            email = extract_email_from_welcome_msg(welcome_msg)
            print(f"  Could only extract email: {email}")
        
        # Create new row with added columns
        new_row = {}
        for header in headers:
            new_row[header] = row.get(header, "")
        
        # Add the new columns
        new_row["Surname"] = surname or ""
        new_row["Given Name"] = given_name or ""
        new_row["Email"] = email or ""
        new_row["Participant at CDTM Hacks"] = "TRUE" if email and email.lower() in participant_emails else "FALSE"
        
        # Skip if no CV URL
        if not cv_url:
            print(f"  No CV URL found in row {i+1}, skipping download.")
            output_rows.append(new_row)
            continue
        
        # Skip if no email
        if not email:
            print(f"  Could not extract email from welcome message in row {i+1}, skipping download.")
            output_rows.append(new_row)
            continue
        
        # Format email for filename
        formatted_email = format_email_for_filename(email)
        
        # If skipping download, try to find the file in the download directory
        if skip_download:
            # Try to find any file starting with the formatted email
            file_found = False
            for file in os.listdir(download_dir):
                if file.startswith(formatted_email):
                    file_path = os.path.join(download_dir, file)
                    # Use local file path
                    new_row[cv_column] = f"file://{os.path.abspath(file_path)}"
                    print(f"  Using existing file for {email}: {file}")
                    file_found = True
                    break
            
            if not file_found:
                print(
                    f"  Warning: No existing file found for {email} in {download_dir}"
                )
                # Keep the original URL
                output_rows.append(new_row)
                continue
        else:
            # Download the file
            local_file_path = download_file(cv_url, cookie, download_dir)
            if not local_file_path:
                print(f"  Failed to download CV for row {i+1}, skipping.")
                output_rows.append(new_row)
                continue
            
            # Rename file to formatted email
            file_extension = os.path.splitext(local_file_path)[1]
            renamed_file_path = os.path.join(
                download_dir, f"{formatted_email}{file_extension}"
            )
            
            try:
                os.rename(local_file_path, renamed_file_path)
                print(f"  Renamed file to {os.path.basename(renamed_file_path)}")
            except OSError as e:
                print(f"  Error renaming file: {e}")
                renamed_file_path = local_file_path
            
            # Upload to Firebase Storage if not skipped
            if not skip_firebase:
                firebase_url = upload_to_firebase(renamed_file_path, email)
                if firebase_url:
                    # Replace Formbricks URL with Firebase URL
                    new_row[cv_column] = firebase_url
                    print(f"  Successfully processed CV for {email}")
                else:
                    print(
                        f"  Failed to upload CV to Firebase for row {i+1}, using local file path."
                    )
                    # Use local file path instead
                    new_row[cv_column] = f"file://{os.path.abspath(renamed_file_path)}"
            else:
                # Use local file path if Firebase is skipped
                new_row[cv_column] = f"file://{os.path.abspath(renamed_file_path)}"
                print(f"  Firebase upload skipped, using local file path for {email}")
        
        output_rows.append(new_row)
    
    # Write updated CSV
    with open(output_csv, "w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=new_headers)
        writer.writeheader()
        writer.writerows(output_rows)
    
    print(f"Updated CSV saved to {output_csv}")
    print(f"CV files saved to {download_dir}")


if __name__ == "__main__":
    args = parse_args()
    
    # Check if input CSV file exists
    if not os.path.exists(args.input_csv):
        print(f"Error: Input CSV file not found: {args.input_csv}")
        sys.exit(1)
    
    # Get cookie from args or environment variable
    cookie = args.cookie
    if not cookie:
        cookie = os.getenv("FORMBRICKS_COOKIE")
    
    # Validate cookie only if download is not skipped
    if not args.skip_download:
        if not cookie or not cookie.strip():
            print(
                "Error: Formbricks cookie is required when downloading files. "
                "Provide it via -c/--cookie argument or FORMBRICKS_COOKIE environment variable. "
                "Use --skip-download if you want to skip downloading."
            )
            sys.exit(1)
        
        # Clean the cookie if it contains the full cookie string
        cookie = cookie.strip()
        if cookie.startswith("__Secure-next-auth.session-token="):
            cookie = cookie.split("=", 1)[1]
            # Remove any trailing semicolons or spaces
            cookie = cookie.rstrip(";").strip()
    else:
        cookie = None
        print(
            "Skipping download of CV files. Using existing files in the download directory."
        )
    
    # Initialize Firebase if not skipped
    if not args.skip_firebase:
        if not initialize_firebase(args.bucket):
            print("Failed to initialize Firebase. Will use local file paths instead.")
            args.skip_firebase = True
    else:
        print("Skipping Firebase upload as requested.")
    
    # Load participant emails if provided
    participant_emails = load_participant_emails(args.participants_csv)
    
    print(f"Processing input file: {args.input_csv}")
    print(f"Output will be saved to: {args.output}")
    print(f"Files directory: {args.download_dir}")
    
    # Process the CSV
    process_csv(
        args.input_csv, 
        args.output, 
        cookie, 
        args.download_dir,
        cv_column=args.cv_column,
        email_column=args.email_column,
        skip_firebase=args.skip_firebase,
        skip_download=args.skip_download,
        participant_emails=participant_emails,
    )
