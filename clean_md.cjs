const fs = require('fs');
const path = require('path');
const dir = 'src/content/cheatsheet';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md') && f !== 'README.md');
for (const file of files) {
    const fp = path.join(dir, file);
    let c = fs.readFileSync(fp, 'utf8');
    c = c.replace(/`{1,4}\s*$/g, '');
    fs.writeFileSync(fp, c);
    console.log('Cleaned '+file);
}
