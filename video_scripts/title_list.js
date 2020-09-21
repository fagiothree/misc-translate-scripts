var fs = require('fs');
var path = require("path");




var input_path_map = path.join(__dirname, "output/old_narration_map.json");
var output_path = path.join(__dirname, "output/video_titles.json");



var json_string_map = fs.readFileSync(input_path_map).toString();
var json_map = JSON.parse(json_string_map);

var titles = [];

for (title in json_map){
    new_title = {};
    new_title.sourceText = title;
    new_title.text = title;
    titles.push(new_title);
}

videotitles = JSON.stringify(titles, null, 2);
fs.writeFile(output_path, videotitles, function (err, result) {
    if (err) console.log('error', err);
});