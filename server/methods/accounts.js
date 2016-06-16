Meteor.methods({
    createUsuario: function (usuario) {
        var userId = Accounts.createUser({
            username: usuario.email,
            email: usuario.email,
            password: usuario.pass,
            profile: {
                name: usuario.firstName + ' ' + usuario.lastName,
                artistName: usuario.artistAlias,
                country: usuario.country,
                artistType: usuario.artistType,
                soundcloudUrl: usuario.artistSoundcloud,
                raUrl: usuario.artistResidentAdvisor
            }
        });

        //Roles.addUsersToRoles(userId, ['default']);
    }

});