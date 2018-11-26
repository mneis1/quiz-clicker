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
// @desc Creates and insers User to db
// @access public
router.post('/', (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    User.findOne({"email": req.body.email})
        .then(user => {
                if (user == null) {
                    newUser.save()
                        .then(user => res.json(user));
                } else {
//                    console.log(user);
                    res.status(404);
                    res.json({"msg": "That user already exists!"});
                }
            }
        )

/*    User.findOne({"email": req.body.email})
        .then(err =>
            res.status(404).json({"msg": "That user already exists!"})
        )
        .catch(user =>
            newUser.save()
                .then(user => res.json(user))
        )*/

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