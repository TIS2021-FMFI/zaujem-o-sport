import {
	Table,
	TableCellComponent,
	TableCellValueOnly,
	TableColumnNameType
} from "components/table/Table";
import {useEffect, useState} from "react";
import {CheckLg, XLg} from "react-bootstrap-icons";
import {Form} from "react-bootstrap";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {RootState} from "../../../app/store";
import {clearState, updateRow} from "./incorrectRowsSlice";

// TODO: props: number of row in files, suggestion, ...
// TODO: Table prop for not ordering and adding onClick functionality for cell (component instead of string)

interface IncorrectRowsProps {
	tableRowValues: TableCellValueOnly[][]
}

type UpdateRowStatusFunction = (rowIndex: number, approve: boolean) => void

export const IncorrectRows = ({tableRowValues}: IncorrectRowsProps) => {

	const dispatch = useAppDispatch();

	// TODO: Adjust with real incorrect rows probably from props.

	const columnNames: TableColumnNameType[] = [
		{name: "číslo riadka", sortable: false},
		{name: "nesprávna hodnota", sortable: false},
		{name: "návrh", sortable: false},
		{name: "schváliť všetky", sortable: false}
	];

	const [rows, setRows] = useState<TableCellComponent[][]>([]);

	const approvedRows = useAppSelector((state: RootState) => state.secretaryUploadIncorrectRows.rows);

	const updateRowStatus: UpdateRowStatusFunction = (rowIndex, approve) => {
		dispatch(updateRow({rowIndex: rowIndex, approved: approve}));
	}

	useEffect(() => {
		dispatch(clearState());
	}, []);

	useEffect(() => {
		console.log(approvedRows);
	}, [approvedRows]);

	useEffect(() => {
		setRows(
			tableRowValues.map( (r, i) => {
					const row: TableCellComponent[] = r.map((cell, j) => {
						return (j == 2) ? {element: <SuggestionCell defaultValue={cell} />, value: ""} : {value: cell}
					});
					row.push({element: <RowOptionsCell rowIndex={i} updateRowStatus={updateRowStatus} />, value: ""});
					return row;
				}
			)
		)
	}, [tableRowValues]);

	return (
		<div>
	    <Table
			  columnNames={columnNames}
		    rows={rows}
		  />
		</div>
  )
}

interface SuggestionCellProps {
	defaultValue: string | number
}

const SuggestionCell = ({defaultValue}: SuggestionCellProps) => {
	return (
		<Form.Control type="text" placeholder="Nová hodnota" defaultValue={defaultValue} />
	)
}

interface RowOptionsCellProps {
	rowIndex: number,
	updateRowStatus: UpdateRowStatusFunction
}

const RowOptionsCell = ({rowIndex, updateRowStatus}: RowOptionsCellProps) => {
	return (<>
		<CheckLg onClick={() => updateRowStatus(rowIndex, true)} />
		<XLg onClick={() => updateRowStatus(rowIndex, false)} />
	</>)
}