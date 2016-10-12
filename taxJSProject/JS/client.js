(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
class Builder {
    constructor (Package){
    this.package =  new Array().concat(Package);
    this.constructedObject;
    this.FinishConstuct = new Boolean ();
}
    
    
    build (){
       
        console.log (this.package[0]);
        if (this.package[0] == true){
            this.constructToEmployWorker();
        }
       else{
           this.constructToOrderWorker();
       }
    }

    constructToEmployWorker () {


        var JSON = new (require('./JSON.js'))('JS/lib/modules/JSON/taxes.json');
        var getOptions = JSON.getOptions();
        getOptions.then(function(JSON){
        var JSONObject = JSON;
        var EmployWorker = new (require('./EmployWorker.js'))(this.package, JSONObject);
            this.setObject(EmployWorker);
            this.setFinishConstruct (true);
        }.bind(this));

    }
    constructToOrderWorker (){
        var OrderWorker = new (require('./OrderWorker.js'))(this.package);
        this.setObject(OrderWorker);
        this.setFinishConstruct(true);
    }
    setObject (Object){
        this.constructedObject = Object;
    }
    getObject (){
        console.log (this.constructedObject);
        return this.constructedObject;
    }

    setFinishConstruct (value){
        this.FinishConstuct = value;
    }
    isConstruct(){
        return this.FinishConstuct;
    }

}
module.exports = Builder;
},{"./EmployWorker.js":3,"./JSON.js":5,"./OrderWorker.js":7}],2:[function(require,module,exports){
class Dues {
    constructor (JSON){
    this.JSON = JSON;
    this.duesOfRentiemnent = new Number();
    this.duesOfSick = new Number();
    this.duesOdPension = new Number();
    this.duesOfHealth = new Number();
}



getSummaryDues (salaryBrutto){
 this.calculateDuesRentiement(salaryBrutto);
 this.calaculateDuesSick(salaryBrutto);
 this.calculateDuesPension(salaryBrutto);
 return this.addDues();
}

calculateDuesRentiement (salaryBrutto){
    this.duesOfRentiemnent =  new Number((salaryBrutto * this.JSON.COLLECTION_RENTRIEMENT)/100).roundFloat(2);
    
    
}
calaculateDuesSick (salaryBrutto){
    this.duesOfSick = new Number((salaryBrutto * this.JSON.COLLECTION_SICK)/100).roundFloat(2);
}

calculateDuesPension (salaryBrutto){
     this.duesOdPension = new Number ((salaryBrutto*this.JSON.COLLECTION_PENSION)/100).roundFloat(2);
}

addDues () {
    return this.duesOdPension + this.duesOfRentiemnent + this.duesOfSick;
}

getDuesHealth (value){
    this.setDuesOfHealth(this.calculateDuesHealth(value));
    return this.calculateDuesHealth(value);
}

setDuesOfHealth (value){
    this.duesOfHealth = value;

}
calculateDuesHealth (value){
    return new Number((value * this.JSON.COLLECTION_HEALTH_SECOND)/100).roundFloat(2);
}


getDuesSick (){
    return this.duesOfSick;
}


getDuesPension(){
    return this.duesOdPension;
}

getDuesRentiement(){
    return this.duesOfRentiemnent;
}
getDuesOfHealth (){
    return this.duesOfHealth;
}
}
module.exports = Dues;
},{}],3:[function(require,module,exports){
class EmployWorker {
        constructor(list,JSON){
        this.Options = JSON;
        this.Tax = new (require('./Taxes.js'))(JSON);
        this.salary = new (require('./Salary.js'))(list , JSON.ADD_NIGHT_BONUS);
        this.dues = new (require('./Dues.js'))(JSON);
        this.salaryBrutto = new Number();
        this.salaryNetto = new Number ();


    }


    run (){
     this.setSalaryBrutto(this.salary.getSalaryBrutto());
     this.salaryBrutto = 3200;
     console.log ("Value " + this.salaryBrutto)
     this.setSalaryNetto(this.getSalaryNetto());
     this.testClass();
     }

    setSalaryBrutto (value){
        this.salaryBrutto = value;
    }
    getSalaryNetto (){
        var Dues = this.dues.getSummaryDues(this.salaryBrutto);
        var substractSalary = new Number (this.salaryBrutto - Dues).roundFloat(2);
        var duesHealth = this.dues.getDuesHealth(substractSalary);
        this.Tax.setBasicTax(Math.round(substractSalary - this.Options.TAX_DEDUCTIBLE_EXPENSES));
        this.Tax.setDuesHealth (duesHealth);
        this.Tax.setSubstractSalary (substractSalary);
        this.Tax.calculateDuesIncome();
        return new Number (this.salaryBrutto - Dues - duesHealth - this.Tax.getFinalTax()).roundFloat(2);
    }
    setSalaryNetto (value){
        this.salaryNetto = value;
    }

    testClass(){
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

}
module.exports = EmployWorker;
},{"./Dues.js":2,"./Salary.js":8,"./Taxes.js":9}],4:[function(require,module,exports){

class Error {

initError(){    
alert ("Nie wybrałeś żadnej umowy");
}
emptyValueSalary (){
alert("Stawka nie może być pusta");
}
emptyValueHour(){
alert ("Godziny nie mogą być puste");
}
lessAsZero (){
alert ("Podane wartości, nie mogą być mniejsze niż zero");
}
isNotNumber (){
alert ("Podane wartości muszą być liczbami");
}
tooHours (){
alert("Bo uwierze, że pracowałeś więcej niż 200 godzin");
}
tooLength (){
alert("Podana liczba jest za długa");
}
lessHours (){
alert ("Podana stawka jest za niska");
}
highSalary (){
alert ("Bo uwierze, ze tyle zarabiasz na godzine");
}

}
module.exports = Error;
},{}],5:[function(require,module,exports){
class JSON {
       constructor (URL){
    this.URL = URL;
       }
getOptions (){
    console.log(this.URL);
     var headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Method','GET');
    var request = new Request(this.URL, headers);
    return fetch(request).then(function (response){
        return response.json();
        });
    
    }
 
    }
       module.exports = JSON;


},{}],6:[function(require,module,exports){
class Observators  {
    constructor (){
        this.state = new Boolean (false);
    }
    
    
observe (stateObject){
    this.state = stateObject;
}

getState (){
    return this.state;
}
}
module.exports = Observators;



},{}],7:[function(require,module,exports){
class OrderWorker {
    constructor (list){
    this.salary = list[5];
    this.hours = list[3];
    }   



}

module.exports = OrderWorker; 
},{}],8:[function(require,module,exports){
class Salary {
        constructor(list, addNightBonus){
    this.isEmploy = list[0];
    this.stockDayHours = list[3];
    this.stockNightHours = list[4];
    this.salary = list[5];
    this.addNightBonus = addNightBonus;
}



getSalaryBrutto (){
    if (this.isEmploy == true){
     return new Number(this.summaryDaySalary() + this.summaryNightSalary()).roundFloat(2);
}
    else {
    return this.summaryDaySalary();
    }
}

summaryDaySalary (){
    return new Number (this.stockDayHours * this.salary).roundFloat(2);
}

summaryNightSalary (){
    if (this.stockNightHours == 0 ){
        return 0;
    }
    var addToSalary = this.salary * this.addNightBonus;
    var newSalary = this.salary + addToSalary;
    var roundSalary = newSalary.roundFloat(2);
    return new Number (this.stockNightHours * roundSalary).roundFloat(2);
    

}
}
module.exports = Salary;

},{}],9:[function(require,module,exports){
class Taxes {
constructor(JSON){
this.basicTax = new Number();
this.duesHealth  = new Number();
this.JSON = JSON;
this.incomeTax = new Number();
this.substractSalary = new Number ();
this.finalTax = new Number();
this.taxHealth = new Number();
}




roundFloat (decimals){
     return Number((Math.round(this + "e" + decimals)  + "e-" + decimals));
}
setBasicTax (value){
    this.basicTax = value;
 
}
setDuesHealth (value){
    this.duesHealth = value;
}
calculateDuesIncome (){
    this.incomeTax = new Number(this.calculateIncomeTax () - this.JSON.TAX_ALLOWANCE).roundFloat(2);
    this.finalTax = Math.round(this.incomeTax -  this.calculateTaxHealth ());
 
    
}

getFinalTax (){
    return this.finalTax;
}
calculateIncomeTax(){
    console.log ("Values : " + this.basicTax + "Value : " + this.JSON.SECOND_LEVEL_TAX_INCOME);
    console.log ("Values : " + ((this.basicTax * this.JSON.SECOND_LEVEL_TAX_INCOME)/100).roundFloat(2));
    return new Number((this.basicTax * this.JSON.SECOND_LEVEL_TAX_INCOME)/100).roundFloat(2);
}
setSubstractSalary (value){
    this.substractSalary = value;
}
calculateTaxHealth (){
    this.taxHealth = new Number((this.substractSalary * this.JSON.COLLECTION_HEALTH_FIRST)/100).roundFloat(2);
     return new Number((this.substractSalary * this.JSON.COLLECTION_HEALTH_FIRST)/100).roundFloat(2);
}
getBasicTax (){
    return this.basicTax;
}
getIncomeTax (){
    return this.incomeTax;
}
getSubstractSalary (){
    return this.substractSalary;
}
getTaxHealth (){
    return this.taxHealth;

}
}
module.exports = Taxes;
},{}],10:[function(require,module,exports){

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
},{"./Error.js":4}],11:[function(require,module,exports){
'use strict';


class TaxJS{
    constructor (isEmploy){
    this.isEmploy = isEmploy;
    this.dataOption;
    this.dataTax;
    this.salaryZl;
    this.salaryGr;
    this.dayHour;
    this.nightHour;
    }
 

init ()
{
    if (this.isEmploy == 0){
        this.initError();
        return;
    }
    else{
        var dataOption = new (require ('./modules/JSON.js'))('JS/lib/modules/JSON/options.json');
        var dataTax = new (require ('./modules/JSON.js'))('JS/lib/modules/JSON/taxes.json');
        var getDataOption = dataOption.getOptions();
        var getDataTax = dataTax.getOptions();

            getDataOption.then(function( JSON ) {
                    this.setDataOption (JSON);
                   }.bind(this));

            getDataTax.then(function( JSON ) {
                    this.setDataTax(JSON);
                    this.run();
                   }.bind(this));
        }
}



setDataOption (ObjectJSON){
    this.dataOption = ObjectJSON;
    }   
setDataTax (ObjectJSON){
    this.dataTax = ObjectJSON;
    }
    
run (){
        this.getInputData();
        this.convertInputData();
        var Validator = new (require('./modules/Validator.js'))(this.salaryZl,this.salaryGr,this.dayHour,this.nightHour,this.isEmploy, this.dataOption);
        Validator.init();
        var Observer = new (require('./modules/Observators.js'))();
        Observer.observe (Validator.getState());
            if (Observer.getState()){
               Validator.createPackage ();
               var Package = new Array(Validator.getPackage());
                var Builder = new (require('./modules/Builder.js'))(Package);
                let Observer = new (require('./modules/Observators.js'))();
                Builder.build();
                Observer.observe(Builder.isConstruct());
                    if (Observer.getState()){
                    var ConstructedObject = Builder.getObject();
                    ConstructedObject.run();
                }

        }
    
    }  
    
getInputData (){
    var form = document.forms[0];
    this.salaryZl = form.salaryHourZl.value;
    this.salaryGr = form.salaryHourGr.value;
    this.dayHour = form.dayHour.value;
    this.nightHour = form.nightHour.value;
    }
 
 
 convertInputData (){
     if (this.salaryGr == 0) this.salaryGr = 0;
     if (this.nightHour == 0 || !this.isEmploy) this.nightHour = 0;
     if (this.dayHour == 0) this.dayHour = 0;
 }
 

initError (){
 var Errors = new (require('./modules/Error.js'))();
Errors.initError();   
}

}

module.exports=TaxJS;    

},{"./modules/Builder.js":1,"./modules/Error.js":4,"./modules/JSON.js":5,"./modules/Observators.js":6,"./modules/Validator.js":10}],12:[function(require,module,exports){

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
