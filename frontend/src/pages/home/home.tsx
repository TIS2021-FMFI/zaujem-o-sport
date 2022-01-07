import {useState} from "react";
import {useQuery} from "react-query";
import {Spinner} from "react-bootstrap";

export const Home = () => {

    return (<>
        <header>
            <h1>Toto je domovská stránka</h1>
            <br></br>
        </header>
        <section>
            <h2> Projekt Medzinárodný záujem o šport</h2>
            <br></br>
            <ul>
                <li>Systém, ktorý bude zoskupovať, spracovávať a zobrazovať údaje o športe a jeho dôležitosti pre rôzne krajiny sveta. </li>
                <li>Schopný prijímať nové - aktuálne údaje a zahŕňať ich do výsledných poradí dôležitosti.</li>
                <li>Spracované údaje budú voľne dostupné na tomto webe.</li>

            </ul>
            <img src="https://cdn.pixabay.com/photo/2016/09/18/14/21/swimmer-1678307_960_720.jpg" alt="FotkaSportu" />

        </section>
    </>)
}