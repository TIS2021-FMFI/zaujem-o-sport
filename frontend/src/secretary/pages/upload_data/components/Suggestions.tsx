import {Alert} from "react-bootstrap";
import {CenteredRow} from "../../../../components/basic/CenteredRow";


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
	rowErrors: RowWithSuggestion[]
}

export const Suggestions = ({suggestions, rowErrors}: SuggestionsProps) => {

	if (rowErrors.length !== 0) {
		return (
			<CenteredRow as="section" lg={7} md={8} className="mt-4">
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

	return (<>
		Suggestsions
	</>)
}