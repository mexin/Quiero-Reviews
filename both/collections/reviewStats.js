ReviewStats = new Mongo.Collection('reviewStats');

ReviewStats.attachSchema(new SimpleSchema({

    release: {
        type: String,
        optional: true
    },
    reviews: {
        type: Number,
        optional: true
    },
    rating: {
        type: Number,
        optional: true
    },
    downloads: {
        type: Number,
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
