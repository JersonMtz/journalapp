import { useSelector } from 'react-redux';
import { Sidebar } from '../components/Sidebar';
import { NotePage } from './NotePage';
import { NothingSelected } from '../components/NothingSelected';

export const JournalPage = () => {

    const { active } = useSelector(state => state.notes)

    return (
        <div className="journal__main-content">
            <Sidebar />
            <main>
                {
                    (active)?
                        <NotePage />
                    :
                        <NothingSelected /> 
                }
            </main>
        </div>
    )
}
