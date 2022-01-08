import {useState} from "react";
import {useQuery} from "react-query";
import {apiListSports} from "components/adapters";
import {Spinner} from "react-bootstrap";
import {TableColumnNameType, Table, TableRowsType} from "components/table/Table";
import Select from "react-select";
import {Col, Row, Form, Button} from "react-bootstrap";

import React from "react";

const countries = [
    { value: "AFG", label: "Afganistan" },
    { value: "ALB", label: "Albania" },
    { value: "DZA", label: "Algeria" },
    { value: "AND", label: "Andorra"},
    { value: "AGO", label: "Anguilla" },
    { value: "AIA", label: "Antarctica" }
]

const handleSubmit = () => {
    ;
}

export const Uspesnost = () => {
    const [columnNames, setColumnsNames] = useState<TableColumnNameType[]>([]);
    const [successRows, setSuccessRows] = useState<TableRowsType>([]);

    const {isLoading} = useQuery("list_success", apiListSports, {
        onSuccess: (response) => {
            const serverData = response.data.data;
            setColumnsNames(
                serverData.columnNames.map( (colName) => {
                    return { name: colName, sortable: true }
                })
            );

            //setSuccessRows(serverData.success);


        },
        onError: (error) => {
        }
    });

    return (<>
            <header>
                <h1>Úspešnosť športov v krajinách</h1>
                <br></br>
                <h2>Vyberte krajinu</h2>
            </header>
            <section>
                <Row>
                    <Col lg={5} md={6} sm={8} xs={12}>
                        <Form.Label>Krajina</Form.Label>
                        <Select
                            id="country"
                            options={countries}
                            placeholder="Zvoľte krajinu"
                        />
                    </Col>
                </Row>
                <Row className={`mt-5`}>
                    <Col>

                    </Col>
                </Row>

            </section>
            <section>
                { isLoading
                    ? <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    :
                    <>
                        <Table columnNames={columnNames} rows={successRows} />
                    </>
                }
            </section>
            <br></br><br></br><br></br><br></br><br></br><br></br>

        </>
    )
}




