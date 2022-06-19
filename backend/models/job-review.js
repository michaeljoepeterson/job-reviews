class JobReview{
    constructor({reviewElement}){
        this.pros = null;
        this.cons = null;
        this.rating = null;
        if(reviewElement){
            this.raw = reviewElement.textContent;
            this.parseReviewElement(reviewElement);
        }
    }

    parseReviewElement(reviewElement){
        this.rating = reviewElement.querySelector('.ratingNumber')?.textContent;
        this.pros = reviewElement.querySelector('[data-test="pros"]')?.textContent;
        this.cons = reviewElement.querySelector('[data-test="cons"]')?.textContent;
    }
}

module.exports = {JobReview};