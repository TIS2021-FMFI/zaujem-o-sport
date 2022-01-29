import {
	apiGetNewBranchCode,
	apiGetNewCombiBranchCode,
	apiGetSports,
	apiListFundingCurrencies,
	Currency, Sport
} from "./adapters";
import {useEffect, useState} from "react";
import {useQueryWithNotifications} from "../app/hooks";

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

export const useNewCombiBranchCode = (): { isLoading: boolean, newCombiBranchCode: string } => {
	const toastId = "getting_new_combi_branch_code";
	const toastMsg = "Zisťuje sa nový kód odvetvia...";
	const queryKey = "get_new_combi_branch_code";

	const {isLoading, response} = useQueryWithNotifications(
		toastId, queryKey, apiGetNewCombiBranchCode, toastMsg, false
	);

	const [newCombiBranchCode, setNewCombiBranchCode] = useState<string>("");

	useEffect(() => {
		if (response !== undefined)
			setNewCombiBranchCode(response.data.newCombiBranchCode);
	}, [response]);

	return { isLoading, newCombiBranchCode };
}

export const useNewBranchCode = (sportCode: string): { isLoading: boolean, newBranchCode: string } => {
	const toastId = "getting_new_branch_code";
	const toastMsg = "Zisťuje sa nový kód odvetvia...";
	const queryKey = "get_new_branch_code";

	const {isLoading, response} = useQueryWithNotifications(
		toastId, queryKey, apiGetNewBranchCode, toastMsg, false
	);

	const [newBranchCode, setNewBranchCode] = useState<string>("");

	useEffect(() => {
		if (response !== undefined)
			setNewBranchCode(response.data.newBranchCode);
	}, [response]);

	return { isLoading, newBranchCode };
}

export const useSports = (): { isLoading: boolean, sports: Sport[] } => {
	const toastId = "fetching_sports";
	const toastMsg = "Načítavanie športov...";
	const queryKey = "get_sports";

	const {isLoading, response} = useQueryWithNotifications(toastId, queryKey, apiGetSports, toastMsg);

	const [sports, setSports] = useState<Sport[]>([]);

	useEffect(() => {
		if (response !== undefined)
			setSports(response.data.sports);
	}, [response]);

	return { isLoading, sports };
}