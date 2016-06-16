Template.allReleases.rendered = function () {

};

Template.allReleases.helpers({
    releases: function () {
        return Releases.find();
    }
});
