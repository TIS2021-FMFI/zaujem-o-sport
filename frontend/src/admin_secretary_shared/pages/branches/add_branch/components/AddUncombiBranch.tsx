import {useNewBranchCode, useSports} from "admin_secretary_shared/hooks";
import React, {useEffect, useState} from "react";
import {useQuery} from "react-query";
import {apiAddNewSport, apiAddNewUncombiBranch, apiGetNewBranchCode} from "admin_secretary_shared/adapters";
import {Button, Col, FloatingLabel, Form, Row} from "react-bootstrap";
import Select from "react-select";
import {useMutationWithNotifications} from "../../../../../app/hooks";
import createSnackbar, {SnackTypes} from "../../../../../components/snackbar/Snackbar";

interface SelectedOption {
	value: string,
	label: string
}

export const AddUncombiBranch = () => {

	const [newBranchCode, setNewBranchCode] = useState<string>("");

	const {sports} = useSports();

	const [sportCodes, setSportCodes] = useState<SelectedOption[]>([]);
	const [sportNames, setSportNames] = useState<SelectedOption[]>([]);

	const [branchTitle, setBranchTitle] = useState<string>("");

	useEffect(() => {
		setSportCodes(sports.map((sport) => { return { value: sport.code, label: sport.code } }));
		setSportNames(sports.map((sport) => { return { value: sport.code, label: sport.title } }));
	}, [sports]);

	const [selectedSport, setSelectedSport] = useState<SelectedOption>();

	// TODO: abstract with notification in hooks
	const { data: newBranchCodeData, refetch } = useQuery(
		["fetching_new_branch_code", selectedSport?.value],
		() => {
			if (selectedSport !== undefined) return apiGetNewBranchCode(selectedSport.value);
		},
		{ enabled: false }
	);

	useEffect(() => {
		refetch();
	}, [selectedSport]);

	useEffect(() => {
		if (newBranchCodeData !== undefined)
			setNewBranchCode(newBranchCodeData.data.newBranchCode);
	}, [newBranchCodeData]);

	const addNewBranchMutation = useMutationWithNotifications(
		"adding_new_uncombi_branch", apiAddNewUncombiBranch, "Prebieha vytváranie nového odvetvia..."
	);

	const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (selectedSport === undefined || newBranchCode.length === 0 || branchTitle.length === 0)
			createSnackbar("Všetky polia musia byť vyplnené.", SnackTypes.warn);
		else
			addNewBranchMutation.mutate({sportCode: selectedSport.value, branchCode: newBranchCode, branchTitle: branchTitle});
	}

	return (
		<Form onSubmit={submitForm}>

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

			<Form.Group as={Row} className="mb-4" controlId="formHorizontalBranchCode">
				<Col>
					<FloatingLabel controlId="floatingSportCode" label="Nový kód odvetvia">
						<Form.Control type="text"
						              placeholder="Nový kód odvetvia"
						              defaultValue={newBranchCode.toString()}
						              disabled />
					</FloatingLabel>
					<Form.Text className="text-muted">
						Kód je automaticky vygenerovaný systémom.
					</Form.Text>
				</Col>
			</Form.Group>

			<Form.Group as={Row} className="mb-4" controlId="formHorizontalBranchName">
				<Col>
					<FloatingLabel controlId="floatingBranchTitle" label="Názov odvetvia">
						<Form.Control type="text" placeholder="Názov odvetvia"
						              value={branchTitle}
						              onChange={(e) =>
				                                setBranchTitle((e.currentTarget as HTMLInputElement).value)}
						/>
					</FloatingLabel>
				</Col>
			</Form.Group>

			<Button className={`mt-2`} variant="primary" type="submit">
				Pridať nové odvetvie
			</Button>
		</Form>
	)
}