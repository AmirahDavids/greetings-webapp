const assert = require("assert");
const GreetFactory = require('../greet')

describe("The getGreetCount function", function () {

    const pg = require("pg");
    const Pool = pg.Pool;
    const connectionString = process.env.DATABASE_URL || 'postgresql://amirah:coder123@localhost:5432/greeter';
    const pool = new Pool({
        connectionString
    });

    const INSERT_QUERY = "insert into person (first_name,counter)values($1,$2)";

    const greetFactory = GreetFactory(pool);

    beforeEach(async function () {
        await pool.query("delete from person");
    });

    it("should select the counter from database", async function () {
        greetFactory.getGreetCountFromDatabase();


        await pool.query(INSERT_QUERY, ["Mecayle", 1]);

        const results = await greetFactory.getGreetCountFromDatabase()
        
        assert.equal(1, results);

    });
    // after(function () {
    //     pool.end();
    // })

});