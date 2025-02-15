import React, { useState, useEffect } from 'react';

import { useNotes } from '../../hooks/useNotes';
import NoteCategorySelector from './NoteCategorySelector';

const NoteList = () => {
  const { notes } = useNotes();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filteredNotes, setFilteredNotes] = useState([]);

  // **Effect to Filter Notes**
  useEffect(() => {
    let updatedNotes = notes;

    // Apply Category Filter
    if (filterCategory !== 'All') {
      updatedNotes = updatedNotes.filter((note) => note.category === filterCategory);
    }

    // Apply Search Filter
    if (searchTerm.trim()) {
      updatedNotes = updatedNotes.filter(
        (note) =>
          note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredNotes(updatedNotes);
  }, [notes, searchTerm, filterCategory]);

  return (
    <div>
      {/* Category Selector */}
      <NoteCategorySelector  />

     

    </div>
  );
};

export default NoteList;
