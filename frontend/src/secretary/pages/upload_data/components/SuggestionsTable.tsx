import {Table, TableCellComponent, TableColumnNameType} from "components/table/Table";
import React, {useEffect, useState} from "react";
import {Form} from "react-bootstrap";
import {RowWithSuggestion} from "./Suggestions";
import {useAppDispatch, useAppSelector} from "app/hooks";
import {RootState} from "app/store";
import {setCorrections, updateBranchTitle, updateBranchCode, updateSportTitle, clearState, Correction} from "./correctionsSlice";

interface SuggestionsTableProps {
	suggestions: RowWithSuggestion[]
}

export const SuggestionsTable = ({suggestions}: SuggestionsTableProps) => {

	const dispatch = useAppDispatch();

	const columnNames: TableColumnNameType[] = [
		{name: "číslo riadka z CSV", sortable: false},
		{name: "Kód športu", sortable: false},
		{name: "Starý názov športu", sortable: false},
		{name: "Nový názov športu", sortable: false},
		{name: "Starý kód odvetvia", sortable: false},
		{name: "Nový kód odvetvia", sortable: false},
		{name: "Starý názov odvetvia", sortable: false},
		{name: "Nový názov odvetvia", sortable: false}
	];

	const [rows, setRows] = useState<TableCellComponent[][]>([]);

	/** Create table rows with suggestions. */
	useEffect(() => {
		const _corrections: Correction[] = [];
		setRows(suggestions.map((s) => {
			_corrections.push({row: s.row, sportCode: s.sportCode, sportTitle: s.newSportTitle, branchCode: s.newBranchCode,
												 branchTitle: s.newBranchTitle});
			return [
				{value: s.row},
				{value: s.sportCode},
				{value: s.oldSportTitle},
				(s.newSportTitle.length === 0 || s.newSportTitle === s.oldSportTitle)
					? {value: s.newSportTitle}
					: {element: <SuggestionNewSportTitleCell row={s.row} />, value: ""},
				{value: s.oldBranchCode},
				(s.newBranchCode.length === 0 || s.newBranchCode === s.oldBranchCode)
					? {value: s.newBranchCode}
					: {element: <SuggestionNewBranchCodeCell row={s.row} />, value: ""},
				{value: s.oldBranchTitle},
				(s.newBranchTitle.length === 0 || s.newBranchTitle === s.oldBranchTitle)
					? {value: s.newBranchTitle}
					: {element: <SuggestionNewBranchTitleCell row={s.row} />, value: ""},
			];
		}));
		dispatch(setCorrections(_corrections));
	}, [suggestions]);

	useEffect(() => {
		dispatch(clearState());
	}, []);

	return (
		<div>
	    <Table columnNames={columnNames} rows={rows} />
		</div>
  )
}

interface SuggestionCellProps {
	row: string
}

const SuggestionNewSportTitleCell = ({row}: SuggestionCellProps) => {
	const dispatch = useAppDispatch();
	const corrections = useAppSelector((state: RootState) => state.secretaryUploadCorrections.corrections);
	return (
		<Form.Control
			type="text"
			placeholder="Nová hodnota"
			value={corrections.find(c => c.row === row)!.sportTitle}
			onChange={(e) =>
				dispatch(updateSportTitle({row: row, sportTitle: (e.currentTarget as HTMLInputElement).value}))}
		/>
	)
}

const SuggestionNewBranchCodeCell = ({row}: SuggestionCellProps) => {
	const dispatch = useAppDispatch();
	const corrections = useAppSelector((state: RootState) => state.secretaryUploadCorrections.corrections);
	return (
		<Form.Control
			type="text"
			placeholder="Nová hodnota"
			value={corrections.find(c => c.row === row)!.branchCode}
			onChange={(e) =>
				dispatch(updateBranchCode({row: row, branchCode: (e.currentTarget as HTMLInputElement).value}))}
		/>
	)
}

const SuggestionNewBranchTitleCell = ({row}: SuggestionCellProps) => {
	const dispatch = useAppDispatch();
	const corrections = useAppSelector((state: RootState) => state.secretaryUploadCorrections.corrections);
	return (
		<Form.Control
			type="text"
			placeholder="Nová hodnota"
			value={corrections.find(c => c.row === row)!.branchTitle}
			onChange={(e) =>
				dispatch(updateBranchTitle({row: row, branchTitle: (e.currentTarget as HTMLInputElement).value}))}
		/>
	)
}