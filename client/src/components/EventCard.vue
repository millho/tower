<template>
  <router-link :to="{path: `events/${event.id}`}">
    <section class="row event-card text-dark">
      <div class="col-12 col-md-6">
        <img :src="event.coverImg" alt="">
      </div>
      <div class="col-12 p-3 col-md-6 text-center align-center">
        <h5 class="mb-2">{{ event.name }}</h5>
        <p class="mb-2">{{ event.location }}</p>
        <p class="mb-2">{{ event.startDate }}</p>
      </div>
    </section>
  </router-link>
</template>

<script>
import { Event } from '../models/Event';

export default {
props: {event: {type: Event, required: true}},
setup() {
  return {};
},
};
</script>


<style lang="scss" scoped>
.event-card{
  img{
    min-height: 25vh;
    width: 100%;
    object-fit: cover;
    object-position: center;
  }
}

</style>