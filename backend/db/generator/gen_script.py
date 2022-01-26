import xlrd

heslo1, heslo2 = '9b1ucrgk3lha7fviin652dlshkklv3xk', 'xlg3yj1tlkf2d902dp80dgg1v5gqpaa6'
hash1 = 'c7656114487fd2aa9b04a8e84a0990290b7cfe5102fc68d7ab385e3893dce0736db4ade885158aa04b8da66931af132f38b7eba714941367452cd8c6f8c9d94333813aa694970907ee5b13d8a149e3e280057154b1bca10c08cac1becdd415691afa3eca8a7851985a148bb9268f0f4a3d54a0ef50d493479faa239ec1ac916c2fc2bac252515779ffca59f2a6cebef8bd2328deaaedb052ee2d854b901ac909'
hash2 = 'cffb56d78ec5b2b57ae2fa2813f8737cf5503597c855c02ea1839112a4a2a9b63eec7f332a486080ff7814242a0d0c76c67a450819ea521d46817a476c8aefe2b08a560316d6c4ba9a89ccaa72cae95d45e80f3245a0bd275ee7e599d22fd3db6a69dc18fa997fd8119466f9068bae8a3f69deb68024239442ddd3a0c6c7452a29dcd67c3a030c0c9057a3bf3ba0ad420163b3ca9f892d6d8f2a2583bdbe49a4'



class Prekladac(dict): #https://stackoverflow.com/questions/1456373/two-way-reverse-map ;) 
    def __setitem__(self, key, value):
        # Remove any previous connections with these values
        if key in self:
            del self[key]
        if value in self:
            del self[value]
        dict.__setitem__(self, key, value)
        dict.__setitem__(self, value, key)

    def __delitem__(self, key):
        dict.__delitem__(self, self[key])
        dict.__delitem__(self, key)

    def __len__(self):
        """Returns the number of connections"""
        return dict.__len__(self) // 2


class Sport:
    def __init__(self, _id, _name, _code = 'NULL' ):
        self.id = int(_id)
        self.name = _name
        self.code = int(_code)


    def __repr__(self):
        name_ = self.name.replace('/', ' AND ')
        return f"( '{name_}', {self.code} )"

class Country:
     def __init__(self, _id, _name, _active, _translation, _code = 'NULL' ):
        self.id = int(_id)
        self.name = _name.strip().replace("'", " ")
        self.code = str(_code)
        self.active = str(_active).lower()
        self.translation = _translation

     def __repr__(self):
        active = str(self.active).upper()
        return f"( '{self.name}', {active}, '{self.translation}', '{self.code}' )" 


class Branch:
     def __init__(self, _id, _code, _name, _combined, _sport_id="NULL", _country_id="NULL" ):
        self.id = int(_id)
        self.code = int(_code)
        self.name = _name.strip()
        self.combined = _combined
        self.sport_id = _sport_id
        self.country_id =  _country_id

     def __repr__(self):
        name_ = self.name.replace('/', ' AND ')
        return f"( {self.code}, '{name_}', {str(self.combined).upper()}, {self.sport_id}, {self.country_id} )" 



preklad =  Prekladac()
countries = {} # name  : Country


def parse_country():
    sheet = xlrd.open_workbook("preklad krajin .xlsx").sheet_by_index(0)

    actives = set() 
    for i in range(0,51):
        actives.add(sheet.cell_value(i,5))
    #print(len(actives))

    for i in range(0,250):
        transl = sheet.cell_value(i,0)
        name = sheet.cell_value(i,1)
        preklad[transl] = name
        kod = sheet.cell_value(i,2)
        
        active = name in actives
        countries[name] = Country( len(countries)+1, name, active, transl, kod )

    print("Country done")

sports = {}  # name : Sport
def parse_sport():
    sheet = xlrd.open_workbook("Zahranicny_zaujem_sport_2021.xlsx").sheet_by_index(2)
    for i in *range(6,359), *range(398,502):
        name = sheet.cell_value(i,1)
        kod = sheet.cell_value(i,0)
        if name not in sports and kod != "" and name != "" :
            #print(name, kod)
            #sports[name] = Sport(kod, name, kod) :):):):):):):):):)
            sports[name] = Sport( len(sports)+1 , name, len(sports)+1)
    print("Sport done")

