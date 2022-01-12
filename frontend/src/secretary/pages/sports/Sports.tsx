import {useState} from "react";
import {useQuery} from "react-query";
import {apiListSports} from "../../adapters";
import {Spinner} from "react-bootstrap";
import {TableColumnNameType, Table, TableRowsType} from "../../../components/table/Table";

export const Sports = () => {

	// TODO: export

	const [columnNames, setColumnsNames] = useState<TableColumnNameType[]>([]);
	const [sportRows, setSportRows] = useState<TableRowsType>([]);

	const {isLoading} = useQuery("list_sports", apiListSports, {
		onSuccess: (response) => {
			const serverData = response.data.data;
			setColumnsNames(
				serverData.columnNames.map( (colName) => {
					return { name: colName, sortable: true }
				})
			);
			setSportRows(serverData.sports);
		},
		onError: (error) => {


		}
	});
  // TODO: use <Table columnNames={columnNames} rows={sportRows} /> instead of .map
  return (<>
	  <header>
	    <h1>Uložené športy</h1>
	  </header>
	  <section>
		  { isLoading
			  ? <Spinner animation="border" role="status">
					  <span className="visually-hidden">Loading...</span>
				  </Spinner>
			  : sports?.map((sport, i) => { return (
					  <p key={`sport-${i}`}>Názov športu: {sport.sport_title}, Kód športu: {sport.sport_code}, Názov odvetvia: {sport.branch_title}, Kód odvetvia: {sport.branch_code}</p>
				  )})
		  }
	  </section>
  </>)
}