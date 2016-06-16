Meteor.startup(function () {

    smtp = {
        username: Meteor.settings.private.smtpUser,
        password: Meteor.settings.private.smtpPass,
        server: Meteor.settings.private.smtpServer,
        port: 26
    }

    process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;

    Accounts.config({
        sendVerificationEmail: true
    });

    //////////////////////////
    // Pretty Emails Settings
    //////////////////////////

    PrettyEmail.style = {
        fontFamily: 'Helvetica',
        textColor: '#151616',
        buttonColor: '#FFFFFF',
        buttonBgColor: '#151616'
    }

    PrettyEmail.options = {
        from: 'Quiero Reviews <promo@quiero-recordings.com>',
        logoUrl: 'http://www.quiero-recordings.com/images/quierorecslogoblack.png',
        companyName: 'Quiero Recordings',
        companyUrl: 'http://www.quiero-recordings.com',
        companyAddress: 'Guadalajara, México',
        companyTelephone: '',
        companyEmail: 'hello@quiero-recordings.com',
        siteName: 'Quiero Reviews'
    }

    PrettyEmail.defaults.verifyEmail = {
        subject: 'Verification Email from Quiero Reviews',
        heading: 'You need to activate your account',
        buttonText: 'Activate account',
        showFooter: true
    }

    Accounts.emailTemplates.from = 'Quiero Reviews <promo@quiero-recordings.com>';

    //Accounts.emailTemplates = {
    //    from: 'Quiero Reviews <promo@quiero-recordings.com>',
    //    siteName: 'QuieroReviews',
    //    verifyEmail: {
    //        subject: function (user) {
    //            return 'Verification email from Quiero Reviews';
    //        },
    //        text: function (user, url) {
    //            return 'Hi,\n' +
    //                'Please open the link below to verify your account on our Platform:\n' + url;
    //        }
    //    }
    //}

    Accounts.onCreateUser(function(options, user) {
        if (options.profile) {
            user.profile = options.profile;
        }
        Meteor.setTimeout(function() {
            Accounts.sendVerificationEmail(user._id);
        }, 2 * 1000);
        return user;

    });

});
