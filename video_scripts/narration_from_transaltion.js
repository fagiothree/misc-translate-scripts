var fs = require('fs');
var path = require("path");



var input_path_transl = path.join(__dirname, "translation/malay/translation_list_MS.json");
var input_path_transl_edu = path.join(__dirname, "translation/malay/Education_video_voiceover_addition__MS.json");
var input_path_map = path.join(__dirname, "output/old_narration_map.json");
var output_path = path.join(__dirname, "translation/malay/narration_list_malay.json");

var json_string_transl = fs.readFileSync(input_path_transl).toString();
var array_transl = JSON.parse(json_string_transl);
var json_string_transl_edu = fs.readFileSync(input_path_transl_edu).toString();
var array_transl_edu = JSON.parse(json_string_transl_edu);

var json_string_map = fs.readFileSync(input_path_map).toString();
var json_map = JSON.parse(json_string_map);

var narration_transl = [];

for (title in json_map){
    from_topic = array_transl.filter(function (atom) { return (atom.topicTitle == title ) });
    new_video = {};
    new_video.id = title;
    new_video.type = "video";
    new_video.text = "";
    json_map[title].lines.forEach(element => {
        trans_line = from_topic.filter(function (atom) { return (atom.sourceText == element) });
        if (trans_line.length == 0 || trans_line.length > 1){
            console.log("error" + title)
        }else {
        new_video.text = new_video.text + trans_line[0].text + "\n";
        };
    });
    new_video.text =  new_video.text.slice(0, -2);
    narration_transl.push(new_video);
}

title = "Helping your children learn";
new_video = {};
new_video.id = "Helping your children learn";
new_video.type = "video";
new_video.text = "";
json_map[title].lines.forEach(element => {
        trans_line = array_transl_edu.filter(function (atom) { return (atom.sourceText == element) });
        if (trans_line.length == 0 || trans_line.length > 1){
            console.log("error")
        }else {
        new_video.text = new_video.text + trans_line[0].text + "\n";
        };
    });
new_video.text =  new_video.text.slice(0, -2);
narration_transl.push(new_video);

narr = JSON.stringify(narration_transl, null, 2);
fs.writeFile(output_path, narr, function (err, result) {
    if (err) console.log('error', err);
});