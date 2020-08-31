module.exports = function GreetFactory() {

    var userMap = { };

    function greetUser(name, language) {
        if (!language || !name) {
            return "";
        }
        addUser(name);
        switch (language) {
            case "english":
                return `Hello, ${name}`;
            case "french":
                return `Bonjour, ${name}`;
            case "afrikaans":
                return `Hallo, ${name}`;
            default:
                return `Hallo, ${name}`;
        }
    }

    function addUser(userName) {
        if (userMap[userName] === undefined) {
            userMap[userName] = 0;
        }
        userMap[userName]++
    }

    function getGreetCount() {
        return Object.keys(userMap).length;
    }

    function getNameFromInput(textBoxValue) {
        var regularExpression = /[^A-Za-z]/g;
        if (textBoxValue !== "") {
            var lettersOnly = textBoxValue.replace(regularExpression, "")
            var name = lettersOnly.charAt(0).toUpperCase() + lettersOnly.slice(1).toLowerCase()
            return name;
        }
        return "";
    }

    function getAllUsers() {
        return userMap;
    }

    function getAllUsersAsList() {
        return Object.keys(userMap);
    }

    function getGreetCountForUser(name) {
        if (userMap[name] !== undefined) {
            return userMap[name];
        }
        return 0;
    }

    function resetBtn() {
        userMap = {};
    }

    function displayFlashMsg(name, language) {
        if (name === "" && language === undefined) {
            return "please enter a name and language"
        }
        if (name === "") {
            return "no name entered"
        }
        if (language === undefined) {
            return "no language selected"
        }
    };

    return {
        greetUser,
        addUser,
        getGreetCount,
        getNameFromInput,
        getAllUsers,
        resetBtn,
        getAllUsersAsList,
        getGreetCountForUser,
        displayFlashMsg
    }
}