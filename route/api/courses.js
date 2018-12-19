const express = require('express');
const jwt = require('jsonwebtoken');
const router  = express.Router();

const settings = require('../../config/settings');
const Course = require('../../model/Course');
const User = require('../../model/User');

// Returns a list of course objects the student is in
router.post('/find', (req, res) => {
    const token = req.body.token;
    let courses = [];

    jwt.verify(token, settings.secret, (err, data) => {
        if (err) {
            res.sendStatus(403);
            return;
        }
        User.findOne({"email": data.email})
            .then(user => {
                if (user == null) {
                    res.sendStatus(404);
                }

                for (let i = 0; i < user.courses.length; i++) {
                    let courseId = user.courses[i];

                    Course.findOne({"_id": courseId})
                        .then(course => {
                            if (course != null) {
                                courses.push(course);
                            }

                            if (courses.length === user.courses.length) {
                                res.status(200);
                                res.json({courses});
                            }
                        }
                    )
                }
            });
    });
});


// route @post api/courses/addUser
// @desc Adds a user to the course if the token is owned by the teacher
// @access public
router.post('/addUser', (req, res) => {
    const course = req.body.course;
    const token = req.body.token;
    const email = req.body.studentEmail;
    let student = null;

    jwt.verify(token, settings.secret, (err, data) => {
        if (err) {
            res.sendStatus(403);
            return;
        }
        User.findOne({"email": email})
            .then(user => {
               if (user == null) {
                   res.sendStatus(404);
               }
               student = user;
            });


        Course.findOne({"_id": course._id})
            .then(course => {
                    if (course == null) {
                        res.sendStatus(404);
                        return;
                    }
                    if (course.teacherId !== data._id) {
                        res.sendStatus(403);
                        return;
                    }

                    course.studentIds.append(student._id);
                    Course.save(course);

                    res.sendStatus(200);
                }
            )
    });

});


// route @post api/courses/create
// @desc Creates the course w/ token owner as teacher
// @access public
router.post('/create', (req, res) => {
    const token = req.body.token;
    const name = req.body.courseName;
    let course = new Course();

    jwt.verify(token, settings.secret, (err, data) => {
        if (err) {
            res.sendStatus(403);
            return;
        }
        User.findOne({"email": data.email})
            .then(user => {
                if (user == null) {
                    res.sendStatus(404);
                    return;
                }
                course.name = name;
                course.teacherId = user._id;

                Course.create(course);
                res.sendStatus(200);
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(404);
            });
    });

});

module.exports = router;