(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = Error;
var Error = function (){

}

Error.prototype.initError = function (){
    
alert ("Nie wybrałeś żadnej umowy");
}



},{}],2:[function(require,module,exports){
'use strict';


var TaxJS= function ( isEmploy){
    this.isEmploy = isEmploy;
}
module.exports=TaxJS;

TaxJS.prototype.init= function ()
{
alert (this.isEmploy);
var form = document.forms[0];
var salaryZl = form.salaryHourZl.value;
var salaryGr = form.salaryHourGr.value;
if (this.isEmploy = true){
    var dayHour = form.dayHour.value;
    var nightHour = form.nightHour.value;
    this.validator();

}

if (this.isEmploy = false){

    var hours = form.hours.value;
    this.validator();

}


}

TaxJS.prototype.initError = function (){
 var Errors = new (require('./modules/Error.js'))();
Errors.initError();   
}

   
    
    
    

},{"./modules/Error.js":1}]},{},[2]);
