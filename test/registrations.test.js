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
        var instance = RegNumbersFactory(pool);
        await instance.town('Knysna', 'CX')
        await instance.addingRegsToList('CX 123 021');
        var regnumber = await instance.getReg();
        assert.equal(regnumber.length, 1);
    });

    it('should not add a registration number if it is on the database already', async function () {
        var instance = RegNumbersFactory(pool);
        await instance.town('Cape town', 'CA')
        await instance.addingRegsToList('CA 132 021');
        await instance.addingRegsToList('CA 132 021');
        var regnumber = await instance.getReg();
        assert.equal(regnumber.length, 1);
    });
});
describe('filter function', function () {
    it('should filter for the registration numbers from cape town ', async function () {
        var instance = RegNumbersFactory(pool);
        await instance.town('Cape town', 'CA')
        await instance.addingRegsToList("CA 123 234");
        await instance.addingRegsToList("Cx 12345");
        var regNum = await instance.filter('CA');
        assert.equal('CA 123 234', regNum);
    });

    it('should filter for registration numbers from Knysna ', async function () {
        var instance = RegNumbersFactory(pool);
        await instance.town('Knysna', 'CX')
        await instance.addingRegsToList("CX 123 234");
        await instance.addingRegsToList("CA 12345");
        await instance.addingRegsToList("CY 12345");
        var regNum = await instance.filter('CX');
        assert.equal('CX 123 234', regNum);

    });
    it('should  filter for registration numbers from bellville', async function () {
        var instance = RegNumbersFactory(pool);
        await instance.town('Bellville', 'CY')
        await instance.addingRegsToList("CY 123 145");
        await instance.addingRegsToList("CA 12345");
        var regNum = await instance.filter('CY');
        assert.equal('CY 123 145', regNum);

    });
});
