import {useState} from "react";
import {useQuery} from "react-query";
import {ButtonGroup, Spinner, ToggleButton} from "react-bootstrap";
import Select from "react-select";
import {Table, TableRowsType, TableColumnNameType} from "../../components/table/Table";
import {Autocomplete, Box, TextField} from "@mui/material";

export const Prepojenie = () => {

    const [selectedType, setType] = useState<Intercon_type>( );
    const [rows, setRows] = useState<TableRowsType>([]);
    const [radioValue, setRadioValue] = useState('1');

    const radios = [
        { name: 'Table', value: '1' },
        { name: 'Map', value: '2' }
    ];



    const generateRows = () => {
        const _rows : TableRowsType = [];
        if ( selectedType != null ) {
            inter_all.map((inter) => {
                if (inter.type_id == selectedType.id) _rows.push([inter.id, inter.country1, inter.country2, inter.value])
            });
            setRows(_rows);
        }
    };
/*
            <Select
                id="Type"
                options={options}
                placeholder="Choose Type"
            />
 */

    const view = () => {
        if ( radioValue == '1'){
            return (
                <Table columnNames={tableColumn} rows ={rows} />
            )
        } else {
            return (
                <> MAPA </>
            )
        }
    }

    return (
        <div className='Intercon'>
            <header>
                <h1>Interconnectedness</h1>
            </header>



            <Autocomplete

                onChange={(event: any, newValue: Intercon_type | null) => {
                    if ( newValue != null ) {
                        setType(newValue);
                        generateRows();
                    }
                }}

                value={selectedType}
                id="states"
                getOptionLabel={(option) => option.title}
                options={country_options}
                sx={{ width: 300 }}

                renderOption={(props, option) => (
                    <Box component="li" {...props}>
                        {option.title}
                    </Box>
                )}

                renderInput={(value) => (
                    <TextField
                        {...value}
                        label="Type"
                    />
                )}
            />

            <ButtonGroup>
                {radios.map((radio, idx) => (
                    <ToggleButton
                        key={idx}
                        id={`radio-${idx}`}
                        type="radio"
                        variant={idx % 2 ? 'outline-success' : 'outline-danger'}
                        name="radio"
                        value={radio.value}
                        checked={radioValue === radio.value}
                        onChange={(e) => setRadioValue(e.currentTarget.value)}
                    >
                        {radio.name}
                    </ToggleButton>
                ))}
            </ButtonGroup>

            {view()}

        </div>
    )
}

interface Intercon_type {
    id: number,
    code: number,
    title: string
}


const options = [
    { value: 1, label: "Economic"},
    { value: 2, label: "Non-economic"},
    { value: 3, label: "Total" }
]

const country_options : Intercon_type[] = [
    { id : 1, code : 1, title : "Economic"},
    { id : 2, code : 2, title : "Non-economic"},
    { id : 3, code : 3, title : "Total"}

]


interface Intercon {
    id: number,
    country1: string,
    country2 : string,
    value : number,
    type_id : number
}


const inter_all  : Intercon[] = [
    { id : 1, country1 : "Slovakia", country2 : "USA", value : 0.1111, type_id : 1 },
    { id : 2, country1 : "Argentina", country2 : "Germany", value : 0.2222, type_id : 2 },
    { id : 3, country1 : "Poland", country2 : "Austria", value : 0.3333, type_id : 3}
]


const tableColumn : TableColumnNameType[] = [
    { name: "id", sortable: true},
    { name: "Country1", sortable: true},
    { name: "Country2", sortable: true},
    { name: "Value", sortable: true},
]
