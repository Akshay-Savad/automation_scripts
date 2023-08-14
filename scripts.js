const jsonFile = require("./fileName.json");
// Requiring module
const reader = require('xlsx')
  
// Reading our test file
const file = reader.readFile('./test.xlsx')
// console.log(jsonFile);
var sheetJson = []

for(var i of jsonFile){
    var temp = {}
    if (i.hasOwnProperty("QuestionTitle")) {
        temp.QuestionTitle = i.QuestionTitle
    } else {
        console.log("Question Title Missig", i.QuestionId)
        continue
    }

    if (i.hasOwnProperty("QuestionNumberForUI")) {
        temp.QuestionNumberForUI = i.QuestionNumberForUI
    } else {
        console.log("Question Number for UI Missig". i.QuestionId)
        continue
    }

    
    temp.isSelected = false

    for (var j of i.RowChoices) {
        if (j.isSelected == true) {
            temp.isSelected = true
            break
        }        
    }

    if (i.hasOwnProperty("isRuleBased")) {
        temp.isRuleBased = i.isRuleBased
    }else {
        temp.isRuleBased = false
    }

    if (i.hasOwnProperty("IsVisible")) {
        temp.isVisible = i.IsVisible 
    }else {
        if (i.hasOwnProperty("IsHidden")) {
            temp.isVisible = !i.IsHidden
        } else {
            console.log("Is Hiddent Not avaliable ", i.QuestionNumberForUI)
            temp.isVisible = false
        }
    }

    sheetJson.push(temp)
    temp = {}
}

const ws = reader.utils.json_to_sheet(sheetJson)
  
reader.utils.book_append_sheet(file,ws,"15622_1")
  
// Writing to our file
reader.writeFile(file,'./test.xlsx')