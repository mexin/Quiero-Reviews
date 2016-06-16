Template.dashboard.rendered = function () {
    $('.averageRating').rating('disable');
};

Template.dashboard.helpers({
    releases: function () {
        return Releases.find();
    },
    reviewStats: function () {
        return ReviewStats.findOne({release: this.slug});
    },
    average: function () {
        var stats = ReviewStats.findOne({release: this.slug});
        if(stats){
            return stats.rating / stats.reviews;
        }
            return 0;

    },
    recentRegistered: function () {
        return Meteor.users.find({}, {sort: {createdAt:-1}, limit:9});
    },
    recentCreatedAt: function () {
        return moment(this.createdAt).format("DD MMMM YYYY");
    }
});

Template.dashboard.events({
    //add your events here
});

Template.dashboard.onCreated(function () {
    //add your statement here
});

Template.dashboard.onRendered(function () {
    //add your statement here
});

Template.dashboard.onDestroyed(function () {
    //add your statement here
});

