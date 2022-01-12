import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum IncorrectRowStates {
	NONE,
	APPROVED,
	DISAPPROVED
}

export interface IncorrectRowType {
	rowIndex: number,
	approved: IncorrectRowStates
}

export interface IncorrectRowsState {
	rows: IncorrectRowType[]
}

const initialState: IncorrectRowsState = {
	rows: []
};

export const incorrectRowsSlice = createSlice({
	name: "incorrectRows",
	initialState,
	reducers: {
		updateRow: (state, action: PayloadAction<IncorrectRowType>) => {
			const payload: IncorrectRowType = action.payload;
			const row = state.rows.find( (r) => r.rowIndex === payload.rowIndex );
			if (row === undefined)
				state.rows.push(payload);
			else
				row.approved = payload.approved;
		},
		clearState: (state) => {
			state.rows = [];
		}
	}
});

export const { updateRow, clearState } = incorrectRowsSlice.actions;
export default incorrectRowsSlice.reducer;