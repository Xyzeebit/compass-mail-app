const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

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
            };
            const getToken = promisify(sign);
            const token = await getToken(payload);
            
            
            signUpPayload.success = true;
            signUpPayload.user = {
                id: user._id,
                token,
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
        const user = await User.findOne({ username });
        if (user) {
            const valid = user.checkPassword(password);
            if (valid) {
              const payload = {
                id: user._id,
                username,

                iss: "compass",
                iat: Date.now(),
              };
              const getToken = promisify(sign);
              const token = await getToken(payload);

              signInPayload.success = true;
              signInPayload.user = {
                id: user._id,
                token,
                username,
              };
              return signInPayload;
            } else {
              signInPayload.error = {
                message: "invalid password",
                name: "PassswordError",
              };
              signInPayload.success = false;
              return signInPayload;
            }

        } else {
            signInPayload.error = {
                message: 'Cannot find user with ' + username,
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

function getSecret() {
    try {
        const secret = fs.readFileSync(path.join(__dirname, "secret.txt"), {
            encoding: "utf-8",
        });
        return secret;
    } catch (error) {
        return undefined;
    }
}

function sign(payload, cb) {
    try {
        const secret = getSecret();
        const token = jwt.sign(
            payload,
            secret,
            { expiresIn: "1h" },
            { algorithm: "RS256" },
        );
        cb(null, token);
    } catch(error) {
        cb(new Error('cannot generate token'), null);
    }
}

/**
 * Verifies a jsonwebtoken
 * @param token - token to verify
 * @returns boolean
 */
function verifyToken(token, cb) {
    try {
        const secret = getSecret();
        decoded = jwt.verify(token, secret, { algorithm: 'RS256' });
        const { exp } = decoded;
        
        // console.log(exp, new Date().getTime())
        const current = (new Date().getTime() / 1000);
        if (exp < current) {
            // console.log('greater')
            cb(new Error("Expired json token"));
        } else {
            // console.log('lesser')
            cb(null, {
                username: decoded.username,
                id: decoded.id,
            });
        }
    } catch (error) {
        cb(new Error("jwt malformed"));
    }
}

const verify = promisify(verifyToken);

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