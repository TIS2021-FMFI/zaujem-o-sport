import {useState} from "react";
import {useQuery} from "react-query";
import {apiListSports, sportType} from "../../adapters";
import {Spinner} from "react-bootstrap";

export const Sports = () => {
	// mock data
	const [sports, setSports] = useState<sportType[]>();

	const {isLoading} = useQuery("list_sports", apiListSports, {
		onSuccess: (response) => {
			const serverData = response.data.data;
			setSports(serverData.sports);
		},
		onError: (error) => {


		}
	})

  return (
  	<>
		  <h1>Športy</h1>
		  { isLoading
			  ? <Spinner animation="border" role="status">
					  <span className="visually-hidden">Loading...</span>
				  </Spinner>
			  : sports?.map((sport, i) => { return (
					  <p key={`sport-${i}`}>Názov športu: {sport.sport_title}, Kód športu: {sport.sport_code}, Názov odvetvia: {sport.branch_title}, Kód odvetvia: {sport.branch_code}</p>
				  )})
		  }
	  </>
  )
}