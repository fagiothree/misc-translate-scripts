var fs = require("fs");

var titles = ["One-on-One Time – Babies",
    "One-on-One Time - Children",
    "One-on-One Time - Teens",
    "Keeping it Positive",
    "Positive instructions",
    "Praise",
    "Structure Up",
    "Household Rules",
    "When Children Misbehave - Part 1 Redirect",
    "When Children Misbehave - Part 2 Consequences",
    "Shared Book Reading",
    "When Children Misbehave - Part 3 Ignore",
    "When Children Misbehave - Part 4 Problem Solving",
    "Online Child Safety",
    "Crying",
    "Emotional Support",
    "Crisis Support",
    "GoodBad Touch",
    "Family Harmony",
    "Family Budgeting",
    "Keep Calm and Manage Stress including Take a Pause",
    "Short Pause",
    "Loving Kindness",
    "Magical Number",
    "When we are angry",
    "Anger Management",
    "Exercise",
    "Online Safety",
    "Talking about COVID-19",
    "Children with Disabilities",
    "Child Development - Introduction",
    "Child Development - Babies & toddlers (0 - 2 years)",
    "Child Development - Children (2 - 9 years)",
    "Child Development - Teenagers (10 - 17 years)"];
var titlesMap = {};
titles.forEach((title) => { titlesMap[title] = true; });

var documentContents = fs.readFileSync("input.txt").toString();

var linesByTitle: { [title: string]: { duration: string, lines: string[] } } = {};

var currentTitle = titles[0];
var currentSectionLines = [];
var docLineSeperator = "\n";
documentContents.split(docLineSeperator).forEach((line) => {
    var neatLine = line.trim().replace("\r", "");
    if (!linesByTitle[currentTitle]) {
        linesByTitle[currentTitle] = { duration: "", lines: [] };
    }
    if (titlesMap[neatLine]) {
        linesByTitle[currentTitle].lines = currentSectionLines;
        currentTitle = neatLine;
        currentSectionLines = [];
    } else if (neatLine.length > 0 && neatLine.indexOf("_____") < 0) {
        currentSectionLines.push(neatLine);
    }
});
linesByTitle[currentTitle].lines = currentSectionLines;

var translateArray: { sourceText: string, text: string, note: string, topicTitle: string }[] = [];

titles.forEach((title) => {
    if (linesByTitle[title]) {
        linesByTitle[title].duration = linesByTitle[title].lines[0];
        linesByTitle[title].lines = linesByTitle[title].lines.slice(1);
        linesByTitle[title].lines.forEach((line) => {
            translateArray.push({
                sourceText: line,
                text: line,
                topicTitle: title,
                note: "This is for topic " + title
            });
        });
    } else {
        console.log(title, " has no lines. This is a bug");
    }
});

var narrationArray: { id: string, text: string, type: "video" | "audio" }[] = [];

titles.forEach((title) => {
    if (linesByTitle[title]) {
        linesByTitle[title].duration = linesByTitle[title].lines[0];
        var paragraphText = linesByTitle[title].lines.slice(1).join("\n");
        narrationArray.push({
            text: paragraphText,
            id: title,
            type: "video"
        });
    } else {
        console.log(title, " has no lines. This is a bug");
    }
});

fs.writeFileSync("./narration_map.json", JSON.stringify(linesByTitle, null, 4));

fs.writeFileSync("./narration_list.json", JSON.stringify(narrationArray, null, 4));

fs.writeFileSync("./translation_list.json", JSON.stringify(translateArray, null, 4));