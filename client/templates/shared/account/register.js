function actions() {
    $('.dropdown').dropdown();
    $('.ui.checkbox').checkbox();
}

Template.accountRegister.rendered = function () {

};

Template.accountRegister.helpers({
   registerLoading: function () {
       return Session.get('registerLoading')
   }
});


Template.accountRegister.events({
    'submit form': function (e) {
        e.preventDefault();
        Session.set('registerLoading', true);
        var usuario = $('#signUp').form('get values');

        console.log(usuario);

            //TODO fix validation to make all fields required
        if (usuario.email !== '' && usuario.password !== '') {
            Meteor.call('createUsuario', usuario, function (error, result) {
                if (error) {
                    sAlert.error(error);
                    console.log(error);
                    Session.set('registerLoading', false);
                } else {
                    Session.set('registerLoading', false);
                    Router.go('registerSuccess');
                }
            });
        } else {
            Session.set('registerLoading', false);
            sAlert.error("All fields are mandatory, please fill them.");
        }

    }
});

Template.accountRegister.onRendered(function () {
    $('.ui.dimmer').dimmer('hide');
    actions();
});