const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

async function signUp(args, req) {
    const signUpPayload = {};
    try {
        const { firstName, lastName, username, password } = args.input;
        const exist = await userExist(username);
        if (exist !== true) {
            const user = new User({ firstName, lastName, username });
            user.setPassword(password);
            await user.save();
            
            const payload = {
                id: user._id,
                username,

                iss: 'compass',
                iat: Date.now(),
                exp: '24h'
            };
            const token = await sign(payload);
            signUpPayload.token = token;
            signUpPayload.success = true;
            signUpPayload.user = {
                id: user._id,
                username
            }
            return signUpPayload;
        } else {
            signUpPayload.error = {
                message: 'username name already in use',
                name: 'NameExist'
            };
            signUpPayload.success = false;
            return signUpPayload;
        }
    } catch (error) {
        signUpPayload.error = {
            message: error.message,
            name: error.code
        }
        signUpPayload.success = false;
        return signUpPayload;

    }
}


async function signIn(args) {
    const signInPayload = {};
    try {
        const { username, password } = args.input;
        const user = await User.find({ username });
        if (user) {
            const checkPassword = user.validPassword(password);
            if (checkPassword) {
                const payload = {
                    id: user._id,
                    username,

                    iss: 'compass',
                    iat: Date.now(),
                    exp: '24h'
                };
                const token = sign(payload);
                signInPayload.token = token;
                signInPayload.success = true;
                signInPayload.user = {
                    id: user._id,
                    username
                }
                return signInPayload;
            } else {
                signInPayload.error  = {
                    message: 'invalid password',
                    name: 'PassswordError'
                }
                signInPayload.success = false;
                return signInPayload;
            }

        } else {
            signInPayload.error = {
                message: 'Cannot fine use with ' + username,
                name: 'UnknownUser'
            }
            signInPayload.success = false;
            return signInPayload;
        }
    } catch (error) {
        signInPayload.error = {
            message: error.message,
            name: error.code
        }
        signInPayload.success = false;
        return signInPayload;
    }
}

function sign(payload) {
    const secret = fs.readFileSync(path.join(__dirname, 'secret.txt'), { encoding: 'utf-8' });
    
    jwt.sign(payload, secret, { algorithm: 'RS256' }, (err, token) => {
        if (err) throw new Error('Cannot generate token for this account');
        console.log(token)
        return token;
    });
}

/**
 * Verifies a jsonwebtoken
 * @param token - token to verify
 * @returns boolean
 */
function verify(token) {
    const secret = fs.readFileSync(path.join(__dirname, "secret.txt"), {
      encoding: "utf-8",
    });
    jwt.verify(token, secret, (err, decoded) => {
        if (err) throw new Error({ name: 'JsonWebTokenError', message: 'jwt malformed' });
        return { username: decoded.username, id: decoded.id }
    })
}

async function userExist(username) {
    const user = await User.findOne({ username });
    if (user) {
        return true;
    } else {
        return false
    }
}

module.exports = {
    signUp,
    signIn,
    verify,
}