import {useState} from "react";
import {useQuery} from "react-query";
//import {apiListSports} from "../../adapters";
import {Spinner} from "react-bootstrap";
//const [columnNames, setColumnsNames] = useState<TableColumnNameType[]>([]);
//const [sportRows, setSportRows] = useState<TableRowsType>([]);


/*



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





function PrintSuccess (){
    return (<>
        <header>
            <h1>Šport | Úspešnosť</h1>
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

export default PrintSuccess;
*/