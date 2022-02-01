import React, {useContext, useState} from "react";
import {Button, Col, FloatingLabel, Form, Row} from "react-bootstrap";
import {useMutationWithNotifications} from "app/hooks";
import {useNewSportCode} from "admin_secretary_shared/hooks";
import {CenteredRow} from "components/basic/CenteredRow";
import {apiAddNewSport} from "admin_secretary_shared/adapters";
import textLang, {Language} from "app/string";
import {LanguageContext} from "App";

export const AddSport = () => {

  const language = useContext<Language>(LanguageContext);
  const text = textLang[language];

  const {newSportCode} = useNewSportCode(language);
  const [sportTitle, setSportTitle] = useState<string>("");
  const addNewSportMutation = useMutationWithNotifications(
    "adding_new_sport", apiAddNewSport, text.addNewSportInitToastMsg, language
  );

  const handleAddNewSportSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addNewSportMutation.mutate({sportCode: newSportCode, sportTitle: sportTitle});
  }

  return(<>
    <CenteredRow as="header" lg={6} md={7}>
      <h1>{text.addSportHeader}</h1>
    </CenteredRow>
    <CenteredRow as="section" className="mb-3" lg={6} md={7}>
      <Form onSubmit={handleAddNewSportSubmit}>
        <Form.Group as={Row} className="mb-4" controlId="formHorizontalSportCode">
          <Col>
            <FloatingLabel controlId="floatingSportCode" label={text.newSportCodeInputPlaceholder}>
              <Form.Control type="text"
                            placeholder={text.newSportCodeInputPlaceholder}
                            defaultValue={newSportCode.toString()}
                            disabled />
            </FloatingLabel>
            <Form.Text className="text-muted">
              {text.autoGeneratedCode}
            </Form.Text>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-4" controlId="formHorizontalSportName">
          <Col>
            <FloatingLabel controlId="floatingSportName" label={text.sportTitleInputPlaceholder}>
              <Form.Control type="text" placeholder={text.sportTitleInputPlaceholder}
                            required
                            onChange={(e) => setSportTitle(e.target.value)}
              />
            </FloatingLabel>
          </Col>
        </Form.Group>
        <Button className={`mt-3`} variant="primary" type="submit">
          {text.addNewSport}
        </Button>
      </Form>
    </CenteredRow>
  </>)
}