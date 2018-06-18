var ObjectID = require('mongodb').ObjectID;

module.exports = function (app, db) {

    app.post('/notes', (req,res) => {
        const note = { 
            text: req.body.body, 
            title: req.body.title, 
            author: req.body.author
        };

        db.collection('notes').insert(note, (err, results) => {
            if (err) {
                res.send({'error': 'An error has occured'});
            } else {
                res.send(results.ops[0]);
            }
        });
    // console.log(req.body);
    // res.send("Hello, I'm happy to serve you")
    });

    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = {
            '_id': new ObjectID(id)
        };

        db.collection('notes').findOne(details, (err, item) => {
            if (err) {
                res.send({'error': 'An error has occured'});
            } else {
                res.send(item);
            }
        });
    });

    app.delete('/notes/:id', (req,res) => {
        const id = req.params.id;
        const details = {
            '_id': new ObjectID(id)
        };

        db.collection('notes').remove(details, (err,item) => {
            if (err) {
                res.send({'error': 'An error has occured'});
            } else {
                res.send(`Note with ID of ${id} has been deleted`);
            }
        });
    });

    app.put('/notes/:id', (req,res) => {
        const id = req.params.id;
        const details = {
            '_id': new ObjectID(id)
        };
        const note = { 
            text: req.body.body, 
            title: req.body.title, 
            author: req.body.author
        };
        
        db.collection('notes').update(details, note, (err, result) => {
            if (err) {
                res.send({'error': 'An error has occured'});
            } else {
                res.send(note);
            }
        });
    });
};