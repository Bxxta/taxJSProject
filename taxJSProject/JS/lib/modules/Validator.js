var Validator = function(salaryZl,salaryGr,dayHour,nightHour,isEmploy){
    this.salaryZl = parseInt(salaryZl);
    this.salaryGr = parseInt(salaryGr);
    this.dayHour = parseInt(dayHour);
    this.nightHour = parseInt(nightHour);
    this.isEmploy = isEmploy;
    this.state = new Boolean();
    this.salary = Number.parseFloat(new String(this.salaryZl+"."+this.salaryGr));
    this.package = new Array();
    this.usingCriticalFuncSignal = new Boolean();
    }

module.exports = Validator;

Validator.prototype.init = function (){
        if (!this.checkerValue() || !this.parserValue()  ){
            this.setState(false);
            return;
        }
        if (this.checkerValue() && this.parserValue()){
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
    console.log("Undefined?" + this.salary);
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
    console.log(typeof(StringValue));
    this.salary = Number.parseFloat(StringValue);
    console.log ("YES?" + this.salary);
}

Validator.prototype.setSignal = function (value){
console.log ("Hello?")
this.usingCriticalFuncSignal = value;
}
Validator.prototype.getSignal = function (){
    return this.usingCriticalFuncSignal;
    }
Validator.prototype.setSalary = function (value){
    console.log("And this" + value);
    
    this.salary = Number.parseFloat(value);
    console.log("At now? " + this.salary);
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
                this.pushToPackage(this.salaryGr);
                this.pushToPackage(this.salaryZl);
                this.pushToPackage(this.dayHour);
                this.pushToPackage(this.nightHour);
                this.pushToPackage(this.salary);
                this.setState(true);
}
