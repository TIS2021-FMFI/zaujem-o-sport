import {useEffect, useState} from "react";
import {useQuery} from "react-query";
import {apiListCountries, countryType} from "secretary/adapters";
import createSnackbar, {dismissSnackbar, resolveSnackbar, SnackTypes} from "components/snackbar/Snackbar";
import {Table} from "components/table/Table";
import {Col, Row} from "react-bootstrap";
import {CenteredRow} from "../../../components/basic/CenteredRow";
import {CSVLink} from "react-csv";

export const Countries = () => {

	const toastId = "countries_fetching";

	const [countries, setCountries] = useState<string[][]>([]);

	// TODO: maybe custom hook: useQuery/mutation with snackbar

	const {isLoading, data: response} = useQuery("list_countries", apiListCountries, {
		onSuccess: (successResponse) => {
			if (response === undefined)
				resolveSnackbar(toastId, "Dáta úspešne načítané.");
		},
		onError: (error) => {
			console.log(error);
			if (response === undefined)
				resolveSnackbar(toastId, "Dáta nebolo možné načítať.", false);
		}
	});

	useEffect(() => {
		if (response !== undefined)
			setCountries(response.data.countries.map((country) => [country.name, country.code]));
	}, [response]);

	useEffect(() => {
		if (isLoading)
			createSnackbar("Načítavanie krajín...", SnackTypes.loading, false, toastId)
	}, [isLoading]);

	useEffect(() => { return () => dismissSnackbar(toastId) }, []);

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