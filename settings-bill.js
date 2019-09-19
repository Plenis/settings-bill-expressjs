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
    if(!stopBill()){
      if (option == "sms") {
        cost = smsCost;
      } else if (option == "call") {
        cost = callCost;
      }
    }

    optionList.push({
      type: option,
      cost: cost,
      timestamp: new Date()
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
    let callTotal = getTotal("call").toFixed(2);
    let smsTotal = getTotal("sms").toFixed(2);
    console.log(optionList);

    return {
      callTotal,
      smsTotal,
      grandTotal: grandTotal().toFixed(2)
    };
  }

  function colorChange(){
    if( grandTotal() >= warningLevel && grandTotal() < criticalLevel){
      return "warning"
    }else if( grandTotal() >= criticalLevel){
      return "danger"
    }
  }

  function stopBill(){
    return grandTotal() >= criticalLevel
  }

  return {
    setBillSettings,
    getBillSettings,
    recordOption,
    options,
    optionType,
    getTotal,
    totals,
    colorChange,
  };
}

module.exports = SettinngsBillExpress;
