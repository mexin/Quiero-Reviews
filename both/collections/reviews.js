Reviews = new Mongo.Collection('reviews');

Reviews.attachSchema(new SimpleSchema({
    userId: {
        type: String,
    },
    release: {
        type: String,
        optional: true
    },
    review: {
        type: String,
        optional: true
    },
    rating: {
        type: Number,
        optional: true
    },
    downloaded: {
        type: Boolean,
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

}))

Reviews.allow({
    update: function (userId, doc, fields, modifier) {
        return userId === doc.userId;
    }
})