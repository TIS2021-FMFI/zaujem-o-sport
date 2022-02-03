import React, {useEffect, useState} from "react";
import {
    apiInterconnectness,
    apiListInterconnectness,
    interconnectnessType



} from "../../adapters";
import {useMutation, useQuery} from "react-query";
import {Button, Form, Spinner} from "react-bootstrap";
import Select from "react-select";
import {MapShow} from "../../components/map/Map";
import {CSVLink} from "react-csv";
import {Download} from "react-bootstrap-icons";
import {useCountries} from "../../../app/hooks";
import {useInterconnectednessType} from "../../hooks";


export const InterconnectnessMap = () => {

    const {countries} = useCountries("en");

    const {interconnectednessType} = useInterconnectednessType("en");

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

    let options2 = interconnectednessType?.map(d => ({
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
            <h5><b>Map</b> is chosen</h5>
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
            { isLoading
                ? <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>

                :interconnectnesses !== undefined &&
                <MapShow input={interconnectnesses.map((interconnectness) => { return (
                    {code: interconnectness.code , value: interconnectness.value}


                )})} />



                }




        </>
    )

}