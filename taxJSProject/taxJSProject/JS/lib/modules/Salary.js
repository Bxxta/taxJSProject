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
