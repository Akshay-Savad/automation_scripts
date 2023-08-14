const reader = require('xlsx')
const fs = require('fs')

const file = reader.readFile('./RepushDara.xlsx')

var sheetJson = reader.utils.sheet_to_json(file.Sheets["RSA"])

var arr = []
var result = []
arr[0] = Object.keys(sheetJson[0])[0]

for(var i of sheetJson){
    arr.push(i[arr[0]])
}

var temp = []
var count = 0

for(var i of arr){
    if(i == 0){
        continue
    }
    if (count == 100 || i == arr.length - 1) {
        var obj = {};
        obj["data"] = temp;
        result.push(obj);
        temp = []
        count = 0
    }

    temp.push(i)
    count += 1
}

var obj = {};
obj["data"] = temp;
result.push(obj);


var jsonData = JSON.stringify(result);

fs.writeFile('RSA_Reporting.json', jsonData, (err) => {
    if(err) {
        throw err;
    }

    console.log("JSON file saved!")
})