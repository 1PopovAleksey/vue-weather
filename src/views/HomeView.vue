<script setup>
// import popupSetting from '../components/popupSetting/popupSetting.vue';
</script>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      weather: {
        coord: { lon: -0.1257, lat: 51.5085 },
        weather: [{ id: 803, main: 'Clouds', description: 'облачно с прояснениями', icon: '04n' }],
        base: 'stations',
        main: {
          temp: 274.47,
          feels_like: 272.84,
          temp_min: 271.8,
          temp_max: 275.92,
          pressure: 1024,
          humidity: 89
        },
        visibility: 10000,
        wind: { speed: 1.54, deg: 0 },
        clouds: { all: 75 },
        dt: 1677739394,
        sys: { type: 2, id: 2075535, country: 'GB', sunrise: 1677739479, sunset: 1677778869 },
        timezone: 0,
        id: 2643743,
        name: 'Лондон',
        cod: 200
      },
      fahrenheit: false,
      city: 'Novosibirsk',
      language: 'en',
      API: '6d7fe5b25fda98a2bfc7453dfdda7b50',
      iconWeather: '',
      iconAlt: ''
    };
  },
  async created() {
    // Request to receive the weather
    const urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&lang=${this.language}&appid=${this.API}`;
    // const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${this.city}&appid=${this.API}`;
    await axios.get(urlWeather).then((response) => (this.weather = response.data));

    // Obtaining an icon
    const icon = `http://openweathermap.org/img/wn/${this.weather.weather[0].icon}@2x.png`;
    const alt = this.weather.weather[0].description;
    this.iconWeather = icon;
    this.iconAlt = alt;

    // Getting a time
    // const date = new Date(this.weather.dt * 1000);
    // const day = date.getDay();
    // const hours = date.getHours();
    // const minutes = date.getMinutes();
    // const dateCity = hours + ':' + minutes;
    // console.log(day, dateCity);
  },
  methods: {
    searchWeather() {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&lang=${this.language}&appid=${this.API}`;
      axios.get(url).then((response) => (this.weather = response.data));
    }
  }
};
</script>

<template>
  <header class="header">
    <div class="header__container">
      <div class="header__search">
        <input type="text" v-model="city" />
        <button @click="searchWeather">
          <svg
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.5 9.79627C19.5 14.9208 15.2565 19.0925 10 19.0925C4.74354 19.0925 0.5 14.9208 0.5 9.79627C0.5 4.67174 4.74354 0.5 10 0.5C15.2565 0.5 19.5 4.67174 19.5 9.79627Z"
              stroke="#100904"
            />
            <path d="M16.7051 16.9387L25 24.9805" stroke="#100904" stroke-width="2" />
          </svg>
        </button>
      </div>
    </div>
  </header>
  <main>
    <section class="weather">
      <div class="weather__container">
        <div class="weather__offset">
          <header class="weather__header">
            <div class="weather__flex weather__flex_column">
              <div class="weather__flex weather__flex_space-between">
                <h1 class="weather__temp" v-if="fahrenheit">
                  {{ Math.round(this.weather.main.temp * 1.8 - 459.67) }} °F
                </h1>
                <h1 class="weather__temp" v-else>
                  {{ Math.round(this.weather.main.temp - 273) }} °C
                </h1>
                <img class="weather__icon" :src="this.iconWeather" :alt="iconAlt" />
              </div>
              <div class="weather__flex weather__flex_gap">
                <p class="weather__more" v-if="fahrenheit">
                  Feels like {{ Math.round(this.weather.main.feels_like * 1.8 - 459.67) }} °F.
                </p>
                <p class="weather__more" v-else>
                  Feels like {{ Math.round(this.weather.main.feels_like - 273) }} °C.
                </p>
                <p class="weather__more">
                  {{
                    this.weather.weather[0].description[0].toUpperCase() +
                    this.weather.weather[0].description.slice(1) +
                    '.'
                  }}
                </p>
              </div>
            </div>
          </header>
          <div class="weather__info">
            <p class="weather__location">{{ this.weather.name }}, {{ this.weather.sys.country }}</p>
          </div>
          <div class="weather__more-info">
            <div class="weather__flex weather__flex_more">
              <div class="weather__flex weather__flex_gap">
                <p class="weather__more">Clouds: {{ this.weather.clouds.all }}%</p>
                <p class="weather__more">Visibility: {{ this.weather.visibility * 0.001 }}km</p>
              </div>
              <div class="weather__flex weather__flex_gap">
                <p class="weather__more">Pressure: {{ this.weather.main.pressure }}hPa</p>
                <p class="weather__more">Humidity: {{ this.weather.main.humidity }}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <!-- <popupSetting /> -->
</template>

<style lang="scss" scoped>
@import '../assets/mixins.scss';

.header {
  padding: 20px 0;
  background-color: var(--white-2);

  &__container {
    @include container;
  }

  &__search {
    position: relative;

    input {
      display: flex;
      align-items: center;
      padding: 0 15px;
      width: 320px;
      height: 60px;
      border: none;
      border-radius: 5px;
      font-weight: 300;
      font-size: 32px;
      line-height: 120%;
      color: var(--black);
    }

    button {
      position: absolute;
      top: 0;
      right: 15px;
      height: 100%;
    }
  }
}

.weather {
  &__container {
    @include container;
  }

  &__offset {
    padding: 20px 0 20px 0;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__temp {
    font-weight: 300;
    font-size: 80px;
    line-height: 100%;
    color: var(--black);
  }

  &__icon {
    width: 80px;
    height: 80px;
  }

  &__more {
    font-weight: 300;
    font-size: 20px;
    line-height: 100%;
    color: var(--black);
  }

  &__flex {
    display: flex;

    &_column {
      flex-direction: column;
      gap: 10px;
    }

    &_gap {
      gap: 10px;
      flex-wrap: wrap;
    }

    &_more {
      flex-direction: column;
      gap: 10px;
    }

    &_space-between {
      justify-content: space-between;
      width: 320px;
      height: 100%;
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px 0 15px 0;
    border-bottom: 1px solid var(--gray-2);
  }

  &__location {
    font-weight: 600;
    font-size: 32px;
    line-height: 120%;
    color: var(--black);
  }

  &__data {
    font-weight: 400;
    font-size: 24px;
    line-height: 120%;
    color: var(--black);

    span {
      color: var(--gray);
    }
  }

  &__more-info {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 15px 0;
  }
}
</style>
