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