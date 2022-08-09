require("dotenv").config();
const syllables = require("syllables");
const randomWord = require("random-words");
const express = require("express");
const app = express();

let line = "";
let haiku = "";

function pushLine(num, total) {
  let count = 0;
  let newWord = randomWord();
  count = parseInt(syllables(`${newWord}`));
  total = total + count;
  if (total > num) {
    total = total - count;
    pushLine(num, total);
  } else if (total < num) {
    line = line + `${newWord} `;
    pushLine(num, total);
  } else {
    line = line + `${newWord} `;
  }
}

function createLine(num) {
  let total = 0;
  line = "";
  pushLine(num, total);
  haiku = haiku + line.charAt(0).toUpperCase() + line.slice(1) + "<br>";
}

createLine(5);
createLine(7);
createLine(5);

function refresh() {
  haiku = "";
  createLine(5);
  createLine(7);
  createLine(5);
}

app.get("/", (req, res) => {
  res.send(`<head><title>hAIku</title></head>
  <body style="margin: 0;">
    <div style="color: darkblue; border: 2px solid darkblue; height: 23vh; background-color: lightblue">
      <h1 style="text-align: center;">h[AI]ku</h1>
      <h2 style="text-align: center;">by</h2>
      <h2 style="text-align: center;">Jack Platitude</h2>
    </div>
    
    <h2 style="position: relative; left: 20px; padding-left: 30px; padding-top: 10px; color: darkblue; border: 2px solid darkblue; border-radius: 10px; height: 12vh; width: 50%; background-color: lightblue">${haiku}</h2>

    <form method="${refresh()}" action="/"> 
      <button style="color: darkblue; border: 2px solid darkblue; background-color: lightblue; border-radius: 5px; margin-left: 10px;" id="button">Refresh</button>
    </form>

    <div style="color: darkblue; border: 2px solid darkblue; height: 25vh; background-color: lightblue">
      <h2 style="text-align: left;">Coming soon:</h1>
      <ul>
        <li>Punctuation</li>
        <li>Rating System</li>
        <li>Database for Haikus</li>
        <li>Poetry Machine-Learning</li>
        <li>Matching Art</li>
      </ol>
    </div>
</body>`);
});

app.listen(process.env.PORT);
