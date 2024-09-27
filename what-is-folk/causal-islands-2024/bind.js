let ws = 0;
let folkname = "unset";
const folknameEl = document.getElementById('folkname');
const folknameDisplayEl = document.getElementById('folknameDisplay');

const programListEl = spawnAndAttach('div');
programListEl.style = "font-family: monospace; white-space: pre-wrap;";

function spawnAndAttach(tag) {
    const el = document.createElement(tag);
    document.body.appendChild(el);
    return el;
}

function connectToFolkName(_folkname) {
    folkname = _folkname;
    folknameDisplayEl.innerText = folkname;
    ws = new FolkWS(document.getElementById('status'),`http://${folkname}.local:4273/ws`);
}

connectToFolkName(folknameEl.value);

folknameEl.onchange = (changeEvent) => {
    connectToFolkName(changeEvent.target.value);
}

// TODO: Need to get this working in order to find out the name of e.g. all programs
// demoCode = tcl`/someone/ claims /page/ has program code /c/`;
// TODO:
//   - Try sharing program position, angle, etc. via Folk code.
//   - .e.g `Claim [info hostname] has html "<h2>Blah</h2>\n<pre>some example code</pre>"`
function watchAndReport(statement, reporterElement) {
    // Parse statement for strings in foward slashes and pull out JSON keys in matches, accumalate and display that into the reporterElement
    let keysInStatement = statement.match(/\/([^\/]+)\//g).map(e => e.slice(1, -1))
    // console.log(keysInStatement)

    ws.watchCollected(statement, matches => {
        let reportString = `${folkname} has ${matches.length} match${matches.length === 1 ? '' : 'es'} for [${statement}]:`

        if (matches.length === 0) {
            reporterElement.innerText = reportString
            return
        }

        for (let i = 0; i < matches.length; i++) {
            let m = matches[i]
            // console.table(m)
            for (const key of keysInStatement) {
                reportString += `   ${m[key]}`
            }
        }
        // reporterElement.innerText = reportString
        globalMatches = matches
    });
}