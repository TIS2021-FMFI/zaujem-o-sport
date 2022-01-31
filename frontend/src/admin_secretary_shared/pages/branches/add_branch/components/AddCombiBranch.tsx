import React, {useEffect, useState} from "react";
import {useBranchesWithSports, useNewCombiBranchCode} from "admin_secretary_shared/hooks";
import {Button, Col, FloatingLabel, Form, Row} from "react-bootstrap";
import Select from "react-select";
import {useCountries, useMutationWithNotifications} from "app/hooks";
import {apiAddNewCombiBranch, apiAddNewUncombiBranch, BranchWithSport, SubBranch} from "../../../../adapters";
import createSnackbar, {SnackTypes} from "../../../../../components/snackbar/Snackbar";

export const AddCombiBranch = () => {

	const {newCombiBranchCode} = useNewCombiBranchCode();
	const [branchTitle, setBranchTitle] = useState<string>("");
	const {countries: responseCountries} = useCountries();
	const [countries, setCountries] = useState<{value: string, label: string}[]>([]);
	const [selectedCountry, setSelectedCountry] = useState<string | undefined>();
	const {branchesWithSports: responseBranchesWithSports} = useBranchesWithSports();
	const [branchesWithSports, setBranchesWithSports] = useState<{value: BranchWithSport, label: string}[]>([]);
	const [selectedBranchesWithSports, setSelectedBranchesWithSports] = useState<BranchWithSport[]>([]);
	const [coefficients, setCoefficients] = useState<string[]>([]);

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

	const addNewCombiBranchMutation = useMutationWithNotifications(
		"adding_new_combi_branch", apiAddNewCombiBranch, "Prebieha vytváranie nového odvetvia..."
	);
	const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const coefficientsSum: number = coefficients.reduce((partialSum, c) => partialSum + parseFloat(c), 0);

		if (branchTitle.length === 0 || newCombiBranchCode.length === 0 || selectedCountry === undefined) {
			createSnackbar("Všetky polia musia byť vyplnené.", SnackTypes.warn); return;
		}
		if (selectedBranchesWithSports.length === 0) {
			createSnackbar("Je potrebné zvoliť aspoň jedno sub-odvetvie.", SnackTypes.warn); return;
		}
		if (isNaN(coefficientsSum)) {
			createSnackbar("Neplatné koeficienty.", SnackTypes.warn); return;
		}
		if (coefficientsSum !== 1) {
			createSnackbar("Suma koeficientov sa nerovná jednej.", SnackTypes.warn); return;
		}

		const subBranches: SubBranch[] = [];
		selectedBranchesWithSports.forEach((b, i) => {
			subBranches.push({branchCode: b.branchCode, sportCode: b.sportCode, coefficient: parseFloat(coefficients[i])});
		});

		addNewCombiBranchMutation.mutate({
			branchCode: newCombiBranchCode,
			branchTitle: branchTitle,
			countryCode: selectedCountry,
			subBranches: subBranches
		});
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
								setCoefficients([...coefficients, "0"]);
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
							              value={coefficients[i]}
							              onChange={(e) => {
							              	const _coefficients = [...coefficients];
							              	_coefficients[i] = (e.currentTarget as HTMLInputElement).value;
							              	setCoefficients(_coefficients);
							              }}
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