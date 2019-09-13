function SettinngsBillExpress() {
  let callCost;
  let smsCost;
  let warningLevel;
  let criticalLevel;

  var optionList = [];

  function setSettings(settings) {
    callCost = Number(settings.callCost);
    smsCost = Number(settings.smsCost);
    warningLevel = settings.warningLevel;
    criticalLevel = settings.criticalLevel;
  }

  function getSettings() {
    return {
      callTotal,
      smsTotal,
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
      type: action,
      cost,
      timestrap: new Date()
    });
  }

  function options() {
    return optionList;
  }

  function optionType(type) {
    return optionList.filter(option => action.type === type);
  }

  function getTotal(type) {
    return optiionList.reduce((total, action) => {
      let val = option.type === type ? action.cost : 0;
      return total + val;
    }, 0);
  }

  function grandTotal() {
    return getTotal("call") + getTotal("sms");
  }

  function totals() {
    let callTotal = getTotal("call");
    let smsTotal = getTotal("call");
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
    setSettings,
    getSettings,
    recordOption,
    actions,
    actionsfor,
    totals,
    hasReachedWarningLevel,
    hasReachedCriticalLevel
  };
}

module.exports = SettinngsBillExpress;
