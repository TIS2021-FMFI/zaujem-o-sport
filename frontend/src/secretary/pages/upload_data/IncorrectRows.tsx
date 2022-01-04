import {Table, TableCellComponent, TableCellValueOnly, TableColumnNameType} from "components/table/Table";
import {useEffect, useState} from "react";
import {CheckLg, XLg} from "react-bootstrap-icons";
import {Form} from "react-bootstrap";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {RootState} from "../../../app/store";
import {clearState, IncorrectRowStates, IncorrectRowType, updateRow} from "./incorrectRowsSlice";

// TODO: props: number of row in files, suggestion, ...
// TODO: Table prop for not ordering and adding onClick functionality for cell (component instead of string)

interface IncorrectRowsProps {
	tableRowValues: TableCellValueOnly[][]
}

type UpdateRowStatusFunction = (rowIndex: number, approve: IncorrectRowStates) => void

export const IncorrectRows = ({tableRowValues}: IncorrectRowsProps) => {

	const dispatch = useAppDispatch();

	// TODO: Adjust with real incorrect rows probably from props.

	const columnNames: TableColumnNameType[] = [
		{name: "číslo riadka", sortable: false},
		{name: "nesprávna hodnota", sortable: false},
		{name: "návrh", sortable: false},
		{name: "schváliť/zamietnuť", sortable: false}  // 'schváliť všetky' stopped making sense
	];

	const [rows, setRows] = useState<TableCellComponent[][]>([]);

	// TODO: Access after the backend functionality is there.
	// useAppSelector((state: RootState) => state.secretaryUploadIncorrectRows.rows);

	const updateRowStatus: UpdateRowStatusFunction = (rowIndex, approve) => {
		dispatch(updateRow({rowIndex: rowIndex, approved: approve}));
	}

	useEffect(() => {
		dispatch(clearState());
	}, []);

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

	const rows: IncorrectRowType[] = useAppSelector((state: RootState) => state.secretaryUploadIncorrectRows.rows);

	const [rowState, setRowState] = useState<IncorrectRowStates>(IncorrectRowStates.NONE);

	useEffect(() => {
		if (rowIndex < rows.length)
			setRowState(rows[rowIndex].approved);
	}, [rows]);

	return (<div className={`d-flex align-items-center justify-content-between`}>
		{rowState === IncorrectRowStates.NONE
			? <div>
					<button type="button" className={`btn`} onClick={() => {
						updateRowStatus(rowIndex, IncorrectRowStates.APPROVED);
					}}>
						<CheckLg color="green" size="1.4em" />
					</button>
					<button type="button" className={`btn`} onClick={() => {
						updateRowStatus(rowIndex, IncorrectRowStates.DISAPPROVED);
					}}>
						<XLg color="red" size="1.2em" />
					</button>
				</div>
			: <>
					<div>
						{rowState === IncorrectRowStates.APPROVED
							? <span className={`text-success`}>
									schválené <CheckLg color="green" size="1.4em" />
								</span>
							: <span className={`text-danger`}>
									zamietnuté <XLg color="red" size="1.2em" />
								</span>
						}
					</div>
					<div>
						<button type="button" className={`btn btn-link`} onClick={() => {
							updateRowStatus(rowIndex, IncorrectRowStates.NONE);
						}}>
							obnoviť
						</button>
					</div>
				</>
		}
	</div>)
}