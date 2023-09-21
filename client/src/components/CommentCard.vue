<template>
  <section class="row p-1">
    <h5><img :src="comment.creator.picture" alt="" class="image"> {{ comment.creator.name }}</h5>
    <p class="border rounded">{{ comment.body }}</p>
    <p class="text-end m-0">{{ comment.createdAt }}</p>
  </section>
</template>

<script>
import { Comment } from '../models/Comment';

export default {
    props: {comment:{type: Comment, required: true}},
setup() {
  return {};
},
};
</script>


<style scoped>
.image{
  width: 50px;
  aspect-ratio: 1/1;
  border-radius: 10px;
  object-fit: cover;
}
</style>