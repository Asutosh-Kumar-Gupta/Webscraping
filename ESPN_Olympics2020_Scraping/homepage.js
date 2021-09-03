let request=require("request");
let fs=require("fs");
let cheerio=require("cheerio");

let link="https://www.espncricinfo.com/"
request(link,cb);

function cb(error,response,html){
    if(error==null && response.statusCode==200){
        parseData(html);
    }
    else if(response.statusCode==404){
        console.log("Resours not found");
    }else{
        console.log(error);
    }
}

function parseData(html){
    
}