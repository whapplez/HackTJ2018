const wiki = require('wikijs').default;
var xd;

function search(searchTerm, callback){
    wiki().search(searchTerm).then(function(data){
        xd = data.results[0];
        wiki().page(xd).then(page => page.summary()).then(function(data2){
            if(data2.includes("may refer to")){
                callback("Disambiguous. Try again!@69@");
            }
            
            var sentenceList = data2.split(". ");
            if (sentenceList.length < 3){
                callback(data2 + "@69@");
            }else{
                data2 = sentenceList[0] + ". " + sentenceList[1] + ".@69@";
                callback(data2);
            }
            // if (data2.includes("may refer to")){
            //     console.log("Disambiguation, be more specific. Did you mean" + data.results[1] + " or " + data.results[2] + "?")
            //     return "Disambiguation, be more specific. Did you mean" + data.results[1] + " or " + data.results[2] + "?";
            // }else{
            //     console.log(data2);
            //     return data2;
            // }
        });
    });
}

module.exports.search = search;