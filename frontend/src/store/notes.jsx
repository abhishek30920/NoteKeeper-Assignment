import { create } from 'zustand'
import useAuthStore from './auth'
export const useNotesStore = create((set) => ({
  notes: [],
  setNotes: (notes) => set({ notes }),
  addNote: (note) => set((state) => ({ notes: [...state.notes, note] })),
  updateNote: (id, note) => set((state) => ({ notes: state.notes.map((n) => n.id === id ? note : n) })),
  deleteNote: (id) => set((state) => ({ notes: state.notes.filter((n) => n.id !== id) })),
  likeNote: (id) => set((state) => ({ notes: state.notes.map((n) => n.id === id ? { ...n, likes: n.likes + 1 } : n) })),
}))



