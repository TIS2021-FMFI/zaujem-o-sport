import {useEffect, useState} from "react";
import {useQuery} from "react-query";
import {apiListCountries, countryType} from "secretary/adapters";
import createSnackbar, {resolveSnackbar, SnackTypes} from "../../../components/snackbar/Snackbar";
import {toast} from "react-toastify";

export const Countries = () => {

	const initToastId = "init_countries_loading";

	const [countries, setCountries] = useState<countryType[]>();

	const {isLoading, data} = useQuery("list_countries", apiListCountries, {
		onSuccess: (response) => {
			setCountries(response.data.countries);
			resolveSnackbar(initToastId, "test");
		},
		onError: (error) => {
			console.log(error);
			createSnackbar("Dáta nebolo možné načítať.", SnackTypes.error);
		}
	});

	console.log(data);

	useEffect(() => { return () => toast.dismiss(initToastId) }, []);

	return (<>
		<header>
			<h1>Krajiny</h1>
		</header>
		{ isLoading
			? createSnackbar("Načítavanie krajín...", SnackTypes.loading, false, initToastId)
			: countries?.map((country, i) => { return (
				<p key={`country-${i}`}>Názov: {country.name}, Kód: {country.code}</p>
			)})
		}
	</>)
}