let status = require("./status");

const toggleStatus = (state) => {
    return state === "Active" ? "Inactive" : "Active";
};

module.exports.toggleStatus = toggleStatus;
