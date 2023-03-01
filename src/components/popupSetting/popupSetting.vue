<script></script>

<template>
  <div class="popup">
    <div class="popup__container">
      <header class="popup__flex popup__flex_space-between">
        <h2 class="popup__title">Настройки</h2>
        <button class="popup__close">X</button>
      </header>
      <div class="popup__flex popup__flex_gap">
        <p>Температура в</p>
        <button class="popup__temp">°C</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.popup {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba($color: var(--black), $alpha: 0.5);

  &__container {
    padding: 10px;
    margin: 0 auto;
    width: 320px;
    height: 200px;
    border: 2px solid var(--black);
    border-radius: 5px;
    background-color: var(--white);
  }

  &__title {
  }

  &__close {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__flex {
    display: flex;
    align-items: center;

    &_gap {
      gap: 5px;
    }

    &_space-between {
      justify-content: space-between;
      margin: 0 0 10px 0;
    }
  }

  &__temp {
    padding: 3px;
    border: 1px solid var(--black);
    border-radius: 5px;
  }
}
</style>
