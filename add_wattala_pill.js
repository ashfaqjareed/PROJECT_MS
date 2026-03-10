const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

let totalUpdated = 0;

for (let file of files) {
    let content = fs.readFileSync(file, 'utf-8');
    let original = content;

    // The topbar branch pills structure:
    // <div class="branch-pills">
    //     <span class="pill">Akurana 7MP</span>
    //     ...
    //     <span class="pill">Mallawapitiya</span>
    // </div>
    // We need to append <span class="pill">Wattala</span> before the closing </div> of branch-pills.

    // Only add Wattala if it's not already there.
    if (content.includes('class="branch-pills"') && !content.includes('>Wattala</span>')) {
        content = content.replace(/(<span class="pill">Mallawapitiya<\/span>\s*)(<\/div>)/, '$1<span class="pill">Wattala</span>\n                $2');
    }

    if (content !== original) {
        fs.writeFileSync(file, content);
        totalUpdated++;
        console.log(`✅ Added Wattala to topbar in ${file}`);
    }
}

console.log(`Done. Updated ${totalUpdated} files.`);
