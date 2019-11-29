module.exports = function RegNumbersFactory(pool) {

    async function addingRegsToList(regPlate) {

        var registrations = await pool.query('SELECT * FROM registrations WHERE registration_num = $1', [regPlate])

        if (registrations.rows.length !== 0) {
            return false;
        }

        var allTowns = await pool.query('SELECT * FROM town');

        for (var i = 0; i < allTowns.rows.length; i++) {
           var id = allTowns.rows[i].id;
            var townCode = allTowns.rows[i].plate_code;
            if (regPlate.startsWith(townCode)) {
                
                var inserting = await pool.query('INSERT INTO registrations (registration_num ,town_id) VALUES ($1,$2)', [regPlate, id])
                console.log(inserting.rows);

                return inserting.rows;
            }
        }
    }

    async function getReg() {
        var registrationNums = await pool.query('SELECT * FROM registrations;')
        return registrationNums.rows;
    }
    async function town(city, code) {
        var regNum = await pool.query('INSERT INTO town (town_name, plate_code) VALUES ($1,$2)', [city, code])
        return regNum;
    }
    async function clearDatabase() {
        var clear = await pool.query('DELETE FROM registrations ')
        return clear;
    }
    async function filter(town) {

        filteredRegNums = getReg()
        var alltowns = town;
        if (alltowns === "All") {
            return filteredRegNums;
        }

        filteredRegNums = await pool.query('SELECT registrations.registration_num, town.plate_code FROM registrations INNER JOIN town ON registrations.town_id = town.id;')
        filteredRegNums = filteredRegNums.rows

        var filterCities = filteredRegNums.filter(reg => reg.plate_code === town)

        return filterCities;
    }

    function regexCheck(plate_num) {
        var regex = /[A-Z]{2}\s[0-9]{6}/g;
        var reg = regex.test(plate_num)
        var reg1 = regex.test(plate_num)
        return !reg && !reg1
    }

    return {
        addingRegsToList,
        getReg,
        town,
        clearDatabase,
        filter,
        regexCheck

    }
}