module.exports = function RegNumbersFactory(regPlate) {
    var list = regPlate;
    var cityRegs = regPlate || [];
  

    function addingRegsToList(reg) {
        let tag = reg.toUpperCase().split(' ')[0];
        if (validation(tag)) {
            if (regExCheck(reg)) {
                cityRegs.push(reg.toUpperCase());
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    };

    function regExist(plate) {
        return cityRegs.includes(plate)
    };

    function getReg() {
        return cityRegs;
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



    function clearLocalStorage() {
        cityRegs = []
    }

    return {
        addingRegsToList,
        getReg,
        registrationNums,
        regExist,
        validation,
        clearLocalStorage

    }
}