succes = []

def parse_succes():
    '''
    book = xlrd.open_workbook("ALL SPORTS RANKING.xlsx")
    for index in range(3):
        sheet = book.sheet_by_index(index)

        i = 1
        try:
            while sheet.cell_value(1,i) != "":
                sport = sheet.cell_value(1,i)
                if sport not in sports:
                    sports[sport] = Sport( len(sports)+1 , sport, len(sports)+1)
                
                sp_id = sports[sport].id
                j = 3
                
                try:
                    while sheet.cell_value(j,i) != "":
                        country = sheet.cell_value(j,i)
                        if country not in countries:
                            ine.add(country)
                            co_id = 0
                        else:
                            co_id = countries[country].id
                        succes.append( ( sp_id, co_id, round(sheet.cell_value(j,i+1),2), int(sheet.cell_value(j,i-1)) ))
                        j += 1
                except:
                    pass
                i += 4
        except Exception as e:
            if type(e) == IndexError:
                pass
            else:
                print(e)
    '''

    sheet1 = xlrd.open_workbook("Zahranicny_zaujem_sport_2021.xlsx").sheet_by_index(20)
    sheet2 = xlrd.open_workbook("Zahranicny_zaujem_sport_2021.xlsx").sheet_by_index(21)
    
    for i in range(5,56):
        country_id = countries[preklad[sheet1.cell_value(i,0)]].id
        for j in range(1,112):
            sport = sheet1.cell_value(0,j)
            if sport not in sports:
                sports[sport] = Sport( len(sports)+1 , sport, len(sports)+1)
            sport_id = sports[sport].id
            body = sheet1.cell_value(i,j)
            if body > 0:
                poradie = sheet2.cell_value(i,j)

                succes.append( ( sport_id, country_id, round(body,2), poradie ) ) 
            
    print("Succes done")

branches = {}  
def parse_branch():
    def code_gen( sport_id ):
        def x(  branch, sport_id  ):
            if branch.sport_id == sport_id:
                return 1
            return 0
        return sum ( map( lambda p: x(p, sport_id), branches.values())) + 1
               
    sheet = xlrd.open_workbook("Zahranicny_zaujem_sport_2021.xlsx").sheet_by_index(2)
    for i in *range(5,359), *range(398,502):
        branch = sheet.cell_value(i,3)
        if branch == "" or type(sheet.cell_value(i,0)) != float or "Total" in branch  :
            continue

        sport = sheet.cell_value(i,1)
        
        sport_id = sports[sport].id
        br_code = code_gen(sport_id)
        br_id = len(branches)+1
        branch_key = branch
        if branch in branches:
            i = 1
            while branch_key in branches:
                branch_key = branch + str(i)
                i += 1
 
        branches[branch_key] = Branch( br_id, br_code, branch, False, sport_id) 
        
        for j in range(5,56):
            #print(i,j)
            if sheet.cell_value(i,j) != "" and type(sheet.cell_value(i,j)) == float :
                
                if sheet.cell_value(i,j) > 0 :

                    krajina = sheet.cell_value(0,j)
                    krajina_id = countries[preklad[krajina]].id
                #print([krajina, branch,  sheet.cell_value(498,j) , sheet.cell_value(i,j), sheet.cell_value(2,j)], i,j)
                    funding.append( (krajina_id, br_id,  sheet.cell_value(i,j)/sheet.cell_value(503,j) , sheet.cell_value(i,j), sheet.cell_value(2,j)))

    print("Branches done")

cm_branches = [] 
combi = []
funding = []

