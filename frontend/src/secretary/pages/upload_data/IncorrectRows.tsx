import {Table} from "components/table/Table";
import {useState} from "react";

// TODO: props: number of row in files, suggestion, ...
// TODO: Table prop for not ordering and adding onClick functionality for cell (component instead of string)

export const IncorrectRows = () => {

	// TODO: Adjust with real incorrect rows probably from props.

	const [approvedRows, setApprovedRows] = useState<number[]>([])
	const [disapprovedRows, setDisapprovedRows] = useState<number[]>([])

	return (
  	<Table
		  columnNames={["číslo riadka", "nesprávna hodnota", "návrh", "idk"]}
	    rows={[
	    	["1", "todo", "todo", "idk"],
		    ["8", "todo", "todo", "idk"],
		    ["32", "todo", "todo", "idk"],
	    ]
	    }
	  />
  )
}