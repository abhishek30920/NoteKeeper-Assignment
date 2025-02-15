import React from 'react'
import NoteList from '../components/notes/NoteList'
import useThemeStore from '../store/theme'
const Notes = () => {
  const { theme } = useThemeStore();
  return (
    <div>
    <NoteList />
    </div>
  )
}

export default Notes
