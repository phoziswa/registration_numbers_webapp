module.exports = function RegNumbersFactory(pool) {

    async function addingRegsToList(regPlate) {
        let reg = regPlate;

        let registrations = await pool.query('SELECT * FROM registrations WHERE registration_num = $1', [reg])
        if (registrations.rows.length !== 0) {
            return true;
        }

        let id;
        let allTowns = await pool.query('SELECT * FROM town');

        for (let i = 0; i < allTowns.rows.length; i++) {
            id = allTowns.rows[i].id;
            let townCode = allTowns.rows[i].plate_code;
            if (regPlate.startsWith(townCode)) {
                await pool.query('INSERT INTO registrations (registration_num ,town_id) VALUES ($1,$2)', [reg, id])
            }
        }
    }

    async function getReg() {
        var registrationNums = await pool.query('SELECT * FROM registrations')
        return registrationNums.rows;
    }
    async function town(city, code) {
        let fullReg = await pool.query('INSERT INTO town (town_name, plate_code) VALUES ($1,$2)', [city, code])
        return fullReg;
    }


    function regExist(plate) {
        return cityRegs.includes(plate)
    };

    function registrationNums(townTag) {
        var townsList = [];

        if (townTag === "" || townTag === undefined || townTag === false) {
            return list;
        }
        for (var i = 0; i < cityRegs.length; i++) {
            if (cityRegs[i].startsWith(townTag)) {
                townsList.push(cityRegs[i])
            }
        }
        return townsList;
    };

    function validation(tag) {
        var validNums = ["CA", "CY", "CX"];
        for (let index = 0; index < validNums.length; index++) {
            const element = validNums[index];
            if (element == tag) {
                return true
            }
        }
        return false
    };

    function regExCheck(plate) {

        var toUpper = plate.toUpperCase();

        var regex = /([A-Z]){2}\s+([0-9]){3}\S([0-9]){3}/g;
        var regex2 = /([A-Z]){2}\s+([0-9]){5}/g;

        var testRegex = regex.test(toUpper);
        var testRegex2 = regex2.test(toUpper)

        if (testRegex) {
            return testRegex;
        }
        if (testRegex2) {
            return testRegex2;
        }
        return false;
    }

    return {
        addingRegsToList,
        getReg,
        town,
        registrationNums,
        regExist,
        validation,
        regExCheck
    }
}