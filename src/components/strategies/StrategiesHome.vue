<template>
<div class="strategies">
  <header class="strategies__header">
    <h1 class="strategies__title">Strategies</h1>
  </header>
  <main class="strategies__main">
    <div class="strategies__yours">
      <h2 class="strategies__yours-title">Your strategies</h2>
      <div class="strategies__row-wrap">
        <strategies-item
          @click.native='showDetails(n)'
          v-for='n in 3'
          :key='n'/>
      </div>
    </div>
    <div class="strategies__avialable">
      <div class="strategies__avialable-row">
        <h2 class="strategies__avialable-title">Avialable exchange accounts</h2>
        <subtle-icon @click.native='addAsset'  label='Add new exchange'>
          <icon-plus class="icon-button-left"/>
        </subtle-icon>
      </div>
      <div class="strategies__row">
        <div class="strategies__exchanges">
          <draggable :list="list1" group="exchange" @change="log">
            <transition-group type="transition" name="flip-list">
            <strategies-exchange-item
              v-for='el in list1'
              :exchange='el'
              :key='el.id'/>
            </transition-group>
          </draggable>
        </div>
        <div class="strategies__new">
          <div class="strategies__add-box">
            <h3 class="strategies__add-title">Create new strategy</h3>
            
            <draggable
              class='strategies__drag-list'
              group="exchange"
              :list="list2"
              @change="log"
              handle=".strategies__drag-item">
              <transition-group type="transition" name="flip-list">
                <strategies-exchange-item
                  v-for='el in list2'
                  selected
                  @removeItem='removeItem(el)'
                  class="strategies__drag-item"
                  :exchange='el'
                  :key='`${el.id}${el.api}`'/>
                <button-dash-icon
                  label='Just drag & drop another exchange here'
                  class='strategies__dash-button'
                  key='footer'>
                  <icon-drag class='icon-button-left icon-largest'/>
                </button-dash-icon>
              </transition-group>
            </draggable>
            <p class="strategies__box-text">You can add several exchanges to your trading strategy or</p>
            <button-dash-icon
              label='Add your local asset'
              class='strategies__dash-button'>
              <icon-plus class='icon-button-left'/>
            </button-dash-icon>
            <strategies-add-box :exchanges="list2" v-if='!!list2.length'/>
          </div>
        </div>
      </div>
    </div>
  </main>
</div>
</template>
<script>
// import { mapActions } from 'vuex';
import '@/scss/components/director.scss';
import StrategiesExchangeItem from '@/components/strategies/components/StrategiesExchangeItem.vue';
import StrategiesItem from '@/components/strategies/components/StrategiesItem.vue';
import StrategiesAddBox from './components/StrategiesAddBox.vue';
import IconPlus from '@/components/common/icons/IconPlus.vue';
import IconDrag from '@/components/common/icons/IconDrag.vue';
import StrategiesDropButton from '@/components/strategies/components/StrategiesDropButton.vue';
import draggable from 'vuedraggable';

export default {
  name: 'StrategiesHome',
  components: {
    StrategiesExchangeItem,
    StrategiesItem,
    StrategiesAddBox,
    IconPlus,
    StrategiesDropButton,
    draggable,
    IconDrag,
  },
  data() {
    return {
      list1: [
        { name: "SyriaJohn", id: 1, api: 'AX8S1XML-UHR780EP' },
        { name: "PakistanJoao", id: 2, api: 'AX8S1XML-UHR780EP' },
        { name: "AntarcticaJean", id: 3, api: 'AX8S1XML-UHR780EP' },
        { name: "LithuaniaGerard", id: 4, api: 'AX8S1XML-UHR780EP' },
        { name: "South AfricaJuan", id: 5, api: 'AX8S1XML-UHR780EP' },
        { name: "Turks & Caicos IslandsEdgard", id: 6, api: 'AX8S1XML-UHR780EP' },
      ],
      list2: [
        // { name: "NepalJohnson", id: 7, api: 'AX8S1XML-UHR780EP' },
      ]
    }
  },
  methods: {
    removeItem(el) {
      const item = { ...el };
      const { id: itemId } = el;
      const idx = this.list2.findIndex(e => e.id === itemId);
      this.list2.splice(idx, 1);
      this.list1.push(item);
    },
    addAsset() {
      this.$emit('addAsset');
    },
    showDetails(id) {
      this.$emit('showDetails', id);
    },
    log(evt) {
      window.console.log(evt);
    },
  }
};
</script>
<style lang="scss">
.sortable-chosen {
  opacity: 1 !important;
  border-color: $B3;
}
.sortable-ghost {
  opacity: 1 !important;
  border-color: $B3;
}
$strategies: strategies;
.#{$strategies} {
  @include flex-col(stretch, stretch);
  display: none;
  @media screen and (min-width: $screen-tablet) {
   @include flex-col(flex-start, flex-start);
    height: 100vh;
    overflow-y: auto;
  }
  &__header {
    padding: 27px 40px 0;
  }
  &__title {
    font-size: $H900;
    font-weight: 600;
    margin-bottom: 32px;
  }
  &__main {
    padding: 0 20px 0 40px;
    width: 100%;
    @media screen and (min-width: $screen-desktop) {  
      padding: 0 40px;
    }
  }
  &__yours {
    width: 100%;
    padding-bottom: 32px;
    margin-bottom: 30px;
    border-bottom: 1px solid $N10;
  }
  &__yours-title {
    margin-bottom: 34px;
    @include text($H700, 500, $N0);
  }
  &__new {
    flex: 1 1;
    @include flex-row(center, flex-start);
  }
  &__avialable-row {
    @include flex-row(flex-start, flex-end);
    margin-bottom: 35px;
  }
  &__row {
    @include flex-row(space-between, flex-start);
  }
  &__row-wrap {
    @include flex-row(flex-start, flex-start);
    flex-wrap: wrap;
  }
  &__avialable-title {
    margin-right: 50px;
    @include text($H700, 500, $N0)
  }
  &__exchanges {
    margin-right: 20px;
  }
  &__add-box {
    width: 320px;
    background: $N13;
    border: 1px solid $N10;
    border-radius: 2px;
    padding: 32px 40px 40px;
    @media screen and (min-width: $screen-desktop) {  
      width: 340px;
    }
    @media screen and (min-width: $screen-desktop-large) {  
      width: 420px;
    }
  }
  &__add-title {
    margin-bottom: 24px;
  }
  &__drag-list {
    margin-bottom: 12px;
    pointer-events: all;
    position: relative;
    &:hover .#{$strategies}__dash-button {
      border-color: $B1;
      color: $B1;
      svg {
        fill: $B1;
      }
    }
  }
  &__drag-item {
    border-color: $B3;
    margin-bottom: 16px;
  }
  &__dash-button {
    margin-top: 16px;
    // pointer-events: none;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;
    padding: 0;
    height: 82px;
  }
  &__box-text {
    @include text($H100, 500);
    margin-bottom: 14px;
  }
}
</style>