def parse_combi(): 
    sheet1 = xlrd.open_workbook("Zahranicny_zaujem_sport_2021.xlsx").sheet_by_index(1) #Parametre
    sheet2 = xlrd.open_workbook("Zahranicny_zaujem_sport_2021.xlsx").sheet_by_index(2) #Zahr. fin.

    for i in range(0, 36):
        tmp = []
        index = 3
        while sheet1.cell_value(12 + i,index) != '' and type(sheet1.cell_value(12 +i,index)) == str:
            #print(sheet1.cell_value(12 + i,index))
            branch_id = branches[sheet1.cell_value(12 +i,index)].id
            coef = sheet1.cell_value(12 +i,index+1)
            if coef > 0:
                tmp.append([ branch_id, coef ] ) 
            index += 2
            
        name = sheet2.cell_value(360+i,1)
        if "(" in name:
            name = name[:name.find('(')]

        for j in range(5,56):
            if sheet2.cell_value(360+i,j) != "" and sheet2.cell_value(360+i,j) > 0:
                krajina = sheet2.cell_value(0,j)
                krajina_id = countries[preklad[krajina]].id
                br_id = 10000 + len(cm_branches) + 1
                cm_branches.append( Branch( br_id, br_id, name, True, 'NULL', krajina_id) )
                for x in tmp:
                    combi.append( tuple([br_id] + x) )
                funding.append( (krajina_id, br_id,  sheet2.cell_value(360+i,j)/sheet2.cell_value(503,j) , sheet2.cell_value(360+i,j), sheet2.cell_value(2,j)))
    print("Combi done")


    
previazanost = []
def parse_inter():
    sheet1 = xlrd.open_workbook("Zahranicny_zaujem_sport_2021.xlsx").sheet_by_index(11)# Ekonomicka
    sheet2 = xlrd.open_workbook("Zahranicny_zaujem_sport_2021.xlsx").sheet_by_index(17)# Neekonomicka
    

##    sheet1 = xlrd.open_workbook("Zahranicny_zaujem_sport_2021.xlsx").sheet_by_index(7) #Export
##    sheet2 = xlrd.open_workbook("Zahranicny_zaujem_sport_2021.xlsx").sheet_by_index(8) #Import
##    sheet3 = xlrd.open_workbook("Zahranicny_zaujem_sport_2021.xlsx").sheet_by_index(12) #Vzdialenost
##    sheet4 = xlrd.open_workbook("Zahranicny_zaujem_sport_2021.xlsx").sheet_by_index(13) #Susedne
##    sheet5 = xlrd.open_workbook("Zahranicny_zaujem_sport_2021.xlsx").sheet_by_index(14) #Jazyk
##    sheet6 = xlrd.open_workbook("Zahranicny_zaujem_sport_2021.xlsx").sheet_by_index(15) #Etnuikum
    
    
    for i in range(1,52):
        for j in range(1,52):
            if i == j:
                continue
            if sheet1.cell_value(i,j) != 0:
                previazanost.append( ( 1, countries[preklad[sheet1.cell_value(i,0)]].id, countries[preklad[sheet1.cell_value(0,j)]].id, round(sheet1.cell_value(i,j),4) ))
            if sheet2.cell_value(i,j) != 0:
                previazanost.append( ( 2, countries[preklad[sheet2.cell_value(i,0)]].id, countries[preklad[sheet2.cell_value(0,j)]].id, round(sheet2.cell_value(i,j),4) ))
    print("Interconnectedness done")
    

bgs = []
def parse_bgs():
    sheet1 = xlrd.open_workbook("Zahranicny_zaujem_sport_2021.xlsx").sheet_by_index(29)
    for i in range(2,118):
        sport = sheet1.cell_value(i,1)
        sport_id = sports[sport].id
        v = sheet1.cell_value(i,3)
        if v == "":
            value = 0
        else:
            value = int(v)
        bgs.append( ( sport_id , value ) )

    print("BGS done")

