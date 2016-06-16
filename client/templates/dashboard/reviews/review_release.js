Template.reviewRelease.rendered = function () {
    $('.averageRating').rating('disable');
};

Template.reviewRelease.helpers({
    reviews: function () {
        return Reviews.find({release: this.slug},{sort:{createdAt: -1}})
    },
    user: function () {
        return Meteor.users.findOne({_id: this.userId})
    },
    average: function () {
        var stats = ReviewStats.findOne({release: this.slug});

        return stats.rating / stats.reviews;

    },
    stats: function () {
        return ReviewStats.findOne({release: this.slug});
    }
});

Template.reviewRelease.events({
    //add your events here
});

Template.reviewRelease.onCreated(function () {
    //add your statement here
});

Template.reviewRelease.onRendered(function () {
    //add your statement here
});

Template.reviewRelease.onDestroyed(function () {
    //add your statement here
});

