import {useState} from "react";
import {useQuery} from "react-query";
import {apiListChart, chartType} from "../../adapters";
import {Spinner} from "react-bootstrap";

export const Rebricek = () => {


    const [charts, setChart] = useState<chartType[]>();

    const {isLoading} = useQuery("list_chart", apiListChart, {
        onSuccess: (response) => {
            console.log(response);
            const serverData = response.data.data;
            setChart(serverData.success); //z dbqueries
        },
        onError: (error) => {
            console.log(error);
        }
    })

    return (
        <>
            <h1>Rebríček</h1>

            { isLoading
                ? <h1 >Nacitavanie </h1>
                : charts?.map((chart, i) => { return (
                    <p key={`chart-${i}`}>Názov: {chart.name}, Kód: {chart.points}, Poradie {chart.order}</p>
                )})
            }

        </>
    )
}
