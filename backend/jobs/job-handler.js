const { JOB_URL } = require("../config");
const axios = require('axios').default;
const { JSDOM } = require("jsdom");
const { buildHeaders } = require('../helpers/build-headers');
const { JobReview } = require('../models/job-review');
//todo add cache
class JobHandler{
    constructor(url){
        this.url = url;
        this.pageRange = 5;
    }

    async getReviewElements(job){
        const url = `${this.url}${job}`;
        const data = await axios.get(url, {
            headers: buildHeaders()
        });
        const dom = new JSDOM(data.data);
        const reviewElements = dom.window.document.querySelectorAll('.empReview');
        if(reviewElements.length === 0){
            return null;
        }
        return reviewElements;
    }

    async bulkGetReviewElements(job, start, end, range){
        range = range ? range : this.pageRange;
        start = start === 0 ? 1 : Number(start);
        end = end ? Number(end) : start + range;
        let allReviews = [];
        const requests = [];
        
        for(let i = start; i <= end; i++){
            let jobUrl = i === 1 ? job : this.buildPageUrl(job, i);
            console.log(jobUrl, i, end);
            requests.push(this.getReviewElements(jobUrl));
        }
        let responses = await Promise.all(requests);
        responses = responses.filter(res => res);
        let allReviewElements = responses.map(elements => [...elements]);
        allReviewElements = allReviewElements.flat();
        allReviews = this.buildReviews(allReviewElements);
        return allReviews;
    }

    buildPageUrl(job, page){
        const splitUrl = job.split('.htm');
        const url = `${splitUrl[0]}_P${page}.htm`;
        return url;
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
        if(!reviewElements){
            return [];
        }
        const reviews = this.buildReviews(reviewElements);
        return reviews;
    }
}

const jobHandler = new JobHandler(JOB_URL);

module.exports = {jobHandler};