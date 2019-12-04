const assert = require('assert');
const RegNumbersFactory = require('../registrations');
const regex_check = require('../regex_check');
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
    beforeEach(async function () {
        await pool.query("delete from registrations;");
        await pool.query("delete from town;");
    });

    it('should filter for registration numbers from Knysna ', async function () {
        var instance = RegNumbersFactory(pool);
        await instance.town('Knysna', 'CX')
        await instance.addingRegsToList("CX 123 234");
        await instance.addingRegsToList("CY 123 345");
        var regNum = await instance.filter('CX');
        assert.deepEqual([{ registration_num: 'CX 123 234', plate_code: 'CX' }], regNum);
    });
    it('should  filter for registration numbers from bellville', async function () {
        var instance = RegNumbersFactory(pool);
        await instance.town('Bellville', 'CY')
        await instance.addingRegsToList("CY 123 145");
        await instance.addingRegsToList("CA 123 445");
        var regNum = await instance.filter('CY');
        assert.deepEqual([{ registration_num: 'CY 123 145', plate_code: 'CY' }], regNum);
    });
    it('should filter for the registration numbers from cape town ', async function () {
        var instance = RegNumbersFactory(pool);
        await instance.town('Cape town', 'CA')
        await instance.addingRegsToList("CX 123 234");
        await instance.addingRegsToList("CA 123 145");
        await instance.addingRegsToList("CY 123 045");
        var regNum = await instance.filter('CA');

        assert.deepEqual([{ registration_num: 'CA 123 145', plate_code: 'CA' }], regNum);
    });
});

describe('new_regex_check_function', function () {

    it('should return true if the registration number entered in the text box is correct', function () {

        assert.equal(regex_check('CA 123 426'), true)
        assert.equal(regex_check('CA 123-345'), true)
        assert.equal(regex_check('CA 123'), true)
        assert.equal(regex_check('CA 123158'), true)
    });


    it('should return false if the registration number entered in the text box is incorrect', function () {
        assert.equal(regex_check('CAW 12340006'), false)
        assert.equal(regex_check('CA 006 1tt'), false)
    });

    after(function () {
        pool.end();
    })
});
