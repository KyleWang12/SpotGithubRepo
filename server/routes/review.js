const express = require('express');
const EntryModel = require('./model/entry.model');
const auth_middleware = require('./middleware/auth_middleware');

const router = express.Router();

router.post('/', auth_middleware, (req, res) => {
    const id = req.body.id;
    const userName = req.body.userName;
    const content = req.body.content;

    const review = {
        userName: userName,
        content: content,
    }

    return EntryModel.createReview(id, review)
        .then(dbRes => res.status(200).send(dbRes))
        .catch(e => res.status(400).send(e))

})

router.put('/:entryId', auth_middleware, (req, res) => {
    const review = req.body;
    const entryId = req.params.entryId;
    if(req.userName!==review.userName){
        return res.status(401).send("Unauthorized user");
    }
    return EntryModel.updateReview(entryId, review)
        .then(review => res.status(200).send(review))
        .catch(error => res.status(400).send(error))
})

router.delete('/:entryId/:reviewId', auth_middleware, (req, res) => {
    const entryId = req.params.entryId;
    const reviewId = req.params.reviewId;
    return EntryModel.deleteReview(entryId, reviewId)
        .then(review => res.status(200).send(review))
        .catch(error => res.status(400).send(error))
})


module.exports = router;