import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogClose } from '../ui/dialog'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { useNotes } from '../../hooks/useNotes'
import useThemeStore from '../../store/theme'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddNotes({ children }) {
  const { createNote } = useNotes()  // Changed from addNote to createNote
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('')
  const { theme } = useThemeStore()
  const [open, setOpen] = useState(false)
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createNote({ title, content, category });
    
      setTitle('');
      setContent('');
      setCategory('');
      setOpen(false); // Close dialog after successful save
      toast.success('Note has been Created')
    } catch (error) {
      toast.success('Error creating note:', error);
      console.error('Error creating note:', error);
     
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <DialogHeader className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            <DialogTitle className="text-xl font-semibold">Add Notes</DialogTitle>
            <DialogDescription className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Add a new note to your collection
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className={`${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter note title"
                className={`${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-200'}`}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category" className={`${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>Category</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger className={`${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-200'}`}>
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
            <div className="space-y-2">
              <Label htmlFor="content" className={`${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>Content</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter note content"
                className={`h-32 ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-200'}`}
                required
              />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <DialogClose asChild>
                <Button 
                  type="button" 
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
                {isSubmitting ? 'Saving...' : 'Save Note'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AddNotes