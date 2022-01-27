import {useState} from "react";
import {useQuery} from "react-query";
import {apiListCountries, countryType} from "secretary/adapters";
import {Spinner} from "react-bootstrap";

export const Countries = () => {

	const [countries, setCountries] = useState<countryType[]>();

	const {isLoading} = useQuery("list_countries", apiListCountries, {
		onSuccess: (response) => {
			const serverData = response.data.data;
			setCountries(serverData.countries);
		},
		onError: (error) => {

		}
	});

	return (<>
		<header>
			<h1>Krajiny</h1>
		</header>
		{ isLoading
			? <Spinner animation="border" role="status">
				<span className="visually-hidden">Loading...</span>
			</Spinner>
			: countries?.map((country, i) => { return (
				<p key={`country-${i}`}>Názov: {country.name}, Kód: {country.code}</p>
			)})
		}
	</>)
}