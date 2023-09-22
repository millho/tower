<template>
        <section class="row">
            <div v-if="ticket.event.name" class="col-12">
                <h3 class="text-center"><i class="mdi mdi-ticket"></i></h3>
                <h3 class="text-center">{{ ticket.event.name }}</h3>
                <h5 class="text-center">{{ ticket.event.location }}</h5>
            </div> 
        </section>
</template>

<script>
import { Ticket } from '../models/Ticket';

export default {
    props: {ticket:{type: Ticket, required:true}},

setup() {
  return {};
},
};
</script>


<style>
</style>