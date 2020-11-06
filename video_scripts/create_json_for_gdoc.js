var fs = require('fs');
var path = require("path");



var input_path = path.join(__dirname, "./translation/Malay/corrected_full_narration_list_malay.json");
var json_string = fs.readFileSync(input_path).toString();
var obj = JSON.parse(json_string);

var narr_for_doc = {};

obj.forEach( video =>{
    narr_for_doc[video.title] = video.text;
})

narr_for_doc = JSON.stringify(narr_for_doc, null, 2);
var output_path = path.join(__dirname, "./translation/Malay/corrected_full_narration_list_malay_for_doc.json");
    fs.writeFile(output_path, narr_for_doc, function (err, result) {
        if (err) console.log('error', err);
    });