const express = require('express');
const jwt = require('jsonwebtoken');
const router  = express.Router();

const User = require('../../model/User');
const Record = require('../../model/Record');
const Question = require('../../model/Question');
const Quiz = require('../../model/Quiz');

const settings = require('../../config/settings');

/* Create a quiz
    {
        "name": name,
        "courseId": courseId,
        "limit": timeLimitPetQuestion, //optional, default to 60s
        "questions": [
            {
                "question": questionPrompt,
                "choices": ["", "", "", "" ... ""],
                "answer": choicesIndexOfAnswer
            }
        ]
    }
 */
router.post('/create', (req, res) => {
    const name = req.body.name;
    const limit = req.body.limit;
    const courseId = req.body.courseId;
    const questions = req.body.questions;

    if (!name || !courseId || !questions) {
        res.sendStatus(404);
        return;
    }

    // A quiz named that for that class exists!
    Quiz.findOne({"courseId": courseId, "name": name})
        .then(quiz => {
            if (quiz !== null) {
                res.sendStatus(406);
                return;
            }
        });

    let questionIds = [];
    for (let i = 0; i < questions.length; i++) {
        Question.create(questions[i])
            .then(question => {
                questionIds.push(question._id);

                if (questionIds.length === questions.length) {
                    Quiz.create({
                        name: name,
                        courseId: courseId,
                        limit: limit ? limit : 60,
                        questionIds: questionIds
                    })
                    .then(quiz => {
                        res.status(200);
                        res.json(quiz);
                    });
                }
            });
    }
});

// Answer question, just provide token, numerical index for answer and which question, and quizId :w
router.post('/answer', (req, res) => {
    const token = req.body.token;
    const index = req.body.answer;
    const question = req.body.question;
    const quizId = req.body.quizId;

    if (!token || !index) {
        res.status(406);
        return;
    }

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

                const newRec = new Record();
                newRec.quizId = quizId;
                newRec.studentId = user._id;
                newRec.answer = index;
                newRec.question = question;

                Record.findOne({
                    quizId: quizId,
                    studentId: user._id,
                    question: question
                }).then(record => {
                   if (record == null) {
                     Record.create(newRec)
                         .then(rec => {
                             res.sendStatus(200);
                         })
                   } else {
                       Record.save(newRec);
                       res.sendStatus(200);
                   }
                });
            });
    });
});

module.exports = router;