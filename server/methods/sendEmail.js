Meteor.methods({
    sendEmail: function (data) {

        var user = Meteor.users.findOne({_id: data.userId});

        this.unblock();

        var cleanTitle = data.title.replace(/<\/?[^>]+>/ig, " ");

        PrettyEmail.send('basic', {
            to: 'promo@quiero-recordings.com',
            subject: 'New Review from release: ' + cleanTitle,
            heading: 'New Review from release: ' + cleanTitle,
            message: "<b>Artista: </b>" + user.profile.artistName + "<br>" +
            "<b>Name: </b>" + user.profile.name + "<br>" +
            "<b>Pais: </b>" + user.profile.country + "<br><br>" +
            "<b>Review Details</b>" + "<br>" +
            "<b>Rating: </b>" + data.rate + "<br>" +
            "<b>Review: </b>"+ "<br>" + data.comment
        });
    }
});