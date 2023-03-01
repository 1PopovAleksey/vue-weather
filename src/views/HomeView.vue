<script setup>
import IconCloud from '../components/icons/IconCloud.vue';
import IconSmallCloud from '../components/icons/IconSmallCloud.vue';
// import popupSetting from '../components/popupSetting/popupSetting.vue';
</script>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      weather: {
        coord: { lon: -0.1257, lat: 51.5085 },
        weather: [{ id: 804, main: 'Clouds', description: 'overcast clouds', icon: '04d' }],
        base: 'stations',
        main: {
          temp: 280.1,
          feels_like: 277.94,
          temp_min: 279.1,
          temp_max: 281.27,
          pressure: 1027,
          humidity: 77
        },
        visibility: 10000,
        wind: { speed: 3.09, deg: 50 },
        clouds: { all: 100 },
        dt: 1677674288,
        sys: { type: 2, id: 2075535, country: 'GB', sunrise: 1677653209, sunset: 1677692363 },
        timezone: 0,
        id: 2643743,
        name: 'London',
        cod: 200
      },
      data: '04:20',
      fahrenheit: false,
      city: 'London'
    };
  },
  created() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=6d7fe5b25fda98a2bfc7453dfdda7b50`;
    axios.get(url).then((response) => (this.weather = response.data));

    const date = new Date(this.weather.dt * 1000);
    const day = date.getDay();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const dateCity = hours + ':' + minutes;
    console.log(day, dateCity);
  },
  methods: {}
};
</script>

<template>
  <section class="weather">
    <div class="weather__container">
      <div class="weather__offset">
        <header class="weather__header">
          <h1 class="weather__temp" v-if="fahrenheit">
            {{ Math.round(this.weather.main.temp * 1.8 - 459.67) }} °F
          </h1>
          <h1 class="weather__temp" v-else>{{ Math.round(this.weather.main.temp - 273) }} °C</h1>
          <IconCloud />
        </header>
        <div class="weather__info">
          <p class="weather__location">{{ this.weather.name }}, {{ this.weather.sys.country }}</p>
          <p class="weather__data">
            Monday, <span>{{ this.data }}</span>
          </p>
        </div>
        <div class="weather__more-info">
          <div class="weather__flex weather__flex_gap">
            <IconSmallCloud />
            <p>Clouds {{ this.weather.clouds.all }} %</p>
          </div>
          <div class="weather__flex weather__flex_gap">
            <IconSmallCloud />
            <p>Visibility {{ this.weather.visibility * 0.001 }}km</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- <popupSetting /> -->
</template>

<style lang="scss" scoped>
@import '../assets/mixins.scss';

.weather {
  height: 100vh;

  &__container {
    @include container;
  }

  &__offset {
    padding: 50px 0;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__temp {
    font-weight: 300;
    font-size: 64px;
    line-height: 120%;
    color: var(--black);
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 25px 0 15px 0;
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

  &__flex {
    display: flex;
    align-items: center;

    &_gap {
      gap: 15px;
    }
  }
}
</style>
