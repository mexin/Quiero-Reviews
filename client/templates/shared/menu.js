Template.menu.rendered = function () {
    $('.ui.dropdown').dropdown({action: 'nothing'});
};

Template.menu.helpers({
    //add you helpers here
});

Template.menu.events({
    'click .logout': function (e) {
        e.preventDefault();
        Meteor.logout();
        $('.ui.dropdown').dropdown({action: 'nothing'});
    }
});

Template.menu.onCreated(function () {
    //add your statement here
});

Template.menu.onRendered(function () {
    $('.ui.dropdown').dropdown({action: 'nothing'});
});

Template.menu.onDestroyed(function () {
    //add your statement here
});
