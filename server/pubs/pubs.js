//TODO Asegurar publicaciones para mas seguridad!!! URGENTE!

REST2DDP.configs.push({
    name: 'restReleases',
    collectionName: 'releases',
    restUrl:'http://quiero-recordings.com/wpbackend/wp-json/posts?type=release',
    jsonPath: '*',
    pollInterval: 300,
});

Meteor.publish('userReview', function () {
    var currentUserId = this.userId;
    return Reviews.find({userId: currentUserId})
});

Meteor.publish('reviews', function () {
   return Reviews.find()
});

Meteor.publish('reviewStats', function () {
    return ReviewStats.find()
});

Meteor.publish('releaseStat', function () {
    return ReviewStats.findOne({release: this.slug})
});

Meteor.publish('users', function () {
   return Meteor.users.find({})
});

Meteor.publish('downloads', function () {
    return Downloads.find()
});
