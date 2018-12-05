const express = require('express');
const router  = express.Router();

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
                        res.status(200);
                        res.json({"msg": "Logged in!", "teacher": user.type});
                    } else {
                        res.status(401);
                        res.json({"msg": "Incorrect password"});
                    }
                }
            }
        )
});

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