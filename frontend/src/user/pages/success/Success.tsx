import React, {useEffect, useState} from "react";
import {useMutation, useQuery} from "react-query";
import {apiListCountry, apiListSuccess, apiSuccess, countryType, successType} from "../../adapters";
import {Form, Spinner} from "react-bootstrap";
import Select from "react-select";

export const Success = () => {
    const [countries, setCountry] = useState<countryType[]>();

    useQuery("list_countries2", apiListCountry, {
        onSuccess: (response) => {
            const serverData = response.data.data;
            setCountry(serverData.countries);

        },
        onError: (error) => {
        }
    })




    const [successes, setSuccess] = useState<successType[]>();

    const {isLoading} = useQuery("list_success", apiListSuccess, {
        onSuccess: (response) => {
            const serverData = response.data.data;
            setSuccess(serverData.success);

        },
        onError: (error) => {

        }
    })

    let options = countries?.map(d => ({
        "value": d.code,
        "label" : d.name
    }))



    const [option, setOption] = useState<string>("SVK");


    const { mutateAsync: asyncSuccess } = useMutation(["setCountry", option],
        () => apiSuccess(option),
        {
            onSuccess: (response) => {
                const serverData = response.data.data;
                setSuccess(serverData.success);
            },
            onError: (error) => {
                console.log(error);
            }
        }
    );


    useEffect(() => {
        asyncSuccess();

    }, [option]);


    return (
        <>
            <h1>Úspešnosť</h1>
            <div>np

                <Form.Label>Krajina</Form.Label>
                <Select
                    id="country"
                    options={options}
                    placeholder="Zvoľte krajinu"
                    onChange={ (selectedOption) => {
                        if (selectedOption !== null)
                            setOption(selectedOption.value) }}
                />



                <table className = 'tabulka'>
                    <tr>
                        <th>Názov</th>
                        <th>Body</th>
                        <th>Poradie</th>
                    </tr>
                </table>
            </div>
            { isLoading
                ? <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>

                : successes?.map((success, i) => { return (


                    <table key={`success-${i}`} className = 'tabulka'>
                        <tr>
                            <td>{success.sport_name}</td>
                            <td>{success.points}</td>
                            <td>{success.order}</td>
                        </tr>
                    </table>
                )})}



        </>
    )
}