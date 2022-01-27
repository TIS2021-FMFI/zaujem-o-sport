import csv
from typing import *
from settings import DB

COUNTRY = "RUSSIA"  ## get from UI
EXPECTED_LEN = 5


class RecordError(Exception):
    ...


class FundingRecord:

    def __init__(self, sport_code : int, branch_code : int, sport_name : str, branch_name : str, amount: float):
        self.sport_code = sport_code
        self.branch_code = branch_code
        self.sport_name = sport_name
        self.branch_name = branch_name
        self.amount = amount

    def codeNameCheck(self) -> bool:
        # todo
        # dummy
        return True

    def saveRecord(self):
        if self.codeNameCheck():
            # todo
            print("saved")
        else:
            raise RecordError("inconsistence in code and name")

    def __str__(self) -> str:
        return f"{self.sport_code} {self.branch_code} {self.sport_name} {self.branch_name} {self.amount}"


class csvParser:

    def __init__(self):
        self.result = []

    def findFailures(self, csvFile: List[str], changes:list, country_code:str):
        reader = csv.reader(csvFile, delimiter=',', quotechar='"')
        parsed_csv = list(reader)

        records = []
        suggestions = {}
        counter = 0
        for row in parsed_csv:
            counter += 1

            if len(row) < EXPECTED_LEN:
                # type 2 -> row too short
                suggestions[counter] = {"sport_code":(row[0] if len(row) > 0 else -1),
                                        "branch_code":(row[1] if len(row) > 1 else -1),
                                        "old_sport_title":(row[2] if len(row) > 2 else ""),
                                        "old_branch_title": (row[3] if len(row) > 3 else ""),
                                        "new_sport_title": "",
                                        "new_branch_title": "",
                                        "type": 2
                                        }

            else:
                sport_code, branch_code, sport_title, branch_title, amount = row[0:EXPECTED_LEN]

                if sport_code == "" and sport_title == "":
                    # combi funding
                    code, title = DB.checkCombi(branch_code, country_code)
                    if code != branch_code:
                        # neplatny branch code alebo country
                        suggestions[counter] = {"sport_code": sport_code,
                                                "branch_code": branch_code,
                                                "old_sport_title": sport_title,
                                                "old_branch_title": branch_title,
                                                "new_sport_title": sport_title,
                                                "new_branch_title": title,
                                                "type": 8
                                                }
                        continue
                    if title != branch_title:
                        suggestions[counter] = {"sport_code": sport_code,
                                                "branch_code": branch_code,
                                                "old_sport_title": sport_title,
                                                "old_branch_title": branch_title,
                                                "new_sport_title": sport_title,
                                                "new_branch_title": title,
                                                "type": 1
                                                }
                        continue

                else:
                    # non combi funding
                    try:
                        sport_code = int(sport_code)
                    except:
                        # sport code is not a number
                        suggestions[counter] = {"sport_code": sport_code,
                                                 "branch_code": branch_code,
                                                 "old_sport_title": sport_title,
                                                 "old_branch_title": branch_title,
                                                 "new_sport_title": "",
                                                 "new_branch_title": "",
                                                 "type": 5
                         }
                        continue

                    try:
                        branch_code = int(branch_code)
                    except:
                        # branch code is not a number
                        suggestions[counter] = {"sport_code": sport_code,
                                                 "branch_code": branch_code,
                                                 "old_sport_title": sport_title,
                                                 "old_branch_title": branch_title,
                                                 "new_sport_title": "",
                                                 "new_branch_title": "",
                                                 "type": 6
                         }
                        continue

                    try:
                        amount = int(amount)
                    except:
                        # amount is not a number
                        suggestions[counter] = {"sport_code": sport_code,
                                                 "branch_code": branch_code,
                                                 "old_sport_title": sport_title,
                                                 "old_branch_title": branch_title,
                                                 "new_sport_title": "",
                                                 "new_branch_title": "",
                                                 "type": 7
                         }
                        continue

                    if self.check(sport_code, branch_code, sport_title, branch_title) == False:
                        # inconsistence in code and title

                        new_sport_title = DB.findSportByCode(sport_code)
                        if new_sport_title is None:
                            suggestions[counter] = {"sport_code": sport_code,
                                                     "branch_code": branch_code,
                                                     "old_sport_title": sport_title,
                                                     "old_branch_title": branch_title,
                                                     "new_sport_title": "",
                                                     "new_branch_title": "",
                                                     "type": 3
                             }
                            continue


                        new_branch_title = DB.findBranchByCode(sport_code, branch_code)
                        if new_sport_title is None:
                            # type 4 -> branch with this code does not exist in sport with sport_code
                            # find all branches and choose one with min levenstein distance
                            new_branch_title, branch_code = self.find_closest_branch(branch_title, sport_code)
                            suggestions[counter] = {"sport_code": sport_code,
                                                    "branch_code": branch_code,
                                                    "old_sport_title": sport_title,
                                                    "old_branch_title": branch_title,
                                                    "new_sport_title": new_sport_title,
                                                    "new_branch_title": new_branch_title,
                                                    "type": 4
                                                    }
                            continue

                        # type 1 -> sugestions for new titles
                        suggestions[counter] = {"sport_code": sport_code,
                                                "branch_code": branch_code,
                                                "old_sport_title": sport_title,
                                                "old_branch_title": branch_title,
                                                "new_sport_title": new_sport_title,
                                                "new_branch_title": new_branch_title,
                                                "type": 1
                                                }


            records.append(FundingRecord(*row[:EXPECTED_LEN]))

        return []

    def saveResult(self):
        ...

    def check(self, sport_code, branch_code, sport_title, branch_title):
        return DB.checkCodeTitle(sport_code, branch_code, sport_title, branch_title)

    def levenstein(self,s, t, costs=(2,1,0.5)):
        rows = len(s) + 1
        cols = len(t) + 1
        deletes, inserts, substitutes = costs

        dist = [[0 for x in range(cols)] for x in range(rows)]

        # source prefixes can be transformed into empty strings
        # by deletions:
        for row in range(1, rows):
            dist[row][0] = row * deletes

        # target prefixes can be created from an empty source string
        # by inserting the characters
        for col in range(1, cols):
            dist[0][col] = col * inserts

        for col in range(1, cols):
            for row in range(1, rows):
                if s[row - 1].lower() == t[col - 1].lower():
                    cost = 0
                else:
                    cost = substitutes
                dist[row][col] = min(dist[row - 1][col] + deletes,
                                     dist[row][col - 1] + inserts,
                                     dist[row - 1][col - 1] + cost)  # substitution


        return dist[row][col]

    def find_closest_branch(self, branch_title, sport_code):
        neighs = DB.getSportBranches(sport_code)

        min_diff = len(branch_title)*10
        new_title, new_code = "", -1

        for n in neighs:
            act_diff = self.levenstein(branch_title,n["title"])
            if act_diff < min_diff:
                new_title, new_code = n["title"], n["code"]
                min_diff = act_diff

        return new_title, new_code



# example of usage
#parsed = csvParser.parse('data.csv', [])
#print(*parsed, sep="\n")
c = csvParser()
#print(c.result)
#print(c.find_closest_branch("sput", 3))

