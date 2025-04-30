#!/usr/bin/env python3
"""
Count distinct email addresses in a CSV export from Formbricks.

Used to count the number of participants who confirmed their attendance at CDTM Hacks
"""

import argparse
import csv
import sys
from pathlib import Path


def count_distinct_emails(csv_path: Path, output_path: Path | None = None) -> tuple[int, int]:
    """Return the number of unique, non‑empty email values in the file.
    
    Args:
        csv_path: Path to the input CSV file
        output_path: Path to save the unique email addresses of confirmed participants, default is "confirmed_participants.csv"
    
    Returns:
        Tuple of (total unique emails, confirmed participants count)
    """
    emails = set()
    confirmed_emails = set()

    with csv_path.open(newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)

        # Make sure the required columns exist
        required_columns = {"email", "1. Commit to CDTM Hacks?"}
        missing_columns = required_columns - set(reader.fieldnames)
        if missing_columns:
            raise KeyError(
                f"Required columns not found: {missing_columns}. Columns present: {reader.fieldnames}"
            )

        for row in reader:
            email = row["email"].strip().lower()
            if not email:
                continue
                
            emails.add(email)
            if row["1. Commit to CDTM Hacks?"].strip() == "Yes!":
                confirmed_emails.add(email)

    # Save confirmed emails to output file if path is provided
    with output_path.open("w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["email"])
        for email in sorted(confirmed_emails):
                writer.writerow([email])

    return len(emails), len(confirmed_emails)


def parse_args():
    parser = argparse.ArgumentParser(
        description="Count distinct email addresses in a CSV export from Formbricks"
    )
    parser.add_argument(
        "input_path",
        type=Path,
        help="Path to the Formbricks CSV export file",
    )
    parser.add_argument(
        "-o",
        "--output",
        type=Path,
        help="Optional path to save the unique email addresses of confirmed participants as CSV",
        default='confirmed_participants.csv'
    )
    return parser.parse_args()


if __name__ == "__main__":
    args = parse_args()
    try:
        total_emails, confirmed_count = count_distinct_emails(args.input_path, args.output)
        print(f"Total distinct emails: {total_emails}")
        print(f"Confirmed participants: {confirmed_count}")
        print(f"Declined participants: {total_emails - confirmed_count}")
        if args.output:
            print(f"Confirmed email addresses saved to: {args.output}")
    except FileNotFoundError:
        sys.exit(f"File not found: {args.input_path}")
    except Exception as exc:
        sys.exit(f"Error: {exc}")

