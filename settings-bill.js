function SettinngsBillExpress() {
  
  let callCost;
  let smsCost;
  let warningLevel;
  let criticalLevel;

  var optionList = [];

  function setBillSettings(settings) {
    callCost = Number(settings.callCost);
    smsCost = Number(settings.smsCost);
    warningLevel = settings.warningLevel;
    criticalLevel = settings.criticalLevel;
  }

  function getBillSettings() {
    return {
      callCost,
      smsCost,
      warningLevel,
      criticalLevel
    };
  }

  function recordOption(option) {
    let cost = 0;
    if (option == "sms") {
      cost = smsCost;
    } else if (option == "call") {
      cost = callCost;
    }
var moment = require('moment')
    optionList.push({
      type: option,
      cost: cost,
      timestamp: moment().format()
    });
  }

  function options() {
    return optionList;
  }

  function optionType(type) {
    return optionList.filter(option => option.type === type);
  }

  function getTotal(type) {
    return optionList.reduce((total, option) => {
      let val = option.type === type ? option.cost : 0;
      return total + val;
    }, 0);
  }

  function grandTotal() {
    return getTotal("call") + getTotal("sms");
  }

  function totals() {
    let callTotal = getTotal("call");
    let smsTotal = getTotal("sms");
    console.log(optionList);

    return {
      callTotal,
      smsTotal,
      grandTotal: grandTotal()
    };
  }

  function colorChange(){
    if( grandTotal() >= warningLevel && grandTotal() < criticalLevel){
      return "warning"
    }else if( grandTotal() >= criticalLevel){
      return "danger"
    }
  }

  return {
    setBillSettings,
    getBillSettings,
    recordOption,
    options,
    optionType,
    totals,
    colorChange,
  };
}

module.exports = SettinngsBillExpress;
