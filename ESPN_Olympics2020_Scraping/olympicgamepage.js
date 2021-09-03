let fs=require("fs");
let cheerio=require("cheerio");
let request=require("request");
const { createBrotliCompress } = require("zlib");

function getOlympicsData(link){
    request(link,cb);
}

function cb(error,response,html){
    if(error==null && response.statusCode==200){
        // console.log(html);
        parseData(html);
    }else if(response.statusCode==404){
        console.log("Resours not found");
    }else{
        console.log(error);
    }
}

function parseData(html){
    let ch=cheerio.load(html);
    let allTeamtag=ch(".medals.olympics.has-team-logos tbody").find("tr");
    console.log(allTeamtag.length);
}

module.exports=getOlympicsData;