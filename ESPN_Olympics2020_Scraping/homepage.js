let request=require("request");
let fs=require("fs");
let cheerio=require("cheerio");

let link="https://www.espncricinfo.com/"
request(link,cb);

function cb(error,response,html)