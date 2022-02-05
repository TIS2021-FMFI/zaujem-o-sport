import React, {useEffect, useState} from "react";
import {useMutation, useQuery} from "react-query";
import {
    apiFunding,
    apiListFunding,
    fundingType

} from "../../adapters";
import {Button, Form, Spinner} from "react-bootstrap";
import Select from "react-select";
import {Table} from "../../../components/table/Table";
import {CSVLink} from "react-csv";
import {Download} from "react-bootstrap-icons";
import {useCountries} from "../../../app/hooks";
import {Info} from "../../components/info/Info";
import {ChoiceState} from "../../components/choicestate/ChoiceState";

export const Fundings = () => {
    
    const {countries} = useCountries("en");

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



    const [option, setOption] = useState<string[]>(["",""]);


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
            <header><h1 className="mt-3 mb-4"> Fundings <Info label="What is Ranking" input="
            On this page, after selecting a country, it is displayed as a given funding between individual sports.
            The branches the columns will be: name of the sport,  amount (money) in the local currency of the given country and currency"/></h1></header>

            <div>

                <Form.Label><h4>Country</h4></Form.Label>

                <Select
                    id="country"
                    options={options}
                    placeholder="Choose country"
                    onChange={ (selectedOption) => {
                        if (selectedOption !== null)
                            setOption([selectedOption.value, selectedOption.label])
                            }}
                />

                <ChoiceState state={option[1]} />

                <Button variant="outline-primary mt-md-2 mb-md-2"><CSVLink className='button' filename={"funding"+option[1]} data={rowFundings}><Download size={25} /> Export data</CSVLink></Button>{' '}




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