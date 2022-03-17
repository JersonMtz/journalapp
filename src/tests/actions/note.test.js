/**
* @jest-environment node
*/

import { deleteDoc, doc } from 'firebase/firestore';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { startNewNote } from '../../actions/note';
import { db } from '../../firebase/config';
import { types } from '../../types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
    auth: { 
        uid: 'TESTING' 
    }
}

let store = mockStore(initialState);

describe('Prueba redux notes', () => {

    test('debe crear una nueva nota', async () => {

        await store.dispatch(startNewNote())
        const actions = store.getActions();

        expect(actions[0]).toEqual(
            {
                type: types.noteAdd,
                payload: {
                    id: expect.any(String),
                    title: '',
                    body: '',
                    imageUrl: '',
                    created: expect.any(Number)
                }
            }
        )

        await deleteDoc(doc(db, 'TESTING', 'journal', 'notes', actions[0].payload.id));
        
    });


});