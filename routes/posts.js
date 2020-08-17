const router = require('express').Router();
const verify = require('./verifyToken');
const Contact = require('../model/Contact');
const User = require('../model/User');

router.get('/', verify, (req, res) => {
    res.status(200).json({ message: "Welcome to the Hamlog V2 API" });
});

router.post('/add', verify, async (req, res) => {
    // Create New Contact Entry in Logbook
    const contact = new Contact({
        guid: req.body.guid,
        callsign: req.body.callsign,
        contact_callsign: req.body.contact_callsign,
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
