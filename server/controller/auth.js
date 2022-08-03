const User = require('../model/userSchema');
const jwt = require('jsonwebtoken');
const fs = require('fs');

async function signUp(root, args) {
    const signUpPayload = {};
    try {
        const { firstName, lastName, username, password } = args.input;
        const exist = await userExit(username);
        if (!exist) {
            const user = new User({ firstName, lastName, username });
            user.setPassword(password);
            await user.save();
            const secret = fs.readFileSync('./secret.txt');
            const payload = {
                id: user._id,
                username,

                iss: 'compass',
                iat: Date.now(),
                exp: '24h'
            }
            const token = await jwt.sign(payload, secret, { algorithm: 'RS256' });
            signUpPayload.token = token;
            signUpPayload.successful = true;
            return signUpPayload;
        }
    } catch (error) {
        signUpPayload.error = {
            message: error.message
        }
        return signUpPayload;

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