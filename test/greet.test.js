let assert=require("assert");
let GreetFactory = require("../greet");
describe("The greetUser function", function () {
    it("should greet Amirah correctly", function () {
        var greetFactoryOne = GreetFactory()
        assert.equal("Hello, Amirah", greetFactoryOne.greetUser("Amirah", "english"));
    });
    it("should greet Susan correctly", function () {
        var greetFactoryOne = GreetFactory()
        assert.equal("Hallo, Susan", greetFactoryOne.greetUser("Susan", "afrikaans"));
    });
    it("should greet Mecayle correctly", function () {
        var greetFactoryOne = GreetFactory()
        assert.equal("Bonjour, Mecayle", greetFactoryOne.greetUser("Mecayle", "french"));
    });
});

describe("The getGreetCount function", function () {
    it("should return the total number of users greeted", function () {
        var greetFactoryOne = GreetFactory();
        assert.equal(0,greetFactoryOne.getGreetCount());
    });
    it("should return the total number of users greeted", function () {
        var greetFactoryOne = GreetFactory();
        greetFactoryOne.greetUser("Mujahid","english")
        assert.equal(1,greetFactoryOne.getGreetCount());
    });
});

describe("The getAllUsers function", function () {
    it("should return the object of all users greeted", function () {
        var greetFactoryOne = GreetFactory();
        greetFactoryOne.greetUser("Daiyaan","french");
        greetFactoryOne.greetUser("Mujahid","english");
        assert.deepEqual({"Daiyaan":0,"Mujahid":0},greetFactoryOne.getAllUsers());
    });
    it("should return the object of all users greeted", function () {
        var greetFactoryOne = GreetFactory();
        greetFactoryOne.greetUser("Mujahid","english");
        assert.deepEqual({"Mujahid":0},greetFactoryOne.getAllUsers());
    });
    it("should return the total number of users greeted", function () {
        var greetFactoryOne = GreetFactory();
        greetFactoryOne.greetUser("Mujahid","english")
        assert.equal(1,greetFactoryOne.getGreetCount());
    });
});

describe("The getNameFromInput function", function () {
    it("should return a name without numbers or special characters", function () {
        var greetFactoryOne = GreetFactory()
        assert.equal("Amirah", greetFactoryOne.getNameFromInput("34AM@%$#ir55//4a><h"));
        assert.equal("Yaanie",greetFactoryOne.getNameFromInput("1234yaanie123456@$#@$@#%@%$#$"));
        assert.equal("",greetFactoryOne.getNameFromInput(""));
    });
});