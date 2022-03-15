const nodemailer = require('nodemailer');
const keys = require('../config/keys')

const user = keys.user;
const pass = keys.pass

const transport = nodemailer.createTransport({
    host: "smtp.ukr.net",
    port: 465,
    secure: true,
    auth: {
        user: user,
        pass: pass
    }
});

module.exports.sendConfirmationEmail = (name, email, confirmationCode) => {
    transport.sendMail({
        from: user,
        to: email,
        subject: "Просимо активувати ваш акаунт за посиланням",
        html: `<h1>Активація акаунту</h1>
                <h2>Вітаємо!</h2>
                <p>Дякуємо за реєстрацію на сайті! Для активації вашого акаунту просимо перейти за наступним посиланням:</p>
                <a href=http://localhost:8050/api/user/confirm/${confirmationCode}>натисніть тут</a>`
    })
}

module.exports.sendLinkForPasswordReset = (name, email, confirmationCode) => {
    transport.sendMail({
        from: user,
        to: email,
        subject: "Внесіть новий пароль",
        html: `<h1>Зміна пароля</h1>
                <p>Для зміни паролю просимо перейти за наступним посиланням:</p>
                <a href=http://localhost:8050/api/user/reset/${confirmationCode}>натисніть тут</a>`
    })
}
