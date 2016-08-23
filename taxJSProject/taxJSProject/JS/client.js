(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Builder = function (Package){
    this.package = Package;
    this.constructedObject;
    }
module.exports = Builder;

Builder.prototype.build = function (){
    
    if (this.package[0] == true){
        this.constructToEmployWorker();
    }
   else{
       this.constructToOrderWorker();
   }
}
Builder.prototype.constructToEmployWorker = function (){
    console.log ("I construct worker");
    var JSON = new (require('./JSON.js'))('JS/lib/modules/JSON/taxes.json');
    var getOptions = JSON.getOptions();
    getOptions.then(function(JSON){
    var JSONObject = JSON;
    var EmployWorker = new (require('./EmployWorker.js'))(this.package, JSONObject);
    EmployWorker.init();
    this.setObject(EmployWorker);
}.bind(this));
    
}
Builder.prototype.constructToOrderWorker = function (){
    console.log ("I construct order Employer");
    var OrderWorker = new (require('./OrderWorker.js'))(this.package);
    this.setObject(OrderWorker);
}
Builder.prototype.setObject = function (Object){
    this.constructedObject = Object;
}
Builder.prototype.getObject = function (){
    return this.constructedObject;
}
},{"./EmployWorker.js":3,"./JSON.js":5,"./OrderWorker.js":6}],2:[function(require,module,exports){
var Dues = function (JSON){
    this.JSON = JSON;
    this.duesOfRentiemnent = new Number();
    this.duesOfSick = new Number();
    this.duesOdPension = new Number();
    this.duesOfHealth = new Number();
}
module.exports = Dues;


Dues.prototype.getSummaryDues = function (salaryBrutto){
 this.calculateDuesRentiement(salaryBrutto);
 this.calaculateDuesSick(salaryBrutto);
 this.calculateDuesPension(salaryBrutto);
 return this.addDues();
}

Dues.prototype.calculateDuesRentiement = function (salaryBrutto){
    this.duesOfRentiemnent =  new Number((salaryBrutto * this.JSON.COLLECTION_RENTRIEMENT)/100).roundFloat(2);
    
    
}
Dues.prototype.calaculateDuesSick = function (salaryBrutto){
    this.duesOfSick = new Number((salaryBrutto * this.JSON.COLLECTION_SICK)/100).roundFloat(2);
}
Dues.prototype.calculateDuesPension = function (salaryBrutto){
     this.duesOdPension = new Number ((salaryBrutto*this.JSON.COLLECTION_PENSION)/100).roundFloat(2);
}
Dues.prototype.addDues = function () {
    return this.duesOdPension + this.duesOfRentiemnent + this.duesOfSick;
}
Dues.prototype.getDuesHealth = function (value){
    this.setDuesOfHealth(this.calculateDuesHealth(value));
    return this.calculateDuesHealth(value);
}
Dues.prototype.setDuesOfHealth = function (value){
    this.duesOfHealth = value;
}
Dues.prototype.calculateDuesHealth = function (value){
    return new Number((value * this.JSON.COLLECTION_HEALTH_SECOND)/100).roundFloat(2);
}
Dues.prototype.getDuesSick = function (){
    return this.duesOfSick;
}
Dues.prototype.getDuesPension = function (){
    return this.duesOdPension;
}
Dues.prototype.getDuesRentiement = function (){
    return this.duesOfRentiemnent;
}
Dues.prototype.getDuesOfHealth = function (){
    return this.duesOfHealth;
}
},{}],3:[function(require,module,exports){
var EmployWorker = function (package,JSON){
    this.Options = JSON;
    this.Tax = new (require('./Taxes.js'))(JSON);
    this.salary = new (require('./Salary.js'))(package , JSON.ADD_NIGHT_BONUS);
    this.dues = new (require('./Dues.js'))(JSON);
    this.salaryBrutto = new Number();
    this.salaryNetto = new Number ();
   
    
}
module.exports = EmployWorker;

EmployWorker.prototype.init = function (){
 this.setSalaryBrutto(this.salary.getSalaryBrutto());
 this.salaryBrutto = 3200;
 console.log ("Value " + this.salaryBrutto)
 this.setSalaryNetto(this.getSalaryNetto());
 this.testClass();
 }

EmployWorker.prototype.setSalaryBrutto = function (value){
    this.salaryBrutto = value;
}
EmployWorker.prototype.getSalaryNetto = function (){
    var Dues = this.dues.getSummaryDues(this.salaryBrutto);
    var substractSalary = new Number (this.salaryBrutto - Dues).roundFloat(2);
    var duesHealth = this.dues.getDuesHealth(substractSalary);
    this.Tax.setBasicTax(Math.round(substractSalary - this.Options.TAX_DEDUCTIBLE_EXPENSES));
    this.Tax.setDuesHealth (duesHealth);
    this.Tax.setSubstractSalary (substractSalary);
    this.Tax.calculateDuesIncome();
    return new Number (this.salaryBrutto - Dues - duesHealth - this.Tax.getFinalTax()).roundFloat(2);
}
EmployWorker.prototype.setSalaryNetto = function (value){
    this.salaryNetto = value;
}

EmployWorker.prototype.testClass = function (){
    console.log ("Salary Brutto : " + this.salaryBrutto);
    console.log ("--DUES--")
    console.log ("Dues of Sick : " + this.dues.getDuesSick());
    console.log ("Dues of Rentiement : " + this.dues.getDuesRentiement());
    console.log ("Dues of Pension : " + this.dues.getDuesPension());
    console.log ("Dues of Health : " + this.dues.getDuesOfHealth());
    console.log ("SUBSTRACT SALARY");
    console.log ("Substract Salary : " + this.Tax.getSubstractSalary());
    console.log ("--TAXES--");
    console.log ("Basic Tax: " + this.Tax.getBasicTax());
    console.log ("Health Tax: " + this.Tax.getTaxHealth());
    console.log ("Income Tax : " + this.Tax.getIncomeTax());
    console.log ("Final Tax : " + this.Tax.getFinalTax());
    console.log ("--SALARY--");
    console.log ("Salary Netto : " + this.salaryNetto)
            
    
    
}


},{"./Dues.js":2,"./Salary.js":7,"./Taxes.js":8}],4:[function(require,module,exports){

var Error = function (){

}
module.exports = Error;
Error.prototype.initError = function (){
    
alert ("Nie wybrałeś żadnej umowy");
}
Error.prototype.emptyValueSalary = function (){
alert("Stawka nie może być pusta");
}
Error.prototype.emptyValueHour = function (){
alert ("Godziny nie mogą być puste");
}
Error.prototype.lessAsZero = function (){
alert ("Podane wartości, nie mogą być mniejsze niż zero");
}
Error.prototype.isNotNumber = function (){
alert ("Podane wartości muszą być liczbami");
}
Error.prototype.tooHours = function (){
alert("Bo uwierze, że pracowałeś więcej niż 200 godzin");
}
Error.prototype.tooLength = function (){
alert("Podana liczba jest za długa");
}
Error.prototype.lessHours = function (){
alert ("Podana stawka jest za niska");
}
Error.prototype.highSalary = function (){
alert ("Bo uwierze, ze tyle zarabiasz na godzine");
}



},{}],5:[function(require,module,exports){
var JSON = function (URL){
    this.URL = URL;
}
module.exports = JSON;
JSON.prototype.getOptions = function (){
    console.log(this.URL);
     var headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Method','GET');
    var request = new Request(this.URL, headers);
    return fetch(request).then(function (response){
        return response.json();
        });
    
    }



},{}],6:[function(require,module,exports){
var OrderWorker = function (package){
    this.salary = package[5];
    this.hours = package[3];
    this.externalMethods = new (require('./WorkerMethods.js'))();
}
module.exports = OrderWorker; 

OrderWorker.prototype.init = function (){
    
}
/*Call Object
 *  var Methods = function (){
   this.field  = 2; 
   this.hello = function (){ console.log("Hello"); }
}

module.exports = Methods;
*/
},{"./WorkerMethods.js":10}],7:[function(require,module,exports){
var Salary = function (package, addNightBonus){
    this.isEmploy = package[0];
    this.stockDayHours = package[3];
    this.stockNightHours = package [4];
    this.salary = package[5];
    this.addNightBonus = addNightBonus;
}
module.exports = Salary;


Salary.prototype.getSalaryBrutto = function (){
    if (this.isEmploy == true){
     return new Number(this.summaryDaySalary() + this.summaryNightSalary()).roundFloat(2);
}
    else {
    return this.summaryDaySalary();
    }
}
module.exports = Salary;
Salary.prototype.summaryDaySalary = function (){
    return new Number (this.stockDayHours * this.salary).roundFloat(2);
}

Salary.prototype.summaryNightSalary = function (){
    if (this.stockNightHours == 0 ){
        return 0;
    }
    var addToSalary = this.salary * this.addNightBonus;
    var newSalary = this.salary + addToSalary;
    var roundSalary = newSalary.roundFloat(2);
    return new Number (this.stockNightHours * roundSalary).roundFloat(2);
    

}

},{}],8:[function(require,module,exports){
var Taxes = function (JSON){
this.basicTax = new Number();
this.duesHealth  = new Number();
this.JSON = JSON;
this.incomeTax = new Number();
this.substractSalary = new Number ();
this.finalTax = new Number();
this.taxHealth = new Number();
}

module.exports = Taxes;

Number.prototype.roundFloat = function (decimals){
     return Number((Math.round(this + "e" + decimals)  + "e-" + decimals));
}
Taxes.prototype.setBasicTax = function (value){
    this.basicTax = value;
 
}
Taxes.prototype.setDuesHealth = function (value){
    this.duesHealth = value;
}
Taxes.prototype.calculateDuesIncome = function (){
    this.incomeTax = new Number(this.calculateIncomeTax () - this.JSON.TAX_ALLOWANCE).roundFloat(2);
    this.finalTax = Math.round(this.incomeTax -  this.calculateTaxHealth ());
 
    
}

Taxes.prototype.getFinalTax = function(){
    return this.finalTax;
}
Taxes.prototype.calculateIncomeTax = function (){
    console.log ("Values : " + this.basicTax + "Value : " + this.JSON.SECOND_LEVEL_TAX_INCOME);
    console.log ("Values : " + ((this.basicTax * this.JSON.SECOND_LEVEL_TAX_INCOME)/100).roundFloat(2));
    return new Number((this.basicTax * this.JSON.SECOND_LEVEL_TAX_INCOME)/100).roundFloat(2);
}
Taxes.prototype.setSubstractSalary = function (value){
    this.substractSalary = value;
}
Taxes.prototype.calculateTaxHealth = function (){
    this.taxHealth = new Number((this.substractSalary * this.JSON.COLLECTION_HEALTH_FIRST)/100).roundFloat(2);
     return new Number((this.substractSalary * this.JSON.COLLECTION_HEALTH_FIRST)/100).roundFloat(2);
}
Taxes.prototype.getBasicTax = function (){
    return this.basicTax;
}
Taxes.prototype.getIncomeTax = function (){
    return this.incomeTax;
}
Taxes.prototype.getSubstractSalary = function (){
    return this.substractSalary;
}
Taxes.prototype.getTaxHealth = function (){
    return this.taxHealth;
}
},{}],9:[function(require,module,exports){
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

},{"./Error.js":4,"./JSON.js":5}],10:[function(require,module,exports){
var Methods = function (){
   this.field  = 2; 
}

module.exports = Methods;
Methods.prototype.summaryDaySalary = function (stockSalaryDay, salary){
    return stockSalaryDay * salary;
}
},{}],11:[function(require,module,exports){
'use strict';


var TaxJS= function ( isEmploy){
    this.isEmploy = isEmploy;
}
module.exports=TaxJS;

TaxJS.prototype.init= function ()
{

var form = document.forms[0];
var salaryZl = form.salaryHourZl.value;
var salaryGr = form.salaryHourGr.value;
    if (this.isEmpty(salaryGr) ) salaryGr = this.convertToZero(salaryGr);
    if (this.isEmploy == false){
        var dayHour = form.hours.value;
    }
    else{
        var dayHour = form.dayHour.value;
        var nightHour = form.nightHour.value;
    }
    if (this.isEmpty(nightHour) || this.isEmploy == false ) nightHour = this.convertToZero(nightHour);
    if (this.isEmpty(dayHour) ) dayHour = this.convertToZero(dayHour);
    var target = new (require('./modules/Validator.js'))(salaryZl,salaryGr,dayHour,nightHour,this.isEmploy);
    var Observer = this.createObserver(target, this.getHandler());
    Observer.init();

}

TaxJS.prototype.getHandler = function (){
var handler = {
  set: function (target, key, value, receiver) {
   if (target.getState() == true ){
       target.testClass();
       var Builder = new (require('./modules/Builder.js'))(target.getPackage());
       Builder.build();
       var ConstructedObject = Builder.getObject();
       
   }
   if (target.getSignal()){
      target.createPackage();
   }
  }
}; 
return handler;
}

TaxJS.prototype.initError = function (){
 var Errors = new (require('./modules/Error.js'))();
Errors.initError();   
}

 TaxJS.prototype.createObserver = function (target, handler){
     return new Proxy (target,handler);
 }
 
 TaxJS.prototype.checkValidStatus = function (value){
     console.log ("Valiadator State is " + value);
 }
 TaxJS.prototype.isEmpty = function (value){
     if (value == 0 ) return true; return false;
 }
 TaxJS.prototype.convertToZero = function (value){
     return value = 0;
 }
 
    

},{"./modules/Builder.js":1,"./modules/Error.js":4,"./modules/Validator.js":9}],12:[function(require,module,exports){

document.getElementById('send').addEventListener ('click' , main , 'false');
document.getElementById('employeeContract').addEventListener ('click', isEmployeeContract , 'false');
document.getElementById('orderContract').addEventListener('click',isOrderContract, 'false');


function main ()
{
var form = document.forms[0];



if (form.contract[0].checked){
        
        var isEmploy = true;
        var taxJS = new (require('./lib/taxJS.js'))(isEmploy);
            taxJS.init();
        return;
	}
else if (form.contract[1].checked) {

	var isEmploy = false;
        var taxJS = new (require('./lib/taxJS.js'))(isEmploy);
            taxJS.init();
        return;
	}
else{
	 var taxJS = new (require('./lib/taxJS.js'))(isEmploy);
            taxJS.initError();
        return;
	}

	
		
}


function isEmployeeContract ()
{
document.getElementById('labelforDay').classList.remove('hidden');
document.getElementById('labelforNight').classList.remove ('hidden');
document.getElementById('labelforHour').classList.add('hidden');
document.getElementById('labelforState').classList.add('hidden');
}

function isOrderContract ()
{
document.getElementById('labelforDay').classList.add('hidden');
document.getElementById('labelforNight').classList.add ('hidden');
document.getElementById('labelforHour').classList.remove('hidden');
document.getElementById('labelforState').classList.remove('hidden');

}
},{"./lib/taxJS.js":11}]},{},[12]);
