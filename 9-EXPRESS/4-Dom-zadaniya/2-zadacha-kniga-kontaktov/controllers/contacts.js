function createContact(id) {
    return {
        id: id,
        name: `name of id num ${id}`,
        phone: `phone of id num ${id}`,
        email: `email of id num ${id}`,
    };
}

let contacts = [createContact(1), createContact(2)];

const getContactsHandler = (req, res) => {
    // В Express метод res.json() завершает обработку запроса и отправляет ответ клиенту в формате JSON.
    res.json(contacts);
};

const getContactSingleHandler = (req, res) => {
    const contact = contacts.find(
        (contact) => contact.id === req.params.contactId
    );
    if (contact) {
        res.json(contact);
    } else {
        res.status(404).send("Contact not found");
    }
};

const postSingleContactHandler = (req, res) => {
    if (!req.body.name || !req.body.phone || !req.body.email) {
        return res
            .status(400)
            .json({ error: "Name, phone and email is required" });
    } else {
        const { name, phone, email } = req.body;
        const newContact = {
            id: contacts.length + 1,
            name: name || `name of id num ${contacts.length + 1}`,
            phone: phone || `phone of id num ${contacts.length + 1}`,
            email: email || `email of id num ${contacts.length + 1}`,
        };
        contacts.push(newContact);
        res.status(201).json(newContact); // Возвращаем созданный контакт
    }
};

const putSingleContactHandler = (req, res) => {
    const existingContact = contacts.find(
        (contact) => contact.id === Number(req.params.contactId)
    );
    if (existingContact) {
        if (!req.body.email && !req.body.name && !req.body.phone) {
            return res
                .status(400)
                .json({ error: "Name, phone and email are required" });
        } else {
            existingContact.name = req.body.name || existingContact.name;
            existingContact.phone = req.body.phone || existingContact.phone;
            existingContact.email = req.body.email || existingContact.email;

            res.status(201).json(existingContact);
        }
    } else {
        res.status(404).json(`Contact ${req.params.contactId} not found`);
    }
};

const deleteSingleContactHandler = (req, res) => {
    const contactForDelete = contacts.find(
        (contact) => contact.id === Number(req.params.contactId)
    );
    if (contactForDelete) {
        contacts = contacts.filter(
            (contact) => contact.id !== Number(req.params.contactId)
        );
        res.status(204).send(); // Успешное удаление, без контента
    } else {
        res.status(404).send(
            `Contact with id ${req.params.contactId} not found`
        );
    }
};

module.exports = {
    getContactsHandler,
    getContactSingleHandler,
    putSingleContactHandler,
    postSingleContactHandler,
    deleteSingleContactHandler,
};
