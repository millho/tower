<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-12 text-center">
        <h1>{{ event.name }}</h1>
      </div>
      <div class="col-12">
        <img class="cover-img" :src="event.coverImg" alt="">
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
      </div>
      <div class="col-12 col-md-6">
        <p>{{ event.description }}</p>
      </div>
    </section>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop';
import { EventService } from '../services/EventService';
import { computed, watchEffect } from 'vue';
import {AppState} from '../AppState'

export default {
setup() {
const route = useRoute();

watchEffect(()=>{
  getOneEvent();
});

async function getOneEvent(){
  try {
    await EventService.getOneEvent(route.params.eventId)
  } catch (error) {
    Pop.error(error)
  }
}
  return {
    event: computed(()=> AppState.activeEvent),
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