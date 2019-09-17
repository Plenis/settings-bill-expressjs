let assert = require("assert");
let settingsBill = require("../settings-bill")

describe('Settings Bill with ExpressJS' , function(){
    it('should be able to set the sms cost' , function(){
        assert.equal(settingsBill.setBillSettings());
    })
});