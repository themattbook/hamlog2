const router = require('express').Router();
const verify = require('./verifyToken');
const Contact = require('../model/Contact');

router.get('/', verify, (req, res) => {
    res.json({ 
        posts: { 
            title: 'Test Post', 
            post: 'This is just a test of the auth middleware.'
        }
    });
});

router.post('/add', verify, async (req, res) => {
    // Create New Contact Entry in Logbook
    const contact = new Contact({
        callsign: req.body.callsign,
        toCallsign: req.body.toCallsign,
        band: req.body.band,
        frequency: req.body.frequency,
        mode: req.body.mode,
        comments: req.body.comments,
        date: req.body.date
    });
    try {
        const savedContact = await contact.save();
        res.json({ success: `A new record for ${contact.callsign} has been created.`, contact });
    } catch(err) {
        res.status(400).send(err);
    } 
})

module.exports = router;
