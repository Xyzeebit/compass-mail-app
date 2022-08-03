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
            
            const payload = {
                id: user._id,
                username,

                iss: 'compass',
                iat: Date.now(),
                exp: '24h'
            }
            const token = sign(payload);
            signUpPayload.token = token;
            signUpPayload.successful = true;
            return signUpPayload;
        } else {
            signUpPayload.error = {
              message: 'username name already in use'
            };
            return signUpPayload;
        }
    } catch (error) {
        signUpPayload.error = {
            message: error.message
        }
        return signUpPayload;

    }
}


async function signIn(root, args) {
    const signInPayload = {};
    try {
        const { username, password } = args.input;
        const user = await User.find({ username });
        if (user) {
            const checkPassword = user.validatePassword(password);
            if (checkPassword) {
                const payload = {
                id: user._id,
                username,

                iss: 'compass',
                iat: Date.now(),
                exp: '24h'
            }
                const token = sign(payload);
                signInPayload.token = token;
                signInPayload.successful = true;
                return signInPayload;
            } else {
                signInPayload.error  = {
                    message: 'invalid password'
                }
                return signInPayload;
            }

        } else {
            signInPayload.error {
                message: 'Cannot fine use with ' + username
            }
            return signInPayload;
        }
    } catch (error) {
        signInPayload.error = {
            message: error.message
        }
        return signInPayload;
    }
}

function sign(payload) {
    const secret = fs.readFileSync('./secret.txt');
    jwt.sign(payload, Buffer.from(secret, 'base64'), { algorithm: 'RS256' }, (err, token) => {
        if (err) throw new Error('Cannot generate token for this account');
        return token;
    });
}
function verify(token) {
    const secret = fs.readFileSync('./secret.txt');
    jwt.verify(token, Buffer.from(secret, 'base64'), (err, decoded) => {
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