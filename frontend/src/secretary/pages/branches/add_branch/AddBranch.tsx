import React, {useEffect, useState} from "react";
import {Button, Col, FloatingLabel, Form, Row} from "react-bootstrap";
import Select from "react-select";
//import {useSports, useCountries, useNewBranchCode, useUncombiBrances} from "app/hooks";

interface SelectedOption {
	value: string,
	label: string
}

export const AddBranch = () => {

	const newBranchCode = 1024;

	/*
	const {newBranchCode} = useNewBranchCode();
	const {sports} = useSports();
	const {countries: responseCountries} = useCountries();
	const [countries, setCountries] = useState<{value: string, label: string}[]>([]);
	const {uncombiBranches} = useUncombiBrances();

	useEffect(() => {
		setCountries(responseCountries.map((country) => { return {
			value: country.code, label: `${country.name} (${country.code})`
		}}));
	}, [responseCountries]);

	 */

	const [checkedCombined, setCheckedCombined] = useState<boolean>(false);

	useEffect(() => {
		// TODO: maybe
	}, [checkedCombined]);

	const [selectedSport, setSelectedSport] = useState<SelectedOption>();

	const sportCodes: SelectedOption[] = [
		{ value: "1", label: "1" },
		{ value: "2", label: "2" },
		{ value: "3", label: "3" },
		{ value: "4", label: "4" }
	]

	const sportNames: SelectedOption[] = [
		{ value: "1", label: "Football" },
		{ value: "2", label: "Basketball" },
		{ value: "3", label: "Baseball" },
		{ value: "4", label: "Soccer" }
	]

	const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// TODO: backend call
	}

	return(<>
		<header>
			<h1>Pridanie nového odvetvia</h1>
		</header>
		<section>
			<Row>
				<Col lg={6} md={7}>
					<Form onSubmit={submitForm}>

						<Row className={`mb-4`}>
							<Col>
								<Form.Label>Kód športu</Form.Label>
								<Select
									id="sport_code"
									options={sportCodes}
									placeholder="Napíšte alebo zvoľte kód športu"
									value={ sportCodes.find( (code) => code.value === selectedSport?.value ) }
									onChange={ (selectedOption) => {
										if (selectedOption !== null)
											setSelectedSport(selectedOption)
									} }
								/>
							</Col>
						</Row>

						<Row className={`mb-4`}>
							<Col>
								<Form.Label>Názov športu</Form.Label>
								<Select
									id="sport_name"
									options={sportNames}
									placeholder="Napíšte alebo zvoľte názov športu"
									value={ sportNames.find( (sportName) => sportName.value === selectedSport?.value ) }
									onChange={ (selectedOption) => {
										if (selectedOption !== null)
											setSelectedSport(selectedOption)
									} }
								/>
							</Col>
						</Row>

						<Form.Group as={Row} className="mb-4" controlId="formHorizontalBranchCode">
							<Col>
								<FloatingLabel controlId="floatingSportCode" label="Nový kód odvetvia">
									<Form.Control type="text"
									              placeholder="Nový kód odvetvia"
									              defaultValue={newBranchCode.toString()}
									              disabled />
								</FloatingLabel>
								<Form.Text className="text-muted">
									Kód bol automaticky vygenerovaný systémom.
								</Form.Text>
							</Col>
						</Form.Group>

						<Form.Group as={Row} className="mb-4" controlId="formHorizontalBranchName">
							<Col>
								<FloatingLabel controlId="floatingPassword" label="Názov odvetvia">
									<Form.Control type="text" placeholder="Názov odvetvia" />
								</FloatingLabel>
							</Col>
						</Form.Group>

						<Form.Group className="mb-3" controlId="formBasicCheckbox">
							<Form.Check type="checkbox" label="Kombinované"
							            checked={checkedCombined}
							            onChange={(e) =>
								            setCheckedCombined((e.currentTarget as HTMLInputElement).checked)}
							/>
						</Form.Group>


						{checkedCombined &&  // expand, if checked
							<>
								asdf
							</>
						}

						<Button className={`mt-4`} variant="primary" type="submit">
							Pridať nové odvetvie
						</Button>
					</Form>
				</Col>
			</Row>
		</section>
	</>)
}

// TODO: getter, setter from the parent
const ExpandedUncombiBranch = () => {
	return (
		<></>
	)
}