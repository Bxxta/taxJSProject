
class Error {

initError(){    
alert ("Nie wybrałeś żadnej umowy");
}
emptyValueSalary (){
alert("Stawka nie może być pusta");
}
emptyValueHour(){
alert ("Godziny nie mogą być puste");
}
lessAsZero (){
alert ("Podane wartości, nie mogą być mniejsze niż zero");
}
isNotNumber (){
alert ("Podane wartości muszą być liczbami");
}
tooHours (){
alert("Bo uwierze, że pracowałeś więcej niż 200 godzin");
}
tooLength (){
alert("Podana liczba jest za długa");
}
lessHours (){
alert ("Podana stawka jest za niska");
}
highSalary (){
alert ("Bo uwierze, ze tyle zarabiasz na godzine");
}

}
module.exports = Error;