var Validator = function(salaryZl,salaryGr,dayHour,nightHour,isEmploy){
    this.salaryZl = parseInt(salaryZl);
    this.salaryGr = parseInt(salaryGr);
    this.dayHour = parseInt(dayHour);
    this.nightHour = parseInt(nightHour);
    this.isEmploy = isEmploy;
    this.state = new Boolean(false);
    this.salary = Number.parseFloat(new String(this.salaryZl+"."+this.salaryGr));
    this.package = new Array();
    this.usingCriticalFuncSignal = new Boolean();
    }

module.exports = Validator;

Validator.prototype.init = function (){
        var checkValue = this.checkerValue();
        var parserValue = this.parserValue();
        if (!checkValue || !parserValue  ){
            return;
        }
        else if (checkValue || parserValue){
            this.checkCriteria();
        }
                  
        }
   





Validator.prototype.checkerValue = function (){
    
     if (!this.iSeeSalary()){
              var Error = new (require('./Error.js'))();
              Error.emptyValueSalary();
              return false;
    }
    
    if (!this.iSeeHour()){
                var Error = new (require('./Error.js'))();
                Error.emptyValueHour();
                return false;
    }
   return true;
}
Validator.prototype.parserValue = function (){
    
    if (!this.isNum(this.salaryGr) || !this.isNum(this.salaryZl) ){
        return false;
    }
    
    
    if (!this.isNum(this.dayHour) || !this.isNum(this.nightHour)){
        return false;
    }
    if (!this.isGoodLength(this.salaryGr) || !this.isGoodLength(this.salaryZl)){
         var Error = new (require('./Error.js'))();
         Error.tooLength();
         return false;
    }
  
    this.convertToFloat();
    return true;
}
Validator.prototype.checkCriteria = function (){
    var JSON = new (require('./JSON.js'))('JS/lib/modules/JSON/options.json');
    var getOptions = JSON.getOptions();
     getOptions.then(function( JSON ) {
             this.isCorrect(JSON);
            }.bind(this));
            
}

Validator.prototype.iSeeSalary  = function (){
      if (this.isEmpty(this.salaryZl) && this.isEmpty(this.salaryGr)){
     return false;
   } 
     if (this.isEmpty(this.salaryZl) && !this.isEmpty(this.salaryGr)){
     return false;
   } 
   return true;
}
Validator.prototype.iSeeHour = function (){
    
     if (this.isEmpty(this.dayHour) && this.isEmpty(this.nightHour)){
       return false;
   }
   return true; 
}
Validator.prototype.isNum = function (value){
    
    if (value < 0 ){
          var Error = new (require('./Error.js'))();
           Error.lessAsZero();
           return false;
    }
    
 
    if (Number.isNaN(value)){
          var Error = new (require('./Error.js'))();
          Error.isNotNumber();
          return false;
    }
    
    return true;
}
Validator.prototype.isCorrect = function (JSON){
    
    var inputHours = this.dayHour + this.nightHour;
    if (inputHours > parseInt(JSON.options[0].params)){
         var Error = new (require('./Error.js'))();
          Error.tooHours();
          return false;
    }
    
    if (this.salary < parseInt(JSON.options[1].params)){
        var Error = new (require('./Error.js'))();
          Error.lessSalary();
          this.setSignal(false);
          return;
    }
    if (this.salary > parseInt(JSON.options[2].params)){
            var Error = new (require('./Error.js'))();
          Error.highSalary();
          this.setSignal(false);
          return;
    }
    this.setSignal(true);
    return;
}
Validator.prototype.getState = function (){
    return this.state;
}
Validator.prototype.setState = function (value){
    this.state = value;
}
Validator.prototype.isEmpty = function (value){
    if (value == 0) return true; return false;
}
Validator.prototype.isGoodLength = function (value){
   if (value.length > 2)return false; return true;
}
Validator.prototype.convertToFloat = function (value){
    var floatValue = this.salaryZl + "." + this.salaryGr;
    var StringValue = floatValue.toString();
    
    this.salary = Number.parseFloat(StringValue);
}

Validator.prototype.setSignal = function (value){
this.usingCriticalFuncSignal = value;
}
Validator.prototype.getSignal = function (){
    return this.usingCriticalFuncSignal;

}
Validator.prototype.getSalary = function (){
    return this.salary;
}
Validator.prototype.readPackage = function (){
    console.log (this.package.toString())
}
Validator.prototype.pushToPackage = function (value){
    this.package.push(value);
}
Validator.prototype.getPackage = function (){
    return this.package;
}
Validator.prototype.createPackage = function (){
                this.pushToPackage(this.isEmploy);
                this.pushToPackage(this.salaryZl);
                this.pushToPackage(this.salaryGr);
                this.pushToPackage(this.dayHour);
                this.pushToPackage(this.nightHour);
                this.pushToPackage(this.salary);
                this.setState(true);
}
Validator.prototype.testClass = function (){
    
    console.log ("isEmploy: " + this.isEmploy + " type : " + typeof(this.isEmploy));
    console.log ("SalaryZl: " + this.salaryZl + " type : " + typeof(this.salaryZl));
    console.log("SalaryGr: " + this.salaryGr + " type : " + typeof(this.salaryGr));
    console.log ("dayHour: " + this.dayHour + " type : " + typeof(this.dayHour));
    console.log ("NightHour: " + this.nightHour + " type : " + typeof(this.nightHour));
    console.log ("Salary " + this.salary + " type : " + typeof(this.salary));
    console.log ("State: " + this.state + " type : " + typeof(this.state));
}
