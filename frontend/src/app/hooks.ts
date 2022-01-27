import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import {useEffect, useState} from "react";
import {useQuery} from "react-query";
import {apiListCountries, Country} from "../secretary/adapters";
import createSnackbar, {dismissSnackbar, resolveSnackbar, SnackTypes} from "../components/snackbar/Snackbar";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useCountries = (): { isLoading: boolean, countries: Country[] } => {

	const toastId = "countries_fetching";

	const [countries, setCountries] = useState<Country[]>([]);

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

	return { isLoading, countries }
}