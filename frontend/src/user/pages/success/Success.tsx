import React, {useEffect, useState} from "react";
import {useMutation, useQuery} from "react-query";
import {apiListCountry, apiListSuccess, apiSuccess, countryType, successType} from "../../adapters";
import {Button, Form, Spinner} from "react-bootstrap";
import Select from "react-select";
import {Table} from "../../../components/table/Table";
import {CSVLink} from "react-csv";
import {Download} from "react-bootstrap-icons";

export const Success = () => {
    const [countries, setCountry] = useState<countryType[]>();

    useQuery("list_countries2", apiListCountry, {
        onSuccess: (response) => {
            const serverData = response.data.data;
            setCountry(serverData.countries);

        },
        onError: (error) => {
            alert(error);
        }
    })




    const [successes, setSuccess] = useState<successType[]>();
    const [rowSuccess, setRowSuccess] = useState<(number | string)[][]>([]);

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



    const [option, setOption] = useState<string[]>(["SVK","SLOVAKIA"]);


    const { mutateAsync: asyncSuccess } = useMutation(["setCountry", option],
        () => apiSuccess(option[0]),
        {
            onSuccess: (response) => {
                const serverData = response.data.data;
                setSuccess(serverData.success);
                setRowSuccess(serverData.success.map((s) => [s.sport_name, s.points, s.order]))
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
            <h1>Success</h1>
            <div>

                <Form.Label>Country</Form.Label>
                <Select
                    id="country"
                    options={options}
                    placeholder="Choose country"
                    onChange={ (selectedOption) => {
                        if (selectedOption !== null)
                            setOption([selectedOption.value, selectedOption.label]) }}
                />
                <h4>  You can see results for chosen country <b>{option[1]} :</b> </h4>
                <Button variant="primary"><CSVLink className='button' filename={"success"+option[1]} data={rowSuccess}><Download size={25} /> Export data</CSVLink></Button>{' '}
            </div>
            {isLoading
                ? <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>


                :
                <div>
                    <Table columnNames={[{name: "Sport", sortable: true}, {name: "Points", sortable: true}, {
                        name: "Order",
                        sortable: true
                    }]}
                           rows={rowSuccess}/>

                </div>

            }

        </>
    )
}