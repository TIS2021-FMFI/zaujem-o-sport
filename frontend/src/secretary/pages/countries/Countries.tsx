import {Table} from "components/table/Table";
import {CenteredRow} from "components/basic/CenteredRow";
import {CSVLink} from "react-csv";
import {useCountries} from "app/hooks";

export const Countries = () => {

	const { isLoading, countries } = useCountries();

	return (<>
		<CenteredRow as="header">
			<h1>Krajiny</h1>
		</CenteredRow>
		<CenteredRow as="section" className="mb-3">
			{countries.length !== 0 &&
        <CSVLink role="button" className="btn btn-outline-primary" data={countries} filename="exportovane_krajiny">
          Export
        </CSVLink>
			}
		</CenteredRow>
		<CenteredRow as="section">
			{ !isLoading && countries.length !== 0 &&
				<Table
					columnNames={[{name: "Názov", sortable: true}, {name: "Kód", sortable: true}]}
					rows={countries} />
			}
		</CenteredRow>
	</>)
}