module.exports = function GreetFactory(pool) {


    // var userMap = {}; // old

    // function getAllUsers() {
    //     return userMap;
    // }

    // addUser(name); // old
    // function getAllUsersAsList() {
    //     return Object.keys(userMap);
    // }
    // function addUser(userName) {
    //     if (userMap[userName] === undefined) {
    //         userMap[userName] = 0;
    //     }
    //     userMap[userName]++
    // }
    // function getGreetCount() {
    //     return Object.keys(userMap).length;
    // }
    // function getGreetCountForUser(name) {
    //     if (userMap[name] !== undefined) {
    //         return userMap[name];
    //     }
    //     return 0;
    // }
    // function resetBtn() {
    //     userMap = {};
    // }
    // addUser,
    // getGreetCount,
    // getAllUsers,
    // getAllUsersAsList,
    // getGreetCountForUser,
    async function greetUser(name, language) {
        if (!language || !name) {
            return "";
        }
        if (await doesUserExist(name)) {
            await updateUserCounter(name);
        } else {
            await addUserToDatabase(name);
        }

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

    async function addUserToDatabase(userName) {
        await pool.query(`insert into person (first_name, counter) values ('${userName}',1)`);
    }

    async function doesUserExist(firstName) {
        let result = await pool.query(`select * from person where first_name = '${firstName}'`);
        if (result.rowCount == 0) {
            return false;
        } else {
            return true
        }
    }

    async function updateUserCounter(firstName) {
        let updatedCounter = await getGreetCountForUserFromDatabase(firstName) + 1;
        await pool.query(`update person set counter = ${updatedCounter} where first_name = '${firstName}'`);
    }

    async function getGreetCountFromDatabase() {
        let result = await pool.query('select count(*) from person');
        return result.rows[0]["count"];
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

    async function getAllUsersAsListFromDatabase() {
        let result = await pool.query(`select first_name from person`);
        return result.rows;
    }

    async function getGreetCountForUserFromDatabase(name) {

        let result = await pool.query(`select counter from person where first_name = '${name}' `);
        return result.rows[0].counter;
    }

    async function resetBtn() {
        await pool.query('delete from person');
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
        getNameFromInput,
        getGreetCountFromDatabase,
        getGreetCountForUserFromDatabase,
        getAllUsersAsListFromDatabase,
        addUserToDatabase,
        resetBtn,
        displayFlashMsg,
    }
}