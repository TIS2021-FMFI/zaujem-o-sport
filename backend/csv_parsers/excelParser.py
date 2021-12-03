import openpyxl
from typing import *

class SuccessRecord:
    def __init__(self, rank : int, country : str, points:float):
        self.rank = rank
        self.country = country
        self.points = points

    def countryExistsCheck(self) -> bool:
        # todo -> pristup do db a overenie
        return True

    def __str__(self) -> str:
        return "SuccessRecord: {}, {}, {}".format(self.rank, self.country, self.points)


class SportSuccess:

    def __init__(self, sport_name : str, sport_code : int, cell: openpyxl.cell):

        self.sport_name = sport_name
        self.sport_code = sport_code
        self.cell = cell
        self.records = []

    def sportNameCodeCheck(self) -> bool:
        # todo -> pristup do DB a overenie
        return True

    def __str__(self) -> str:
        return "SportSuccess: {}, {}, {}".format(self.sport_name, self.sport_code, self.cell)

    def parse_record(self, sheet : str, num_rows : int):

        for r in range(self.cell[0] + 2, num_rows + 1):

            rank = sheet.cell(row=r, column=self.cell[1] - 1).value
            country = sheet.cell(row=r, column=self.cell[1]).value
            points = sheet.cell(row=r, column=self.cell[1] + 1).value

            if rank != None:
                self.records.append(SuccessRecord(rank, country, points))


class InterconnectnessRecord:

    def __init__(self, countryA: str, countryB: str, type: str, value: float):
        self.countryA = countryA
        self.countryB = countryB
        self.type = type
        self.value = value

    def __str__(self) -> str:
        return f"{self.type} {self.countryA} {self.countryB} {self.value}"


class ParseError(Exception):
    ...


class excelParser:

    def parseSuccess(file: str) -> List[SportSuccess]:
        SPORT_NAMES_ROW = 2  # mohol by zadat user v GUI ?

        wb_obj = openpyxl.load_workbook(file)
        sheet = wb_obj.active

        LAST_ROW = sheet.max_row  # aby sme vedeli pokial sa pozerat
        LAST_COL = sheet.max_column  # kolko max stlpcov je rozdiel medzi 2 menami sportov -> aby sme neprehladavali donekonecna

        records = []
        key = None
        for col in range(1, LAST_COL + 1):
            cell = sheet.cell(row=SPORT_NAMES_ROW, column=col)
            if cell.value != None:
                if key == None:
                    if isinstance(cell.value, int):
                        key = cell.value
                    else:
                        print(cell.value)
                        raise TypeError("expected sport code but get non number value")
                else:
                    if isinstance(cell.value, str):
                        records.append(SportSuccess(cell.value, key, (SPORT_NAMES_ROW, col)))
                        key = None
                    else:
                        raise TypeError("expected sport name but get non string value")

        for record in records:
            record.parse_record(sheet, LAST_ROW)

        return records

    def parseInterconnectness(file: str, type: str) -> List[InterconnectnessRecord]:

        wb_obj = openpyxl.load_workbook(file)
        sheet = wb_obj.active

        LAST_ROW = sheet.max_row  # aby sme vedeli pokial sa pozerat
        LAST_COL = sheet.max_column  # kolko max stlpcov je rozdiel medzi 2 menami sportov -> aby sme neprehladavali donekonecna

        records = []
        countries = []
        FIRST_ROW = 1
        FIRST_COL = 1

        key = None
        for col in range(2, LAST_COL + 1):
            cell = sheet.cell(row=1, column=col)
            countries.append(cell.value)

        # check if countries in first row and first col are in same order
        for row in range(2, LAST_ROW + 1):
            cell = sheet.cell(row=row, column=FIRST_COL)
            if countries[row - 2] != cell.value:
                raise ParseError("Inconsistance in countries in first row and first col.")

        for row in range(2, LAST_ROW + 1):
            for col in range(2, LAST_COL + 1):
                cell = sheet.cell(row=row, column=col)
                records.append(InterconnectnessRecord(countries[row - 2], countries[col - 2], type, float(cell.value)))

        return records


# example of usage - Success

parsed = excelParser.parseSuccess("data1.xlsx")
for i in parsed: print(i)
print("---------------")
for i in parsed[0].records:
    print(i)

# example of usage - Interconnectness
print("-----------------")
parsed = excelParser.parseInterconnectness("export.xlsx", "export")
for i in parsed:
    if i.countryA == "Izrael":
        print(i)
print(len(parsed))