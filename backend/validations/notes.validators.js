const { body } = require('express-validator');

const createNoteValidator = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('content').trim().notEmpty().withMessage('Content is required'),
];

module.exports = { createNoteValidator };
