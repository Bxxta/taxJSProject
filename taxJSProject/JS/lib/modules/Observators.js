class Observators  {
    constructor (){
        this.state = new Boolean (false);
    }
    
    
observe (stateObject){
    this.state = stateObject;
}

getState (){
    return this.state;
}
}
module.exports = Observators;


