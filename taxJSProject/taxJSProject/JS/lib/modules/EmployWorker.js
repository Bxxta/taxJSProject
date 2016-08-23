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

