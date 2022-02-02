import {Button} from "react-bootstrap";
import {CSVLink} from 'react-csv';
import {useState} from "react";
import {apiListChart, apiListFunding, apiListInterconnectness, apiListSuccess, successType} from "../../adapters";
import {useQuery} from "react-query";

export const Export = () => {

    const [successes, setSuccess] = useState<successType[]>();
    const [exportSuccess, setExportSuccess] = useState<(number | string)[][]>([]);
    const [exportInterconnectness, setExportInterconnectness] = useState<(number | string)[][]>([]);
    const [exportChart, setExportChart] = useState<(number | string)[][]>([]);
    const [exportFunding, setExportFunding] = useState<(number | string)[][]>([]);

    useQuery("list_success", apiListSuccess, {
        onSuccess: (response) => {
            const serverData = response.data.data;
            setSuccess(serverData.success);

            setExportSuccess(serverData.success.map((s) => [s.sport_name, s.points, s.order]))
        },
        onError: (error) => {
            alert("Success loading error")

        }
    })

    useQuery("list_interconnectness", apiListInterconnectness, {
        onSuccess: (response) => {
            const serverData = response.data.data;
            setExportInterconnectness(serverData.interconnectness.map((i) => [i.code, i.country, i.value, i.type]));
        },
        onError: (error) => {

        }
    })

    const {isLoading} = useQuery("list_chart", apiListChart, {
        onSuccess: (response) => {
            const serverData = response.data.data;
            console.log(response)
            setExportInterconnectness(serverData.chart.map((ch) => [ch.code, ch.title, ch.value]));

        },
        onError: (error) => {

        }
    })

    useQuery("list_funding", apiListFunding, {
        onSuccess: (response) => {
            const serverData = response.data.data;
            setExportFunding(serverData.funding.map((f) => [f.branch_id, f.absolute_funding, f.currency]));

        },
        onError: (error) => {

        }
    })

    return (<>


        <header>
            <h1>Exporty</h1>
        </header>
        <section>
            <h4>Vyberte dáta na export</h4>

            <div className="choose">
                <ol>
                    <li><Button variant="primary"><CSVLink className='button' filename="chart_export" data={exportChart}>Rebríček dáta</CSVLink></Button>{' '}</li>
                    <li><Button variant="primary"><CSVLink className='button' filename="funding_export" data={exportFunding}>Rozpočty dáta</CSVLink></Button>{' '}</li>
                    <li><Button variant="primary"><CSVLink className='button' filename="success_export" data={exportSuccess}>Úspešnosť dáta</CSVLink></Button>{' '}</li>
                    <li><Button variant="primary"><CSVLink className='button' filename="interconnectness_export" data={exportInterconnectness}>Prepojenie dáta</CSVLink></Button>{' '}</li>
                </ol>
            </div>


        </section>


    </>)
}