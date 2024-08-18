const myName = "Valik";
const myHobbies = ["swimming", "boxing", "cycling"];
const myFavoriteNumber = 77;

console.log("Text from the multiple-exports CommonJs module");

module.exports.myName = myName;
exports.myHobbies = myHobbies;
exports.myFavoriteNumber = myFavoriteNumber;

console.log(myHobbies);
