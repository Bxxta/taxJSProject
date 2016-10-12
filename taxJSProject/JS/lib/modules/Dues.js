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