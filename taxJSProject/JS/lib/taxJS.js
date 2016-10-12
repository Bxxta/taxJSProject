'use strict';


class TaxJS{
    constructor (isEmploy){
    this.isEmploy = isEmploy;
    this.dataOption;
    this.dataTax;
    this.salaryZl;
    this.salaryGr;
    this.dayHour;
    this.nightHour;
    }
 

init ()
{
    if (this.isEmploy == 0){
        this.initError();
        return;
    }
    else{
        var dataOption = new (require ('./modules/JSON.js'))('JS/lib/modules/JSON/options.json');
        var dataTax = new (require ('./modules/JSON.js'))('JS/lib/modules/JSON/taxes.json');
        var getDataOption = dataOption.getOptions();
        var getDataTax = dataTax.getOptions();

            getDataOption.then(function( JSON ) {
                    this.setDataOption (JSON);
                   }.bind(this));

            getDataTax.then(function( JSON ) {
                    this.setDataTax(JSON);
                    this.run();
                   }.bind(this));
        }
}



setDataOption (ObjectJSON){
    this.dataOption = ObjectJSON;
    }   
setDataTax (ObjectJSON){
    this.dataTax = ObjectJSON;
    }
    
run (){
        this.getInputData();
        this.convertInputData();
        var Validator = new (require('./modules/Validator.js'))(this.salaryZl,this.salaryGr,this.dayHour,this.nightHour,this.isEmploy, this.dataOption);
        Validator.init();
        var Observer = new (require('./modules/Observators.js'))();
        Observer.observe (Validator.getState());
            if (Observer.getState()){
               Validator.createPackage ();
               var Package = new Array(Validator.getPackage());
                var Builder = new (require('./modules/Builder.js'))(Package);
                let Observer = new (require('./modules/Observators.js'))();
                Builder.build();
                Observer.observe(Builder.isConstruct());
                    if (Observer.getState()){
                    var ConstructedObject = Builder.getObject();
                    ConstructedObject.run();
                }

        }
    
    }  
    
getInputData (){
    var form = document.forms[0];
    this.salaryZl = form.salaryHourZl.value;
    this.salaryGr = form.salaryHourGr.value;
    this.dayHour = form.dayHour.value;
    this.nightHour = form.nightHour.value;
    }
 
 
 convertInputData (){
     if (this.salaryGr == 0) this.salaryGr = 0;
     if (this.nightHour == 0 || !this.isEmploy) this.nightHour = 0;
     if (this.dayHour == 0) this.dayHour = 0;
 }
 

initError (){
 var Errors = new (require('./modules/Error.js'))();
Errors.initError();   
}

}

module.exports=TaxJS;    
