if(typeof require !== 'undefined') XLSX = require('xlsx');
var fs = require('fs');
var path = require("path");

var input_path = path.join(__dirname, './input/Covid19_Parenting_Toolkit_audio.xlsx');
var workbook = XLSX.readFile(input_path);


var transl = [];

var sheet = workbook.Sheets["Translations"];
for (var z in sheet){
    
    if(z[0] === '!') continue;
    
    var col = z.substring(0,1);
    var row = parseInt(z.substring(1));
    if (row<6 || !(col=="G")) continue;
    console.log(col)
    var value = sheet[z].v;
    var bits = {};
    bits.col = col;
    bits.row = row;
    bits.text = value;
    transl.push(Object.assign({}, bits))

}

transl= JSON.stringify(transl, null, 2);

output_path = path.join(__dirname, "./output/audio_pack_translation.json");
fs.writeFile(output_path, transl, function (err, result) {
    if (err) console.log('error', err);
});
