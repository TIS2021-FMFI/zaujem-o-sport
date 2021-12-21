
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

function Success(){

    return (<>
        <header>
            <h1>Úspešnosť športov v krajinách</h1>
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

    </>
)
}
export default Success;