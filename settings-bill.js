function SettinngsBillExpress() {
  var callTotal = 0;
  var smsTotal = 0;
  var totalCost = 0;

  var callCost = 0;
  var smsCost = 0;

  var warningLevel = warningLevelSetting.value;
  var criticalLevel = criticalLevelSetting.value;

  var optionList = [];

  function setSettings() {
    callTotal = Number(callCost.value);
    smsTotal = Number(smsCost.value);
    warningLevel = Number(warningLevelSetting.value);
    criticalLevel = Number(criticalLevelSetting.value);

    
    if (totalCost >= criticalLevel){
        totalCostElemThree.classList.add("danger");
            .classList.remove("warning");
        settingBillAddBtn.disabled = false;
        
    }
    if (totalCost >= warningLevel){
        totalCostElemThree.classList.add("warning");
        totalCostElemThree.classList.remove("danger");
        settingBillAddBtn.disabled = false;
    }
   
    if (totalCost < warningLevel){
        totalCostElemThree.classList.remove("warning");
        totalCostElemThree.classList.remove("danger");
        settingBillAddBtn.disabled = false;
    }
  }

  function getSettings(){
      return{
          callTotal,
          smsTotal,
          warningLevel,
          criticalLevel,
      }

  }

  function recordOption(option){
   let cost = 0;
   if(option == "sms"){
      cost = smsCost;
   }
   else if (option == "call"){
       cost = callCost;
   }

   optionList.push({
       type: action,
       cost,
       timestrap: new Date()
   });

  }

  function options(){
      return optionList;
  }

  function optionType(type){
      return optionList.filter((option) => action.type === type);
  }

  //function to get the total?? what should happen??

  function getTotal(type){

  }

  return {
    setSettings,
    getSettings,
    recordOption,
    options,
    optionType,
    getTotal,
  };
}
