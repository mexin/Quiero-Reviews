Router.route('/', {
    name: 'index',
    template: 'index',
    waitOn: function () {
        return Meteor.subscribe('REST2DDP', 'restReleases');
    },
    onBeforeAction: function () {

        this.next();
        return document.title = "Quiero Reviews";
    }
});

Router.route('/dashboard', {
    name: 'dashboard',
    template: 'dashboard',
    waitOn: function () {
        return [
            Meteor.subscribe('REST2DDP', 'restReleases'),
            Meteor.subscribe('reviewStats'),
            Meteor.subscribe('reviews'),
            Meteor.subscribe('users')
        ]
    },
    onBeforeAction: function () {
        this.next();
        return document.title = "Dashboard";
    }
});

Router.route('/releases/:slug', {
    name: 'singleRelease',
    template: 'singleRelease',
    waitOn: function () {
        return[
            Meteor.subscribe('REST2DDP', 'restReleases'),
            Meteor.subscribe('reviewStats'),
            Meteor.subscribe('reviews'),
            Meteor.subscribe('downloads')
        ]
    },
    data: function () {
        return Releases.findOne({slug: this.params.slug});
    },
    onBeforeAction: function () {

        this.next();
        return document.title = "Review Release";
    }
});

Router.route('/reviews/:slug', {
    name: 'reviewRelease',
    template: 'reviewRelease',
    //subscriptions: function () {
    //    return [
    //        Meteor.subscribe('REST2DDP', 'restReleases'),
    //        Meteor.subscribe('userReview'),
    //        Meteor.subscribe('restReleases'),
    //        Meteor.subscribe('releaseStat'),
    //        Meteor.subscribe('downloads')
    //    ]
    //},
    waitOn: function () {
        return [
            Meteor.subscribe('REST2DDP', 'restReleases'),
            Meteor.subscribe('reviewStats'),
            Meteor.subscribe('reviews'),
            Meteor.subscribe('users')
        ]
    },
    data: function () {
        return Releases.findOne({slug: this.params.slug});
    },
    onBeforeAction: function () {
        this.next();
        return document.title = "Detailed Review";
    }
});

Router.route('/downloads', {
    name: 'downloadControl',
    template: 'downloadControl',
    waitOn: function () {
        return [
            Meteor.subscribe('REST2DDP', 'restReleases'),
            Meteor.subscribe('downloads')
        ]

    },
    onBeforeAction: function () {
        this.next();
        return document.title = "Downloads Control";
    }
});

Router.route('/users', {
    name: 'usersPanel',
    template: 'usersPanel',
    waitOn: function () {
        return [
            Meteor.subscribe('users'),
            Meteor.subscribe('reviewStats'),
            Meteor.subscribe('reviews')
        ]

    },
    onBeforeAction: function () {
        this.next();
        return document.title = "Users Panel";
    }
});

Router.route('/log-in', {
    name: 'logIn',
    template: 'accountLogin',
    onBeforeAction: function () {
        this.next();
        return document.title = "Log In";
    }
});

Router.route('/sign-up', {
    name: 'signUp',
    template: 'accountRegister',
    onBeforeAction: function () {
        this.next();
        return document.title = "Sign Up!";
    }
});

Router.route('/sign-up-sucessful', {
    name: 'registerSuccess',
    template: 'registerSuccess',
    onBeforeAction: function () {
        this.next();
        return document.title = "Account Created!";
    }
});

Router.route('/forgot-password', {
    name: 'accountRecover',
    template: 'accountRecover',
    onBeforeAction: function () {
        this.next();
        return document.title = "Forgot your password?";
    }
});

var requireAdminRole = function () {
    user = Meteor.user();
    if (!Roles.userIsInRole(user, ['admin'])) {
        this.render('accessDenied');
        this.stop();
    } else {
        this.next();
    }
}

//Security roles
Router.onBeforeAction(requireAdminRole, {only: ['dashboard', 'reviewRelease', 'downloadControl', 'usersPanel']});
