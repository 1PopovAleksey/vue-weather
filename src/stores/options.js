import { defineStore } from 'pinia';

export const useOptionsStore = defineStore('options', {
  state: () => ({ fahrenheit: false, celsius: true }),
  actions: {
    changeTemp() {
      this.fahrenheit = !this.fahrenheit;
      this.celsius = !this.celsius;
    }
  }
});
