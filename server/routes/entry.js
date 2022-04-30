const express = require('express');
const EntryModel = require('./model/entry.model');
const auth_middleware = require('./middleware/auth_middleware');

const router = express.Router();

router.get('/', (req, res)=> {
    return EntryModel.getEntries()
        .then(
            entries => res.status(200).send(entries)
        ).catch(
            error => res.status(400).send(error)
        )
})

router.get('/:entryId', (req, res) => {
    const entryId = req.params.entryId;
    return EntryModel.getEntryById(entryId)
        .then(entry => res.status(200).send(entry))
        .catch(error => res.status(400).send(error))
})

router.put('/:entryId', auth_middleware, (req, res) => {
    const entry = req.body;
    entry.id = req.params.entryId;
    return EntryModel.updateEntry(entry)
        .then(entry => res.status(200).send(entry))
        .catch(error => res.status(400).send(error))
})

router.delete('/:entryId', auth_middleware, (req, res) => {
    const entryId = req.params.entryId;
    return EntryModel.deleteEntry(entryId)
        .then(entry => res.status(200).send(entry))
        .catch(error => res.status(400).send(error))
})

router.post('/', auth_middleware, (req, res) => {
    const entry = req.body;

    return EntryModel.createEntry(entry)
        .then(dbRes => res.status(200).send(dbRes))
        .catch(e => res.status(400).send(e))

})


module.exports = router;