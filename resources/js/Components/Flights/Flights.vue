<template>
    <div class="w-full " :id="uid">
        <div class="relative block">
            <div v-for="flight in flights" class="text-sm" :style="flightStyle(flight)">
                <div class="flex justify-between">
                    <div class="mr-2">
                        {{ (new Date(flight.actual_departure).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})) }}
                    </div>
                    <div>
                        {{ (new Date(flight.actual_arrival).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})) }}
                    </div>
                </div>
                <div :style="{ 'background-color': randomHexColor() }">
                    <Tooltip>
                        <button type="button" class="block w-full text-white text-left px-2 py-1">{{ flight.flightid }}</button>
                        <template #popper>
                            <h4 class="font-bold pb-2 border-b-2 mb-4">{{ flight.flightid }}</h4>
                            <div>{{ moment(flight.date).format('YYYY-MM-DD') }}</div>
                            <div>{{ moment(flight.actual_departure).format('HH:mm') }} - {{ moment(flight.actual_arrival).format('HH:mm') }}</div>
                            <div>{{ flight.origin }} > {{ flight.destination }}</div>
                            <div>{{ flight.log_ids.map(log => log.asset) }}</div>
                        </template>
                    </Tooltip>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import moment from 'moment';
import { onMounted, ref, watch } from 'vue';
import {
  Tooltip,
} from 'v-tooltip'

export default {
    components: {
        Tooltip,
    },
    props: {
        flights: {
            type: Array,
            default: () => [],
        }
    },
    setup(props) {
        const uid = 'flight-uid-' + Math.random()
        const windowWidth = ref(0);

        onMounted(() => {
            const element = document.getElementById(uid);
            if (element) {
                windowWidth.value = element.clientWidth;
            }
        })

        const randomHexColor = () => {
            return '#' + Math.floor(Math.random() * (0xffffff + 1)).toString(16).padStart(6, '0')
        }

        const flightStyle = (flight) => {
            const arrivalHours = parseInt(moment(flight.actual_arrival).format('H'));
            const arrivalMinutes = parseInt(moment(flight.actual_arrival).format('m'));

            const departureHours = parseInt(moment(flight.actual_departure).format('H'));
            const departureMinutes = parseInt(moment(flight.actual_departure).format('m'));

            const leftPosition = departureHours * 60 + departureMinutes;
            const rightPosition = arrivalHours * 60 + arrivalMinutes;

            return {
                left: String(leftPosition) + 'px',
                width: String(rightPosition - leftPosition) + 'px',
                position: 'absolute',
            };
        };

        return {
            flightStyle,
            moment,
            randomHexColor,
            uid,
            windowWidth,
        }
    }
}
</script>
