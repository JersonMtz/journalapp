import React  from 'react';
import { useSelector } from 'react-redux';
import { JournalEntry } from './JournalEntry';

export const JournalEntries = () => {

    const { list } = useSelector(state => state.notes);

    return (
        <div className="journal__entries">
            
            {
                list.map(note => (
                    <JournalEntry key={ note.id } { ...note } />
                ))
            }

        </div>
    )
};