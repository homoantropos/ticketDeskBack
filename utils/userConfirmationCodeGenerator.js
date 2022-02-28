characters = '0123456789AaBbCcDdEeFfGgHhIIJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz'

let confirmationCode = ''

for(let i = 0; i < 25; i++) {
    confirmationCode += characters[Math.floor(Math.random() * characters.length)];
}

module.exports = confirmationCode
