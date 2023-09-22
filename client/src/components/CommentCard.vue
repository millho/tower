<template>
  <section class="row p-1">
    <div class="d-flex justify-content-between mb-3">
      <h5><img :src="comment.creator.picture" alt="" class="image"> {{ comment.creator.name }}</h5>
      <button @click="deleteComment" v-if="comment.creatorId == account.id" class="btn btn-danger fs-3"><i class="mdi mdi-delete-forever-outline"></i></button>
    </div>
    <p class="border rounded">{{ comment.body }}</p>
    <p class="text-end m-0">{{ comment.createdAt }}</p>
  </section>
</template>

<script>
import { computed} from 'vue';
import { Comment } from '../models/Comment';
import { AppState } from '../AppState';
import Pop from '../utils/Pop';
import { CommentService } from '../services/CommentService';

export default {
    props: {comment:{type: Comment, required: true}},
setup(props) {
  return {
    account: computed(()=> AppState.account),

    async deleteComment(){
      try {
        await Pop.confirm('Delete Comment?')
        const commentId = props.comment.id
        await CommentService.deleteComment(commentId)
        Pop.toast('Comment Deleted!', 'success')
      } catch (error) {
        Pop.error(error)
      }
    }
  };
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