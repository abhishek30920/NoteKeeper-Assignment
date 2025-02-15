import React from "react";
import { DialogHeader,DialogTitle,DialogDescription } from "../ui/dialog";
export const DetailedNoteView = ({ note, theme }) => {
  return (
    <div className="space-y-4">
      <DialogHeader>
        <DialogTitle className="text-xl font-bold">
          {note.title}
        </DialogTitle>
        <DialogDescription>
          <div className={`mt-4 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
            {note.content}
          </div>
          <div className={`mt-4 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
            Category: {note.category || "Uncategorized"}
          </div>
          <div className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
            Created: {new Date(note.createdAt).toLocaleString()}
          </div>
        </DialogDescription>
      </DialogHeader>
    </div>
  );
};
