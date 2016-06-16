Template.downloadControl.helpers({
    release: function () {
        return Releases.find()
    },
    downloads: function () {
        return Downloads.find({release: this.slug})
    }

});

Template.downloadControl.events({
    'click #createDownload': function (e) {
        e.preventDefault();
        $('.ui.modal')
            .modal({
                blurring: true,
                onDeny: function () {
                    $('#downloadForm').form('clear values');
                },
                onApprove: function () {
                    var data = $('#downloadForm').form('get values');

                    console.log(data);

                    if (data.release && data.downloadUrl) {

                        var query = Downloads.findOne({
                            release: data.release
                        })

                        if (!query) {
                            Downloads.insert({
                                release: data.release,
                                downloadUrl: data.downloadUrl
                            })

                            $('.ui.dimmer').dimmer('hide')
                        } else {
                            $('.ui.dimmer').dimmer('hide')
                            $('#downloadForm').form('clear values');
                            sAlert.error('The release you selected has an url already.')
                        }
                    } else {
                        sAlert.error('Please select a release and fill the url properly.')
                    }

                    return false;
                }
            })
            .modal('show')
    },
    'click #deleteDownload': function () {
        Downloads.remove(this._id)
    }
});

Template.downloadControl.onCreated(function () {
    //add your statement here
});

Template.downloadControl.onRendered(function () {
    //add your statement here
});

Template.downloadControl.onDestroyed(function () {
    //add your statement here
});

Template.downloadControl.onRendered(function () {
    $('.dropdown').dropdown();
});