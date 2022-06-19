const express = require('express');
const { JOB_URL } = require('../config');
const { buildError } = require('../helpers/build-error');
const { buildHeaders } = require('../helpers/build-headers');
const { JSDOM } = require("jsdom");
const { JobReview } = require('../models/job-review');
const router = express.Router();
const axios = require('axios').default;

router.get('/reviews/:job', async (req, res, next) => {
    try{
        const {job} = req.params;
        const url = `${JOB_URL}${job}`;
        const data = await axios.get(url, {
            headers: buildHeaders()
        });
        const dom = new JSDOM(data.data);
        const reviewElements = dom.window.document.querySelectorAll('.empReview');
        const reviews = [];
        reviewElements.forEach(reviewElement => reviews.push(new JobReview({reviewElement})));
        console.log(reviews.length);
        return res.json({
            message: 'Found Reviews',
            reviews
        });
    }
    catch(e){
        res.err = buildError(e, 'Error getting reviews');
        next();
    }
});

module.exports = {router};