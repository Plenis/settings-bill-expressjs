let assert = require("assert");
let settingsBill = require("../settings-bill")

describe('Settings Bill with ExpressJS' , function(){
    it('should be able to set the call cost' , function(){
        let instance = settingsBill();
        instance.setBillSettings({callCost: 2})
        assert.equal(2, instance.getBillSettings().callCost);
    })

    it('should be able to set the sms cost', function(){
        let instance = settingsBill();
        instance.setBillSettings({smsCost: 1.50})
        assert.equal(1.50, instance.getBillSettings().smsCost);
    })


    it('should be able to set the warning level cost', function(){
        let instance = settingsBill();
        instance.setBillSettings({warningLevel: 5})
        assert.equal(5, instance.getBillSettings().warningLevel);
    })


    it('should be able to set the critical level cost', function(){
        let instance = settingsBill();
        instance.setBillSettings({criticalLevel: 10})
        assert.equal(10, instance.getBillSettings().criticalLevel);
    })
});