Template.accountLogin.helpers({
    loginLoading: function () {
        return Session.get('loginLoading')
    }
});

Template.accountLogin.events({
    'submit form': function (event) {
        event.preventDefault();
        Session.set('loginLoading', true);
        var email = $('[name=email]').val();
        var pass = $('[name=password]').val();
        Meteor.loginWithPassword(email, pass, function (error) {
            if (error) {
                console.log(error.reason);
                sAlert.error(error.reason);
                Session.set('loginLoading', false);
            }
            if (Roles.userIsInRole(Meteor.user(), ['admin'])) {
                Router.go('/dashboard')
            }
            Session.set('loginLoading', false);
            $('.ui.dimmer').dimmer('hide');
        });
    }
});