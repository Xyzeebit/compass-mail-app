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
            // const user = new User({ firstName, lastName, username });
            // user.setPassword(password);
            // await user.save();
            
            const payload = {
                id: 'msjslioiqpindhkmmdjjks', //user._id,
                username,

                iss: 'compass',
                iat: Date.now(),
            };
            const token = sign(payload);
            token.then((tok) => {
                console.log(tok)
            }).catch(err => console.log(err))
            console.log(token)
            
            signUpPayload.success = true;
            signUpPayload.user = {
                id: 'shksiiwpopowjjckj', //user._id,
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
        const user = await User.find({ username });
        if (user) {
            const checkPassword = user.validPassword(password);
            if (checkPassword) {
                const payload = {
                    id: user._id,
                    username,

                    iss: 'compass',
                    iat: Date.now(),
                };
                const token = await sign(payload);
                
                signInPayload.success = true;
                signInPayload.user = {
                    id: user._id,
                    token,
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

function getSecret() {
    const secret = fs.readFileSync(path.join(__dirname, "secret.txt"), {
      encoding: "utf-8",
    });
    return secret;
}

function sign(payload) {
    return new Promise((resolve, reject) => {
        
        jwt.sign(
            payload,
            getSecret(),
            { expiresIn: "1h" },
            { algorithm: "RS256" },
            function (err, token) {
                if (err) reject(new Error("Cannot generate token for this account"));
                console.log(token)
                resolve(token)
            }
        );
    })
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