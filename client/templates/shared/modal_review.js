Template.modalReview.helpers({

});

Template.modalReview.events({
    savingReview: function () {
        return Session.get('savingReview')
    }
});

Template.modalReview.onCreated(function () {

});

Template.modalReview.onRendered(function () {
    $('#getRating')
        .rating({
            initialRating: 0,
            maxRating: 5
        });
});

Template.modalReview.onDestroyed(function () {

});

