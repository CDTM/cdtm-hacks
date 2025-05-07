import csv
import random
from typing import List, Dict, Set, Tuple
from dataclasses import dataclass
from collections import defaultdict
import firebase_admin
from firebase_admin import credentials, firestore

@dataclass
class Team:
    members: List[str]
    preferences: List[str]
    current_case: str = None
    team_id: str = None
    formed_by_script: bool = False
    team_name: str = None

    @property
    def size(self) -> int:
        return len(self.members)

    @property
    def display_name(self) -> str:
        """Return team name if set, otherwise return 'Team {team_id}'."""
        return f"Team {self.team_id}"

    def __hash__(self):
        """Make Team hashable based on its immutable properties."""
        # Only use immutable properties for hashing
        return hash((tuple(sorted(self.members)), tuple(self.preferences), self.team_id))

    def __eq__(self, other):
        """Define equality based on members."""
        if not isinstance(other, Team):
            return False
        return (sorted(self.members) == sorted(other.members) and 
                self.preferences == other.preferences and 
                self.team_id == other.team_id)

class TeamAllocator:
    def __init__(self, csv_path: str):
        self.csv_path = csv_path
        self.teams: List[Team] = []
        self.individuals: List[Team] = []
        self.cases = ["Trade Republic", "avi", "beam"]
        self.validation_errors = []
        self.used_team_ids = set()  # Track already used team IDs to avoid duplicates
        
    def _generate_team_id(self) -> str:
        """Generate a random 4-digit team ID, ensuring no duplicates."""
        while True:
            # Generate a random number between 1000 and 9999
            team_id = f"{random.randint(1000, 9999)}"
            # Check if this ID has already been used
            if team_id not in self.used_team_ids:
                # Add to used IDs set and return
                self.used_team_ids.add(team_id)
                return team_id
    
    def read_csv(self) -> None:
        """Read and validate the CSV file."""
        print("\nReading and validating CSV file...")
        try:
            with open(self.csv_path, 'r') as file:
                reader = csv.DictReader(file)
                total_rows = 0
                for row in reader:
                    total_rows += 1
                    isSolo = row['1. Do you have a team?'] == "No, I’m currently solo and would like to be matched with a team"
                    if isSolo:
                        print(row['2. What is your email address?'])
                        emails = [email.strip() for email in row['2. What is your email address?'].split(',')]
                    else:
                        print(row['3. List all email addresses of your team members'])
                        emails = [email.strip() for email in row['3. List all email addresses of your team members'].split(',')]
                    preferences = row['4. Rank your case preferences'].split(',')
                    preferences = [pref.strip() for pref in preferences]

                    
                    print(f"\nProcessing row {total_rows}:")
                    print(f"Emails: {emails}")
                    print(f"Preferences: {preferences}")
                    
                    # Validate team size
                    if len(emails) < 1 or len(emails) > 4 or (not isSolo and len(emails) < 2):
                        # Invalid team size
                        error_msg = f"Invalid team size ({len(emails)}) for emails: {emails}"
                        print(f"ERROR: {error_msg}")
                        self.validation_errors.append(error_msg)
                        continue
                    
                    # Create team with all parameters explicitly set
                    team_id = self._generate_team_id()
                    team = Team(
                        members=emails,
                        preferences=preferences,
                        team_id=team_id,
                        formed_by_script=False,  # Pre-formed teams are not formed by script
                        team_name=f"Team {team_id}"  # Use team name if provided
                    )
                    
                    if isSolo:
                        print("Identified as individual")
                        self.individuals.append(team)
                    else:
                        print("Identified as pre-formed team")
                        self.teams.append(team)
                        
                print(f"\nCSV Processing Complete:")
                print(f"Total rows processed: {total_rows}")
                print(f"Pre-formed teams found: {len(self.teams)}")
                print(f"Individuals found: {len(self.individuals)}")
                print(f"Validation errors: {len(self.validation_errors)}")
                
                # Check for duplicates after all data is read
                self._handle_duplicate_emails()
                        
        except Exception as e:
            error_msg = f"Error reading CSV: {str(e)}"
            print(f"ERROR: {error_msg}")
            self.validation_errors.append(error_msg)
    
    def _handle_duplicate_emails(self) -> None:
        """
        Remove individual entries for people who signed up as solo but also appear in a team.
        This should be called after reading the CSV file but before forming teams.
        """
        print("\nChecking for duplicate emails (solo registrants appearing in teams)...")
        
        # Collect all emails from team registrations
        team_emails = set()
        for team in self.teams:
            for email in team.members:
                team_emails.add(email.lower())  # Case-insensitive comparison
        
        # Filter out individuals who also appear in teams
        original_count = len(self.individuals)
        removed_emails = []
        
        filtered_individuals = []
        for individual in self.individuals:
            duplicate_found = False
            for email in individual.members:
                if email.lower() in team_emails:
                    duplicate_found = True
                    removed_emails.append(email)
                    error_msg = f"Removed duplicate registration: {email} (appeared as both individual and in a team)"
                    print(f"WARNING: {error_msg}")
                    break
            
            if not duplicate_found:
                filtered_individuals.append(individual)
        
        self.individuals = filtered_individuals
        
        print(f"Duplicate check complete:")
        print(f"Individual entries before: {original_count}")
        print(f"Individual entries after: {len(self.individuals)}")
        print(f"Removed {original_count - len(self.individuals)} duplicate registrations")
        if removed_emails:
            print(f"Removed emails: {removed_emails}")
    
    def form_teams_from_individuals(self) -> None:
        """Form teams from individuals based on preferences."""
        print("\nStarting team formation from individuals...")
        print(f"Initial number of individuals: {len(self.individuals)}")
        unassigned = self.individuals[:]
        assigned_members = set()  # Track individual members instead of Team objects

        for pref_level in range(3):
            if not unassigned:
                break

            print(f"\nProcessing preference level {pref_level + 1}")
            # Group individuals by current preference
            pref_groups = defaultdict(list)
            for individual in unassigned:
                if not any(member in assigned_members for member in individual.members):
                    pref_groups[individual.preferences[pref_level]].append(individual)

            print("Individuals grouped by preference:")
            for case, individuals in pref_groups.items():
                print(f"{case}: {len(individuals)} individuals")

            new_unassigned = []
            for case in self.cases:
                individuals = pref_groups[case]
                idx = 0
                n = len(individuals)
                # Teams of 4
                while idx + 4 <= n:
                    new_team = self._form_team(individuals[idx:idx+4])
                    self.teams.append(new_team)
                    for ind in individuals[idx:idx+4]:
                        assigned_members.update(ind.members)
                    print(f"Formed 4-person team: {new_team.members}")
                    idx += 4
                # Teams of 3
                while idx + 3 <= n:
                    new_team = self._form_team(individuals[idx:idx+3])
                    self.teams.append(new_team)
                    for ind in individuals[idx:idx+3]:
                        assigned_members.update(ind.members)
                    print(f"Formed 3-person team: {new_team.members}")
                    idx += 3
                # Teams of 2
                while idx + 2 <= n:
                    new_team = self._form_team(individuals[idx:idx+2])
                    self.teams.append(new_team)
                    for ind in individuals[idx:idx+2]:
                        assigned_members.update(ind.members)
                    print(f"Formed 2-person team: {new_team.members}")
                    idx += 2
                # Keep any remaining individuals for next round
                if idx < n:
                    new_unassigned.extend(individuals[idx:])

            unassigned = [ind for ind in new_unassigned 
                         if not any(member in assigned_members for member in ind.members)]

        # After all preferences, if anyone is left, try to add them to existing teams
        if unassigned:
            print(f"\nAttempting to add remaining individuals to existing teams: {[ind.members[0] for ind in unassigned]}")
            remaining_unassigned = []
            
            for individual in unassigned:
                added_to_team = False
                
                # FIRST PRIORITY: Try to add to script-formed teams (teams formed from other solo participants)
                print(f"Looking for script-formed teams to place {individual.members[0]}")
                
                # First try to add to script-formed teams with their second preference
                for team in self.teams:
                    if (team.size < 4 and 
                        team.formed_by_script and 
                        team.current_case == individual.preferences[1] and 
                        not any(member in assigned_members for member in individual.members)):
                        # Add individual to this team
                        team.members.extend(individual.members)
                        assigned_members.update(individual.members)
                        print(f"Added {individual.members[0]} to existing script-formed team {team.team_id} based on second preference")
                        added_to_team = True
                        break
                
                # If still not added, try script-formed teams with third preference
                if not added_to_team:
                    for team in self.teams:
                        if (team.size < 4 and 
                            team.formed_by_script and
                            team.current_case == individual.preferences[2] and 
                            not any(member in assigned_members for member in individual.members)):
                            # Add individual to this team
                            team.members.extend(individual.members)
                            assigned_members.update(individual.members)
                            print(f"Added {individual.members[0]} to existing script-formed team {team.team_id} based on third preference")
                            added_to_team = True
                            break
                
                # If still not added, try any script-formed team with space
                if not added_to_team:
                    for team in self.teams:
                        if (team.size < 4 and 
                            team.formed_by_script and
                            not any(member in assigned_members for member in individual.members)):
                            # Add individual to this team
                            team.members.extend(individual.members)
                            assigned_members.update(individual.members)
                            print(f"Added {individual.members[0]} to existing script-formed team {team.team_id} based on available space")
                            added_to_team = True
                            break
                            
                # SECOND PRIORITY: Try to add to any team if no script-formed teams available
                if not added_to_team:
                    print(f"No script-formed teams available for {individual.members[0]}, trying any team")
                    
                    # Now try pre-formed teams with second preference
                    for team in self.teams:
                        if (team.size < 4 and 
                            team.current_case == individual.preferences[1] and 
                            not any(member in assigned_members for member in individual.members)):
                            # Add individual to this team
                            team.members.extend(individual.members)
                            assigned_members.update(individual.members)
                            print(f"Added {individual.members[0]} to existing team {team.team_id} based on second preference")
                            added_to_team = True
                            break
                    
                    # If still not added, try third preference
                    if not added_to_team:
                        for team in self.teams:
                            if (team.size < 4 and 
                                team.current_case == individual.preferences[2] and 
                                not any(member in assigned_members for member in individual.members)):
                                # Add individual to this team
                                team.members.extend(individual.members)
                                assigned_members.update(individual.members)
                                print(f"Added {individual.members[0]} to existing team {team.team_id} based on third preference")
                                added_to_team = True
                                break
                    
                    # If still not added, try any team with space
                    if not added_to_team:
                        for team in self.teams:
                            if (team.size < 4 and 
                                not any(member in assigned_members for member in individual.members)):
                                # Add individual to this team
                                team.members.extend(individual.members)
                                assigned_members.update(individual.members)
                                print(f"Added {individual.members[0]} to existing team {team.team_id} based on available space")
                                added_to_team = True
                                break
                
                if not added_to_team:
                    remaining_unassigned.append(individual)
            
            # If we still have unassigned individuals, create a new team only if we have 2 or more
            if len(remaining_unassigned) >= 2:
                print(f"Forming final team with remaining individuals: {[ind.members[0] for ind in remaining_unassigned]}")
                new_team = self._form_team(remaining_unassigned)
                self.teams.append(new_team)
                for ind in remaining_unassigned:
                    assigned_members.update(ind.members)
            elif remaining_unassigned:
                # If we have just one person left, find the smallest team to add them to
                smallest_team = min(self.teams, key=lambda t: t.size)
                for individual in remaining_unassigned:
                    smallest_team.members.extend(individual.members)
                    assigned_members.update(individual.members)
                    print(f"Added final individual {individual.members[0]} to smallest team {smallest_team.team_id}")

        # Clear the individuals list as everyone should be assigned
        self.individuals = []
        
        # Print final team sizes
        print("\nFinal team sizes:")
        for team in self.teams:
            print(f"Team {team.team_id}: {team.size} members")
    
    def _form_team(self, individuals: List[Team]) -> Team:
        """Form a new team from individuals and copy preferences from a random member."""
        all_members = []
        for individual in individuals:
            all_members.extend(individual.members)
        
        # Copy preferences from a random member
        random_member = random.choice(individuals)
        team_id = self._generate_team_id()
        
        # Create new team with all parameters explicitly set
        new_team = Team(
            members=all_members,
            preferences=random_member.preferences,
            team_id=team_id,
            formed_by_script=True,  # This is a script-formed team
            team_name=f"Team {team_id}"  # Generate name based on ID for script-formed teams
        )
        
        print(f"Formed new team {new_team.team_id} with preferences from {random_member.members[0]}")
        return new_team
    
    def assign_initial_cases(self) -> None:
        """Assign all teams to their first preference case."""
        print("\nAssigning initial case preferences...")
        for team in self.teams:
            team.current_case = team.preferences[0]
            print(f"Team {team.members} assigned to {team.current_case}")
    
    def balance_cases(self) -> None:
        """Ensure each case has at least 30 participants."""
        print("\nStarting case balancing...")
        iteration = 1
        while True:
            print(f"\nBalancing iteration {iteration}")
            case_counts = self._get_case_counts()
            print("Current case counts:", case_counts)
            
            deficit_case = self._find_deficit_case(case_counts)
            if not deficit_case:
                print("No more deficit cases found")
                break
                
            print(f"Found deficit case: {deficit_case}")
            surplus_cases = self._find_surplus_cases(case_counts)
            if not surplus_cases:
                print("No surplus cases available")
                break
                
            print(f"Surplus cases: {surplus_cases}")
            
            # Try to move teams based on 2nd preference
            print("\nAttempting moves based on 2nd preference...")
            if not self._move_teams(deficit_case, surplus_cases, pref_level=1):
                # If still in deficit, try 3rd preference
                print("\nAttempting moves based on 3rd preference...")
                self._move_teams(deficit_case, surplus_cases, pref_level=2)
            
            iteration += 1
    
    def _get_case_counts(self) -> Dict[str, int]:
        """Get current participant count for each case."""
        counts = defaultdict(int)
        for team in self.teams:
            counts[team.current_case] += team.size
        return counts
    
    def _find_deficit_case(self, case_counts: Dict[str, int]) -> str:
        """Find a case with fewer than 30 participants."""
        for case in self.cases:
            if case_counts[case] < 30:
                return case
        return None
    
    def _find_surplus_cases(self, case_counts: Dict[str, int]) -> List[str]:
        """Find cases with more than 30 participants, sorted by size in descending order."""
        surplus_cases = [(case, count) for case, count in case_counts.items() if count > 30]
        # Sort by count in descending order
        surplus_cases.sort(key=lambda x: x[1], reverse=True)
        return [case for case, _ in surplus_cases]
    
    def _move_teams(self, deficit_case: str, surplus_cases: List[str], 
                   pref_level: int) -> bool:
        """Move teams from surplus cases to deficit case based on preference level."""
        moved = False
        for surplus_case in surplus_cases:
            print(f"\nChecking teams in {surplus_case}...")
            # Find teams in surplus case that have deficit case as their nth preference
            eligible_teams = [
                team for team in self.teams
                if team.current_case == surplus_case and 
                team.preferences[pref_level] == deficit_case
            ]
            
            print(f"Found {len(eligible_teams)} eligible teams")
            
            # Sort by size (largest first)
            eligible_teams.sort(key=lambda t: t.size, reverse=True)
            
            for team in eligible_teams:
                print(f"\nMoving team {team.members} from {surplus_case} to {deficit_case}")
                team.current_case = deficit_case
                moved = True
                
                # Check if deficit is resolved
                case_counts = self._get_case_counts()
                print("Updated case counts:", case_counts)
                if case_counts[deficit_case] >= 30:
                    print("Deficit resolved")
                    return True
                    
        return moved
    
    def get_results(self) -> Dict:
        """Get the final results of the allocation."""
        case_counts = self._get_case_counts()
        return {
            "team_assignments": [
                {
                    "team_id": team.team_id,
                    "team_name": team.display_name,
                    "members": team.members,
                    "current_case": team.current_case,
                    "preferences": team.preferences,
                    "formed_by_script": team.formed_by_script
                }
                for team in self.teams
            ],
            "case_counts": case_counts,
            "validation_errors": self.validation_errors
        }

    def save_results_to_csv(self, results: Dict, output_file: str = "team_allocations.csv") -> None:
        """Save the team allocation results to a CSV file."""
        print(f"\nSaving results to {output_file}...")
        try:
            with open(output_file, 'w', newline='') as file:
                writer = csv.writer(file)
                # Write header
                writer.writerow([
                    "Team ID",
                    "Team Name",
                    "Team Members",
                    "Team Size",
                    "Assigned Case",
                    "First Preference",
                    "Second Preference",
                    "Third Preference",
                    "Formed By Script"
                ])
                
                # Write team assignments
                for team in results["team_assignments"]:
                    writer.writerow([
                        team["team_id"],
                        team["team_name"],
                        ", ".join(team["members"]),
                        len(team["members"]),
                        team["current_case"],
                        team["preferences"][0],
                        team["preferences"][1],
                        team["preferences"][2],
                        "Yes" if team["formed_by_script"] else "No"
                    ])
                
                # Write case counts
                writer.writerow([])  # Empty row for separation
                writer.writerow(["Case Participant Counts"])
                writer.writerow(["Case", "Participant Count"])
                for case, count in results["case_counts"].items():
                    writer.writerow([case, count])
                
                # Write validation errors if any
                if results["validation_errors"]:
                    writer.writerow([])  # Empty row for separation
                    writer.writerow(["Validation Errors"])
                    for error in results["validation_errors"]:
                        writer.writerow([error])
            
            print(f"Results successfully saved to {output_file}")
            
        except Exception as e:
            print(f"Error saving results to CSV: {str(e)}")

    def store_teams_in_firestore(self, service_account_path: str = "serviceAccountKey.json") -> None:
        """Store teams in Firestore with the required structure."""
        print("\nStoring teams in Firestore...")
        try:
            # Initialize Firebase Admin SDK if not already initialized
            try:
                app = firebase_admin.get_app()
            except ValueError:
                cred = credentials.Certificate(service_account_path)
                firebase_admin.initialize_app(cred)
            
            db = firestore.client()
            
            batch = db.batch()
            stored_teams = 0
            
            for team in self.teams:
                # Use team_id as document ID
                team_ref = db.collection("Teams").document(team.team_id)
                
                # Store team data with required structure
                team_data = {
                    "emails": team.members,
                    "case": team.current_case
                }
                
                batch.set(team_ref, team_data)
                stored_teams += 1
                
                # Commit in batches of 500 (Firestore limit)
                if stored_teams % 500 == 0:
                    batch.commit()
                    batch = db.batch()
            
            # Commit any remaining teams
            if stored_teams % 500 != 0:
                batch.commit()
            
            print(f"Successfully stored {stored_teams} teams in Firestore")
            
        except Exception as e:
            print(f"Error storing teams in Firestore: {str(e)}")

def main():
    # Example usage
    allocator = TeamAllocator("hackathon_participants.csv")
    allocator.read_csv()
    
    if allocator.validation_errors:
        print("\nValidation errors found:")
        for error in allocator.validation_errors:
            print(f"- {error}")
        return
    
    allocator.form_teams_from_individuals()
    allocator.assign_initial_cases()
    allocator.balance_cases()
    
    results = allocator.get_results()
    
    # Print results to console
    print("\nFinal Results:")
    print("\nTeam Assignments:")
    for assignment in results["team_assignments"]:
        print(f"Team: {assignment['team_name']}")
        print(f"Members: {assignment['members']}")
        print(f"Assigned to: {assignment['current_case']}")
        print(f"Preferences: {assignment['preferences']}")
        print()
    
    print("\nFinal Case Counts:")
    for case, count in results["case_counts"].items():
        print(f"{case}: {count} participants")
    
    # Save results to CSV
    allocator.save_results_to_csv(results)
    
    # Store teams in Firestore
    # Comment out or provide correct path to service account key
    allocator.store_teams_in_firestore("cdtm-hacks-key.json")

if __name__ == "__main__":
    main()
