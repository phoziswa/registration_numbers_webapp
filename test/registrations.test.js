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
    it('should filter for the registration numbers from cape town ',async function () {
        var instance = RegNumbersFactory(pool);
        await instance.town('Cape town', 'CA')
        await instance.addingRegsToList("CA 123 234");
        await instance.addingRegsToList("CK 12345");
        let regNum = await instance.filter('CA');
        assert.equal('CA 123 234', regNum);
    });


    // it('should filter for registration numbers from Knysna ', function () {
    //     var instance = RegNumbersFactory(pool);

    //     await instance.addingRegsToList("CK 34587");
    //     await instance.addingRegsToList("CX 12345");
    //     await instance.addingRegsToList("CX 24689");
    //     await instance.addingRegsToList("CL 12345");
    //     await instance.addingRegsToList("CK 12345");

    //     assert.deepEqual(instance.registrationNums('CX'), ["CX 12345", "CX 24689"]);
    // });
    // it('should  filter for registration numbers from bellville', function () {
    //     var instance = RegNumbersFactory(pool);

    //     await instance.addingRegsToList("CY 12345");
    //     await instance.addingRegsToList("CY 24689");
    //     await instance.addingRegsToList("CL 12345");
    //     await instance.addingRegsToList("CK 12345");

    //     assert.deepEqual(instance.registrationNums('CY'), ["CY 12345", "CY 24689"]);
    // });
    // it('should return the registration numbers from Cape town , Knysna and Bellville', function () {
    //     var instance = RegNumbersFactory(pool);

    //     await instance.addingRegsToList("CY 24689");
    //     await instance.addingRegsToList("CA 12345");
    //     await instance.addingRegsToList("CK 12345");

    //     assert.deepEqual(instance.registrationNums('CY'), ["CA 123 145", "CY 2468 219", "CX 545 262"]);
    // });

    // it('should filter for registration numbers from Knysna ', function () {
    //     var instance = RegNumbersFactory(pool);

    //     await instance.addingRegsToList("CK 34587");
    //     await instance.addingRegsToList("CX 12345");
    //     await instance.addingRegsToList("CX 24689");
    //     await instance.addingRegsToList("CL 12345");
    //     await instance.addingRegsToList("CK 12345");

    //     assert.deepEqual(instance.registrationNums('CX'), ["CX 12345", "CX 24689"]);
    // });
    // it('should  filter for registration numbers from bellville', function () {
    //     var instance = RegNumbersFactory(pool);

    //     await instance.addingRegsToList("CY 12345");
    //     await instance.addingRegsToList("CY 24689");
    //     await instance.addingRegsToList("CL 12345");
    //     await instance.addingRegsToList("CK 12345");

    //     assert.deepEqual(instance.registrationNums('CY'), ["CY 12345", "CY 24689"]);
    // });
    // it('should return the registration numbers from Cape town , Knysna and Bellville', function () {
    //     var instance = RegNumbersFactory(pool);

    //     await instance.addingRegsToList("CY 24689");
    //     await instance.addingRegsToList("CA 12345");
    //     await instance.addingRegsToList("CK 12345");

    //     assert.deepEqual(instance.registrationNums('CY'), ["CA 123 145", "CY 2468 219", "CX 545 262"]);
    // });
});
