module.exports=function GreetFactory(stored) {

    var userMap = stored || {};

    function greetUser(name, language) {
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

    function getAllUsers(){
        // this is to be used for local storage
        return userMap;
    }

    function resetBtn(){
        userMap = {};
        localStorage.clear("greetedUsers");
    }


    return {
        greetUser,
        getGreetCount,
        getNameFromInput,
        getAllUsers,
        resetBtn
    }
}
































