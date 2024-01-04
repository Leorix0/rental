const validateMySQLID = id => {
    const isValid = /^[1-9]\d*$/.test(id);
    if (!isValid) {
        throw new Error("ID is not valid or found");
    }
}

module.exports = validateMySQLID;
