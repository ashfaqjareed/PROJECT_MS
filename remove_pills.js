const fs = require("fs");
const path = require("path");

const directory = __dirname;
const files = fs.readdirSync(directory).filter(file => file.endsWith('.html'));

const searchRegex = /<div class="header-branch-pills hide-mobile">\s*<div class="branch-pill active" data-branch="akurana-7mp">Akurana<\/div>\s*<div class="branch-pill" data-branch="wattala-8mp">Wattala<\/div>\s*<\/div>/g;

let count = 0;
files.forEach(f => {
    let filePath = path.join(directory, f);
    let content = fs.readFileSync(filePath, "utf8");
    
    if (searchRegex.test(content)) {
        content = content.replace(searchRegex, "");
        fs.writeFileSync(filePath, content);
        count++;
    }
});

console.log(`Removed branch pills from ${count} files.`);
