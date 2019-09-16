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

    optionList.push({
      type: option,
      cost: cost,
      timestrap: new Date()
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

  function hasReachedWarningLevel() {
    const total = grandTotal();
    const reachedWarningLevel = total >= warningLevel && total < criticalLevel;

    return reachedWarningLevel;
  }

  function hasReachedCriticalLevel() {
    const total = grandTotal();
    return total >= criticalLevel;
  }

  return {
    setBillSettings,
    getBillSettings,
    recordOption,
    options,
    optionType,
    totals,
    hasReachedWarningLevel,
    hasReachedCriticalLevel
  };
}

module.exports = SettinngsBillExpress;
