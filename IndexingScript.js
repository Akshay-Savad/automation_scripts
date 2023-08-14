const reader = require('xlsx')
const fs = require('fs')

// TODO: Add File Name here
const file = reader.readFile('./Migration_9_5.xlsx')

// TODO: Add sheet Name here
var sheetJson = reader.utils.sheet_to_json(file.Sheets["Sheet1"])
var arr = []
arr[0] = Object.keys(sheetJson[0])[0]

for(var i of sheetJson){
    arr.push(i[arr[0]])
}

var finalArr = []
var temp = []
var count = 0
for(var i of arr){
    if(i == 0){
        continue
    }
    if (count == 8) {
        finalArr.push(temp)
        temp = []
        count = 0
    }

    temp.push(i)
    count += 1
}

finalArr.push(temp)

// TODO: Add result filename here
var outputFileName = './Migration_9_5.txt' 
fs.writeFile(outputFileName, '', function(err) {
    if (err) {
       return console.error(err);
    }
})

for(var i of finalArr){
    try {
        fs.appendFileSync(outputFileName,`[${i.toString()}]\n\n`, 'utf8');
    } catch (error) {
        console.error(error)
    }
}   