import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import {useEffect, useState} from "react";
import {useMutation, useQuery} from "react-query";
import createSnackbar, {dismissSnackbar, resolveSnackbar, SnackTypes} from "../components/snackbar/Snackbar";
import {AxiosResponse} from "axios";
import {apiListCountries, Country} from "app/adapters";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useQueryWithNotifications = (
	toastId: string,
	queryKey: string,
	apiFetchFunction: (...args: any[]) => Promise<AxiosResponse<any>>,
	initToastMsg: string,
	cache: boolean = true
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
		},
		cacheTime: cache ? undefined : 0
	});

	useEffect(() => {
		if (isLoading)
			createSnackbar(initToastMsg, SnackTypes.loading, false, toastId);
	}, [isLoading]);

	useEffect(() => { return () => dismissSnackbar(toastId) }, []);

	return { isLoading, response };
}

export const useMutationWithNotifications = (
	toastId: string,
	apiFetchFunction: (...args: any[]) => Promise<AxiosResponse<any>>,
	initToastMsg: string
) => {
	const mutation = useMutation(apiFetchFunction, {
		onSuccess: (successResponse) => {
			resolveSnackbar(toastId, "Dáta boli úspešne uložené.");
		},
		onError: (error) => {
			console.log(error);
			resolveSnackbar(toastId, "Dáta nebolo možné uložiť.", false);
		},
	});

	useEffect(() => {
		if (mutation.isLoading)
			createSnackbar(initToastMsg, SnackTypes.loading, false, toastId);
	}, [mutation.isLoading]);

	useEffect(() => { return () => dismissSnackbar(toastId) }, []);

	return mutation;
}

export const useCountries = (): { isLoading: boolean, countries: Country[] } => {
	const toastId = "countries_fetching";
	const toastMsg = "Načítavanie krajín...";
	const queryKey = "list_countries";

	const {isLoading, response} = useQueryWithNotifications(toastId, queryKey, apiListCountries, toastMsg);

	const [countries, setCountries] = useState<Country[]>([]);

	useEffect(() => {
		if (response !== undefined)
			setCountries(response.data.countries);
	}, [response]);

	return { isLoading, countries };
}