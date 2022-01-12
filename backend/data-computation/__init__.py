PV1 = 0.5
PV2 = 0.16
PV3 = 0.34
PV4 = 2


class Computations:

    def importance(self, countryK : id, sportN : id):
        DUMMY = 0
        return DUMMY

    def norm_interconnectness(self, countryK : id, countryJ : id):
        ...

    def total_interconnectness(self, countryK : id, countryJ : id):
        ...

    def econ_interconnectness(self, countryK : id, countryJ : id):
        ...

    def nonecon_interconnectness(self, countryK : id, countryJ : id):
        ...

    def sport_importance_in_country(self, sportN : id, countryK : id):
        ...

    def norm_funding(self, sportN : id, countryK : id):
        ...

    def branch_funding(self, countryK : id, sportN : id, branchB : id):
        ...

    def combi_branch_funding(self, countryK : id, combiQ : id):
        ...

    def total_country_funding(self, countryK : id):
        ...

    def norm_success(self, sportN : id, countryK : id):
        ...

    def total_success(self, countryK : id):
        ...

    def success(self, sportN : id, countryK : id):
        ...

    def max_points(self, sportN : id):
        ...

    def num_countries_in_sport(self, sportN : id):
        ...

    def total_points(self, countryK : id):
        ...

    def min_order(self, countryK : id):
        ...

    def norm_BGS(self, sportN : id):
        ...

    def total_BGS(self):
        ...

    def BGS(self, countryN : id):
        ...