const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        phoneNumber: {type: String, required: true, unique: true},
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        email: {type: String, required: true}
    }
);

const User = mongoose.model('User', UserSchema);

async function addOrUpdate(data) {
    let user = await User.findOne({"phoneNumber": data.phoneNumber});
    if (!user)
        user = new User({
            phoneNumber: data.phoneNumber,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email
        })
    else {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.email = data.email;
    }
    try {
        await user.save();
        return user.id;
    } catch {
        return null;
    }
}

User.addOrUpdate = addOrUpdate


module.exports = User;