def zapis_succ(meno_suboru):
    parse_country()     
    parse_sport()
    parse_branch()
    parse_combi()
    parse_succes()
    parse_inter()
    parse_bgs()
    with open(f'{meno_suboru}.txt', 'w', encoding="utf-8") as subor:


        #SPORT
        subor.write("INSERT INTO sport ( title, code ) \n VALUES \n")
        x = list(sports.values())
        for sport in x:
             if sport == x[-1]:
                subor.write(f" {sport} ;\n")
             else:
                subor.write(f" {sport} ,\n")

        #COUNTRY
        subor.write("INSERT INTO country ( name , is_active, translation, code ) \n VALUES \n")
        x = list(countries.values())
        for country in x:
             if country == x[-1]:
                subor.write(f" {country} ;\n")
             else:
                subor.write(f" {country} ,\n")

        #BRANCH {self.id}, {self.code}, {self.name}, {self.combined}, {self.sport_id}, {self.country_id}
        subor.write("INSERT INTO branch (  code , title, is_combined, sport_id, country_id ) \n VALUES \n")
        x = list(branches.values())
        for branch in x:
             if branch == x[-1]:
                subor.write(f" {branch} ;\n")
             else:
                subor.write(f" {branch} ,\n")

        subor.write("INSERT INTO branch ( id, code , title, is_combined, sport_id, country_id ) \n VALUES \n")
        for branch in cm_branches:
            _id = str(branch.id) + ", "
            if branch == cm_branches[-1]:
                subor.write(f" ( {str(branch).replace('(', _id )} ;\n")
            else:
                subor.write(f" ( {str(branch).replace('(', _id )} ,\n")

        #COMBI
        subor.write("INSERT INTO combi_branch (  combi_branch_id , subbranch_id, coefficient) \n VALUES \n")
        for cb in combi:
            if cb == combi[-1]:
                subor.write(f" {cb} ;\n")
            else:
                subor.write(f" {cb} ,\n")
            
        
        #SUCCES sp_id, co_id, sheet.cell_value(j,i+1)
        subor.write("INSERT INTO success ( sport_id, country_id, points, orders  ) \n VALUES \n ")
        for s in succes:
            if s == succes[-1]:
                subor.write(f"{s} ;\n")
            else:
                subor.write(f" {s},\n")


        #Funding 
        subor.write("INSERT INTO funding ( country_id, branch_id, relative_funding, absolute_funding, currency  ) \n VALUES \n ")
        for f in funding:
            #print(f)
            if f == funding[-1]:
                subor.write(f"{f} ;\n")
            else:
                subor.write(f"{f},\n")

        #User
        subor.write("INSERT INTO users ( email, password, type ) \n VALUES \n ")
        subor.write(f"( 'Admin22@gmail.com', '{hash1}', 'admin' ),  \n ")
        subor.write(f"( 'Secretary1@gmail.com', '{hash2}', 'secretary' ),  \n ")
        subor.write(f"( 'secretary@uniba.sk', '{hash1}', 'secretary' );  \n ")
        #Inter_type

    
        subor.write("INSERT INTO interconnectness_type (  code, title ) \n VALUES \n ")
        subor.write("(  1, 'Economic' ),  \n ")
        subor.write("(  2, 'Non-economic' ); \n ")


        #Interconengfklhbdjhk...
        subor.write("INSERT INTO interconnectness ( type_id, country_one_id, country_two_id, value  ) \n VALUES \n ")
        for p in previazanost:
            if p == previazanost[-1]:
                subor.write(f"{p} ;\n")
            else:
                subor.write(f"{p},\n")
        
        #Parametre
        sheet = xlrd.open_workbook("Zahranicny_zaujem_sport_2021.xlsx").sheet_by_index(1)
        subor.write("INSERT INTO parameter ( code, title, value  ) \n VALUES \n ")
        
        for i in [ 1,2,3,5,6,7 ]:
            subor.write(f"( {i}, '{sheet.cell_value(i,1)}' , {sheet.cell_value(i,0)}),  \n ")
        subor.write(f"( 8, '{sheet.cell_value(8,1)}' , {sheet.cell_value(8,0)});  \n " )  


        #BGS
        subor.write("INSERT INTO BGS ( sport_id, value ) \n VALUES \n ")
        for item in bgs:
            if item == bgs[-1]:
                subor.write(f"{item} ;\n")
            else:
                subor.write(f"{item},\n") 

            
    print("hotovo")


zapis_succ("test")


