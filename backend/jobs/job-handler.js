const { JOB_URL } = require("../config");
const axios = require('axios').default;
const { JSDOM } = require("jsdom");
const { buildHeaders } = require('../helpers/build-headers');
const { JobReview } = require('../models/job-review');

class JobHandler{
    constructor(url){
        this.url = url;
    }

    async getReviewElements(job){
        const url = `${this.url}${job}`;
        const data = await axios.get(url, {
            headers: buildHeaders()
        });
        const dom = new JSDOM(data.data);
        const reviewElements = dom.window.document.querySelectorAll('.empReview');
        return reviewElements;
    }

    buildReviews(reviewElements){
        const reviews = [];
        
        for(let reviewElement of reviewElements){
            reviews.push(new JobReview({reviewElement}));
        }

        return reviews;
    }

    async getReviews(job){
        const reviewElements = await this.getReviewElements(job);
        const reviews = this.buildReviews(reviewElements);
        return reviews;
    }
}

const jobHandler = new JobHandler(JOB_URL);

module.exports = {jobHandler};