Downloads = new Mongo.Collection('downloads');

Downloads.attachSchema(new SimpleSchema({
    release: {
        type: String,
        optional: true
    },
    downloadUrl: {
        type: String,
        optional: true
    },
    createdAt: {
        type: Date,
        autoValue: function () {
            if (this.isInsert) {
                return new Date;
            } else if (this.isUpsert) {
                return {$setOnInsert: new Date};
            } else {
                this.unset();
            }
        },
        autoform: {
            type: "hidden",
            label: false
        }
    },
    updatedAt: {
        type: Date,
        autoValue: function () {
            if (this.isUpdate) {
                return new Date();
            }
        },
        denyInsert: true,
        optional: true
    }

}));

Downloads.allow({
    update: function (userId, user) {
        if (Roles.userIsInRole(Meteor.user(), ['admin'])) {
            return true
        }
        return false
    },
    insert: function (userId, user) {
        if (Roles.userIsInRole(Meteor.user(), ['admin'])) {
            return true
        }
        return false
    },
    remove: function () {
        if (Roles.userIsInRole(Meteor.user(), ['admin'])) {
            return true
        }
        return false
    }
});

