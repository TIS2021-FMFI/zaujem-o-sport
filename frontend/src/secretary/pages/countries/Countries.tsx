import {useEffect, useState} from "react";
import {useQuery} from "react-query";
import {apiListCountries, countryType} from "secretary/adapters";
import createSnackbar, {dismissSnackbar, resolveSnackbar, SnackTypes} from "components/snackbar/Snackbar";

export const Countries = () => {

	const toastId = "countries_fetching";

	const [countries, setCountries] = useState<countryType[]>();

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
			setCountries(response.data.countries);
	}, [response]);

	useEffect(() => {
		if (isLoading)
			createSnackbar("Načítavanie krajín...", SnackTypes.loading, false, toastId)
	}, [isLoading]);

	useEffect(() => { return () => dismissSnackbar(toastId) }, []);

	return (<>
		<header>
			<h1>Krajiny</h1>
		</header>
		{ !isLoading &&
			countries?.map((country, i) => { return (
				<p key={`country-${i}`}>Názov: {country.name}, Kód: {country.code}</p>
			)})
		}
	</>)
}