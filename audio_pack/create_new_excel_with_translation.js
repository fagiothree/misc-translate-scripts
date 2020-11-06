if(typeof require !== 'undefined') XLSX = require('xlsx');
var fs = require('fs');
var path = require("path");

var input_path_excel = path.join(__dirname, './input/Covid19_Parenting_Toolkit_audio.xlsx');
var workbook = XLSX.readFile(input_path_excel);

var input_path_translation = path.join(__dirname, './translation/pt/audio_pack_PT.json');
var json_string = fs.readFileSync(input_path_translation).toString();
var transl_obj = JSON.parse(json_string);

var sheet = workbook.Sheets["Translations"];
for (var z in sheet){
    
    if(z[0] === '!') continue;
    
    var col = z.substring(0,1);
    var row = parseInt(z.substring(1));
    if (row<6 || !(col=="G")) continue;
    console.log(row)
    curr_transl = transl_obj.filter(bit => bit.row == row);
    if (curr_transl.length != 1){
        console.log("error for row " + row)
        break
    } else{
        curr_transl = curr_transl[0];
    }

    sheet[z].v = curr_transl.text;
    

}

output_path = path.join(__dirname, "./translation/es/Covid19_Parenting_Toolkit_audio_PT.xlsx");
XLSX.writeFile(workbook, output_path);

/*
fs.writeFile(output_path, transl, function (err, result) {
    if (err) console.log('error', err);
});
*/