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

    it('should be able to add calls and sms when it has a been set', function(){
        let instance = settingsBill();
        instance.setBillSettings({
            callCost: 3,
            smsCost: 2,
        })
        
        instance.recordOption("call")
        instance.recordOption("sms")
        instance.recordOption("call")

        assert.equal(6, instance.totals().callTotal);
        assert.equal(2, instance.totals().smsTotal);
        assert.equal(8, instance.totals().grandTotal);
    })

    it('should be able to add calls and sms when it has a been set, even with decimals', function(){
        let instance = settingsBill();
        instance.setBillSettings({
            callCost: 3.50,
            smsCost: 0.99,
        })
        
        instance.recordOption("call")
        instance.recordOption("sms")
        instance.recordOption("sms")
        instance.recordOption("sms")
        instance.recordOption("call")
        instance.recordOption("call")

        assert.equal(10.50, instance.totals().callTotal);
        assert.equal(2.97, instance.totals().smsTotal);
        assert.equal(13.47, instance.totals().grandTotal);
    })

    it('should be able to add calls and sms when it has a been set and changed after addition', function(){
        let instance = settingsBill();
        instance.setBillSettings({
            callCost: 3,
            smsCost: 2,
            warningLevel: 10,
            criticalLevel: 15,
        })
        
        instance.recordOption("call")
        instance.recordOption("sms")
        instance.recordOption("call")

        instance.setBillSettings({
            callCost: 3.50,
            smsCost: 2.99,
            warningLevel: 15,
            criticalLevel: 27,
        })

        instance.recordOption("call")
        instance.recordOption("sms")
        instance.recordOption("sms")
        instance.recordOption("sms")
        instance.recordOption("call")
        instance.recordOption("call")

        assert.equal(16.50, instance.totals().callTotal);
        assert.equal(10.97, instance.totals().smsTotal);
        assert.equal(27.47, instance.totals().grandTotal);
    })

    
    it('should not exceed critical level set', function(){
        let instance = settingsBill();
        instance.setBillSettings({
            callCost: 3,
            smsCost: 2,
            warningLevel: 10,
            criticalLevel: 15,
        })

        instance.recordOption('call')
        instance.recordOption('call')
        instance.recordOption('call')
        instance.recordOption('call')
        instance.recordOption('sms')
        instance.recordOption('sms')
        instance.recordOption('call')

        assert.equal(16, instance.totals().grandTotal)
        assert.equal("danger", instance.colorChange())
    })

});