import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import {useEffect, useState} from "react";
import {useMutation, useQuery} from "react-query";
import {
	apiGetBranchesWithSports, apiGetCombiBranches,
	apiGetNewSportCode,
	apiListCountries,
	apiListFundingCurrencies, BranchWithSport, CombiBranch,
	Country,
	Currency
} from "../secretary/adapters";
import createSnackbar, {dismissSnackbar, resolveSnackbar, SnackTypes} from "../components/snackbar/Snackbar";
import {AxiosResponse} from "axios";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const useQueryWithNotifications = (
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

export const useFundingCurrencies = (): { isLoading: boolean, currencies: Currency[] } => {
	const toastId = "funding_currencies_fetching";
	const toastMsg = "Načítavanie mien...";
	const queryKey = "list_funding_currencies";

	const {isLoading, response} = useQueryWithNotifications(toastId, queryKey, apiListFundingCurrencies, toastMsg);

	const [currencies, setCurrencies] = useState<Currency[]>([]);

	useEffect(() => {
		if (response !== undefined)
			setCurrencies(response.data.currencies);
	}, [response]);

	return { isLoading, currencies };
}

export const useNewSportCode = (): { isLoading: boolean, newSportCode: string } => {
	const toastId = "getting_new_sport_code";
	const toastMsg = "Zisťuje sa nový kód športu...";
	const queryKey = "get_new_sport_code";

	const {isLoading, response} = useQueryWithNotifications(
		toastId, queryKey, apiGetNewSportCode, toastMsg, false
	);

	const [newSportCode, setNewSportCode] = useState<string>("");

	useEffect(() => {
		if (response !== undefined)
			setNewSportCode(response.data.newSportCode);
	}, [response]);

	return { isLoading, newSportCode };
}

export const useBranchesWithSports = (): { isLoading: boolean, branchesWithSports: BranchWithSport[] } => {
	const toastId = "fetching_branches_with_sports";
	const toastMsg = "Načítavanie odvetví so športami...";
	const queryKey = "get_branches_with_sports";

	const {isLoading, response} = useQueryWithNotifications(toastId, queryKey, apiGetBranchesWithSports, toastMsg);

	const [branchesWithSports, setBranchesWithSports] = useState<BranchWithSport[]>([]);

	useEffect(() => {
		if (response !== undefined)
			setBranchesWithSports(response.data.branchesWithSports);
	}, [response]);

	return { isLoading, branchesWithSports };
}

export const useCombiBranches = (): { isLoading: boolean, combiBranches: CombiBranch[] } => {
	const toastId = "fetching_combi_branches";
	const toastMsg = "Načítavanie kombinovaných odvetví...";
	const queryKey = "get_combi_branches";

	const {isLoading, response} = useQueryWithNotifications(toastId, queryKey, apiGetCombiBranches, toastMsg);

	const [combiBranches, setCombiBranches] = useState<CombiBranch[]>([]);

	useEffect(() => {
		if (response !== undefined)
			setCombiBranches(response.data.combiBranches);
	}, [response]);

	return { isLoading, combiBranches };
}