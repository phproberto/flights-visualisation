<template>
    <div v-if="loadingFlights" class="bg-blue-400 text-white p-12 block ">
        Loading flights...
    </div>
    <div v-else class="">
        <div v-for="(dateFlights, date) in flightsByDates">
            <h2 class="text-xl my-6 font-bold">{{ (new Date(date)).toLocaleDateString() }} </h2>
            <div v-for="(flights, tail) in orderFlightsByTail(dateFlights)" class="flex border-gray-300 border-b-2 mb-2 h-32 px-6">
                <h3 class="whitespace-nowrap text-sm font-bold" >{{ tail }}</h3>
                <div class="relative">
                    <Flights :flights="flights" />
                    <div v-for="(servers, asset) in getServersFromFlights(flights)" class="block "
                        :class="{
                            'mt-12' : Object.keys(getServersFromFlights(flights)).indexOf(asset) === 0,
                            'mt-7' : Object.keys(getServersFromFlights(flights)).indexOf(asset) > 0
                        }"
                    >
                        <hr />
                        <FlightsServers :servers="servers" />
                    </div>
                </div>
            </div>
            <hr />
        </div>
    </div>
</template>
<script>
import Flights from '../Components/Flights/Flights';
import FlightsServers from '../Components/Flights/FlightsServers';
import useFlights from '../Composables/useFlights';
import { onMounted } from 'vue';

export default {
    components: {
        Flights,
        FlightsServers,
    },
    setup() {
        const { flights, flightsByDates, getFlights, getServersFromFlights, loadingFlights, orderFlightsByTail } = useFlights()

        onMounted(getFlights)

        return {
            flights,
            flightsByDates,
            getServersFromFlights,
            loadingFlights,
            orderFlightsByTail
        }
    },
}
</script>
