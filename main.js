const ctx = document.getElementById("myChart").getContext("2d");

async function getData() {
  let httpResponse = await fetch("dunkinDonuts.json");
  httpResponse = await httpResponse.json();
  let data = httpResponse.data;

  let state = data.map((x) => x.state);
  let drivein = data.filter((x) => x.drivein == "Y");
  drivein = drivein.map((x) => x.state);

  let storeCount = state.reduce((obj, item) => {
    if (!obj[item]) {
      obj[item] = 0;
    }
    obj[item]++;
    return obj;
  }, {});

  let driveinCount = drivein.reduce((obj, item) => {
    if (!obj[item]) {
      obj[item] = 0;
    }
    obj[item]++;
    return obj;
  }, {});

  let driveinData = [];

  for (let store in storeCount) {
    let y = driveinCount[store] ? driveinCount[store] : 0;
    driveinData.push(y);
  }

  const myChart = new Chart(ctx, {
    data: {
      datasets: [
        {
          type: "line",
          label: "# of Stores per State",
          data: Object.values(storeCount),
          responsive: true,
          backgroundColor: [
            "rgba(235, 199, 132, 0.2)",
            "rgba(254, 12, 235, 0.2)",
            "rgba(215, 226, 86, 0.2)",
            "rgba(175, 142, 192, 0.2)",
            "rgba(183, 112, 255, 0.2)",
            "rgba(255, 109, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 199, 132, 1)",
            "rgba(54, 172, 235, 1)",
            "rgba(255, 246, 186, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 2, 255, 1)",
            "rgba(255, 159, 144, 1)",
          ],
          borderWidth: 1,
        },
        {
          type: "line",
          label: "# of Stores with drivein",
          data: driveinData,
        },
      ],
      labels: Object.keys(storeCount),
    },
  });
}

getData();
