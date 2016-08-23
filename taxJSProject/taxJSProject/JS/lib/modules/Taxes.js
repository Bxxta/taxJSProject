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