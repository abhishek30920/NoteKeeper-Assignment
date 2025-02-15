import { useEffect, useState } from 'react';
import { useSocket } from './useSocket';
import { useNotesStore } from '../store/notes';

export const useNotes = () => {
  const { socket, isConnected } = useSocket();
  const [isLoading, setIsLoading] = useState(true);
  const { 
    notes,
    setNotes, 
    addNote, 
    updateNote: updateNoteInStore, 
    deleteNote: deleteNoteFromStore,
    fetchNotes
  } = useNotesStore();

  // Handle initial data loading and socket events
  useEffect(() => {
    let isMounted = true;
  
    if (!socket || !isConnected) {
      return;
    }
  
    console.log('Setting up note listeners');
  
    // Remove any existing listeners before setting up new ones
    socket.off('notes');
    socket.off('noteCreated');
    socket.off('noteUpdated');
    socket.off('noteDeleted');
  
    // Fetch initial notes
    const loadInitialNotes = async () => {
      try {
        if (isMounted) {
          setIsLoading(false);
        }
        socket.emit('fetchNotes');
      } catch (error) {
        console.error('Error loading initial notes:', error);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
  
    loadInitialNotes();
  
    // Set up real-time update handlers
    socket.on('notes', (receivedNotes) => {
      if (isMounted) {
        console.log('Received notes update:', receivedNotes);
        setNotes(receivedNotes);
  
      }
    });
  
    socket.on('noteCreated', (newNote) => {
      if (isMounted) {
        console.log('New note received:', newNote);
        addNote(newNote);
        refreshNotes()
      }
    });
  
    socket.on('noteUpdated', (updatedNote) => {
      if (isMounted) {
        console.log('Note update received:', updatedNote);
        updateNoteInStore(updatedNote._id, updatedNote);
        refreshNotes()
      
      }
    });
  
    socket.on('noteDeleted', (deletedNoteId) => {
      if (isMounted) {
        console.log('Note deletion received:', deletedNoteId);
        deleteNoteFromStore(deletedNoteId);
        refreshNotes()
     
      }
    });

    socket.on('getNoteFromId', (note) => {
      if (isMounted) {
        console.log('Note received:', note);
        addNote(note);
      
      }
    });
    socket.on('likedNote', (updatedNote) => {
      if (isMounted) {
        console.log('Note update received:', updatedNote);
        updateNoteInStore(updatedNote._id, updatedNote); // Use updateNoteInStore instead of likeNote
       
      }
    });
    socket.on('unlikedNote', (updatedNote) => {
      if (isMounted) {
        console.log('Note update received:', updatedNote);
        updateNoteInStore(updatedNote._id, updatedNote); // Use updateNoteInStore instead of likeNote
       
      }
    });
  
    return () => {
      console.log('Cleaning up note listeners');
      isMounted = false;
      if (socket) {
        socket.off('notes');
        socket.off('noteCreated');
        socket.off('noteUpdated');
        socket.off('noteDeleted');
        socket.off('getNoteFromId');
        socket.off('likedNote');
        socket.off('unlikedNote');
      }
    };
    }, [socket, isConnected, setNotes, addNote, updateNoteInStore, deleteNoteFromStore]);
  

  // Note operations
  const createNote = (noteData) => {
    console.log("create note")
    return new Promise((resolve, reject) => {
      if (!socket || !isConnected) {
        reject(new Error('Socket not connected'));
        return;
      }

      socket.emit('createNote', noteData, (response) => {
        if (response.error) {
          reject(new Error(response.error));
        } else {
          resolve(response);
        }
      });
    });
  };

  const getNoteFromId = (id) => {
    console.log("get note from id")
    return new Promise((resolve, reject) => {
      if (!socket || !isConnected) {
        reject(new Error('Socket not connected'));
        return;
      }

      socket.emit('getNoteFromId', id, (response) => {
        if (response.error) {
          reject(new Error(response.error));
        } else {
          resolve(response);
        }
      });
    });
  };

  const updateNote = (id, noteData) => {
    return new Promise((resolve, reject) => {
      if (!socket || !isConnected) {
        reject(new Error('Socket not connected'));
        return;
      }

      socket.emit('updateNote', { id, ...noteData }, (response) => {
        if (response.error) {
          reject(new Error(response.error));
        } else {
          resolve(response);
        }
      });
    });
  };

  const deleteNote = (id) => {
    return new Promise((resolve, reject) => {
      if (!socket || !isConnected) {
        reject(new Error('Socket not connected'));
        return;
      }

      socket.emit('deleteNote', id, (response) => {
        if (response.error) {
          reject(new Error(response.error));
        } else {
          resolve(response);
        }
      });
    });
  };

  const likeNote = (id) => {
    return new Promise((resolve, reject) => {
      if (!socket || !isConnected) {
        reject(new Error('Socket not connected'));
        return;
      }

      socket.emit('likeNote', id, (response) => {
        if (response.error) {
          reject(new Error(response.error));
        } else {
          resolve(response);
        }
      });
    });
  };

  const unlikeNote = (id) => {
    return new Promise((resolve, reject) => {
      if (!socket || !isConnected) {
        reject(new Error('Socket not connected'));
        return;
      }

      socket.emit('unlikeNote', id, (response) => {
        if (response.error) {
          reject(new Error(response.error));
        } else {
          resolve(response);
        }
      });
    });
  };

  const refreshNotes = () => {
    if (socket && isConnected) {
      socket.emit('fetchNotes');
    }
  };

  return {
    notes,
    createNote,
    updateNote,
    deleteNote,
    refreshNotes,
    isLoading,
    getNoteFromId,
    likeNote,
    unlikeNote
  };
};