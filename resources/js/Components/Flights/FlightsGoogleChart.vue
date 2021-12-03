<template>
    <div class="block ">
        <div class="flex">
            {{ flighy }}
        </div>
        <div class="block" :id="uid">
        </div>
    </div>
</template>
<script>
import useGoogleCharts from '../../Composables/useGoogleCharts';
import { onMounted, watch } from 'vue';

export default {
    props: {
        flights: {
            type: Array,
            default: () => [],
        }
    },
    setup(props) {
        const uid = 'uid-' + Math.random()
        const { loadGoogleCharts, isGoogleChartsLoaded } = useGoogleCharts()

        const drawChart = () => {
            google.charts.load("current", {packages:["timeline"]});
            google.charts.setOnLoadCallback(drawChart);
            function drawChart() {
                var container = document.getElementById(uid);
                var chart = new google.visualization.Timeline(container);
                var dataTable = new google.visualization.DataTable();

                dataTable.addColumn({ type: 'string', id: 'Tail' });
                dataTable.addColumn({ type: 'string', id: 'Itinerary' });
                dataTable.addColumn({ type: 'date', id: 'Start' });
                dataTable.addColumn({ type: 'date', id: 'End' });

                const rows = [];

                props.flights.map(flight => {
                    flight.log_ids.map(log => {
                        rows.push([
                            flight.tail,
                            log.asset,
                            new Date(log.boot),
                            new Date(log.shutdown),
                        ]);
                    });

                    rows.push([
                        flight.tail,
                        flight.origin +  ' -> ' + flight.destination,
                        new Date(flight.actual_departure),
                        new Date(flight.actual_arrival),
                    ]);
                });

                console.log(rows);

                // dataTable.addRows([
                // [ '1', 'George Washington', new Date(1789, 3, 30), new Date(1797, 2, 4) ],
                // [ '2', 'John Adams',        new Date(1797, 2, 4),  new Date(1801, 2, 4) ],
                // [ '3', 'Thomas Jefferson',  new Date(1801, 2, 4),  new Date(1809, 2, 4) ]]);

                dataTable.addRows(rows);

                var options = {
                    timeline: {
                        groupByRowLabel: true,
                        showRowLabels: true
                    },
                    title:'How Much Pizza I Ate Last Night',
                    tooltip: {isHtml: true},
                };

                chart.draw(dataTable, options);
            }
        }

        watch(
            () => isGoogleChartsLoaded.value,
            (newValue, oldValue) => {
                if (newValue && !oldValue) {
                    drawChart();
                }
            }
        );

        loadGoogleCharts();

        return {
            uid,
            isGoogleChartsLoaded,
        }
    }
}
</script>
