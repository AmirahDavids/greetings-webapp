const assert = require("assert");
const GreetFactory = require('../greet')

describe("The getGreetCountForUserFromDatabase function", function () {

    const pg = require("pg");
    const Pool = pg.Pool;
    const connectionString = process.env.DATABASE_URL || 'postgresql://amirah:coder123@localhost:5432/greeter';
    const pool = new Pool({
        connectionString
    });

    const INSERT_QUERY ="insert into person (first_name,counter)values($1,$2)";

    const greetFactory = GreetFactory(pool);

    beforeEach(async function () {
        await pool.query("delete from person");
    });

    it("should select the counter for user from database", async function () {
      
         await pool.query(INSERT_QUERY, ["Amirah", 2]);

        const results = await pool.query(`select counter from person where first_name = 'Amirah'`);

        assert.equal(2, results.rows[0].counter);

    });
    after(function () {
        pool.end();
    })

});