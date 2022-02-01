import openpyxl
from typing import *

from settings import DB


class NumberInSports:
    def __init__(self):
        self.values = {}

    def __getitem__(self, item):
        return self.values[item]

    def __setitem__(self, item, value):
        self.values[item] = value

    def __contains__(self, value):
            return value in self.values

    def save(self):
        for key in self.values.keys():
            DB.importNumberInSports( key, self.values[key])


class MaxPointsInSport:
    def __init__(self):
        self.values = {}

    def __getitem__(self, item):
        return self.values[item]

    def __setitem__(self, item, value):
        self.values[item] = value

    def __contains__(self, value):
        return value in self.values

    def save(self):
        for key in self.values.keys():
            DB.importMaxPointsInSport( key, self.values[key])



class TotalCountryPoints:
    def __init__(self):
        self.values = {}

    def __getitem__(self, item):
        return self.values[item]

    def __setitem__(self, item, value):
        self.values[item] = value

    def __contains__(self, value):
        return value in self.values

    def save(self):
        for key in self.values.keys():
            DB.importTotalCountryPoints( key, self.values[key])


class CountryBestOrder:
    def __init__(self):
        self.values = {}

    def __getitem__(self, item):
        return self.values[item]

    def __setitem__(self, item, value):
        self.values[item] = value

    def __contains__(self, value):
        return value in self.values

    def save(self):
        for key in self.values.keys():
            DB.importCountryBestOrder( key, self.values[key])


class SuccessRecord:
    def __init__(self, rank : int, country_id : int, points:float):
        self.rank = rank
        self.country_id = country_id
        self.points = points

    def __str__(self) -> str:
        return f"{self.country_id}, {self.points}, {self.rank}"


class SportSuccess:

    def __init__(self, sport_id : str):
        self.sport_id = sport_id
        self.records = []

    def set_max_points(self, points : int):
        self.max_points = points

    def set_num_of_states(self, value : int):
        self.max_points = value

    def __str__(self) -> str:
        s = ""
        for r in self.records:
            s += f"{self.sport_id}, {r} \n"

        return s

    def save(self):
        for record in self.records:

            #sport_id: id, country_id: id, points: float, orders: int
            DB.importSuccessdata( self.sport_id, record.country_id, record.points, record.rank )


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

    def __init__(self):
        ...

    def parseSuccess(self , wb ) -> List:

        sports = DB.getAllSports()
        countries = DB.getActiveCountryIds()

        def getCountryID( name ):
            for item in countries:
                if item['name'] == name.strip():
                    return item["id"]

            return -1

        def getSportID( title ):
            for item in sports:
                if item['title'] == title.strip().replace("/", " AND "):
                    return item["code"]
            return -1


        pocet_statov = NumberInSports()
        max_bodov = MaxPointsInSport()
        pocet_bodov = TotalCountryPoints()
        najvyssie_um = CountryBestOrder()

        success = []
        unknown_sports = []

        sport_row_index = 2

        for sheet in wb.worksheets:

            last_row = sheet.max_row  # ako najhlbsie ide
            last_col = sheet.max_column  # ako najdalej

            for sport_col_index in range( 2, last_col+1, 4 ):

                cell = sheet.cell(row=sport_row_index, column=sport_col_index)
                if cell.value != None:
                    if isinstance(cell.value, str):
                        sport_title = cell.value
                        sport_id = getSportID(sport_title)
                        sport_record = SportSuccess(sport_id)

                        pocet_statov[sport_id] = 0
                        max_bodov[sport_id] = 0
                        for r in range(sport_row_index + 2, last_row + 1):

                            points = sheet.cell(row=r, column=sport_col_index + 1).value

                            if points is not None:

                                points = round(float(points),3)
                                rank = int(sheet.cell(row=r, column=sport_col_index - 1).value)
                                country = sheet.cell(row=r, column=sport_col_index).value
                                country_id = getCountryID(country)


                                if points > max_bodov[sport_id]:
                                    max_bodov[sport_id] = points

                                pocet_statov[sport_id] = pocet_statov[sport_id] + 1


                                if country_id > 0:

                                    if country_id not in pocet_bodov:
                                        pocet_bodov[country_id] = points
                                    else:
                                        pocet_bodov[country_id] = pocet_bodov[country_id] + points


                                    if country_id not in najvyssie_um:
                                        najvyssie_um[country_id] = rank
                                    else:
                                        if rank < najvyssie_um[country_id]:
                                            najvyssie_um[country_id] = rank

                                    sport_record.records.append(SuccessRecord(rank, country_id, points))

                if sport_id > 0:
                    success.append(sport_record)
                else:
                    unknown_sports.append(sport_title)



        return [ success, unknown_sports, pocet_statov, max_bodov, pocet_bodov, najvyssie_um ]

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



# p = excelParser()
# wb = openpyxl.load_workbook(filename='ALL SPORTS RANKING 2019.xlsx')
# parsed = p.parseSuccess(wb)

# s= 0
# nieco = []

# for r in parsed[0]:
#     s += len(r.records)
#     nieco.append( [r.sport_id , len(r.records)] )


# for n in nieco:
#     print ( n )




# example of usage - Interconnectness
# print("-----------------")
# parsed = p.parseInterconnectness("export.xlsx", "export")
# for i in parsed:
#     if i.countryA == "Izrael":
#         print(i)
# print(len(parsed))
