document.addEventListener("DOMContentLoaded", function () {
    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom);

    fetch('/api/data')
        .then(response => response.json())
        .then(data => {
            const categories = data.categories;
            const seriesData = data.series;

            // Bereken de totalen per dag (categorie)
            const totals = categories.map((_, i) =>
                seriesData.reduce((sum, serie) => sum + (serie.data[i] || 0), 0)
            );

            // Extra serie voor de totaal-labels (geen lijn tonen, alleen labels)
            const totalLabelSerie = {
                name: 'Totaal',
                type: 'line',
                stack: null,  // geen stacking
                data: totals,
                symbol: 'none', // geen puntjes
                lineStyle: {
                    opacity: 0  // lijn niet zichtbaar
                },
                label: {
                    show: true,
                    position: 'top',
                    formatter: (params) => params.value
                },
                emphasis: {
                    disabled: true
                }
            };

            const option = {
                title: {
                    text: 'Stacked Area Chart'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                legend: {
                    data: [...seriesData.map(s => s.name), 'Totaal']
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    data: categories
                }],
                yAxis: [{
                    type: 'value'
                }],
                series: [
                    ...seriesData.map(s => ({
                        name: s.name,
                        type: 'line',
                        stack: 'Total',
                        areaStyle: {},
                        emphasis: {
                            focus: 'series'
                        },
                        data: s.data
                    })),
                    totalLabelSerie
                ]
            };

            myChart.setOption(option);
        })
        .catch(error => {
            console.error('Fout bij het laden van de gegevens:', error);
        });
});
