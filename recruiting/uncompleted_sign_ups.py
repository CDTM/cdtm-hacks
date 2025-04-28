#!/usr/bin/env python3
"""
Filter out all rows where Finished=='Yes' and remove all rows belonging to any user who has Finished=='Yes' anywhere.

Used to get the uncompleted sign ups to send them a reminder email.
"""

import pandas as pd
import re
import argparse
import sys

def detect_email_column(df):
    # 1) look for a column name containing "email"
    for col in df.columns:
        if 'email' in col.lower():
            return col
    # 2) else pick first column whose values contain "@"
    for col in df.columns:
        if df[col].astype(str).str.contains(r'@').any():
            return col
    return None

def extract_email(cell):
    """Find last email‐like substring in the cell, or empty string."""
    matches = re.findall(r'[\w\.-]+@[\w\.-]+', str(cell))
    return matches[-1] if matches else ''

def main():
    parser = argparse.ArgumentParser(
        description="Filter out all rows where Finished=='Yes' and remove all rows belonging to any user who has Finished=='Yes' anywhere."
    )
    parser.add_argument('input_csv', help="path to your raw CSV file")
    parser.add_argument(
        '--output-csv', '-o',
        help="where to write the filtered CSV (default: input path + 'filtered')",
        default=None
    )
    parser.add_argument(
        '--email-col', '-e',
        help="(optional) name of the column containing email addresses; "
             "if omitted the script will try to detect it"
    )
    args = parser.parse_args()

    if args.output_csv is None:
        args.output_csv = args.input_csv.rsplit('.', 1)[0] + '_filtered.csv'

    # 1) load
    try:
        df = pd.read_csv(args.input_csv)
    except Exception as ex:
        print(f"Error reading {args.input_csv}: {ex}", file=sys.stderr)
        sys.exit(1)

    # 2) detect or use provided email column
    email_col = args.email_col or detect_email_column(df)
    if not email_col:
        print("ERROR: could not detect an email column. "
              "Please supply --email-col COLUMN_NAME", file=sys.stderr)
        sys.exit(1)
    print(f"Using email column: '{email_col}'")

    # 3) extract plain email into helper column
    df['_email'] = df[email_col].apply(extract_email)

    # 4) identify all emails of users who finished
    finished_mask = df['Finished'].astype(str).str.strip().str.lower() == 'yes'
    finished_emails = set(df.loc[finished_mask, '_email'])
    print(f"Found {len(finished_emails)} unique email(s) with Finished=='Yes'")

    # 5) build mask to keep only rows NOT finished and whose email never finished
    keep_mask = ~(
        df['_email'].isin(finished_emails) |
        (df['Finished'].astype(str).str.strip().str.lower() == 'yes')
    )
    df_filtered = df.loc[keep_mask].drop(columns=['_email'])

    # 6) write out
    df_filtered.to_csv(args.output_csv, index=False)
    print(f"Filtered {len(df) - len(df_filtered)} rows; remaining {len(df_filtered)} rows.")
    print(f"Written filtered CSV to: {args.output_csv}")

if __name__ == '__main__':
    main()