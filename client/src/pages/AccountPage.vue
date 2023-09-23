<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
  <section class="row">
    <!-- <div v-for="ticket in myTickets" :key="ticket.id" class="col-12 col-md-2 event-card card bg-primary g-3">
      <TicketCard :ticket="ticket" />
    </div>   -->


   <div v-for="ticket in myTickets" :key="ticket.id" class=" col-12 col-md-2 event-card card bg-primary g-3">
        <EventCard :event="ticket.event" />
      </div>  

  </section>
</template>

<script>
import { computed, watchEffect } from 'vue';
import { AppState } from '../AppState';
import Pop from '../utils/Pop';
import { useRoute } from 'vue-router';
import { TicketService } from '../services/TicketService';

export default {
  setup() {
    const route = useRoute()

    watchEffect(()=> {
      getMyTickets()
    })

    async function getMyTickets(){
      try {
        const accountId = AppState.account.id
        await TicketService.getMyTickets(accountId)
      } catch (error) {
        Pop.error(error)
      }
    }

    return {
      route,
      account: computed(() => AppState.account),
      myTickets: computed(()=> AppState.myTickets)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
.event-card:hover{
  cursor: pointer;
  transform: scale(1.01);
}
</style>
