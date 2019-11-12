const assert = require('assert');
const Registrations = require('../registrations');
const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://coder:lubanzi25@localhost:5432/registration_numbers_tests';

const pool = new Pool({
    connectionString
});

describe('registration numbers webapp', function () {

    beforeEach(async function () {
        await pool.query("delete from registrations;");
        await pool.query("delete from town;");
    });

    it('should add a registration number', async function () {
        let instance = RegNumbersFactory(pool);
        // await instance.town('Cape town','CA')
        await instance.addingRegsToList('CA 123 123');
        let regnumber = await instance.getReg();
        assert.equal(1, regnumber.length);
    });

    it('should not add a registration number if it is on the database already', async function () {
        let instance = RegNumbersFactory(pool);
        // await instance.town('Cape town','CA')
        await instance.addingRegsToList('CA 123 123');
        await instance.addingRegsToList('CA 123 123');
        let regnumber = await instance.getReg();
        assert.equal(1, regnumber.length);
    });
});