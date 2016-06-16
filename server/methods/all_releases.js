Meteor.methods({
    insertReview: function (data) {
        Reviews.insert({
            userId: data.userId,
            release: data.release,
            rating: data.rate,
            review: data.comment,
            downloaded: data.downloaded
        });
        var stats = ReviewStats.findOne({release: data.release});
        if (!stats) {
            ReviewStats.insert({
                release: data.release,
                reviews: 1,
                rating: data.rate,
                downloads: 1
            })
        } else {
            //TODO Fix this, so it can sum new ratings, and check the increment on downloads unless download button is clicked
            /*var result = Reviews.aggregate([
             {$match: {release: stats.release}},
             {$group: {_id: null, rating: {$sum: '$rating'}}}
             ])*/

            var sumRating = stats.rating + data.rate

            ReviewStats.update(
                {_id: stats._id},
                {
                    $inc: {
                        reviews: 1
                    },
                    $set: {
                        rating: sumRating
                    }
                }
            )
        }
    },
    addDownloadCount: function (data) {
        ReviewStats.update({release: data.slug},{$inc: {downloads: 1}})
    }

});