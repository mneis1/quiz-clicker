const express = require('express');
const jwt = require('jsonwebtoken');
const router  = express.Router();

const settings = require('../../config/settings');
const User = require('../../model/User');


// route @get api/users
// @desc gets all users
// @access public
router.get('/', (req, res) => {
    User.find({})
        .sort({date: -1})
        .then(users => res.json(users))
});

// route @post api/users
// @desc Checks if the username and password are correct
// @access public
router.post('/', (req, res) => {
    User.findOne({"email": req.body.email})
        .then(user => {
                if (user == null) {
                    res.status(404);
                    res.json({"msg": "User with that email does not exist"});
                } else {
                    if (user.validPassword(req.body.password)) {

                        jwt.sign({
                            "_id": user._id,
                            "email": user.email,
                            "name": user.name,
                            "type": user.type
                        }, settings.secret, (err, token) => {
                            res.json({
                                token: token
                            });
                        });

                    } else {
                        res.status(401);
                        res.json({"msg": "Incorrect password"});
                    }
                }
            }
        )
});

// route @post api/isTeacher
// @desc Checks if the user is a teacher or not
// @access public
router.post('/isTeacher', (req, res) => {
    jwt.verify(req.body.token, settings.secret, (err, data) => {
        if (err) {
            res.sendStatus(403);
            return;
        }

        User.findOne({"email": data.email})
            .then(user => {
                    if (user == null) {
                        res.sendStatus(404);
                    } else {
                        if (!user.type) {
                            res.sendStatus(401);
                        }
                        res.sendStatus(200);
                    }
                }
            )
    });

});

// route @post api/users/verify
// @desc Verifies if a JWT token is valid
// @access public
router.post('/verify', verifyJWT, (req, res) => {
    jwt.verify(req.token, settings.secret, (err, data) => {
        if (err) {
            res.sendStatus(403);
            return;
        }

        res.json({
            userData: data,
        })
    });
});

function verifyJWT(req, res, next) {
    const jwtHeader  = req.headers['authorization'];

    if (typeof jwtHeader === 'undefined') {
        res.sendStatus(403);
        return;
    }

    req.token = jwtHeader;
    next();
}

// route @delete api/users
// @desc deletes an user from db
// @access public
router.delete('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => user.remove()
            .then(() => res.json({success: true}))
        )
        .catch(err => res.status(404).json({success: false}))
});

module.exports = router;