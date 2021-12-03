<template>
    <div class="w-full " :id="uid">
        <div class="relative block">
            <div v-for="server in servers" class="text-sm" :style="serverStyle(server)">
                <div :style="{ 'background-color': randomHexColor() }">
                    <Tooltip>
                        <button class="block w-full text-white text-left px-2 py-1 ">{{ server.asset }}</button>
                        <template #popper>
                            <h4 class="font-bold pb-2 border-b-2 mb-4">{{ server.asset }}</h4>
                            <div>{{ moment(server.boot).format('YYYY-MM-DD') }}</div>
                            <div>{{ moment(server.boot).format('HH:mm') }} - {{ moment(server.shutdown).format('HH:mm') }}</div>
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
import useFlights from '../../Composables/useFlights';
import {
  Tooltip,
} from 'v-tooltip'

export default {
    components: {
        Tooltip,
    },
    props: {
        servers: {
            type: Array,
            default: () => [],
        }
    },
    setup(props) {
        const { getServersFromFlights } = useFlights()

        const uid = 'server-uid-' + Math.random()
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

        const serverStyle = (server) => {
            const arrivalDate = new Date(server.actual_arrival);
            const arrivalHours = parseInt(moment(server.shutdown).format('H'));
            const arrivalMinutes = parseInt(moment(server.shutdown).format('m'));

            const departureHours = parseInt(moment(server.boot).format('H'));
            const departureMinutes = parseInt(moment(server.boot    ).format('m'));

            const duration = (arrivalHours * 60 + arrivalMinutes) - (departureHours * 60 + departureMinutes);

            const leftPosition = departureHours * 60 + departureMinutes;
            const rightPosition = arrivalHours * 60 + arrivalMinutes;

            return {
                left: String(leftPosition) + 'px',
                width: String(rightPosition - leftPosition) + 'px',
                position: 'absolute',
            };
        };

        return {
            moment,
            serverStyle,
            randomHexColor,
            uid,
            windowWidth,
        }
    }
}
</script>
