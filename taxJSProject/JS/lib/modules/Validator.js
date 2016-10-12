
class Validator {
    constructor (salaryZl,salaryGr,dayHour,nightHour,isEmploy, Option){
    this.salaryZl = Number.parseInt(salaryZl);
    this.salaryGr = Number.parseInt(salaryGr);
    this.dayHour = Number.parseInt(dayHour);
    this.nightHour = Number.parseInt(nightHour);
    this.isEmploy = isEmploy;
    this.Option = Option;
    this.state = new Boolean(false);
    this.salary = Number.parseFloat(new String(this.salaryZl+"."+this.salaryGr));
    this.package = new Array();
    }



init(){
        var checkValue = this.checkerValue();
        var parserValue = this.parserValue();
        if (!checkValue || !parserValue  ){
            return;
        }
        if (checkValue && parserValue && this.checkCriteria()){
            this.setState(true);
             
             
        }
                  
 }
   





checkerValue (){
    
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
parserValue () {
    
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
  
    
    return true;
}
checkCriteria (){
this.isCorrect();
            
}

iSeeSalary (){
      if (this.salaryZl == 0 && this.salaryGr == 0){
     return false;
   } 
     if (this.salaryZl == 0 && this.salaryGr != 0){
     return false;
   } 
   return true;
}

iSeeHour () {
    
     if (this.dayHour == 0  && this.nightHour == 0){
       return false;
   }
   return true; 
}


isNum (value) {
    
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



isCorrect (){
    
  
    var inputHours = this.dayHour + this.nightHour;
    if (inputHours > Number.parseInt(this.Option.options[0].params)){
         var Error = new (require('./Error.js'))();
          Error.tooHours();
          return false;
    }
    
    if (this.salary < Number.parseInt(this.Option.options[1].params)){
        var Error = new (require('./Error.js'))();
          Error.lessSalary();
          return;
    }
    if (this.salary > Number.parseInt(this.Option.options[2].params)){
          var Error = new (require('./Error.js'))();
          Error.highSalary();
          return;
    }
    
    return;
}
getState (){
    return this.state;
}

setState (valueBool){
    this.state = valueBool;
}

isGoodLength(value){
   if (value.length > 2)return false; return true;
}



readPackage (){
    console.log (this.package.toString())
}
pushToPackage (value){
    this.package.push(value);
}
getPackage (){
    return this.package;
}
createPackage (){
                this.pushToPackage(this.isEmploy);
                this.pushToPackage(this.salaryZl);
                this.pushToPackage(this.salaryGr);
                this.pushToPackage(this.dayHour);
                this.pushToPackage(this.nightHour);
                this.pushToPackage(this.salary);
                
}
testClass (){
    
    console.log ("isEmploy: " + this.isEmploy + " type : " + typeof(this.isEmploy));
    console.log ("SalaryZl: " + this.salaryZl + " type : " + typeof(this.salaryZl));
    console.log("SalaryGr: " + this.salaryGr + " type : " + typeof(this.salaryGr));
    console.log ("dayHour: " + this.dayHour + " type : " + typeof(this.dayHour));
    console.log ("NightHour: " + this.nightHour + " type : " + typeof(this.nightHour));
    console.log ("Salary " + this.salary + " type : " + typeof(this.salary));
    console.log ("State: " + this.state + " type : " + typeof(this.state));
}
}

module.exports = Validator;