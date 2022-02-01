import React, {useEffect, useState} from "react";
import {
    apiInterconnectness,
    apiListCountry, apiListInterconnectness, apiListInterconnectnessType,

    countryType,
    interconnectnessType, interconnectnessTypeType,


} from "../../adapters";
import {useMutation, useQuery} from "react-query";
import {Button, Form, Spinner} from "react-bootstrap";
import Select from "react-select";
import {Table} from "../../../components/table/Table";
import {CSVLink} from "react-csv";
import {Download} from "react-bootstrap-icons";


export const InterconnectnessTable = () => {

    const [countries, setCountry] = useState<countryType[]>();

    useQuery("list_countries2", apiListCountry, {
        onSuccess: (response) => {
            setCountry(response.data.countries);
        },
        onError: (error) => {
            alert(error);
        }
    })

    const [interconnectnesstype, setInterconnectesstype] = useState<interconnectnessTypeType[]>();

    useQuery("list_interconnectnesstype", apiListInterconnectnessType, {
        onSuccess: (response) => {
            const serverData = response.data.data;
            setInterconnectesstype(serverData.interconnectnesstype);

        },
        onError: (error) => {
            alert(error);
        }
    })








    const [interconnectnesses, setInterconnectness] = useState<interconnectnessType[]>();

    const {isLoading} = useQuery("list_interconnectness", apiListInterconnectness, {
        onSuccess: (response) => {
            const serverData = response.data.data;
            setInterconnectness(serverData.interconnectness);

        },
        onError: (error) => {
            alert(error);
        }
    })

    let options = countries?.map(d => ({
        "value": d.code,
        "label" : d.name
    }))

    let options2 = interconnectnesstype?.map(d => ({
        "value": d.code,
        "label" : d.title
    }))






    const [option, setOption] = useState<string>("SVK");
    const [option2, setOption2] = useState<number>(1);
    const [rowInterconnectness, setRowInterconnectness] = useState<(number | string)[][]>([]);

    const { mutateAsync: asyncInterconnectness } = useMutation(["setCountry", option, option2],
        () => apiInterconnectness(option2,option),
        {
            onSuccess: (response) => {
                const serverData = response.data.data;
                setInterconnectness(serverData.interconnectness);
                setRowInterconnectness(serverData.interconnectness.map((i) => [i.code, i.country, i.value, i.type]))
            },
            onError: (error) => {
                console.log(error);
            }
        }
    );


    useEffect(() => {
        asyncInterconnectness();

    }, [option,option2]);


    return (
        <>
            <h5><b>Table</b> is chosen</h5>
            <div>

                <Form.Label>Country</Form.Label>
                <Select
                    id="setcountry"
                    options={options}
                    placeholder="Choose country"
                    onChange={ (selectedOption) => {
                        if (selectedOption !== null)
                            setOption(selectedOption.value) }}
                />

                <Form.Label>Interconnectedness type</Form.Label>
                <Select
                    id="setinterconnectness"
                    options={options2}
                    placeholder="Choose interconnectedness type"
                    onChange={ (selectedOption) => {
                        if (selectedOption !== null)
                            setOption2(selectedOption.value) }}
                />

                <Button variant="primary"><CSVLink className='button' filename={"interconnectedness"+option} data={rowInterconnectness}><Download size={25} />Export data</CSVLink></Button>{' '}

            </div>
            {isLoading
                ? <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>

                :
                <div>
                    <Table columnNames={[{name: "Code", sortable: true}, {name: "Country", sortable: true}, {
                        name: "Value", sortable: true}, {name: "Type", sortable: true }]}
                           rows={rowInterconnectness}/>

                </div>

            }



        </>
    )

}