let assert = require("assert");
let registrations = require("../registrations");


describe(' Adding function', function () {
    it('should add the reg number if it is not in the list ', function () {

        var instance = RegNumbersFactory();

        instance.addingRegsToList("CA 12345");

        assert.deepEqual(instance.getReg(), ["CA 12345"]);
    });
//     it('should add two registration numbers in the list', function () {

//         var instance = RegNumbersFactory();

//         instance.addingRegsToList("CA 12345");
//         instance.addingRegsToList("CY 12345");

//         assert.deepEqual(instance.getReg(), ["CA 12345", "CY 12345"]);
//     });
//     it('should return an error message if the add button is pressed and no registration added', function () {

//         var instance = RegNumbersFactory();

//         assert.deepEqual(instance.addingRegsToList("First enter the registration number"), false);

//     });
// });

// describe('filter function', function () {
//     it('should return only the registrations from cape town if the registration number starts with "CA"', function () {
//         var instance = RegNumbersFactory();

//         instance.addingRegsToList("CA 12345");
//         instance.addingRegsToList("CA 24689");
//         instance.addingRegsToList("CL 12345");
//         instance.addingRegsToList("CK 12345");

//         assert.deepEqual(instance.registrationNums('CA'), ["CA 12345", "CA 24689"]);
//     });

//     it('should return only the registrations from Knysna if the registration number starts with "CX"', function () {
//         var instance = RegNumbersFactory();

//         instance.addingRegsToList("CK 34587");
//         instance.addingRegsToList("CX 12345");
//         instance.addingRegsToList("CX 24689");
//         instance.addingRegsToList("CL 12345");
//         instance.addingRegsToList("CK 12345");

//         assert.deepEqual(instance.registrationNums('CX'), ["CX 12345", "CX 24689"]);
//     });
//     it('should return only the registrations from bellville if the registration number starts with "CY"', function () {
//         var instance = RegNumbersFactory();

//         instance.addingRegsToList("CY 12345");
//         instance.addingRegsToList("CY 24689");
//         instance.addingRegsToList("CL 12345");
//         instance.addingRegsToList("CK 12345");

//         assert.deepEqual(instance.registrationNums('CY'), ["CY 12345", "CY 24689"]);
//     });

// });


// describe('regex function', function () {
//     let regex = /[A-Z]{2}\s[0-9]{5}$/gm;
//     it('should return true if the registration number entered in the text box is correct', function () {
//         assert.equal(regex.test('CA 12346'), true)
//     })

//     it('should return false if the registration number entered in the text box is incorrect', function () {
//         assert.equal(regex.test('CAW 12340006'), false)
//     })
});
