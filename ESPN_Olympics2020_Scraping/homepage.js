let request=require("request");
let fs=require("fs");
let cheerio=require("cheerio");
const getOlympicsData = require("./olympicgamepage");

let link="https://www.espn.in/olympics/"
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
    // fs.writeFileSync("./espn.html",html);
    let ch=cheerio.load(html);
    let atag=ch(".sub-module.sub-module-medal-tracker footer a").attr("href");
    // console.log(atag);
    let completeLink="https://www.espn.in"+atag;
    getOlympicsData(completeLink);
}