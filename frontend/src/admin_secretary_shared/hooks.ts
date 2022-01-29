import {useQueryWithNotifications} from "app/hooks";
import {
	apiGetBranchesWithSports,
	apiGetCombiBranches,
	BranchWithSport,
	CombiBranch,
	apiGetNewSportCode, apiGetNewCombiBranchCode, apiGetNewBranchCode, Sport, apiGetSports
} from "admin_secretary_shared/adapters";
import {useEffect, useState} from "react";

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