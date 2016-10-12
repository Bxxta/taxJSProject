/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


TaxJS.prototype.validator = function ()
{
    if (this.isEmploy = true){
           var JSONRespond = new Respond('JS/lib/XML/options.json');
            JSONRespond.getOptions().then(function(JSON ) {
            console.log(JSON.options[0].params);
            });
        
    }
    if (this.isEmploy = false){
          var JSONRespond = new Respond('JS/lib/XML/options.json');
            var Options = JSONRespond.getOptions();
            Options.then(function( JSON ) {
            console.log(JSON.options[0].params);
            });
    }
}

var Respond = function(URL){
this.requestURL = URL;
}
 
Respond.prototype.getOptions = function(){
    var headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Method','GET');
    var request = new Request(this.requestURL, headers);
    return fetch(request).then(function (response){
        return response.json();
        });
    
    }