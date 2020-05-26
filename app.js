const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const cities = [];
const searchInput = document.getElementsByTagName("input")[0];
const sugesstionList = document.getElementsByTagName("ul")[0];

fetch(endpoint)
  .then(blob => blob.json())
  .then(data => cities.push(...data))
  .then(console.log(cities));

// console.log(cities);
searchInput.addEventListener("keyup", serachResults);

function serachResults() {
  console.log(cities.length);
  sugesstionList.innerHTML = "";
  if (this.value.length > 2) {
    const regex = new RegExp(searchInput.value, "gi");
    const html = cities
      .map(location => {
        if (location.city.match(regex) || location.state.match(regex)) {
          const cityName = location.city.replace(
            regex,
            `<span class="hl">${searchInput.value}</span>`
          );
          const stateName = location.state.replace(
            regex,
            `<span class="hl">${searchInput.value}</span>`
          );
          return `
        <li>
            <span class="name">${cityName}, ${stateName}</span>
            <span class="population">${location.population}</span>
        </li>
        `;
        }
      })
      .join("");
    sugesstionList.innerHTML = html;

    // cities.forEach(city => {
    //   if (city.city.match(regex)) {
    //     const searchresult = city.city.replace(
    //       regex,
    //       `<span class="hl">${searchInput.value}</span>`
    //     );
    //     sugesstionList.innerHTML += `<li>${searchresult}</li>`;
    //   }
    // });
  }
}
