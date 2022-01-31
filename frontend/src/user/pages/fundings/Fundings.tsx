import React, {useEffect, useState} from "react";
import {useMutation, useQuery} from "react-query";
import {
    apiFunding,
    apiListCountry,
    apiListFunding,
    countryType,
    fundingType

} from "../../adapters";
import {Button, Form, Spinner} from "react-bootstrap";
import Select from "react-select";
import {Table} from "../../../components/table/Table";
import {CSVLink} from "react-csv";
import {Download} from "react-bootstrap-icons";

export const Fundings = () => {
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




    const [fundings, setFunding] = useState<fundingType[]>();
    const [rowFundings, setRowFunding] = useState<(number | string)[][]>([]);
    const {isLoading} = useQuery("list_funding", apiListFunding, {
        onSuccess: (response) => {
            const serverData = response.data.data;
            setFunding(serverData.funding);


        },
        onError: (error) => {
            alert(error);
        }
    })

    let options = countries?.map(d => ({
        "value": d.code,
        "label" : d.name
    }))



    const [option, setOption] = useState<string[]>(["SVK","SLOVAKIA"]);


    const { mutateAsync: asyncFunding } = useMutation(["setCountry", option],
        () => apiFunding(option[0]),
        {
            onSuccess: (response) => {
                const serverData = response.data.data;
                setFunding(serverData.funding);
                setRowFunding((serverData.funding.map((f) => [f.branch_id, f.absolute_funding, f.currency])));
            },
            onError: (error) => {
                console.log(error);
            }
        }
    );


    useEffect(() => {
        asyncFunding();

    }, [option]);


    return (
        <>
            <h1>Fundings
            </h1>
            <div>

                <Form.Label>Country</Form.Label>

                <Select
                    id="country"
                    options={options}
                    placeholder="Choose country"
                    onChange={ (selectedOption) => {
                        if (selectedOption !== null)
                            setOption([selectedOption.value, selectedOption.label])
                            }}
                />

              <h4>  You can see results for chosen country <b>{option[1]} :</b> </h4>
                <Button variant="primary"><CSVLink className='button' filename={"funding"+option[1]} data={rowFundings}><Download size={25} /> Export data</CSVLink></Button>{' '}



            </div>
            {isLoading
                ? <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>

                :
                <div>
                    <Table columnNames={[{name: "Sport", sortable: true}, {name: "Amount", sortable: true}, {
                        name: "Currency", sortable: true
                    }]}
                           rows={rowFundings}/>

                </div>

            }

        </>
    )
}