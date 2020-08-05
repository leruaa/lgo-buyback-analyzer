import Papa from 'papaparse'

Papa.parse("api/buyback", {
  header: true,
  worker: true,
  download: true,
  step: function (row) {
    console.log("Row:", row.data);
  },
  complete: function () {
    console.log("All done!");
  }
});

