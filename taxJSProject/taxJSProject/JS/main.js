
document.getElementById('send').addEventListener ('click' , main , 'false');
document.getElementById('employeeContract').addEventListener ('click', isEmployeeContract , 'false');
document.getElementById('orderContract').addEventListener('click',isOrderContract, 'false');


function main ()
{
var form = document.forms[0];



if (form.contract[0].checked){
        
        var isEmploy = true;
        var taxJS = new (require('./lib/taxJS.js'))(isEmploy);
            taxJS.init();
        return;
	}
else if (form.contract[1].checked) {

	var isEmploy = false;
        var taxJS = new (require('./lib/taxJS.js'))(isEmploy);
            taxJS.init();
        return;
	}
else{
	 var taxJS = new (require('./lib/taxJS.js'))(isEmploy);
            taxJS.initError();
        return;
	}

	
		
}


function isEmployeeContract ()
{
document.getElementById('labelforDay').classList.remove('hidden');
document.getElementById('labelforNight').classList.remove ('hidden');
document.getElementById('labelforHour').classList.add('hidden');
document.getElementById('labelforState').classList.add('hidden');
}

function isOrderContract ()
{
document.getElementById('labelforDay').classList.add('hidden');
document.getElementById('labelforNight').classList.add ('hidden');
document.getElementById('labelforHour').classList.remove('hidden');
document.getElementById('labelforState').classList.remove('hidden');

}