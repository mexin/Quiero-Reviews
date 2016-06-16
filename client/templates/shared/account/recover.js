Template.accountRecover.events({
    'submit form': function (e) {
        e.preventDefault();
        var email = $('[name=emailRecover]').val();

        Accounts.forgotPassword({email: email}, function(err) {
            if (err) {
                if (err.message === 'User not found [403]') {
                    sAlert.error('This email does not exist.');
                } else {
                    sAlert.error('We are sorry but something went wrong.');
                }
            } else {
                $('[name=emailRecover]').val('');
                sAlert.success('Email Sent. Check your mailbox.');
            }
        });
    }
});

Template.accountRecover.onRendered(function () {
    $('.ui.dimmer').dimmer('hide');
});