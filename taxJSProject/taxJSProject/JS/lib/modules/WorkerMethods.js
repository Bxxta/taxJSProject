var Methods = function (){
   this.field  = 2; 
}

module.exports = Methods;
Methods.prototype.summaryDaySalary = function (stockSalaryDay, salary){
    return stockSalaryDay * salary;
}