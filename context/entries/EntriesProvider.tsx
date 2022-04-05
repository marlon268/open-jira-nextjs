import { FC, useReducer } from 'react';
import { v4 as uuidv4, v4 } from 'uuid';

import { Entry } from '../../interfaces';

import { EntriesContext, entriesReducer } from './';

export interface EntriesState {
	entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
	entries: [
		{
			_id: uuidv4(),
			description: 'Pendiente: Dolor do culpa dolore proident ea anim.',
			status: 'pending',
			createAt: Date.now(),
		},
		{
			_id: uuidv4(),
			description:
				'En progreso: Ipsum minim exercitation et in adipisicing velit id adipisicing aliqua veniam.',
			status: 'in-progress',
			createAt: Date.now() - 1000000,
		},
		{
			_id: uuidv4(),
			description:
				'Terminadas: Adipisicing ullamco minim ut exercitation qui adipisicing aute eu sunt.',
			status: 'finished',
			createAt: Date.now() - 100000,
		},
	],
};

export const EntriesProvider: FC = ({ children }) => {
	const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

	const addNewEntry = (description: string) => {
		const newEntry: Entry = {
			_id: uuidv4(),
			description,
			createAt: Date.now(),
			status: 'pending',
		};

		dispatch({ type: '[Entry] Add-Entry', payload: newEntry });
	};

	return (
		<EntriesContext.Provider value={{ ...state, addNewEntry }}>
			{children}
		</EntriesContext.Provider>
	);
};
