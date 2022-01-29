import React, {useEffect, useState} from "react";
import {Button, Col, FloatingLabel, Form, Row} from "react-bootstrap";
import Select from "react-select";
import {useNewBranchCode, useNewCombiBranchCode, useSports} from "app/hooks";
import {useQuery} from "react-query";
import {apiGetNewBranchCode} from "../../../adapters";

interface SelectedOption {
	value: string,
	label: string
}

interface UncombiBranchesRow {
	uncombiBranchCode: string,
	coefficient: number
}

export const AddBranch = () => {

	const newBranchCode = 1024;

	const {sports} = useSports();
	const [sportCodes, setSportCodes] = useState<SelectedOption[]>([]);
	const [sportNames, setSportNames] = useState<SelectedOption[]>([]);

	useEffect(() => {
		setSportCodes(sports.map((sport) => { return { value: sport.code, label: sport.code } }));
		setSportNames(sports.map((sport) => { return { value: sport.code, label: sport.title } }));
	}, [sports]);

	const [selectedSport, setSelectedSport] = useState<SelectedOption>();

	const {newCombiBranchCode} = useNewCombiBranchCode();

	const { data, refetch } = useQuery(
		["key", selectedSport?.value],
		() => {
			if (selectedSport !== undefined) return apiGetNewBranchCode(selectedSport.value);
		},
		{ enabled: false }
	);

	// const {newBranchCode} = useNewBranchCode("ATHLETICS");

	/*
	const {newBranchCode} = useNewBranchCode();  // TODO: both uncombi and combi new codes
	const {countries: responseCountries} = useCountries();
	const [countries, setCountries] = useState<{value: string, label: string}[]>([]);
	const {uncombiBranches} = useUncombiBrances();  // TODO: code + name

	useEffect(() => {
		setCountries(responseCountries.map((country) => { return {
			value: country.code, label: `${country.name} (${country.code})`
		}}));
	}, [responseCountries]);

	 */

	const [checkedCombined, setCheckedCombined] = useState<boolean>(false);
	// relevant once checkCombined = true
	const [branchCountry, setBranchCountry] = useState<string>("");
	const [uncombiBranchesRows, setUncombiBranchesRows] = useState<UncombiBranchesRow[]>([]);

	useEffect(() => {
		if (checkedCombined) {
			setBranchCountry("");
			setUncombiBranchesRows([]);
		}
	}, [checkedCombined]);

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
									id="sportCodesSelect"
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
									id="sportNamesSelect"
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


						{checkedCombined &&  // expand, if checked  // TODO: select country
							<>
                <Select
                  id="uncombiBranchesSelect"
                  options={sportCodes}  // TODO: uncombiBranches
                  placeholder="Odvetvia"
                  isMulti={true}
									/*
									value={ sportNames.find( (sportName) => sportName.value === selectedSport?.value ) }
									onChange={ (selectedOption) => {
										if (selectedOption !== null)
											setSelectedSport(selectedOption)
									} }
									 */
                />
								{uncombiBranchesRows.map((uncombiBranch, i) => { return (
									<>
										<Select
											id={`uncombiBranchCodeSelect${i}`}
											options={sportCodes}  // TODO: uncombiBranches
											placeholder="Kód odvetvia"
											/*  // TODO: updating also value in `uncombiBranchesRows`
											value={ sportNames.find( (sportName) => sportName.value === selectedSport?.value ) }
											onChange={ (selectedOption) => {
												if (selectedOption !== null)
													setSelectedSport(selectedOption)
											} }
											 */
										/>
									</>
								)})}
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

/*
interface ExpandedUncombiBranchProps {
	uncombiBranch: UncombiBranchesRow,
	index: number
}

// TODO: getter, setter from the parent
const ExpandedUncombiBranch = ({uncombiBranch, index}: ExpandedUncombiBranchProps) => {
	return (

	)
}
 */