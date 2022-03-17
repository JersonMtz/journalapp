import { useDispatch } from 'react-redux';
import day from 'dayjs';
import { noteActive } from '../actions/note';

export const JournalEntry = ({ id, title, body, imageUrl, created }) => {

    const dispatch = useDispatch();

    const handleEntryActive = () => dispatch(noteActive(id, { title, body, imageUrl, created }));

    return (
        <div 
            className="journal__entry pointer animate__animated animate__fadeIn" 
            onClick={ handleEntryActive }>
            {
                imageUrl &&
                <div 
                    className="journal__entry-picture"
                    style={{
                        backgroundSize: 'cover',
                        backgroundImage: `url(${ imageUrl })`
                    }}
                ></div>
            }

            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    { title }
                </p>
                <p className="journal__entry-content">
                    { body }
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>{ day(created).format('dddd') }</span>
                <h4>{ day(created).format('D') }</h4>
            </div>

        </div>
    )
}
