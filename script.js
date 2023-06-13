let cities = [
  {
    arabicName: "بغداد",
    name: "Baghdād",
  },
  {
    arabicName: "اربيل",
    name: "Arbīl",
  },
  {
    arabicName: "كربلاء",
    name: "Karbalā’",
  },
  {
    arabicName: "بصرة",
    name: "Başrah",
  },
];

const loader = document.getElementById("loader").classList;

for (city of cities) {
  document.getElementById("citySelect").innerHTML += `
    <option class="op" value=${city.name}>${city.arabicName}</option>
  `;
}

getPrayer("Baghdād");

document.getElementById("citySelect").addEventListener("change", function () {
  getPrayer(this.value);
  let cityname;
  for (city of cities) {
    if (city.name == this.value) {
      cityname = city.arabicName;
    }
  }
  document.getElementById("cityName").innerHTML = cityname;
});

function getPrayer(cityName) {
  loader.remove("display");
  let params = {
    country: "IQ",
    city: cityName,
  };
  axios
    .get("http://api.aladhan.com/v1/timingsByCity", {
      params: params,
    })
    .then(function (response) {
      const timing = response.data.data.timings;
      getTime("date", response.data.data.date.gregorian.date);
      getTime("day", response.data.data.date.hijri.weekday.ar);
      getTime("fajr", timing.Fajr);
      getTime("dhuhr", timing.Dhuhr);
      getTime("asr", timing.Asr);
      getTime("maghrib", timing.Maghrib);
      getTime("isha", timing.Isha);
      loader.add("display");
    })
    .catch(function (error) {
      console.log(error);
    });
}

function getTime(id, time) {
  document.getElementById(id).innerHTML = time;
}
