const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});

// this will add on to our schema a username, a field for password,
// will make sure usernames are unique and give us additional methods we can use
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);