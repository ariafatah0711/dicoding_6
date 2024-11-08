const { addNoteHandler, getAllNotesHandler, getNoteByIdHandler } = require("./handler");

const routes = [
  {
    method: "POST",
    path: "/books",
    handler: addNoteHandler,
  },
  {
    method: "GET",
    path: "/books",
    handler: getAllNotesHandler,
  },
  {
    method: "GET",
    path: "/books/{bookid}",
    handler: getNoteByIdHandler,
  },
];

module.exports = routes;
