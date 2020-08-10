const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey : '836ff6a8048741fc9245e897c29f311e'
});

const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req,res,db) => {
	const { id } = req.body;

	db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
    	res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get count'))

	// let found = false;
//    database.users.forEach(user => {
 //        if (user.id === id) {
 //            found = true;
 //            user.entries++;
 //            return res.json(user.entries);
 //        }
 //    })
 //    if (!found) {
 //        res.status(404).json('user not found');
 //    }
}

module.exports = {
    handleImage : handleImage,
    handleApiCall : handleApiCall
};