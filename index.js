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
console.log(haiku);
app.get("/", (req, res) => {
  res.send(`<head><title>hAIku</title></head>
  <body style="margin: 0;">
    <div style="color: darkblue; border: 2px solid darkblue; height: 10vh; background-color: lightblue">
        <h2 style="text-align: center;">h[AI]ku</h2>
    </div>
    <h1 style="position: relative; padding: 10px; left: 30px; color: darkblue; border: 2px solid darkblue; border-radius: 10px; height: 7vh; width: 50%; background-color: lightblue">${haiku}</h1>
</body>`);
});

app.listen(process.env.PORT);


