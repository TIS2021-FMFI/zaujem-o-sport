import React, {useState} from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {Table} from "../components/table/Table";
import {TableRowsType} from "../components/table/Table";
import {TableColumnNameType} from "../components/table/Table";
import Box from '@mui/material/Box';

export const Funding = () => {


    const [selectedState, setSelectedState] = useState<Country>( { id: 204, code: 'SVK', name: 'SLOVAKIA', translation : 'Slovensko', active : true});
    const [rows, setRows] = useState<TableRowsType>([]);



    const generateRows = () => {
        const _rows : TableRowsType = [];
        funds_all.map((fund) => {
            if (fund.country_id == selectedState.id ) _rows.push([fund.id, fund.branch, fund.absolute_funding , fund.currency])
        }) ;
        setRows(_rows);
    };



    return (
            <div className='Funding'>
                <Autocomplete

                    onChange={(event: any, newValue: Country | null) => {
                        if ( newValue != null ) {
                            setSelectedState(newValue);
                            generateRows();
                        }
                    }}

                    value={selectedState}
                    id="states"
                    getOptionLabel={(option) => option.name}
                    options={Country_options}
                    sx={{ width: 300 }}

                    renderOption={(props, option) => (
                        <Box component="li" {...props}>
                            {option.name} ({option.code})
                        </Box>
                    )}

                    renderInput={(value) => (
                        <TextField
                            {...value}
                            label="Choose a country"
                            inputProps={{
                                ...value.inputProps,
                                autoComplete: 'new-password',// disable autocomplete and autofill
                            }}
                        />
                    )}
                />

                <Table columnNames={tableColumn} rows ={rows} />
            </div>

    );
}

export default Funding;

const tableColumn : TableColumnNameType[] = [
    { name: "id", sortable: true},
    { name: "Sport", sortable: true},
    { name: "Ammount", sortable: true},
    { name: "Currency", sortable: true},
]



interface Country {
    id: number,
    code: string,
    name: string,
    translation : string,
    active : boolean
}

const Country_options : Country[] = [
    { id: 204, code: 'SVK', name: 'SLOVAKIA', translation : 'Slovensko', active : true},
    { id: 2, name:  'AUSTRIA', active : true , translation : 'Rakúsko',  code : 'AUT' },
    { id: 3,  name: 'ARGENTINA', active : true ,  translation : 'Argentína', code: 'ARG' } ,
    { id: 4, name : 'TONGA', active : false, translation : 'Tonga', code: 'TON' }
]



interface Fund {
    id: number,
    country_id : number,
    branch : string,
    absolute_funding : number,
    currency: string
}
const funds_all : Fund[] = [
{ id: 1,   country_id :204,branch : 'Strongman', absolute_funding : 9614.0,currency: 'EUR'},
{id : 2 , country_id :204, branch :'Archery', absolute_funding : 55000.0,currency: 'EUR'},
{ id : 3,  country_id :204,branch : 'Rowing', absolute_funding : 34085.0,currency: 'EUR'},
{id : 4,country_id :204, branch :'Sambo', absolute_funding : 1181000.0,currency: 'EUR'},
{ id : 5,country_id :2,branch : 'Croquet', absolute_funding : 36400.0,currency: '€ (Euro)'},
{id : 6,country_id :2,branch :'Canoeing', absolute_funding : 1200000.0, currency:'€ (Euro)'},
{id : 7,country_id :2,branch : 'Golf', absolute_funding : 500000.0,currency: '€ (Euro)'},
{ id : 8,country_id :2,branch : 'Badminton', absolute_funding : 115749.0, currency:'€ (Euro)'},
{id : 9,country_id :2, branch :'Strongman', absolute_funding : 160000.0,currency: '€ (Euro)'},
{ id : 10,country_id :3, branch :'Archery',absolute_funding : 123913.0, currency:'EUR'},
{ id : 11,country_id :3,branch : 'Croquet', absolute_funding : 42450000.0, currency:'USD'},
{ id : 12,country_id :3,branch : 'Rowing', absolute_funding : 462000.0, currency:'USD'},
{ id : 13 ,country_id :3, branch :'Sambo', absolute_funding : 761.0, currency:'USD'}
]