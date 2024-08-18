const { person } = require("./person");

person.name = "BBB";
person.hobbies.push("programmer");

module.exports.updatedPerson = person;
