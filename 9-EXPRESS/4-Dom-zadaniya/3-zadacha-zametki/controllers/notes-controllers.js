function createNoteFn(id) {
    return {
        id: id,
        title: `Note title with id ${id}`,
        description: `Description of note with id ${id}`,
    };
}

let notes = [createNoteFn(1), createNoteFn(2)];

const getNotesHandler = (req, res) => {
    res.json(notes);
};

const getSingleNoteHandler = (req, res) => {
    const existingNote = notes.find(
        (note) => note.id === Number(req.params.noteId)
    );

    if (existingNote) {
        res.json(existingNote);
    } else {
        res.status(404).send(`Note with id ${req.params.noteId} not found`);
    }
};

const postSingleNoteHandler = (req, res) => {
    if (!req.body.title || !req.body.description) {
        return res
            .status(400)
            .json({ error: "Title and description are required" });
    } else {
        const { title, description } = req.body;
        const newNote = {
            id: notes.length + 1,
            title: title || `Note title with id ${notes.length + 1}`,
            description:
                description ||
                `Description of note with id ${notes.length + 1}`,
        };
        notes.push(newNote);
        res.status(201).json(newNote);
    }
};

const putSingleNoteHandler = (req, res) => {
    const existingNote = notes.find(
        (note) => note.id === Number(req.params.noteId)
    );
    if (existingNote) {
        if (!req.body.title && !req.body.description) {
            return res
                .status(400)
                .json({ error: "Title and description are required" });
        } else {
            existingNote.title = req.body.title || existingNote.title;
            existingNote.description =
                req.body.description || existingNote.description;
            res.status(200).json(existingNote); // Возвращаем измененную задачу
        }
    } else {
        res.status(404).send(`Note ${req.params.noteId} no found`);
    }
};

const deleteSingleNoteHandler = (req, res) => {
    const existingNote = notes.find(
        (note) => note.id === Number(req.params.noteId)
    );
    if (existingNote) {
        notes = notes.filter((note) => note.id !== Number(req.params.noteId));
        res.status(204).send(); // Успешное удаление, без контента
    } else {
        res.status(404).send(`Note ${req.params.noteId} not found`);
    }
};

module.exports = {
    getNotesHandler,
    getSingleNoteHandler,
    postSingleNoteHandler,
    putSingleNoteHandler,
    deleteSingleNoteHandler,
};
