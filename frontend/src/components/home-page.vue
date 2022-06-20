<template>
  <JobInput @search="searchReviews"/>
</template>

<script>
import JobInput from './job-input.vue';
import axios from 'axios';

export default {
  name: 'HomePage',
  components: {
    JobInput
  },
  methods:{
    async searchReviews(job){
        try{
            console.log('parent ', job);
            const url = `http://localhost:8080/api/jobs/reviews/${job}`;
            const res = await axios.get(url);
            console.log(res.data);
        }
        catch(e){
            console.warn(e);
        }
    }
  }
}
</script>

<style>

</style>
