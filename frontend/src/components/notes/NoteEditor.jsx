import React, { useState, useEffect } from 'react';
import { DialogHeader, DialogTitle, DialogDescription, DialogClose } from '../ui/dialog';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useNotes } from '../../hooks/useNotes';
import useThemeStore from '../../store/theme';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function NoteEditor({ note, closeEditor }) {
  const { updateNote, createNote } = useNotes();
  const [title, setTitle] = useState(note ? note.title : '');
  const [content, setContent] = useState(note ? note.content : '');
  const [category, setCategory] = useState(note ? note.category : '');
  console.log(note.category)
  const { theme } = useThemeStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setCategory(note.category);
    }
  }, [note]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (note) {
        await updateNote(note._id, { title, content, category });
        
        closeEditor();
        toast.success("Note has been Updated")
      }}
     catch (error) {
      toast.success("Not able to Update the Note , please try again later")
      console.log(error)
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className={`max-w-lg w-full p-6 rounded-lg shadow-md ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">{note ? 'Edit Note' : 'Add Note'}</DialogTitle>
          <DialogDescription className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
            {note ? 'Update your note details' : 'Create a new note'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="title" className={`${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter note title"
              className={`mt-1 ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-100 text-gray-900 border-gray-200'}`}
              required
            />
          </div>

          <div>
            <Label htmlFor="category" className={`${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>Category</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger className={`mt-1 ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-100 text-gray-900 border-gray-200'}`}>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className={`${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-200'}`}>
                <SelectItem value="Work">Work</SelectItem>
                <SelectItem value="Personal">Personal</SelectItem>
                <SelectItem value="Ideas">Ideas</SelectItem>
                <SelectItem value="Todos">Todos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="content" className={`${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter note content"
              className={`mt-1 h-32 ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-100 text-gray-900 border-gray-200'}`}
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <DialogClose asChild>
              <Button 
                variant="outline" 
                className={`${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600 hover:bg-gray-600' : 'bg-white text-gray-900 border-gray-200 hover:bg-gray-100'}`}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default NoteEditor;
