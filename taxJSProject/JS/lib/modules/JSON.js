class JSON {
       constructor (URL){
    this.URL = URL;
       }
getOptions (){
    console.log(this.URL);
     var headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Method','GET');
    var request = new Request(this.URL, headers);
    return fetch(request).then(function (response){
        return response.json();
        });
    
    }
 
    }
       module.exports = JSON;

