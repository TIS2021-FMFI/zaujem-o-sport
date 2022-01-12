import React, {useState} from "react";
import {Button, Col, FloatingLabel, Form, Row} from "react-bootstrap";


export const AddSport = () => {

  // TODO: get new code from the backend
  const [newSportCode, setNewSportCode] = useState<number>(108);

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: backend call
  }

  return(<>
    <header>
      <h1>Pridanie nového športu</h1>
    </header>
    <section>
      <Row>
        <Col lg={6} md={7}>
          <Form onSubmit={submitForm}>

            <Form.Group as={Row} className="mb-4" controlId="formHorizontalSportCode">
              <Col>
                <FloatingLabel controlId="floatingSportCode" label="Nový kód športu">
                  <Form.Control type="text"
                                placeholder="Nový kód športu"
                                defaultValue={newSportCode.toString()}
                                disabled />
                </FloatingLabel>
                <Form.Text className="text-muted">
                  Kód bol automaticky vygenerovaný systémom.
                </Form.Text>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-4" controlId="formHorizontalSportName">
              <Col>
                <FloatingLabel controlId="floatingSportName" label="Názov športu">
                  <Form.Control type="text" placeholder="Názov športu" />
                </FloatingLabel>
              </Col>
            </Form.Group>

            <Button className={`mt-4`} variant="primary" type="submit">
              Pridať nový šport
            </Button>
          </Form>
        </Col>
      </Row>
    </section>
  </>)
}