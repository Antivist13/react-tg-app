export const chartOptions = {
    layout: {
        textColor: 'black',
        attributionLogo: false,
    },
    rightPriceScale: {
        visible: false,
        ensureEdgeTickMarksVisible: false,
        borderVisible: false
    },
    grid: {
        vertLines: {
            visible: false
        },
        horzLines: {
            visible: false
        }
    },
    timeScale: {
        visible: false
    },
    crosshair: {
        horzLine: {
            visible: false
        },
        vertLine: {
            visible: false
        }
    },
    horzScale: {
        tickMarkMaxCharacterLength: 4
    }
};
export const selectOptions = [
    'за день',
    'за неделю',
    'за месяц',
    'за год',
];