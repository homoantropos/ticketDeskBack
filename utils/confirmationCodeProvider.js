module.exports = class ConfirmationCodeProvider {
    static _userConfirmationCode = 'code';
    set userConfirmationCode(code) {
        ConfirmationCodeProvider._userConfirmationCode = code;
    }
}
