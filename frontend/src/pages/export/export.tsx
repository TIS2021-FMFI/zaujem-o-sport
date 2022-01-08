import {useState} from "react";
import {useQuery} from "react-query";
import {Button, Spinner} from "react-bootstrap";
import {CSVLink, CSVDownload} from 'react-csv';


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
                <li><input type="checkbox" id="rebricek" name="rebricek" value="rebrice" /> Rebríček</li>
                <li><input type="checkbox" id="rozpocty" name="rozpocty" value="rozpocty" /> Rozpočty</li>
                <li><input type="checkbox" id="uspesnost" name="uspesnost" value="uspesnost" /> Úspešnosť</li>
                <li><input type="checkbox" id="prepojenie" name="prepojenie" value="prepojenie" /> Prepojenie</li>
                </ol>
            </div>

            <Button variant="primary"><CSVLink className='button' data={csvData}>Exportuj dáta</CSVLink></Button>{' '}

        </section>
        <br></br><br></br><br></br><br></br><br></br><br></br>
    </>)
}