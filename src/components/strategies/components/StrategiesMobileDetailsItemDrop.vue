<template>
<transition
      v-on:enter="enter"
      v-on:leave="leave">
  <div class="strategies-mobile-details-item-drop">
    <div class="strategies-mobile-details-item-drop__row">
      <div class="strategies-mobile-details-item-drop__item">
        <p class="strategies-mobile-details-item-drop__subtitle">Asset price</p>
        <p class="strategies-mobile-details-item-drop__value">3.55 $</p>
      </div>
      <div class="strategies-mobile-details-item-drop__item">
        <p class="strategies-mobile-details-item-drop__subtitle"></p>
        <p class="strategies-mobile-details-item-drop__value">112</p>
      </div>
    </div>
    <div class="strategies-mobile-details-item-drop__row">
      <div class="strategies-mobile-details-item-drop__item">
       <p class="strategies-mobile-details-item-drop__subtitle">Locatione</p>
       <p class="strategies-mobile-details-item-drop__value">Local</p>
      </div>
      <div class="strategies-mobile-details-item-drop__item">
       <p class="strategies-mobile-details-item-drop__subtitle">Balance, $</p>
       <p class="strategies-mobile-details-item-drop__value">76 079 $</p>
     </div>
    </div>
  </div>
  </transition>
</template>
<script>
import 'velocity-animate';


export default {
  components: {
  },
  methods: {
    enter(el, done) {
      Velocity(el, "slideDown", { duration: 200 })
    },
    leave(el, done) {
      Velocity(el, "slideUp", { duration: 200 })
    }
  },
}
</script>

<style lang="scss">
.strategies-mobile-details-item-drop {
    padding: 16px 28px 16px;
    border-bottom: 1px solid $N10;
  &__row {
    margin-bottom: 24px; 
    @include flex-row(space-between, flex-end);
    &:last-child {
      margin-bottom: 0;
    }
  }
  &__item {
    @include flex-col(flex-start, flex-start);
    margin-right: 25px;
    min-width: 80px;
  }
  &__subtitle {
    margin-bottom: 6px;
    @include text($H200, 400, $N6);
  }
  &__value {
    @include text($H300, 400, $N2);
  }
}
</style>

