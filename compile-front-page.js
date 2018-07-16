/*
talks.json is assumed to be like this, note every field can use Markdown as it'll get parsed into HTML

{
  "talk title" : {
    "url": "required",
    "date": "required (should be "Month XX" as it'll get output as: "Month XX, Year")",
    "description": "required",
    "writeUpUrl": "optional",
    "videoUrl": "optional"
  }
}

*/

var fs = require('fs');
const showdown = require('showdown')
var converter = new showdown.Converter();
const talks = require('./talks.json')
const title = "Talks by Andr&eacute;s Cuervo"

var md = ``
const reversedYears = Object.keys(talks).reverse()
// Note: iterate through talks normally gives you the years in ascending order, since we want most recent first we reverse the keys
for (const majorYear in reversedYears) {
    const year = reversedYears[majorYear]
    const yearOfTalks = talks[year]
    md += `## ${year}\n`

    for (let title in yearOfTalks) {
        const { date, description, url, writeUpUrl, videoUrl } = yearOfTalks[title]
        md += converter.makeHtml( `<span class="talk-title">${title}</span><span class="talk-date">${date}, ${year}</span>\n`)
        md += `\n${ description }\n`
        md += ` - [Slides](${ url })\n`
        if (writeUpUrl) {
            md += `- [Accompanying write-up](${ writeUpUrl })\n`
        }

        if (videoUrl) {
            md += `- [Video of talk](${ videoUrl })\n`
        }
        md += "\n<hr class='divider'/>\n"
        console.log(`☑ Converted "${title}"`)
    }
}

var html = converter.makeHtml(md);

const finalPage = `
<!DOCTYPE html>
<head>
    <meta charset="UTF-8">
    <title>${title}</title>
    <html lang="en">
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">

<style>
body {
    background-color: #2EAFAC;
    padding: 1% 10%;

    color: white;
    font-size: 2em;
    font-family: 'Roboto', sans-serif;
}

#pageHeader {
    text-align: center;
}

.divider {
    border: 1px solid white;
    height: 0;
}

.talk-title {
    display: block;
    font-weight: bold;
    margin-bottom: 0;
}

.talk-date {
    margin-top: 0.5em;
}

ul {
    padding-left: 4%;
}

a {
color: peachpuff;
}

a:visited {
color: purple;
}

</style>
</head>
<body>
<h1 id="pageHeader"><a href="https://cwervo.com">Andr&eacute;s Cuervo</a>'s Talks</h1>
${html}
</body>
</html>
`

// Make the title, set lang settings for the page, etc.

fs.writeFile("index.html", finalPage, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});
