const express = require('express');
const form = require("../services/form");

router = express.Router();

router.get('/', async (req, res) => {
    res.json(await form.getAll());
});

router.get('/:id', async (req, res) => {
    let data = await form.get(req.params.id);

    if (data) return res.json(data);

    return res.status(404).json({
        error: "Not found"
    }); 
});

router.post('/', async (req, res) => {
    if (req.body.name) {
        let data = await form.create(req.body.name);
        if (!data) return res.status(500).json({error: 500});

        return res.status(201).json(data);
    }

    return res.status(404).json({error: 404});
});

router.delete('/:id', async (req, res) => {
    
    if (!form.get(req.params.id)) return res.status(404).json({error: 404});

    form.remove(req.params.id);

    return res.status(204).json({});
});


 
module.exports = router;