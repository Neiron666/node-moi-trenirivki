const { myName, myFavoriteNumber, myHobbies } = require("./multiple-export");
const {
    myFriendsName,
    myName: myOtherName,
    myGreatHobbies,
} = require("./export-and-import");
const greetingFn = require("./my-modules/single-export");

// const greetingFn = require("d:/UDEMI/node-moi-trenirivki/6-Module-CommonJS/6-Praktika-Modules-CommonJs/single-export.js");

//Import from multiple-exports
console.log(myName);
console.log(myHobbies);
console.log(myFavoriteNumber);

myHobbies.push("climbing");

console.log(greetingFn);
greetingFn(myName);

//Import from single-export
console.log(myOtherName);
console.log(myFriendsName);
console.log(myGreatHobbies);
