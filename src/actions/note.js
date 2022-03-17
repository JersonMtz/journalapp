import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { types } from '../types';
import { Toast } from '../helper/alert';

export const clearNotes = () => ({ type: types.noteClear });

export const noteActive = (id, note) => ({
    type: types.noteActive,
    payload: {
        id,
        ...note
    }
});

const noteAdd = (id, note) => ({
    type: types.noteAdd,
    payload: {
        id,
        ...note
    }
});

const noteLoad = (notes) => ({
    type: types.noteLoad,
    payload: notes
})

const noteEdit = (note) => ({ 
    type: types.noteEdit,
    payload: note
});

const noteFile = (url) => ({
    type: types.noteFile,
    payload: url
});

const noteDelete = (id) => ({
    type: types.noteDelete,
    payload: id
});

// export const startNewNote = () => {
//     return (dispatch, getState) => {
//         const { uid } = getState().auth;

//         const note = {
//             title: '',
//             body: '',
//             imageUrl: '',
//             created: Date.now()
//         }

//         addDoc(collection(db, uid, 'journal/notes'), note)
//             .then(docRef => {
//                 dispatch(noteAdd(docRef.id, note));
//             })
//             .catch(err =>
//                 Toast.fire({
//                     icon: 'error',
//                     title: err
//                 })
//             );
//     }
// }

export const startNewNote = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;

        const note = {
            title: '',
            body: '',
            imageUrl: '',
            created: Date.now()
        }

        const docRef = await addDoc(collection(db, uid, 'journal/notes'), note);
        dispatch(noteAdd(docRef.id, note));

    }
}

export const startLoadNotes = () => {
    return (dispatch, getState) => {

        const { uid } = getState().auth;

        getDocs(collection(db, `${ uid }/journal/notes`)).then(snap => {
            const docs = [];
            snap.forEach(doc => {
                docs.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            dispatch(noteLoad(docs));
        })
        .catch(err =>
            Toast.fire({
                icon: 'error',
                title: err
            })
        );
    }
}

export const startUpdateNote = () => {
    return (dispatch, getState) => {

        const { uid } = getState().auth;
        const { active: note } = getState().notes;
        
        const { id,...data } = note;
        updateDoc(doc(db, uid, 'journal', 'notes', id), data)
        .then(() => {
            dispatch(noteEdit(note));
            Toast.fire({
                icon: 'success',
                title: 'Guardado'
            })
        })
        .catch(err =>
            Toast.fire({
                icon: 'error',
                title: err
            })
        );
    }
}

export const startUploadImage = (file) => {
    return (dispatch) => {

        const cloudinary = 'https://api.cloudinary.com/v1_1/jbz17/upload';
        const formData = new FormData();
        formData.append('upload_preset', 'journalApp');
        formData.append('file', file);

        fetch(cloudinary, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(res => {
            const { secure_url } = res;
            dispatch(noteFile(secure_url));
        })
        .catch(err =>
            Toast.fire({
                icon: 'error',
                title: err
            })
        );
    }
}

export const startDeleteNote = () => {
    return (dispatch, getState) => {
        
        const { uid } = getState().auth;
        const { active: note } = getState().notes;
        
        deleteDoc(doc(db, uid, 'journal', 'notes', note.id))
        .then(() => {
            dispatch(noteDelete(note.id));
            Toast.fire({
                icon: 'success',
                title: 'Eliminado'
            })
        })
        .catch(err =>
            Toast.fire({
                icon: 'error',
                title: err
            })
        );
    }
}