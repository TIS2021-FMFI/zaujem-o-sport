import {
	Table,
	TableCellComponent,
	TableCellValueOnly,
	TableColumnNameType
} from "components/table/Table";
import {useEffect, useState} from "react";
import {Check, CheckLg, XLg} from "react-bootstrap-icons";
import {Button, Form} from "react-bootstrap";

// TODO: props: number of row in files, suggestion, ...
// TODO: Table prop for not ordering and adding onClick functionality for cell (component instead of string)

interface IncorrectRowsProps {
	tableRowValues: TableCellValueOnly[][]
}

interface ApprovedRowsType {
	rowIndex: number,
	approved: boolean
}

type UpdateRowStatusFunction = (rowIndex: number, approve: boolean) => void

export const IncorrectRows = ({tableRowValues}: IncorrectRowsProps) => {

	// TODO: Adjust with real incorrect rows probably from props.

	const columnNames: TableColumnNameType[] = [
		{name: "číslo riadka", sortable: false},
		{name: "nesprávna hodnota", sortable: false},
		{name: "návrh", sortable: false},
		{name: "schváliť všetky", sortable: false}
	];

	const [rows, setRows] = useState<TableCellComponent[][]>([]);

	const [approvedRows, setApprovedRows] = useState<ApprovedRowsType[]>([]);

	const updateRowStatus: UpdateRowStatusFunction = (rowIndex, approve) => {
		console.log(approvedRows);  // TODO: can not access current version of approvedRows, better to use Redux
		console.log(rows);
		const _approvedRows = [...approvedRows];
		const row = _approvedRows.find( (r) => r.rowIndex === rowIndex );
		if (row === undefined)
			_approvedRows.push({rowIndex: rowIndex, approved: approve});
		else
			row.approved = approve
		setApprovedRows([{rowIndex: rowIndex, approved: approve}]);
	}

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
		<div onClick={() => console.log(approvedRows)}>
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