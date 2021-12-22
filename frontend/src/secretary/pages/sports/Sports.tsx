import {useState} from "react";
import {useQuery} from "react-query";
import {apiListSports} from "../../adapters";
import {Spinner} from "react-bootstrap";
import {Table} from "../../../components/table/Table";

export const Sports = () => {

	const [columnNames, setColumnsNames] = useState<string[]>([]);
	const [sportRows, setSportRows] = useState<string[][]>([]);

	const {isLoading} = useQuery("list_sports", apiListSports, {
		onSuccess: (response) => {
			const serverData = response.data.data;
			setColumnsNames(serverData.columnNames);
			setSportRows(serverData.sports);
		},
		onError: (error) => {

		}
	});

  return (<>
	  <header>
	    <h1>Športy</h1>
	  </header>
	  <section>
		  { isLoading
			  ? <Spinner animation="border" role="status">
					  <span className="visually-hidden">Loading...</span>
				  </Spinner>
			  :
			  <>
				  <Table columnNames={columnNames} rows={sportRows} />
			  </>
		  }
	  </section>
  </>)
}