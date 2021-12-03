import { ref, computed } from 'vue'
import axios from 'axios'

export default function useFlights() {
    const flight = ref([])
    const flights = ref([])
    const loadingFlights = ref(false)

    const errors = ref('')

    const getFlights = async () => {
        loadingFlights.value = true
        let response = await axios.get('/api/flights')
        flights.value = response.data.data
        loadingFlights.value = false
    }

    const flightsByDates = computed(() => orderFlightsByDate(flights.value));

    const orderFlightsByDate = (theFlights) => {
        const flightsByDates = {};
        theFlights.map(flight => {
            if (!Object.prototype.hasOwnProperty.call(flightsByDates, flight.date)) {
                flightsByDates[flight.date] = [];
            }

            flightsByDates[flight.date].push(flight);
        });

        return flightsByDates;
    };

    const orderFlightsByTail = (theFlights) => {
        const flightsByTail = {};
        theFlights.map(flight => {
            if (!Object.prototype.hasOwnProperty.call(flightsByTail, flight.tail)) {
                flightsByTail[flight.tail] = [];
            }

            flightsByTail[flight.tail].push(flight);
        });

        return flightsByTail;
    };

    const getServersFromFlights = (theFlights) => {
        const servers = {};
        const addedIds = [];

        theFlights.map(flight => {
            flight.log_ids.map(log => {
                const id = `${log.sequence}-${log.asset}`;

                // Flights may share servers. Avoid duplicates
                if (addedIds.includes(id)) {
                    return;
                }

                if (!Object.prototype.hasOwnProperty.call(servers, log.asset)) {
                    servers[log.asset] = [];
                }

                servers[log.asset].push(log);
                addedIds.push(id);
            })
        });

        return servers;
    }

    return {
        flight,
        flights,
        flightsByDates,
        getFlights,
        getServersFromFlights,
        loadingFlights,
        orderFlightsByDate,
        orderFlightsByTail,
    }
};
