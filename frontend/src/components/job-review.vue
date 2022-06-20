<template>
  <hr/>
  <p>Rating: {{review.rating}}</p>
  <p>Pros: {{review.pros}}</p>
  <p>Cons: {{review.cons}}</p>
</template>

<script>

export default {
  name: 'JobReview',
  props:{
    review: null
  }
}
</script>

<style>

</style>
