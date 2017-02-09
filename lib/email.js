'use strict';

const nodemailer = require('nodemailer');
const config = require('../configurations/config.json');

let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: config.email,
        pass:  config.secret
    },
    debug: true
}, {
    from: 'RecycleBin <no-reply@recyclebin.net>'
});


module.exports = function(user) {
    console.log(user);
    let message = {

        to: '<'+ user +'>',

        subject: 'Lots of goodies',

        text: 'Come get your needs fulfilled',

        html: `<p><b>Hi</b> we miss you</p>
            <p>Come get your desires fulfilled.</p>`
    };

    transporter.sendMail(message, (error, info) => {
        if (error) {
            return;
        }
        console.log('email');
        transporter.close();
    });
}