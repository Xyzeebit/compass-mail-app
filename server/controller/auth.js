const User = require('../model/userSchema');

async function signUp(root, args) {
    const { firstName, lastName, username, password } = args.input;
    const exist = await userExit(username);
    if (!exist) {
        const user = new User({ firstName, lastName, username });
        user.setPassword(password);
        await user.save();
    }
}

async function userExist(username) {
    const user = await User.findOne({ username });
    if (user) {
        return true;
    } else {
        return false
    }
}