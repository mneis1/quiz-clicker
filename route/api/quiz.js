const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
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
    const name = req.body.quizJson.name;
    const limit = req.body.quizJson.limit;
    const courseId = req.body.quizJson.courseId;
    const questions = req.body.quizJson.questions;

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

// Answer question, just provide token, numerical index for answer , and questionId
router.post('/answer', (req, res) => {
    const token = req.body.token;
    const index = req.body.answer;
    const questionId = req.body.questionId;

    if (!token || index === null) {
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

                console.log("Answering w/ " + index);
                console.log("QuestionId " + questionId);


                Record.findOne({
                    questionId: questionId,
                    studentId: user._id
                }).then(record => {
                   if (record == null) {
                       const newRec = new Record();
                       newRec.questionId = questionId;
                       newRec.studentId = user._id;
                       newRec.answer = index;
                     Record.create(newRec)
                         .then(rec => {
                             res.sendStatus(200);
                         })
                   } else {

                       record.answer = index;
                       Record.updateOne({_id: record._id}, {
                           answer: index
                       }, () => {
                           res.sendStatus(200);
                       });
                   }
                });
            });
    });
});


router.post('/questions', (req, res) => {
    const quizId = new mongoose.Types.ObjectId(req.body.quiz);
    let returnVals = [];

    if (!quizId) {
        res.status(406);
        return;
    }

    Quiz.findOne({"_id": quizId})
        .then(quiz => {
           const questionIds = quiz.questionIds;

           for (let i = 0; i < questionIds.length; i++) {
                Question.findOne({"_id": questionIds[i]})
                    .then(question => {
                        returnVals.push({
                            question: question.question,
                            choices: question.choices,
                            _id: question._id
                        });

                        console.log(returnVals);

                        if (returnVals.length === questionIds.length) {
                            res.json(returnVals);
                            res.status(200);
                        }
                    }).catch(err => {
                        console.log(err);
                });
           }
        }).catch(err => {
            console.log(err);
    });
});

module.exports = router;