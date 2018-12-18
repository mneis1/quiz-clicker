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
                    res.status(404);
                }
            }
        )
});

module.exports = router;
