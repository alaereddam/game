const fs = require('fs');
let src = fs.readFileSync('data.js', 'utf8');

// replace strings to not count braces inside strings
let s = src.replace(/"(\\.|[^"])*"/g, '');
let lines = s.split('\n');
let open = 0;
for (let i = 0; i < lines.length; i++) {
    let l = lines[i];
    for (let c of l) {
        if ('{['.includes(c)) open++;
        if ('}]'.includes(c)) open--;
    }
    if (i > 470) {
        console.log((i + 1) + ': ' + open + ' \t' + l.trim());
    }
}
console.log("Final open:", open);
try {
    eval(src);
} catch(e) {
    console.error(e.toString());
}
