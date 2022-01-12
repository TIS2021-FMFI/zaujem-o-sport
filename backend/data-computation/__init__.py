
class CompError(Exception):
    ...

class Computations:



    def __init__(self):
        # TODO
        # small db mirroring model will be initialize here
        # local info from db which are frequently used in computations are stored in lists, maps
        self.PV1 = 0.5
        self.PV2 = 0.16
        self.PV3 = 0.34
        self.PV4 = 2
        self.DUMMY = 0.1  # to avoid division by zero error

    def allCountryIds(self):
        return [] # TODO

    def allBranchIds(self):
        return []  # TODO

    def allSportIds(self):
        return []

    def importance(self, countryK : id, sportN : id) -> float:
        suma = 0
        for countryJ in self.allCountryIds():
            suma += self.sport_importance_in_country(sportN, countryJ) * self.norm_interconnectness(countryK, countryJ)

        return self.PV3 * self.norm_BGS(sportN) + (1 - self.PV3) * suma

    def norm_interconnectness(self, countryK : id, countryJ : id) -> float:

        if countryK == countryJ:
            raise CompError("cannot compute norm interconectness for same countries")

        return self.total_interconnectness(countryK, countryJ) * (1 - self.econ_interconnectness(countryK, countryJ))

    def total_interconnectness(self, countryK : id, countryJ : id) -> float:

        if countryK == countryJ:
            raise CompError("cannot compute total interconectness for same countries")

        return (self.econ_interconnectness(countryK, countryJ) + self.nonecon_interconnectness(countryK, countryJ)) / 2

    def econ_interconnectness(self, countryK : id, countryJ : id) -> float:

        if countryK == countryJ:
            raise CompError("cannot compute econ interconectness for same countries")

        return self.DUMMY

    def nonecon_interconnectness(self, countryK : id, countryJ : id) -> float:

        if countryK == countryJ:
            raise CompError("cannot compute nonecon interconectness for same countries")

        return self.DUMMY

    def sport_importance_in_country(self, sportN : id, countryK : id) -> float:

        normFun = self.norm_funding(sportN, countryK)
        normSuc = self.norm_success(sportN, countryK)

        if normFun > 0:
            return (self.PV1 * normFun + self.PV2 * normSuc) / (self.PV1 + self.PV2)
        else:
            return normSuc

    def norm_funding(self, sportN : id, countryK : id) -> float:

        return self.DUMMY


    def branch_funding(self, countryK : id, sportN : id, branchB : id) -> float:
        return self.DUMMY


    def combi_branch_funding(self, countryK : id, combiQ : id) -> float:
        return self.DUMMY


    def total_country_funding(self, countryK : id) -> float:
        return self.DUMMY


    def norm_success(self, sportN : id, countryK : id) -> float:

        return self.success(sportN, countryK) / self.total_success(countryK)


    def total_success(self, countryK : id) -> float:

        suma = 0

        for sportN in self.allSportIds():
            suma += self.success(sportN, countryK)

        return suma


    def success(self, sportN : id, countryK : id) -> float:

        res = 0

        order = self.order(countryK, sportN)
        if order > 0:
            res += (1/4) * (self.num_countries_in_sport(sportN) + 1 - (order / self.num_countries_in_sport(sportN)))

        points = self.points(countryK, sportN)
        if points > 0:
            res += (1/4) * ( points / self.max_points(sportN))

        totalPoints = self.total_points(countryK)
        if totalPoints > 0:
            res += (1/4) * ((self.points(countryK, sportN)**self.PV4) / (totalPoints**self.PV4))


        if order > 0:
            res += (1/4) * (self.min_order(countryK) / order)

        return res

    def order(self, countryK : id, sportN : id) -> float:
        return self.DUMMY

    def points(self, countryK : id, sportN : id) -> float:
        return self.DUMMY


    def max_points(self, sportN : id) -> float:
        return self.DUMMY


    def num_countries_in_sport(self, sportN : id) -> float:
        return self.DUMMY


    def total_points(self, countryK : id) -> float:
        return self.DUMMY


    def min_order(self, countryK : id) -> float:
        return self.DUMMY


    def norm_BGS(self, sportN : id) -> float:

        return self.BGS(sportN) / self.total_BGS()

    def total_BGS(self) -> float:

        # return self.DUMMY # -> this one is suming to 0, to test without errors, use this dummy constant

        suma = 0

        for sportN in self.allSportIds():
            suma += self.BGS(sportN)

        return suma

    def BGS(self, sportN : id) -> float:
        return self.DUMMY


c = Computations()
#print(c.importance(0,0))