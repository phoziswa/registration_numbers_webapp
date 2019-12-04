module.exports = function regexFunc(regs) {

    var regex1 = /([A-Z]){2}\s([0-9]){3}\s([0-9]){3}/g;
    var regex2 = /^[A-Z]{2}\s[0-9]{6}$/g;
    var regex3 = /^[A-Z]{2}\s[0-9]{3}$/g;
    var regex4 = /^([A-Z]){2}\s([0-9]){3}\S([0-9]){3}$/g;

    var reg_test1 = regex1.test(regs);
    var reg_test2 = regex2.test(regs)
    var reg_test3 = regex3.test(regs);
    var reg_test4 = regex4.test(regs);
    if (reg_test1) {

        return reg_test1;
    }
    if (reg_test2) {
        return reg_test2;
    }
    if (reg_test3) {
        return reg_test3
    }
    else if (reg_test4) {
      return  reg_test4
    }
    else{
        return false;
    }
}