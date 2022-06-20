<template>
  <hr/>
  <p>{{review.rating}}</p>
  <p>{{review.pros}}</p>
  <p>{{review.cons}}</p>
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
