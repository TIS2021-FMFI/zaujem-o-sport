import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import {useEffect, useState} from "react";
import {useQuery} from "react-query";
import {apiListCountries, apiListFundingCurrencies, Country, Currency} from "../secretary/adapters";
import createSnackbar, {dismissSnackbar, resolveSnackbar, SnackTypes} from "../components/snackbar/Snackbar";
import {AxiosResponse} from "axios";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const useApiFetchWithNotifications = (
	toastId: string,
	queryKey: string,
	apiFetchFunction: () => Promise<AxiosResponse<any>>,
	initToastMsg: string
) => {
	const {isLoading, data: response} = useQuery(queryKey, apiFetchFunction, {
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
		if (isLoading)
			createSnackbar(initToastMsg, SnackTypes.loading, false, toastId);
	}, [isLoading]);

	useEffect(() => { return () => dismissSnackbar(toastId) }, []);

	return { isLoading, response };
}

export const useCountries = (): { isLoading: boolean, countries: Country[] } => {
	const toastId = "countries_fetching";
	const toastMsg = "Načítavanie krajín...";
	const queryKey = "list_countries";

	const {isLoading, response} = useApiFetchWithNotifications(toastId, queryKey, apiListCountries, toastMsg);

	const [countries, setCountries] = useState<Country[]>([]);

	useEffect(() => {
		if (response !== undefined)
			setCountries(response.data.countries);
	}, [response]);

	return { isLoading, countries };
}

export const useFundingCurrencies = (): { isLoading: boolean, currencies: Currency[] } => {
	const toastId = "funding_currencies_fetching";
	const toastMsg = "Načítavanie mien...";
	const queryKey = "list_funding_currencies";

	const {isLoading, response} = useApiFetchWithNotifications(toastId, queryKey, apiListFundingCurrencies, toastMsg);

	const [currencies, setCurrencies] = useState<Currency[]>([]);

	useEffect(() => {
		if (response !== undefined)
			setCurrencies(response.data.currencies);
	}, [response]);

	return { isLoading, currencies };
}