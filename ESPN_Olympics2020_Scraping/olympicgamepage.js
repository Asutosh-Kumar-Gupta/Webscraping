let fs=require("fs");
let cheerio=require("cheerio");
let request=require("request");
const { createBrotliCompress } = require("zlib");

function getOlympicsData(link){
    request(link,cb);
}

function cb(error,response,html){
    if(error==null && response.statusCode==200){
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
    let folderName="Output";
    if (fs.existsSync(folderName)) {
        deleteFileOrDir(folderName);
    }
    fs.mkdirSync(folderName);
    for(let j=0;j<allTeamtag.length-1;j++){
        let allTds=ch(allTeamtag[j]).find("td");
        let teamname=ch(allTds[0]).find("a").text().trim();
        let totalGold=ch(allTds[1]).text().trim();
        let totalSilver=ch(allTds[2]).text().trim();
        let totalBronze=ch(allTds[3]).text().trim();
        let totalMedal=ch(allTds[4]).text().trim();
        createCoutryMedalFile(folderName,teamname,totalGold,totalSilver,totalBronze,totalMedal);
    }
    console.log("Olympics 2020 data extracted successfully!");
}

function createCoutryMedalFile(folderName,teamname,totalGold,totalSilver,totalBronze,totalMedal){
    let countryPath=`${folderName}/${teamname}.json`;
    let countryOlympicsfil=[];
    let stats={
        TeamName : teamname,
        TotalGold : totalGold,
        TotalSilver : totalSilver,
        TotalBronze : totalBronze,
        TotalMedal : totalMedal
    }
    countryOlympicsfil.push(stats);
    countryOlympicsfil=JSON.stringify(countryOlympicsfil);
    fs.writeFileSync(countryPath,countryOlympicsfil);
}
function deleteFileOrDir(path, pathTemp = false){
    if (fs.existsSync(path)) {
        if (fs.lstatSync(path).isDirectory()) {
            var files = fs.readdirSync(path);
            if (!files.length) return fs.rmdirSync(path);
            for (var file in files) {
                var currentPath = path + "/" + files[file];
                if (!fs.existsSync(currentPath)) continue;
                if (fs.lstatSync(currentPath).isFile()) {
                    fs.unlinkSync(currentPath);
                    continue;
                }
                if (fs.lstatSync(currentPath).isDirectory() && !fs.readdirSync(currentPath).length) {
                    fs.rmdirSync(currentPath);
                } else {
                    this.deleteFileOrDir(currentPath, path);
                }
            }
            deleteFileOrDir(path);
        } else {
            fs.unlinkSync(path);
        }
    }
    if (pathTemp) this.deleteFileOrDir(pathTemp);
}

module.exports=getOlympicsData;