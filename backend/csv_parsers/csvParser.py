import csv
from typing import *

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

    def parse(csvFile: str) -> List[FundingRecord]:

        with open(csvFile, newline='') as csvfile:
            csvReader = csv.reader(csvfile, delimiter=',', quotechar='|')
            records = []
            counter = 0
            for row in csvReader:
                counter += 1
                if len(row) < EXPECTED_LEN:
                    raise RecordError(
                        "lenght of line {} is too short, expected {} values, get {}".format(counter, EXPECTED_LEN,
                                                                                            len(row)))
                records.append(FundingRecord(*row[:EXPECTED_LEN]))

        return records


# example of usage
parsed = csvParser.parse('data.csv')
print(*parsed, sep="\n")