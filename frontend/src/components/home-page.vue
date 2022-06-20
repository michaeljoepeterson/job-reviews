<template>
  <JobInput @search="searchReviews"/>
  <p v-if="loading">Loading</p>
  <div v-for="review in reviews" :key="review.raw">
      <JobReview :review="review"/>
  </div>
</template>

<script>
import JobInput from './job-input.vue';
import JobReview from './job-review.vue';
import axios from 'axios';

export default {
  name: 'HomePage',
  components: {
    JobInput,
    JobReview
  },
  data(){
    return{
        loading: false,
        reviews: []
    }
  },
  methods:{
    async searchReviews(job, startPage){
        this.loading = true;
        try{
            console.log('parent ', job);
            let url = `http://localhost:8080/api/jobs/reviews/${job}`;
            if(startPage){
                url += `?start=${startPage}`;
            }
            const res = await axios.get(url);
            console.log(res.data);
            this.reviews = res.data.reviews ? res.data.reviews : [];
        }
        catch(e){
            console.warn(e);
        }
        this.loading = false;
    }
  }
}
</script>

<style>

</style>
