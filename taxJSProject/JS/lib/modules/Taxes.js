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