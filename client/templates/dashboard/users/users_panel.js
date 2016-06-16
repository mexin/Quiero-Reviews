Template.usersPanel.helpers({
    users: function () {
        return Meteor.users.find();
    }
});

Template.usersPanel.events({
    //add your events here
});

Template.usersPanel.onCreated(function () {
    //add your statement here
});

Template.usersPanel.onRendered(function () {
    //add your statement here
});

Template.usersPanel.onDestroyed(function () {
    //add your statement here
});

