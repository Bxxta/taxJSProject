
var Error = function (){

}
module.exports = Error;
Error.prototype.initError = function (){
    
alert ("Nie wybrałeś żadnej umowy");
}
Error.prototype.emptyValueSalary = function (){
alert("Stawka nie może być pusta");
}
Error.prototype.emptyValueHour = function (){
alert ("Godziny nie mogą być puste");
}
Error.prototype.lessAsZero = function (){
alert ("Podane wartości, nie mogą być mniejsze niż zero");
}
Error.prototype.isNotNumber = function (){
alert ("Podane wartości muszą być liczbami");
}
Error.prototype.tooHours = function (){
alert("Bo uwierze, że pracowałeś więcej niż 200 godzin");
}
Error.prototype.tooLength = function (){
alert("Podana liczba jest za długa");
}
Error.prototype.lessHours = function (){
alert ("Podana stawka jest za niska");
}
Error.prototype.highSalary = function (){
alert ("Bo uwierze, ze tyle zarabiasz na godzine");
}


