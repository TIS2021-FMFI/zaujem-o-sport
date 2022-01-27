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
			resolveSnackbar(initToastId, "Dáta nebolo možné načítať.", false);
		}
	});

	console.log(data);

	useEffect(() => { return () => toast.dismiss(initToastId) }, []);

	return (<>
		<header>
			<h1>Krajiny</h1>
		</header>
		{ isLoading
			? createSnackbar("Načítavanie krajín...", SnackTypes.loading, false, initToastId)  // TODO: don't do it here
			: countries?.map((country, i) => { return (
				<p key={`country-${i}`}>Názov: {country.name}, Kód: {country.code}</p>
			)})
		}
	</>)
}