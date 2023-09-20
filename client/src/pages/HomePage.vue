<template>
  <div class="container-fluid">
    <section class="row justify-content-between">
      <button class="col btn btn-outline-primary" @click="filter = 'concert'">
        Concerts
      </button>
      <button class="col btn btn-outline-primary" @click="filter = 'convention'">
        Conventions
      </button>
      <button class="col btn btn-outline-primary" @click="filter = 'sport'">
        Sports
      </button>
      <button class="col btn btn-outline-primary" @click="filter = 'digital'">
        Digital Events
      </button>
      <button class="col btn btn-outline-primary" @click="filter = ''">
        All
      </button>
    </section>
    <section class="row">
      <div v-for="event in events" :key="event.id" class="col-12 col-md-3 event-card rounded elevation-3 g-3">
        <EventCard :event="event"/>
      </div>
    </section>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import Pop from '../utils/Pop';
import { EventService } from '../services/EventService';
import { AppState } from '../AppState';

export default {
  setup() {
    const filter = ref('')

    onMounted(()=>{
      getEvents();
    })

    async function getEvents(){
      try {
        await EventService.getEvents()
      } catch (error) {
        Pop.error(error)
      }
    }
    return {
      filter,
      events: computed(()=> {
        if(!filter.value){
          return AppState.events
        }else{
          return AppState.events.filter(event => event.type == filter.value)
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.event-card:hover{
  cursor: pointer;
  transform: scale(1.01);
}
</style>