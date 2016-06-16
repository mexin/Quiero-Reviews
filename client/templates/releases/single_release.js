//Meteor.subscribe('userReview');
//Meteor.subscribe('restReleases');
//Meteor.subscribe('releaseStat');
//Meteor.subscribe('downloads')

Template.singleRelease.rendered = function () {
    $('#savedRating').rating('disable');
};

Template.singleRelease.onRendered(function () {

});

Template.singleRelease.helpers({
    isReviewAlready: function () {
        var slug = $('#title-slug').attr('data');

        return Reviews.findOne({
            userId: Meteor.userId(),
            release: this.slug
        });
    },
    download: function () {
        return Downloads.findOne({release: this.slug});
    },
    savingReview: function () {
        return Session.get('savingReview')
    }
});

Template.singleRelease.events({
    'click #submitReview': function () {
        var rate = $('.rating').rating('get rating');
        console.log(rate);
    },
    'click #openReview': function (e) {
        e.preventDefault();
        $('.ui.modal')
            .modal({
                blurring: true,
                onDeny: function () {

                    return false;
                },
                onApprove: function () {
                    Session.set('savingReview', true)
                    var rate = $('.rating').rating('get rating');
                    var comment = $('#reviewComment').val();
                    var slug = $('#title-slug').attr('data');

                    var data = {
                        userId: Meteor.userId(),
                        title: this.title,
                        release: slug,
                        rate: rate,
                        comment: comment,
                        downloaded: false
                    };

                    Meteor.call('insertReview', data, function (error, result) {
                        if (error) {
                            sAlert.error(error);
                            console.log(error);
                        } else {
                            Meteor.call('sendEmail', data, function (error, result) {
                                if (error) {
                                    sAlert.error(error);
                                    console.log(error);
                                }
                                Session.set('savingReview', false)
                                Session.set('reviewSaved', true);
                                $('.ui.modal').modal('hide');
                                $('#savedRating').rating('disable');
                            })
                        }
                    });
                    return false;
                }
            })
            .modal('show')
    },
    'click #downloadLink': function (e) {
        var review = Reviews.findOne({
            userId: Meteor.userId(),
            release: this.slug
        });

        Reviews.update(review._id, {
            $set: {downloaded: true}
        });

        var data = {
            slug: this.slug
        }

        Meteor.call('addDownloadCount', data, function (error, result) {
            if (error) {
                sAlert.error(error);
                console.log(error);
            }
        });
    }
});

//Call Jquery Semantic Rating on reactive save
Tracker.autorun(function () {
    var saved = Session.get('reviewSaved');

    if (saved) {
        Tracker.afterFlush(function () {
            $('#savedRating').rating('disable');
        });
    }
});