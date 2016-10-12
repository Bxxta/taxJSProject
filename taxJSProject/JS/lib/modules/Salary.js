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
