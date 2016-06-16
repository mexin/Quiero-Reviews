Meteor.startup(function () {
//Create default Admin
    if (Meteor.users.find().count() < 1) {
        var users = [
            {name: 'Admin', email: 'admin@email.com', roles: ['admin']}
        ];
        _.each(users, function (userData) {
            var userid = Accounts.createUser({
                email: userData.email,
                password: 'password',
                username: userData.email,
                profile: {
                    name: userData.name,
                    artistName: userData.name,
                    country: 'Mexico',
                    artistType: userData.name,
                    soundcloudUrl: 'none',
                    raUrl: 'none'
                }
            });
            Meteor.users.update({_id: userid}, {$set: {'emails.0.verified': true}});
            Roles.addUsersToRoles(userid, userData.roles);
        })
    }
});