import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { noteActive } from '../actions/note';
import { NotesAppBar } from '../components/NotesAppBar';
import { useForm } from '../hooks/useForm';

export const NotePage = () => {

    const dispatch = useDispatch();
    const { active:note } = useSelector(state => state.notes);
    const [form, handleChange, reset] = useForm(note);
    const refNote = useRef({ id: note.id, image: note.imageUrl });

    useEffect(() => {
        if (note.id !== refNote.current.id || note.imageUrl !== refNote.current.image) {
            reset(note);
            refNote.current = { id: note.id, image: note.imageUrl };
        }
    }, [note, reset]);

    useEffect(() => {
        dispatch(noteActive(form.id, form));
    }, [form, dispatch]);
    
    return (
        <div className="notes__main-content">
            
            <NotesAppBar />

            <div className="notes__content">

                <input 
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    name="title"
                    value={ form.title }
                    onChange={ handleChange }
                />

                <textarea
                    placeholder="What happened today"
                    className="notes__textarea"
                    name="body"
                    value={ form.body }
                    onChange={ handleChange }
                ></textarea>

                {
                    form.imageUrl && (
                        <div className="notes__image">
                            <img 
                                src={ form.imageUrl }
                                alt="imagen"
                            />
                        </div>
                    )
                }


            </div>

        </div>
    )
}
