import {useEffect, useState} from "react";
import {Tab, Tabs} from "react-bootstrap";
import {Table} from "components/table/Table";
import {CenteredRow} from "components/basic/CenteredRow";
import {CSVLink} from "react-csv";
import {useBranchesWithSports, useCombiBranches} from "admin_secretary_shared/hooks";

export const SportsWithBranches = () => {

	const {isLoading: isLoadingBranchesWithSports, branchesWithSports: responseBranchesWithSports} = useBranchesWithSports();
	const [branchesWithSports, setBranchesWithSports] = useState<string[][]>([]);
	const {isLoading: isLoadingCombiBranches, combiBranches: responseCombiBranches} = useCombiBranches();
	const [combiBranches, setCombiBranches] = useState<(string|number)[][]>([]);

	useEffect(() => {
		setBranchesWithSports(responseBranchesWithSports.map((branchWithSport) =>
			[branchWithSport.sportCode, branchWithSport.sportTitle, branchWithSport.branchCode, branchWithSport.branchTitle]
		));
	}, [responseBranchesWithSports]);

	useEffect(() => {
		setCombiBranches(responseCombiBranches.map((combiBranch) =>
			[combiBranch.countryCode, combiBranch.countryName, combiBranch.combiCode, combiBranch.combiTitle,
			 combiBranch.subCode, combiBranch.subTitle, combiBranch.coefficient]
		));
	}, [responseCombiBranches]);

	return (<>
		<CenteredRow as="header">
			<h1>Športy a odvetvia</h1>
		</CenteredRow>
		<CenteredRow as="section">
			<Tabs defaultActiveKey="branchesWithSports" id="uncontrolled-tab-example" className="mb-3">
				<Tab eventKey="branchesWithSports" title="Športy a ich odvetvia">
					<section>
						<div>
							<p>Zoznam špotrov s ich odvetviami.</p>
						</div>
						<div className="mb-3">
							{branchesWithSports.length !== 0 &&
					      <CSVLink role="button" className="btn btn-outline-primary" data={branchesWithSports} filename="export_sporty_s_odvetviami">
					        Export
					      </CSVLink>
							}
						</div>
						<div>
							{ !isLoadingBranchesWithSports && branchesWithSports.length !== 0 &&
	              <Table
	                columnNames={[{name: "Kód športu", sortable: true}, {name: "Názov športu", sortable: true},
																{name: "Kód odvetvia", sortable: true}, {name: "Názov odvetvia", sortable: true}]}
	                rows={branchesWithSports} />
							}
						</div>
					</section>
				</Tab>
				<Tab eventKey="combiBranches" title="Kombinované odvetvia">
					<section>
						<div>
							<p>
								Priradenie odvetví do kombinovaných odvetví s krajinou ku ktorej
								kombinované odvetvie patrí.
							</p>
						</div>
						<div className="mb-3">
							{combiBranches.length !== 0 &&
              <CSVLink role="button" className="btn btn-outline-primary" data={combiBranches} filename="export_kombinovane_odvetvia">
                Export
              </CSVLink>
							}
						</div>
						<div>
							{ !isLoadingCombiBranches && combiBranches.length !== 0 &&
              <Table
                columnNames={[{name: "Kód krajiny", sortable: true}, {name: "Názov krajiny", sortable: true},
															{name: "Kód kombinovaného odvetvia", sortable: true}, {name: "Názov kombinovaného odvetvia", sortable: true},
															{name: "Kód pod-odvetvia", sortable: true}, {name: "Názov pod-odvetvia", sortable: true},
	                            {name: "Koeficient", sortable: true}
                ]}
                rows={combiBranches} />
							}
						</div>
					</section>
				</Tab>
			</Tabs>
		</CenteredRow>
	</>)
}