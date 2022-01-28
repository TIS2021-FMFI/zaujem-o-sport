import React, {useState} from "react";
import {Button, Col, FloatingLabel, Form, Row} from "react-bootstrap";
import { useNewSportCode} from "app/hooks";
import {CenteredRow} from "components/basic/CenteredRow";


export const AddSport = () => {

  const {newSportCode} = useNewSportCode();

  const [sportTitle, setSportTitle] = useState<string>("");

  const handleAddNewSportSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: api call

  }

  return(<>
    <CenteredRow as="header" lg={6} md={7}>
      <h1>Pridanie nového športu</h1>
    </CenteredRow>
    <CenteredRow as="section" className="mb-3" lg={6} md={7}>
      <Form onSubmit={handleAddNewSportSubmit}>
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
              <Form.Control type="text" placeholder="Názov športu"
                            required
                            onChange={(e) => setSportTitle(e.target.value)}
              />
            </FloatingLabel>
          </Col>
        </Form.Group>
        <Button className={`mt-3`} variant="primary" type="submit">
          Pridať nový šport
        </Button>
      </Form>
    </CenteredRow>
  </>)
}