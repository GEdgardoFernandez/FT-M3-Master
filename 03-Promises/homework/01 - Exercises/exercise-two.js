"use strict";

const { error } = require("console");
let exerciseUtils = require("./utils");

let args = process.argv.slice(2).map(function (st) {
  return st.toUpperCase();
});

module.exports = {
  problemAx: problemA,
  problemBx: problemB
};

// corre cada problema dado como un argumento del command-line para procesar
args.forEach(function (arg) {
  let problem = module.exports["problem" + arg];
  if (problem) problem();
});

function problemA() {
  // callback version
  exerciseUtils.readFile("poem-two/stanza-01.txt", function (err, stanza) {
    exerciseUtils.blue(stanza);
  });
  exerciseUtils.readFile("poem-two/stanza-02.txt", function (err, stanza) {
    exerciseUtils.blue(stanza);
  });

  // promise version
  // Tu código acá:
  Promise.all([
    exerciseUtils.promisifiedReadFile("poem-two/stanza-01.txt"),
    exerciseUtils.promisifiedReadFile("poem-two/stanza-02.txt")
  ])
  .then((responses) => {
    responses.forEach((stanza) => exerciseUtils.blue(stanza));
    console.log('done');
  })
  .catch((error) => {
    exerciseUtils.blue.mockRestore(new Error(error));
  })
}

function problemB() {
  let filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return "poem-two/" + "stanza-0" + n + ".txt";
  });
  let randIdx = Math.floor(Math.random() * filenames.length);
  filenames[randIdx] = "wrong-file-name-" + (randIdx + 1) + ".txt";

  // callback version
  filenames.forEach((filename) => {
    exerciseUtils.readFile(filename, function (err, stanza) {
      exerciseUtils.blue(stanza);
      if (err) exerciseUtils.magenta(new Error(err));
    });
  });

  // promise version
  // Tu código acá:
  let promiseChain = Promise.resolve();
  filenames.forEach((filename) => {
    promiseChain = promiseChain.then(() =>{
      return exerciseUtils.promisifiedReadFile(filename)
      .then((stanza) => {
        exerciseUtils.blue(stanza);
      })
      .catch((err) => {
        exerciseUtils.magenta(new Error(err));
      });
    });
  });
  promiseChain.then(() => {
    console.log('done');
  });
}

// EJERCICIO EXTRA
function problemC() {
  let fs = require("fs");
  function promisifiedWriteFile(filename, str) {
    // tu código acá:
    return new Promise((resolve, reject) => {
      fs.writeFile(filename, str, (err) => {
        err ? reject(err) : resolve();
      })
    })
  }
  /*TESTEO DE OUTPUT */

promisifiedWriteFile("test.txt", "hola mundo")
.then(() => {
  console.log("WriteFile correcto");
})
.catch((err) => {
  console.log("WriteFile incorrecto: " + err);
})

}


