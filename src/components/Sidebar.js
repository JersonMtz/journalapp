import { useDispatch, useSelector } from 'react-redux';
import { logOutUser } from '../actions/auth';
import { clearNotes, startNewNote } from '../actions/note';
import { JournalEntries } from './JournalEntries';

export const Sidebar = () => {
    
    const dispatch = useDispatch();
    const { auth } = useSelector(state => state);

    const handleLogOut = () => {
        dispatch(logOutUser());
        dispatch(clearNotes());
    }

    const handleNewNote = () => dispatch(startNewNote());

    return (
        <aside className="journal__sidebar">
            
            <div className="journal__sidebar-navbar">
                <h3 className="mt-5">
                    <i className="far fa-moon"></i>
                    <span>&nbsp;{ auth?.name }</span>
                </h3>

                <button 
                    className="btn"
                    onClick={ handleLogOut }>
                    Logout
                </button>
            </div>

            <div 
                className="journal__new-entry"
                onClick={ handleNewNote }>
                <i className="far fa-calendar-plus fa-5x"></i>
                <p className="mt-5">
                    New entry
                </p>
            </div>

            <JournalEntries />    

        </aside>
    )
}
