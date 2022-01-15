import {Button} from "react-bootstrap";
import {CSVLink} from 'react-csv';

export const Export = () => {
    const csvData = [
        ["Futbal", "4"],
        ["Basketbal", "8"],
        ["Bedminton", "9"],
        ["Beh", "3"]
    ];





    return (<>


        <header>
            <h1>Exporty</h1>
        </header>
        <section>
            <h4>Vyberte dáta na export</h4>

            <div className="choose">
                <ol>
                    <li><Button variant="primary"><CSVLink className='button' data={csvData}>Rebríček dáta</CSVLink></Button>{' '}</li>
                    <li><Button variant="primary"><CSVLink className='button' data={csvData}>Rozpočty dáta</CSVLink></Button>{' '}</li>
                    <li><Button variant="primary"><CSVLink className='button' data={csvData}>Úspešnosť dáta</CSVLink></Button>{' '}</li>
                    <li><Button variant="primary"><CSVLink className='button' data={csvData}>Prepojenie dáta</CSVLink></Button>{' '}</li>
                </ol>
            </div>


        </section>


        <br></br><br></br><br></br><br></br><br></br><br></br>
    </>)
}