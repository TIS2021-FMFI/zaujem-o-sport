import React, {useEffect, useState} from "react";
import {Button, Col, FloatingLabel, Form, Row, Tab, Tabs} from "react-bootstrap";
import Select from "react-select";
import {useNewBranchCode, useNewCombiBranchCode, useSports} from "admin_secretary_shared/hooks";
import {useQuery} from "react-query";
import {apiGetNewBranchCode} from "admin_secretary_shared/adapters";
import {CenteredRow} from "../../../../components/basic/CenteredRow";
import {AddUncombiBranch} from "./components/AddUncombiBranch";
import {AddCombiBranch} from "./components/AddCombiBranch";

interface UncombiBranchesRow {
	uncombiBranchCode: string,
	coefficient: number
}

export const AddBranch = () => {

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

	return (<>
		<CenteredRow as="header" lg={6} md={7} className="text-center">
			<h1>Pridanie nového odvetvia</h1>
		</CenteredRow>
		<CenteredRow as="section" lg={6} md={7}>
			<Tabs defaultActiveKey="uncombiBranch" id="uncontrolled-tab-example" className="mb-3 justify-content-center">
				<Tab eventKey="uncombiBranch" title="Nekombinované odvetvie">
					<section>
						<div className="mb-3">
							<AddUncombiBranch />
						</div>
					</section>
				</Tab>
				<Tab eventKey="combiBranch" title="Kombinované odvetvia">
					<section>
						<div className="mb-3">
							<AddCombiBranch />
						</div>
					</section>
				</Tab>
			</Tabs>
		</CenteredRow>
	</>)
}