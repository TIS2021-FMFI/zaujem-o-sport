import {
	Table,
	TableCellComponent,
	TableCellValueOnly,
	TableColumnNameType
} from "components/table/Table";
import {useEffect, useState} from "react";

// TODO: props: number of row in files, suggestion, ...
// TODO: Table prop for not ordering and adding onClick functionality for cell (component instead of string)

interface IncorrectRowsProps {
	tableColumnNames: string[],
	tableRowValues: TableCellValueOnly[][]
}

export const IncorrectRows = ({tableColumnNames, tableRowValues}: IncorrectRowsProps) => {

	// TODO: Adjust with real incorrect rows probably from props.

	const [rows, setRows] = useState<TableCellComponent[][]>([]);
	const [columnNames, setColumnsNames] = useState<TableColumnNameType[]>([]);

	const [approvedRows, setApprovedRows] = useState<number[]>([]);
	const [disapprovedRows, setDisapprovedRows] = useState<number[]>([]);

	useEffect(() => {
		setRows(
			tableRowValues.map( (r) =>
				r.map( (cell) => { return (
					{value: cell}
				) } )
			)
		)
	}, [tableRowValues]);

	useEffect(() => {
		const _columnNames: TableColumnNameType[] = tableColumnNames.map( (col) => {
			return {name: col, sortable: true}
		});
		_columnNames.push({name: "schváliť všetky", sortable: false});
		setColumnsNames(_columnNames);
	}, [tableColumnNames]);

	return (
  	<Table
		  columnNames={columnNames}
	    rows={rows}
	  />
  )
}