import React, {useEffect, useState} from "react";
import {useBranchesWithSports, useNewCombiBranchCode} from "admin_secretary_shared/hooks";
import {Button, Col, FloatingLabel, Form, Row} from "react-bootstrap";
import Select from "react-select";
import {useCountries} from "app/hooks";
import {BranchWithSport} from "../../../../adapters";

export const AddCombiBranch = () => {

	const {newCombiBranchCode} = useNewCombiBranchCode();
	const [branchTitle, setBranchTitle] = useState<string>("");
	const {countries: responseCountries} = useCountries();
	const [countries, setCountries] = useState<{value: string, label: string}[]>([]);
	const [selectedCountry, setSelectedCountry] = useState<string | undefined>();
	const {branchesWithSports: responseBranchesWithSports} = useBranchesWithSports();
	const [branchesWithSports, setBranchesWithSports] = useState<{value: BranchWithSport, label: string}[]>([]);
	const [selectedBranchesWithSports, setSelectedBranchesWithSports] = useState<BranchWithSport[]>([]);

	const strBranch = (branchWithSport: BranchWithSport) => {
		const b = branchWithSport;
		return `${b.sportTitle} (${b.sportCode}) -> ${b.branchTitle} (${b.branchCode})`
	}

	useEffect(() => {
		setCountries(responseCountries.map((country) => { return {
			value: country.code, label: `${country.name} (${country.code})`
		}}));
	}, [responseCountries]);

	useEffect(() => {
		setBranchesWithSports(responseBranchesWithSports.map((branchWithSport) => { return {
			value: branchWithSport, label: strBranch(branchWithSport)
		}}));
	}, [responseBranchesWithSports]);

	const submitForm = () => {

	}

	return (
		<Form onSubmit={submitForm}>

			<Form.Group as={Row} className="mb-4" controlId="formHorizontalBranchName">
				<Col>
					<FloatingLabel controlId="floatingCombiBranchTittle" label="Názov kombinovaného odvetvia">
						<Form.Control type="text" placeholder="Názov kombinovaného odvetvia"
						              value={branchTitle}
						              onChange={(e) =>
							              setBranchTitle((e.currentTarget as HTMLInputElement).value)}
						/>
					</FloatingLabel>
				</Col>
			</Form.Group>

			<Form.Group as={Row} className="mb-4" controlId="formHorizontalBranchCode">
				<Col>
					<FloatingLabel controlId="floatingCombiBranchCode" label="Nový kód kombinovaného odvetvia">
						<Form.Control type="text"
						              placeholder="Nový kód kombinovaného odvetvia"
						              defaultValue={newCombiBranchCode.toString()}
						              disabled />
					</FloatingLabel>
					<Form.Text className="text-muted">
						Kód je automaticky vygenerovaný systémom.
					</Form.Text>
				</Col>
			</Form.Group>

			<Row className={`mb-4`}>
				<Col>
					<Form.Label>Krajina</Form.Label>
					<Select
						id="country"
						options={countries}
						placeholder="Zvoľte krajinu"
						onChange={(selectedCountry) => setSelectedCountry(selectedCountry?.value)}
					/>
				</Col>
			</Row>

			<Row className={`mb-4`}>
				<Col>
					<Form.Label>Pod-odvetvia <br />
											(v tvare: <code>názov športu (kód športu) -&gt; názov odvetvia (kód odvetvia)</code>)
					</Form.Label>
					<Select
						id="subbranches"
						options={branchesWithSports}
						placeholder="Odvetvia, z ktorých sa kombinované odvetvie skladá"
						value={ null }
						onChange={(branchWithSport) => {
							if (branchWithSport !== null) {
								setSelectedBranchesWithSports([...selectedBranchesWithSports, branchWithSport.value]);
								setBranchesWithSports(branchesWithSports.filter(b => b.value !== branchWithSport.value));
							}
						}}
					/>
				</Col>
			</Row>

			{selectedBranchesWithSports.map((branchWithSport, i) => { return (
				<Form.Group as={Row} className="mb-4" controlId={`formCoefficient${i}`} key={`formCoefficient${i}`}>
					<Col>
						<FloatingLabel controlId={`floatingCoefficient${i}`} label={`Coefficient of ${strBranch(branchWithSport)}`}>
							<Form.Control type="text"
							              placeholder={`Coefficient of ${strBranch(branchWithSport)}`}
							/>
						</FloatingLabel>
					</Col>
				</Form.Group>
			)})}

			<Button className={`mt-2`} variant="primary" type="submit">
				Pridať nové odvetvie
			</Button>
		</Form>
	)
}