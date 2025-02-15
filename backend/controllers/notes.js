// controllers/notes.js
const Note = require('../models/note');
let io;

exports.setSocketIO = (socketIO) => {
  io = socketIO;
};

exports.setupSocketHandlers = (socket) => {
  const userId = socket.user?.id;
  if (!userId) {
    console.error('No user ID found in socket connection');
    return;
  }

  // Prevent multiple event registrations
  if (socket._hasNoteHandlers) {
    return;
  }
  socket._hasNoteHandlers = true;

  console.log("Setting up note handlers for user:", userId);

  const addHandler = (event, handler) => {
    socket.removeAllListeners(event); // Remove previous listeners to avoid duplicates
    socket.on(event, handler);
  };

  // Fetch all notes
  addHandler('fetchNotes', async () => {
    try {
      const notes = await Note.find({ userId }).sort({ likes: -1 });
      socket.emit('notes', notes);
    } catch (error) {
      console.error('Error fetching notes:', error);
      socket.emit('error', { message: error.message });
    }
  });

  // Create a note
  addHandler('createNote', async (noteData, callback) => {
    try {
      if (!noteData.title || !noteData.content) {
        throw new Error('Title and content are required');
      }
      console.log("Creating note...");

      const note = new Note({
        ...noteData,
        userId
      });
      await note.save();

      console.log("Note created:", note);
      socket.to(`user-${userId}`).emit('noteCreated', note);
      callback({ success: true, note });
    } catch (error) {
      console.error('Error creating note:', error);
      callback({ error: error.message });
    }
  });

    addHandler('getNoteFromId', async (id, callback) => {
      const note = await Note.findOne({ _id: id, userId });
      callback({ success: true, note });
    });
    // Update a note
  addHandler('updateNote', async ({ id, ...noteData }, callback) => {
    try {
      if (!id) {
        throw new Error('Note ID is required');
      }

      const note = await Note.findOneAndUpdate(
        { _id: id, userId },
        noteData,
        { new: true }
      );

      if (!note) {
        throw new Error('Note not found');
      }

      socket.to(`user-${userId}`).emit('noteUpdated', note);
      callback({ success: true, note });
    } catch (error) {
      console.error('Error updating note:', error);
      callback({ error: error.message });
    }
  });

  addHandler('likeNote', async (id, callback) => {
    try {
      if (!id) {
        throw new Error('Note ID is required');
      }
    const note = await Note.findOneAndUpdate({ _id: id }, { $inc: { likes: 1 } });
    socket.to(`user-${userId}`).emit('likedNote', note);
    callback({ success: true, note });

    console.log('Note liked:', note);
    } catch (error) {
      console.error('Error liking note:', error);
      callback({ error: error.message });
    }
  });

  addHandler('unlikeNote', async (id, callback) => {
    try {
      if (!id) {
        throw new Error('Note ID is required');
      }
      const note = await Note.findOneAndUpdate({ _id: id }, { $inc: { likes: -1 } });
      socket.to(`user-${userId}`).emit('unlikedNote', note);
      callback({ success: true, note });
      console.log('Note unliked:', note);
    } catch (error) {
      console.error('Error unliking note:', error);
      callback({ error: error.message });
    }
  });
  
  
  // Delete a note
  addHandler('deleteNote', async (id, callback) => {
    try {
      if (!id) {
        throw new Error('Note ID is required');
      }

      const note = await Note.findOneAndDelete({ _id: id, userId });

      if (!note) {
        throw new Error('Note not found');
      }

      socket.to(`user-${userId}`).emit('noteDeleted', id);
      callback({ success: true });
    } catch (error) {
      console.error('Error deleting note:', error);
      callback({ error: error.message });
    }
  });

  // Cleanup on disconnect
  socket.on('disconnect', () => {
    console.log(`User ${userId} disconnected, cleaning up handlers.`);
    socket._hasNoteHandlers = false;
  });
};
