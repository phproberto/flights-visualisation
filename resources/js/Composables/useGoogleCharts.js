import { ref } from 'vue'

export default function useGoogleCharts() {
    const isGoogleChartsLoaded = ref(false)

    const loadGoogleCharts = () => {
        console.log('executed');
        // Somehow it was loaded before Vue loads it
        if (typeof window.google !== 'undefined') {
            isGoogleChartsLoaded.value = true
            return;
        }

        console.log(isGoogleChartsLoaded.value);

        let loaderScript = document.createElement('script')
        loaderScript.setAttribute('src', 'https://www.gstatic.com/charts/loader.js')
        document.head.appendChild(loaderScript)

        const loader = setInterval(() => {
            if (typeof window.google !== 'undefined') {
                isGoogleChartsLoaded.value = true
                console.log('LOADED');
                clearInterval(loader);
            }
        }, 100);
    }

    return {
        loadGoogleCharts,
        isGoogleChartsLoaded,
    }
};
