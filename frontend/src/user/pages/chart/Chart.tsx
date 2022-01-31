import React, {useEffect, useState} from "react";
import {useMutation, useQuery} from "react-query";
import {
    apiChart,
    apiListChart,
    apiListCountry,
    chartType,
    countryType
} from "../../adapters";
import {Button, Form, Spinner} from "react-bootstrap";
import Select from "react-select";
import {Table} from "../../../components/table/Table";
import {CSVLink} from "react-csv";
import {Download} from "react-bootstrap-icons";

export const Chart = () => {
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




    const [charts, setChart] = useState<chartType[]>();
    const [rowChart, setRowChart] = useState<(number | string)[][]>([]);

    const {isLoading} = useQuery("list_chart", apiListChart, {
        onSuccess: (response) => {
            const serverData = response.data.data;
            setChart(serverData.chart);

        },
        onError: (error) => {
            alert("psycopg2.pool.PoolError: connection pool exhausted")
        }
    })

    let options = countries?.map(d => ({
        "value": d.code,
        "label" : d.name
    }))



    const [option, setOption] = useState<string[]>(["SVK","SLOVAKIA"]);


    const { mutateAsync: asyncChart } = useMutation(["setCountry", option],
        () => apiChart(option[0]),
        {
            onSuccess: (response) => {
                const serverData = response.data.data;
                console.log(response)
                setChart(serverData.chart);
                setRowChart(serverData.chart.map((ch) => [ch.order,ch.title, ch.value, ch.code]))

            },
            onError: (error) => {
                console.log(error);
            }
        }
    );


    useEffect(() => {
        asyncChart();

    }, [option]);


    return (
        <>
            <h1>Chart</h1>
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
                <Button variant="primary"><CSVLink className='button' filename={"chart"+option[1]} data={rowChart}><Download size={25} /> Export data</CSVLink></Button>{' '}

            </div>
            { isLoading
                ? <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>


                :
                <div>
                    <Table columnNames={[{name: "Order", sortable: true},{name: "Sport", sortable: true}, {name: "Points", sortable: true}, {
                        name: "Code",
                        sortable: true
                    }]}
                           rows={rowChart}/>

                </div>


                }



        </>
    )
}