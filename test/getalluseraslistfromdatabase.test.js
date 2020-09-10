const assert = require("assert");
const GreetFactory = require('../greet')


describe("The get all users as list function", function () {

	const pg = require("pg");
	const Pool = pg.Pool;
	const connectionString = process.env.DATABASE_URL || 'postgresql://postgres@localhost:5432/greet_db_test';
	const pool = new Pool({
		connectionString
	});

	const greetFactory = GreetFactory(pool);

	const INSERT_QUERY = " into person (first_name, counter) values ($1, $2)";

	beforeEach(async function () {
		await pool.query("delete from person");
	});

	it("should display all users in a list ", async function () {

        await greetFactory.addUserToDatabase("Mike");
        await greetFactory.addUserToDatabase("Spike");
		
		const results = await greetFactory.getAllUsersAsListFromDatabase();

		
		assert.deepEqual([{
            first_name: 'Mike'
          },
          {
            first_name: 'Spike'
          }], results);

	});

	
	after(function () {
		pool.end();
	})

});