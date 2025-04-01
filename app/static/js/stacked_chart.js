<script src="https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js"></script>
<script>
document.addEventListener("DOMContentLoaded", function () {
    const chartDom = document.getElementById('main');
    const myChart = echarts.init(chartDom);

    fetch('/api/chart-data')
        .then(response => response.json())
        .then(data => {
            const option = {
                title: { text: 'Stacked Area Chart' },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: { backgroundColor: '#6a7985' }
                    }
                },
                legend: {
                    data: data.series.map(s => s.name)
                },
                toolbox: {
                    feature: { saveAsImage: {} }
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
                    data: data.labels
                }],
                yAxis: [{ type: 'value' }],
                series: data.series.map(s => ({
                    name: s.name,
                    type: 'line',
                    stack: 'Total',
                    areaStyle: {},
                    emphasis: { focus: 'series' },
                    data: s.data
                }))
            };

            myChart.setOption(option);
        });
});
</script>
