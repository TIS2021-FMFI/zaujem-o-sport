from settings import DB

class CompError(Exception):
    ...

class Computations:

    def __init__(self):

        self.PV1 = 0.5
        self.PV2 = 0.16
        self.PV3 = 0.34
        self.PV4 = 2

        # small db mirroring model will be initialize here
        #  local info from db which are frequently used in computations are stored in lists, maps
        self.BGS_data = DB.getBGS()
        self.order_data = DB.getOrder()
        self.points_data = DB.getPoints()
        self.max_points_data = DB.getMaxPoints()
        self.num_countries_in_sport_data = DB.getNumCountriesInSport()
        self.total_country_points_data = DB.getTotalCountryPoints()
        self.min_order_data = DB.getMinOrder()
        self.econ_interconnectness_data = DB.getEconIntercon()
        self.nonecon_interconnectness_data = DB.getNonEconIntercon()
        self.noncombi_funding_data = DB.getNonCombiBranchFunding()
        self.combi_funding = DB.getCombiFunding()

        self.country_data = DB.getActiveCountryIds()
        self.sport_data = DB.getSportIds()
        self.noncombi_branch_data = DB.getNonCombiBranchIds()

    def allActiveCountryIds(self) -> list:

        res = []

        for record in self.country_data:
            res.append(record["id"])

        return res

    def allBranchIds(self) -> list:

        res = []

        for item in self.noncombi_branch_data:
            res.append(item["id"])

        return res

    def allSportIds(self) -> list:

        res = []

        for record in self.sport_data:
            res.append(record["id"])

        return res

    def importance(self, countryK : id, sportN : id) -> float:
        suma = 0
        for countryJ in self.allActiveCountryIds():
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

        return self.econ_interconnectness_data[countryK][countryJ]

    def nonecon_interconnectness(self, countryK : id, countryJ : id) -> float:

        if countryK == countryJ:
            raise CompError("cannot compute nonecon interconectness for same countries")

        return self.nonecon_interconnectness_data[countryK][countryJ]

    def sport_importance_in_country(self, sportN : id, countryK : id) -> float:

        normFun = self.norm_funding(sportN, countryK)
        normSuc = self.norm_success(sportN, countryK)

        if normFun > 0:
            return (self.PV1 * normFun + self.PV2 * normSuc) / (self.PV1 + self.PV2)
        else:
            return normSuc

    def norm_funding(self, sportN : id, countryK : id) -> float:

        if self.total_country_funding(countryK) == 0:
            return 0

        suma = 0

        for branchB in self.allBranchIds():
            suma += self.total_branch_fundng(countryK, sportN, branchB) / self.total_country_funding(countryK)

        return suma

    def total_branch_fundng(self, countryK, sportN, branchB) -> float:

        res = self.branch_funding(countryK,sportN, branchB)

        try:
            data = self.combi_funding[countryK][branchB].items()
        except KeyError:
            data = []


        for combi, fund in data:
            res += fund

        return res

    def branch_funding(self, countryK : id, sportN : id, branchB : id) -> float:
        try:
            return self.noncombi_funding_data[countryK][sportN][branchB]
        except KeyError:
            return 0

    def total_country_funding(self, countryK : id) -> float:

        suma = 0

        for sportN in self.allSportIds():
            for branchB in self.allBranchIds():
                suma += self.total_branch_fundng(countryK, sportN, branchB)

        return suma

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
        try:
            return self.order_data[countryK][sportN]
        except:
            return 0

    def points(self, countryK : id, sportN : id) -> float:
        try:
            return self.points_data[countryK][sportN]
        except:
            return 0

    def max_points(self, sportN : id) -> float:
        return self.max_points_data[sportN]

    def num_countries_in_sport(self, sportN : id) -> float:
        return self.num_countries_in_sport_data[sportN]

    def total_points(self, countryK : id) -> float:
        return self.total_country_points_data[countryK]

    def min_order(self, countryK : id) -> float:
        return self.min_order_data[countryK]

    def norm_BGS(self, sportN : id) -> float:

        return self.BGS(sportN) / self.total_BGS()

    def total_BGS(self) -> float:

        suma = 0

        for sportN in self.allSportIds():
            suma += self.BGS(sportN)

        return suma

    def BGS(self, sportN : id) -> float:
        return self.BGS_data[id]


c = Computations()
#print(c.BGS_data)
#print(c.order(77,10)) # returns 3, correct
#print(c.points(77,10)) # returns 13549.68, correct
#print(c.max_points(56)) # returns 5500.2, correct
#print(c.num_countries_in_sport(194)) # returns 160, correct
#print(c.total_points(27)) # returns 19309.310000000005, correct
#print(c.econ_interconnectness(234, 237)) # returns 57109.0345, correct
#print(c.nonecon_interconnectness(160, 199)) # returns 0.0075, correct
#print(c.min_order(55)) # returns 56, correct
#print(c.allActiveCountryIds())
#print(c.allSportIds())

print(c.importance(204, 25))