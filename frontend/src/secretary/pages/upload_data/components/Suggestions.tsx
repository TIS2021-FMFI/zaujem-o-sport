import {Alert} from "react-bootstrap";
import {CenteredRow} from "components/basic/CenteredRow";
import {SuggestionsTable} from "./SuggestionsTable";
import React from "react";

export interface Suggestion {
	sportCode: string,
	oldBranchCode: string,
	oldSportTitle: string,
	oldBranchTitle: string,
	newBranchCode: string,
	newSportTitle: string,
	newBranchTitle: string,
	type: number
}

export type RowWithSuggestion = {row: string} & Suggestion;

export interface RowToSuggestion {
	[row: string]: Suggestion
}

const rowErrorMessagesByErrorType: {[row: number]: string} = {
	2: "Nedostatok parametrov v riadku.",
	3: "Kód športu neexistuje.",
	5: "Kód športu neobsahuje číselnú hodnotu.",
	6: "Kód odvetvia neobsahuje číselnú hodnotu.",
	7: "Suma financovania neobsahuje číselnú hodnotu.",
	8: "Kombinované odvetvie so zadaným kódom v danej krajine neexistuje."
}

interface SuggestionsProps {
	suggestions: RowWithSuggestion[],
	rowErrors: RowWithSuggestion[],
	numOfRealSuggestions: number
}

export const Suggestions = ({suggestions, rowErrors, numOfRealSuggestions}: SuggestionsProps) => {

	if (rowErrors.length !== 0) {
		return (
			<CenteredRow as="section" lg={7} md={8} className="mt-4">
				<Alert variant="danger">
					Nájdené chyby v nahranom súbore. Chyby je potrebné v súbore opraviť a nahranie zopakovať.
				</Alert>
				<Alert variant="danger">
					{rowErrors.map((rowError, i) => { return (
						<p key={`csvRowError${i}`}>
							<b>Chybný {rowError.row}. riadok.</b> {rowErrorMessagesByErrorType[rowError.type]}
						</p>
					)})}
				</Alert>
			</CenteredRow>
		)
	}

	if (numOfRealSuggestions !== 0) {
		return (
			<section className={`mt-5`}>
				<header>
					<h2>
						Nájden{numOfRealSuggestions === 1 ? 'á' : 'é'}
						<span
							className={`text-warning`}> {numOfRealSuggestions} nekonzistenci{numOfRealSuggestions === 1 ? 'a' : 'e'} </span>
						v nahranom súbore:
					</h2>
				</header>
				<div className={`mt-3`}>
					<SuggestionsTable suggestions={suggestions}/>
				</div>
			</section>
		)
	}

	return <></>
}