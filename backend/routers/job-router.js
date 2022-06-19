const express = require('express');
const { buildError } = require('../helpers/build-error');
const { jobHandler } = require('../jobs/job-handler');
const router = express.Router();

router.get('/reviews/:job', async (req, res, next) => {
    try{
        const {job} = req.params;
        //start and end pages, page 
        const {start, end, range} = req.query;
        const reviews = start ? await jobHandler.bulkGetReviewElements(job, start, end, range) : await jobHandler.getReviews(job);
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