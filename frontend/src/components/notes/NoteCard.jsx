import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";
import { Heart, Edit, Trash, Eye } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle ,DialogHeader,DialogDescription} from "../ui/dialog";
import NoteEditor from "./NoteEditor";
import { useNotes } from "../../hooks/useNotes";
import useThemeStore from "../../store/theme";
import { DetailedNoteView } from "./DetailedView";
const categoryStyles = {
  work: {
    light: "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-300 shadow-blue-100/50",
    dark: "bg-gradient-to-br from-blue-900/30 to-blue-800/30 border-blue-700 shadow-blue-900/30",
  },
  personal: {
    light: "bg-gradient-to-br from-purple-50 to-purple-100 border-purple-300 shadow-purple-100/50",
    dark: "bg-gradient-to-br from-purple-900/30 to-purple-800/30 border-purple-700 shadow-purple-900/30",
  },
  ideas: {
    light: "bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-300 shadow-emerald-100/50",
    dark: "bg-gradient-to-br from-emerald-900/30 to-emerald-800/30 border-emerald-700 shadow-emerald-900/30",
  },
  todos: {
    light: "bg-gradient-to-br from-amber-50 to-amber-100 border-amber-300 shadow-amber-100/50",
    dark: "bg-gradient-to-br from-amber-900/30 to-amber-800/30 border-amber-700 shadow-amber-900/30",
  },
  default: {
    light: "bg-gradient-to-br from-gray-50 to-gray-100 border-gray-300 shadow-gray-100/50",
    dark: "bg-gradient-to-br from-gray-800/30 to-gray-700/30 border-gray-600 shadow-gray-900/30",
  },
};


const NoteCard = ({ note }) => {
  const { deleteNote, likeNote, unlikeNote } = useNotes();
  const { theme } = useThemeStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const getCategoryStyle = (category) => {
    const categoryKey = category?.toLowerCase() || 'default';
    return categoryStyles[categoryKey]?.[theme] || categoryStyles.default[theme];
  };


  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };


  const handleLike = async () => {
    if (isLiked) {
      await unlikeNote(note._id);
      setIsLiked(false);
    } else {
      await likeNote(note._id);
      setIsLiked(true);
    }
  };

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }} 
      whileTap={{ scale: 0.98 }}
      className="w-full max-w-md mx-auto"
    >
      <Card className={`
        ${getCategoryStyle(note.category)}
        p-4 
        border-2 
        rounded-2xl 
        shadow-lg 
        transition-all 
        duration-300
        backdrop-blur-sm
        ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}
      `}>
        <CardHeader className="p-4">
          <CardTitle className="text-xl font-bold flex justify-between items-start gap-4">
            <span className="truncate max-w-[calc(100%-120px)]" title={note.title}>
              {truncateText(note.title, 50)}
            </span>
            <div className="flex gap-2 shrink-0">
              <Button 
                variant="ghost" 
                size="icon"
                className={`
                  hover:bg-red-500/20 transition-colors 
                  ${isLiked ? 'text-red-500' : theme === 'dark' ? 'hover:text-red-400' : 'hover:text-red-600'}
                `}
                onClick={handleLike}
              >
                <Heart className="w-5 h-5" fill={isLiked ? "currentColor" : "none"} />
              </Button>

              <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className={`hover:bg-blue-500/20 transition-colors ${theme === 'dark' ? 'hover:text-blue-400' : 'hover:text-blue-600'}`}
                  >
                    <Edit className="w-5 h-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className={theme === "dark" ? "bg-gray-800 text-gray-100" : "bg-white"}>
                  <NoteEditor note={note} closeEditor={() => setIsEditOpen(false)} />
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className={`hover:bg-gray-500/20 transition-colors ${theme === 'dark' ? 'hover:text-gray-300' : 'hover:text-gray-700'}`}
                  >
                    <Eye className="w-5 h-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className={`max-w-2xl w-full ${theme === "dark" ? "bg-gray-800 text-gray-100" : "bg-white"}`}>
                  <DetailedNoteView note={note} theme={theme} />
                </DialogContent>
              </Dialog>

              <Button 
                variant="ghost" 
                size="icon"
                className={`hover:bg-red-500/20 transition-colors ${theme === 'dark' ? 'hover:text-red-400' : 'hover:text-red-600'}`}
                onClick={() => deleteNote(note._id)}
              >
                <Trash className="w-5 h-5" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        {/* Changed from p tag to div to avoid nesting issues */}
        <CardContent className="px-4">
          <div 
            className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-sm line-clamp-2`}
            title={note.content}
          >
            {note.content}
          </div>
        </CardContent>
        <CardFooter className="px-4">
          <div className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} text-xs`}>
            {new Date(note.createdAt).toLocaleString()}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default NoteCard;