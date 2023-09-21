<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-12 text-center">
        <h1>{{ event.name }}</h1>
      </div>
      <div class="col-12">
        <img class="cover-img rounded" :src="event.coverImg" alt="">
      </div>
      <div v-if="event.ticketCount == event.capacity" class="col-12">
        <h1 class="text-danger fw-bold text-center">SOLD OUT</h1>
      </div>
      <div v-if="event.isCanceled" class="col-12">
        <h1 class="text-danger fw-bold text-center">EVENT CANCELED</h1>
      </div>
      <div class="col-12 col-md-6 text-center">
        <h4 class="mb-2">{{ event.location }}</h4>
        <h5 class="mb-2">{{ event.startDate }}</h5>
        <h5 class="mb-2 text-primary">{{ event.type }}</h5>
        <h5 class="mb-2">Capacity: {{ event.capacity }}</h5>
        <h3 class="mb-2">Tickets Left: {{event.capacity-event.ticketCount}}/{{ event.capacity }}</h3>
        <button @click="createTicket" class="btn btn-warning">Attend</button>
      </div>
      <div class="col-12 col-md-6">
        <p>{{ event.description }}</p>
      </div>
    </section>
    <section class="row p-2">
      <form class="mb-3" @submit.prevent="createComment">
        <textarea v-model="commentData.body" required id="comment-body" cols="30" rows="3" placeholder="Comment on this Event" class="form-control"></textarea>
        <button class="btn btn-primary">Comment</button>
      </form>
      <div v-for="comment in comments" :key="comment.id" class="col-12 card bg-primary mb-2">
        <CommentCard :comment="comment" />
      </div>
    </section>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop';
import { EventService } from '../services/EventService';
import { computed, ref, watchEffect } from 'vue';
import {AppState} from '../AppState'
import {CommentService} from '../services/CommentService'
import {TicketService} from '../services/TicketService'

export default {
setup() {
const route = useRoute();
const commentData = ref({});

watchEffect(()=>{
  getOneEvent();
  getEventComments();
  getEventTickets();
});

async function getOneEvent(){
  try {
    await EventService.getOneEvent(route.params.eventId)
  } catch (error) {
    Pop.error(error)
  }
}

async function getEventComments(){
  try {
    await CommentService.getEventComments(route.params.eventId)
  } catch (error) {
    Pop.error(error)
  }
}

async function getEventTickets(){
  try {
    await TicketService.getEventTickets(route.params.eventId)
  } catch (error) {
    Pop.error(error)
  }
}

  return {
    commentData,
    event: computed(()=> AppState.activeEvent),
    comments: computed(()=> AppState.activeComments),
    tickets: computed(()=> AppState.activeTickets),

    async createComment(){
      try {
        commentData.value.eventId = route.params.eventId
        await CommentService.createComment(commentData.value)
        Pop.toast('Comment Created!', 'success')
        commentData.value = {}
      } catch (error) {
        Pop.error(error)
      }
    },

    async createTicket(){
      try {
        const ticketData = {eventId: route.params.eventId}
        await TicketService.createTicket(ticketData)
      } catch (error) {
        Pop.error(error)
      }
    }
  };

},
};
</script>


<style scoped>
.cover-img{
  height: 40vh;
  width: 100%;
  object-fit: cover;
  object-position: center;
}
</style>