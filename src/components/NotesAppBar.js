import { useRef } from 'react';
import day from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { startDeleteNote, startUpdateNote, startUploadImage } from '../actions/note';
import { dialog } from '../helper/alert';

export const NotesAppBar = () => {
    
    const { active:note } = useSelector(state => state.notes);
    const dispatch = useDispatch();
    const now = day(new Date(note.created));
    const input = useRef();

    const handleSaveNote = () => dispatch(startUpdateNote());
    
    const handleChange = (evt) => {
        const file = evt.target.files[0];

        if (file) {
            dispatch(startUploadImage(file));
            dispatch(startUpdateNote());
        }
    }

    const handleDelete = () => {
        dialog()
        .then(({ isConfirmed }) => {

            if (isConfirmed) {
                dispatch(startDeleteNote());
            }
        })
        .catch(console.log)
    }

    return (
        <div className="notes__appbar">
            <span>{ now.format('D') } { now.format('dddd') } { now.year() }</span>

            <div>
                <button
                    onClick={ handleDelete }
                    className="btn">
                    <i className="far fa-trash-alt fa-lg"></i>
                    &nbsp;Delete
                </button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button 
                    onClick={ () => input.current.click() }
                    className="btn">
                    <i className="far fa-image fa-lg"></i>
                    &nbsp;Picture
                </button>
                
                <input
                    hidden
                    type="file"
                    name="file"
                    ref={ input }
                    onChange={ handleChange }
                />

                <button
                    onClick={ handleSaveNote }
                    className="btn">
                    <i className="fas fa-save fa-lg"></i>
                    &nbsp; Save
                </button>
            </div>
        </div>
    )
}