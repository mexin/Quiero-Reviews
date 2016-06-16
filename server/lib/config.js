Meteor.startup(function () {
    // If user hasn't Verify cannot login and throw message.
    var loginAttemptVerifier = function (parameters) {
        if (parameters.user && parameters.user.emails && (parameters.user.emails.length > 0)) {

            // return true if verified email, false otherwise.
            var found = _.find(
                parameters.user.emails,
                function (thisEmail) {
                    return thisEmail.verified
                }
            );

            if (!found) {
                throw new Meteor.Error(500, 'Plase check your email, We sent you an activation link.');
            }
            return found && parameters.allowed;
        } else {
            console.log("user has no registered emails.");
            return false;
        }
    }
    Accounts.validateLoginAttempt(loginAttemptVerifier);
});