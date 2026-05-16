import * as cheerio from 'cheerio';

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Original Title</title>
</head>
<body>
    <h1>Hello, world!</h1>
</body>
</html>
`;
const $ = cheerio.load(html);
// Modify the title
$('title').text('New Title');
console.log($.html());
