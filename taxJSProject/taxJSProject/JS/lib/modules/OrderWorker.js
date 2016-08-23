var OrderWorker = function (package){
    this.salary = package[5];
    this.hours = package[3];
    this.externalMethods = new (require('./WorkerMethods.js'))();
}
module.exports = OrderWorker; 

OrderWorker.prototype.init = function (){
    
}
/*Call Object
 *  var Methods = function (){
   this.field  = 2; 
   this.hello = function (){ console.log("Hello"); }
}

module.exports = Methods;
*/