class Builder {
    constructor (Package){
    this.package =  new Array().concat(Package);
    this.constructedObject;
    this.FinishConstuct = new Boolean ();
}
    
    
    build (){
       
        console.log (this.package[0]);
        if (this.package[0] == true){
            this.constructToEmployWorker();
        }
       else{
           this.constructToOrderWorker();
       }
    }

    constructToEmployWorker () {


        var JSON = new (require('./JSON.js'))('JS/lib/modules/JSON/taxes.json');
        var getOptions = JSON.getOptions();
        getOptions.then(function(JSON){
        var JSONObject = JSON;
        var EmployWorker = new (require('./EmployWorker.js'))(this.package, JSONObject);
            this.setObject(EmployWorker);
            this.setFinishConstruct (true);
        }.bind(this));

    }
    constructToOrderWorker (){
        var OrderWorker = new (require('./OrderWorker.js'))(this.package);
        this.setObject(OrderWorker);
        this.setFinishConstruct(true);
    }
    setObject (Object){
        this.constructedObject = Object;
    }
    getObject (){
        console.log (this.constructedObject);
        return this.constructedObject;
    }

    setFinishConstruct (value){
        this.FinishConstuct = value;
    }
    isConstruct(){
        return this.FinishConstuct;
    }

}
module.exports = Builder;