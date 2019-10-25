const Clarifai = require('clarifai');
const app = new Clarifai.App({
    apiKey: '117621ce9b15496fbd91c194b78848d5'
});

const controlAPICall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => res.json(data))
        .catch(err => res.status(400).json('unable to contact API'));
};

module.exports = {
    controlAPICall: controlAPICall
};


