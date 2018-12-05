const express = require('express');
const router  = express.Router();

const User = require('../../model/User');


// route @post api/users
// @desc Creates and inserts User to db
// @access public
router.post('/', (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
    });
    newUser.password = newUser.generateHash(req.body.password);

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

module.exports = router;
