const assert = require('assert');
const RegNumbersFactory = require('../registrations');
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
        await instance.town('Knysna', 'CX')
        await instance.addingRegsToList('CX 123 021');
        let regnumber = await instance.getReg();
        assert.equal(regnumber.length, 1);
    });

    it('should not add a registration number if it is on the database already', async function () {
        let instance = RegNumbersFactory(pool);
        await instance.town('Cape town', 'CA')
        await instance.addingRegsToList('CA 132 021');
        await instance.addingRegsToList('CA 132 021');
        let regnumber = await instance.getReg();
        assert.equal(regnumber.length, 1);
    });
});

