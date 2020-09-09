const assert = require("assert");
const GreetFactory = require('../greet')


describe("The addUserToDatabase function", function () {

	const pg = require("pg");
	const Pool = pg.Pool;
	const connectionString = process.env.DATABASE_URL || 'postgresql://amirah:coder123@localhost:5432/greeter';
	const pool = new Pool({
		connectionString
	});

	const greetFactory = GreetFactory(pool);

	const INSERT_QUERY = "insert into person (first_name, counter) values ($1, $2)";

	beforeEach(async function () {
		await pool.query("delete from person");
	});

	it("should add user to database", async function () {
		greetFactory.addUserToDatabase("Amirah");

		const results = await pool.query("select count(*) from person");


		assert.equal(1, results.rows[0].count);

	});

	after(function () {
		pool.end();
	})

});





// it("", async function () {

// 	await pool.query(INSERT_QUERY, ["Snowy", 4, "Wednesday"]);
// 	await pool.query(INSERT_QUERY, ["Spotty", 3, "Friday"]);
// 	await pool.query(INSERT_QUERY, ["Kitty", 7, "Thursday"]);

// 	const results = await pool.query("select count(*)from booking");

// 	// how many bookings should be found?
// 	assert.equal(3, results.rows[0].count);

// });

// it("", async function () {

// 	await pool.query(INSERT_QUERY, ["Kitty", 7, "Thursday"]);

// 	const results = await pool.query("select * from booking where name = $1", ["Kitty"]);

// 	// what fields should have been found in the database?
// 	assert.equal("Kitty", results.rows[0].name);
// 	assert.equal(7, results.rows[0].staying_for);
// 	assert.equal("Thursday", results.rows[0].arriving_on);

// });

// it("", async function () {

// 	await pool.query(INSERT_QUERY, ["Kitty", 7, "Thursday"]);

// 	let results = await pool.query("select * from booking where name = $1", ["Kitty"]);

// 	assert.equal("Kitty", results.rows[0].name);
// 	assert.equal(7, results.rows[0].staying_for);
// 	assert.equal("Thursday", results.rows[0].arriving_on);

// 	await pool.query("update booking set staying_for = $2  where name = $1", ["Kitty", 5]);

// 	results = await pool.query("select * from booking where name = $1", ["Kitty"]);

// 	// what new values should have been found
// 	assert.equal("Kitty", results.rows[0].name);
// 	assert.equal(5, results.rows[0].staying_for);
// 	assert.equal("Thursday", results.rows[0].arriving_on);

// });

// it("", async function () {

// 	await pool.query(INSERT_QUERY, ["Snowy", 5, "Wednesday"]);
// 	await pool.query(INSERT_QUERY, ["Spotty", 3, "Friday"]);
// 	await pool.query(INSERT_QUERY, ["Kitty", 7, "Thursday"]);

// 	const results = await pool.query("select count(*) from booking where staying_for >= 5");

// 	// how many bookings should be found?
// 	assert.equal(2, results.rows[0].count);

// });