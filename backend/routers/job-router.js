const express = require('express');
const { JOB_URL } = require('../config');
const { buildError } = require('../helpers/build-error');
const { buildHeaders } = require('../helpers/build-headers');
const router = express.Router();
const axios = require('axios').default;

router.get('/reviews/:job', async (req, res, next) => {
    try{
        const {job} = req.params;
        const url = `${JOB_URL}${job}`;
        const data = await axios.get(url, {
            headers: buildHeaders()
        });
        return res.json({
            message: 'Found Reviews',
            reviews: data.data
        });
    }
    catch(e){
        res.err = buildError(e, 'Error getting reviews');
        next();
    }
});

module.exports = {router};