<template>
  <canvas id="chart"></canvas>
</template>

<script>
import Chart from "chart.js/auto";
import { onMounted, ref, watch } from "vue";

export default {
  name: "ProblemResultPieChart",
  props: ["data"],
  setup(props) {
    const chartData = ref({
      labels: ["Accepted", "Wrong Answer"],
      datasets: [
        {
          label: "Numbers",
          data: [0, 0], // Initial values
          backgroundColor: ["rgb(22, 163, 74)", "rgb(220, 38, 38)"],
          hoverOffset: 4,
        },
      ],
    });

    const countVerdicts = (objects) => {
      const counts = {
        1: 0,
        2: 0,
      };

      for (let i = 0; i < objects?.length; i++) {
        if (objects[i].status === 1) counts[1] += 1;
        else counts[2] += 1;
      }

      const total = counts[1] + counts[2];
      const percentageAccepted = ((counts[1] / total) * 100).toFixed(2);
      const percentageWrongAnswer = ((counts[2] / total) * 100).toFixed(2);

      chartData.value.datasets[0].data = [
        percentageAccepted,
        percentageWrongAnswer,
      ];
    };

    watch(
      () => props.data,
      (newData) => {
        countVerdicts(newData);

        // Update the chart when props.data changes
        const chart = Chart.getChart("chart");
        if (chart) {
          chart.update();
        }
      }
    );

    onMounted(() => {
      const ctx = document.getElementById("chart").getContext("2d");
      new Chart(ctx, {
        type: "pie",
        data: chartData.value,
        options: {
          plugins: {
            title: {
              display: true,
              text: "Submission statistics",
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = chartData.value.labels[context.dataIndex];
                  const value =
                    chartData.value.datasets[0].data[context.dataIndex];
                  return `${label}: ${value}%`;
                },
              },
            },
          },
        },
      }).render();
    });
  },
};
</script>
