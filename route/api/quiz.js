const express = require('express');
const jwt = require('jsonwebtoken');
const router  = express.Router();

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

module.exports = router;