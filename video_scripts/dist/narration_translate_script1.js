"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const process_1 = require("process");
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
    "Child Development - Teenagers (10 - 17 years)",
    "Helping your children learn"];
var titlesMap = {};
titles.forEach((title) => { titlesMap[title] = true; });
if (!fs.existsSync("./input")) {
    fs.mkdirSync("input");
}
var documentContents = "";
try {
    documentContents = fs.readFileSync("./input/input.txt").toString();
}
catch (ex) {
    console.log("Failed to load ./input/input.txt");
    console.log("Please make sure your input to this script is in a folder called input, and is itself a file called input.txt");
    process_1.exit(1);
}
var linesByTitle = {};
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
    }
    else if (neatLine.length > 0 && neatLine.indexOf("_____") < 0) {
        currentSectionLines.push(neatLine);
    }
});
linesByTitle[currentTitle].lines = currentSectionLines;
var translateArray = [];
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
    }
    else {
        console.log(title, " has no lines. This is a bug");
    }
});
var narrationArray = [];
titles.forEach((title) => {
    if (linesByTitle[title]) {
        linesByTitle[title].duration = linesByTitle[title].lines[0];
        var paragraphText = linesByTitle[title].lines.join("\n");
        narrationArray.push({
            text: paragraphText,
            id: title,
            type: "video"
        });
    }
    else {
        console.log(title, " has no lines. This is a bug");
    }
});
if (!fs.existsSync("./output")) {
    fs.mkdirSync("./output");
}
fs.writeFileSync("./output/narration_map.json", JSON.stringify(linesByTitle, null, 4));
fs.writeFileSync("./output/narration_list.json", JSON.stringify(narrationArray, null, 4));
fs.writeFileSync("./output/translation_list.json", JSON.stringify(translateArray, null, 4));
//# sourceMappingURL=narration_translate_script1.js.map