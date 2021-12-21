import React, {useState} from "react";
import {Button, Col, FloatingLabel, Form, Row} from "react-bootstrap";


export const AddBranch = () => {

	// TODO: get new code from the backend
	const [newBranchCode, setNewBranchCode] = useState<number>(1826);

	const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// TODO: backend call
	}

	return(<>
		<header>
			<h1>Pridanie nového odvetia</h1>
		</header>
		<section>
			<Row>
				<Col lg={6} md={7}>
					<Form onSubmit={submitForm}>

						<Form.Group as={Row} className="mb-4" controlId="formHorizontalEmail">
							<Col>
								<FloatingLabel controlId="floatingPassword" label="Kód športu">
									<Form.Control type="text" placeholder="Heslo" />
								</FloatingLabel>
							</Col>
						</Form.Group>

						<Form.Group className="mb-3" controlId="formBasicCheckbox">
							<Form.Check type="checkbox" label="Kombinované" />
						</Form.Group>

						<Button className={`mt-4`} variant="primary" type="submit">
							Pridať nové odvetie
						</Button>
					</Form>
				</Col>
			</Row>
		</section>
	</>)
}