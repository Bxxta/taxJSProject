(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

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



},{}],2:[function(require,module,exports){
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



},{}],3:[function(require,module,exports){
var Validator = function(salaryZl,salaryGr,dayHour,nightHour,isEmploy){
    this.salaryZl = parseInt(salaryZl);
    this.salaryGr = parseInt(salaryGr);
    this.dayHour = parseInt(dayHour);
    this.nightHour = parseInt(nightHour);
    this.isEmploy = isEmploy;
    this.state = new Boolean();
    this.salary = this.convertToFloat();
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

},{"./Error.js":1,"./JSON.js":2}],4:[function(require,module,exports){
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
    var dayHour = form.dayHour.value;
    var nightHour = form.nightHour.value;
    if (this.isEmpty(nightHour) ) nightHour = this.convertToZero(nightHour);
    if (this.isEmpty(dayHour) ) dayHour = this.convertToZero(dayHour);
    var target = new (require('./modules/Validator.js'))(salaryZl,salaryGr,dayHour,nightHour,this.isEmploy);
    var Observer = this.createObserver(target, this.getHandler())
    Observer.init();

}

TaxJS.prototype.getHandler = function (){
var handler = {
  set: function (target, key, value, receiver) {
   console.log ("Change state a class" + target.getState());
   if (target.getState()){
       target.readPackage();
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
 
    

},{"./modules/Error.js":1,"./modules/Validator.js":3}],5:[function(require,module,exports){

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
}

function isOrderContract ()
{
document.getElementById('labelforDay').classList.add('hidden');
document.getElementById('labelforNight').classList.add ('hidden');
document.getElementById('labelforHour').classList.remove('hidden');

}
},{"./lib/taxJS.js":4}]},{},[5]);
