module.exports.confirmationCode = () => {
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let confirmationCode = ''
    for(let i = 0; i < 25; i++) {
        confirmationCode += characters[Math.floor(Math.random() * characters.length)];
    }
    return confirmationCode
}

module.exports = class ConfirmationCodeProvider {
    static _userConfirmationCode = 'code';
    set userConfirmationCode(code) {
        ConfirmationCodeProvider._userConfirmationCode = code;
    }
}
