import React, {useContext, useEffect, useState} from "react";
import {useBranchesWithSports, useNewCombiBranchCode} from "admin_secretary_shared/hooks";
import {Button, Col, FloatingLabel, Form, Row} from "react-bootstrap";
import Select from "react-select";
import {useCountries, useMutationWithNotifications} from "app/hooks";
import {apiAddNewCombiBranch, BranchWithSport, SubBranch} from "admin_secretary_shared/adapters";
import createSnackbar, {SnackTypes} from "components/snackbar/Snackbar";
import textLang, {Language} from "app/string";
import {LanguageContext} from "App";

export const AddCombiBranch = () => {

	const language = useContext<Language>(LanguageContext);
	const text = textLang[language];

	const {newCombiBranchCode} = useNewCombiBranchCode(language);
	const [branchTitle, setBranchTitle] = useState<string>("");
	const {countries: responseCountries} = useCountries(language);
	const [countries, setCountries] = useState<{value: string, label: string}[]>([]);
	const [selectedCountry, setSelectedCountry] = useState<string | undefined>();
	const {branchesWithSports: responseBranchesWithSports} = useBranchesWithSports(language);
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
		"adding_new_combi_branch", apiAddNewCombiBranch, text.addNewBranchInitToastMsg, language
	);
	const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const coefficientsSum: number = coefficients.reduce((partialSum, c) => partialSum + parseFloat(c), 0);

		if (branchTitle.length === 0 || newCombiBranchCode.length === 0 || selectedCountry === undefined) {
			createSnackbar(text.allFieldsAreRequired, SnackTypes.warn); return;
		}
		if (selectedBranchesWithSports.length === 0) {
			createSnackbar("Je potrebné zvoliť aspoň jedno sub-odvetvie.", SnackTypes.warn); return;  // TODO
		}
		if (isNaN(coefficientsSum)) {
			createSnackbar("Neplatné koeficienty.", SnackTypes.warn); return;  // TODO
		}
		if (coefficientsSum !== 1) {
			createSnackbar("Suma koeficientov sa nerovná jednej.", SnackTypes.warn); return;  // TODO
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
					<FloatingLabel controlId="floatingCombiBranchTittle" label={text.combiBranchTitleInputPlaceholder}>
						<Form.Control type="text" placeholder={text.combiBranchTitleInputPlaceholder}
						              value={branchTitle}
						              onChange={(e) =>
							              setBranchTitle((e.currentTarget as HTMLInputElement).value)}
						/>
					</FloatingLabel>
				</Col>
			</Form.Group>

			<Form.Group as={Row} className="mb-4" controlId="formHorizontalBranchCode">
				<Col>
					<FloatingLabel controlId="floatingCombiBranchCode" label={text.newCombiBranchCodeInputPlaceholder}>
						<Form.Control type="text"
						              placeholder={text.newCombiBranchCodeInputPlaceholder}
						              defaultValue={newCombiBranchCode.toString()}
						              disabled />
					</FloatingLabel>
					<Form.Text className="text-muted">{text.autoGeneratedCode}</Form.Text>
				</Col>
			</Form.Group>

			<Row className={`mb-4`}>
				<Col>
					<Form.Label>{text.country}</Form.Label>
					<Select
						id="country"
						options={countries}
						placeholder={text.pickCountry}
						onChange={(selectedCountry) => setSelectedCountry(selectedCountry?.value)}
					/>
				</Col>
			</Row>

			<Row className={`mb-4`}>
				<Col>
					<Form.Label>{text.subBranches} <br />
											(<code>{text.subBranchesHint}</code>)
					</Form.Label>
					<Select
						id="subbranches"
						options={branchesWithSports}
						placeholder={text.combiBranchBranchesInputPlaceholder}
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
						<FloatingLabel controlId={`floatingCoefficient${i}`} label={`${text.coefficientOf} ${strBranch(branchWithSport)}`}>
							<Form.Control type="text"
							              placeholder={`${text.coefficientOf} ${strBranch(branchWithSport)}`}
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
				{text.addNewBranch}
			</Button>
		</Form>
	)
}