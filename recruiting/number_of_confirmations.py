#!/usr/bin/env python3
"""
Count distinct email addresses in a CSV export from Formbricks.

Used to count the number of participants who confirmed their attendance at CDTM Hacks
"""

import csv
import sys
from pathlib import Path

CSV_PATH = Path("YOUR_PATH_TO_THE_FORMBRICKS_EXPORT.csv")


def count_distinct_emails(csv_path: Path) -> int:
    """Return the number of unique, non‑empty email values in the file."""
    emails = set()

    with csv_path.open(newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)

        # Make sure the column exists
        if "email" not in reader.fieldnames:
            raise KeyError(
                f"'email' column not found. Columns present: {reader.fieldnames}"
            )

        for row in reader:
            email = row["email"].strip().lower()
            if email:
                emails.add(email)

    return len(emails)


if __name__ == "__main__":
    try:
        print(f"Distinct emails: {count_distinct_emails(CSV_PATH)}")
    except FileNotFoundError:
        sys.exit(f"File not found: {CSV_PATH}")
    except Exception as exc:
        sys.exit(f"Error: {exc}")

