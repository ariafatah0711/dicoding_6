const { nanoid } = require("nanoid");
const notes = require("./notes");

const addNoteHandler = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading, finished } = request.payload;

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newNotes = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  if (!name) {
    return h
      .response({
        status: "fail",
        message: "Gagal menambahkan buku. Mohon isi nama buku",
      })
      .code(400);
  }
  if (readPage > pageCount) {
    return h
      .response({
        status: "fail",
        message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
      })
      .code(400);
  }

  notes.push(newNotes);

  const response = h.response({
    status: "success",
    message: "Buku berhasil ditambahkan",
    data: {
      bookId: id,
    },
  });
  response.code(201);
  return response;
};

const getAllNotesHandler = () => ({
  status: "success",
  data: {
    books: notes.map((note) => ({ id: note.id, name: note.name, publisher: note.publisher })),
  },
});

const getNoteByIdHandler = (request, h) => {
  const bookid = request.params.bookid;

  const note = notes.find((note) => note.id == bookid);

  if (note != undefined) {
    return {
      status: "success",
      data: {
        book: note,
      },
    };
  }

  const response = h.response({
    status: "fail",
    message: "Buku tidak ditemukan",
  });
  response.code(404);
  return response;
};

module.exports = { addNoteHandler, getAllNotesHandler, getNoteByIdHandler };
