const fs = require("fs");
const utils = require("../utils/request");
const process = require("process");

function pwd(print) {
    print(process.cwd());
}

function date(print) {
    print(Date());
}

function echo(print, args) {
    print(args);

}

function ls(print) {

    fs.readdir('.', (err, files) => {
        if (err) {
            throw new Error (err);
        } else {
            print(files.join(' '));
        }
    });
}

function cat(print, args) {
    fs.readFile(args, 'utf-8', (err, data) => {
        if (err) {
            throw new Error (err);
        } else {
            print(data);
        }
    })
}

function head(print, args) {

    fs.readFile(args, 'utf-8', (err, data) => {
        if (err) {
            throw new Error (err);
        } else {
            let lines = data.split('\n');
            print(lines[0]);
        }
    })
}

function tail(print, args) {

    fs.readFile(args, 'utf-8', (err, data) => {
        if (err) {
            throw new Error (err);
        }
            let lines = data.split('\n').pop();
            print(lines.trim());
    })
}

function curl(print, args) {
    utils.request(args, (err, response) => {
        if (err) {
            throw new Error (err);
        } else {
            print(response);
        }
    });
}

module.exports = {pwd, date, echo, ls, cat, head, tail, curl};
