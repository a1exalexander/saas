<template>
<div>
  <transition
    name="custom-classes-transition"
    enter-active-class="animated dur02 fadeIn"
    leave-active-class="animated dur02 fadeOut">
  <add-alert-popup @close='alertPopup = false' v-if='alertPopup'/>
  </transition>
  <table class='trading-card__table scrollable-tbody'>
    <thead>
      <tr>
        <th><span>Exchange</span></th>
        <th><span>Pair</span></th>
        <th><span>Price</span></th>
        <th class='trading-card__table-button-cell'>
          <span>Options</span>
        </th>
        <th class='trading-card__table-button-cell'>
          <div class='trading-card__table-button'>
            <subtle-icon @click.native='alertPopup = !alertPopup'>
              <icon-plus class='icon-button-left icon-small'/>
              <span>Add price alert</span>
            </subtle-icon>
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for=" item in priceAlerts" :key="item.id">
        <td><span>{{ item.exchange }}</span></td>
        <td><span>{{ item.pair }}</span></td>
        <td><span>{{ item.price | numeral('0.[000000]') }}</span></td>
        <td class='trading-card__table-button-cell'>
          <subtle @click.native="_priceAlertsRemove(item)">Delete</subtle>
        </td>
        <td class='trading-card__table-button-cell'></td>
      </tr>
    </tbody>
  </table>
</div>
</template>
<script>
import SubtleIcon from '@/components/common/buttons/SubtleIcon.vue';
import Subtle from '@/components/common/buttons/Subtle.vue';
import IconPlus from '@/components/common/icons/IconPlus.vue';
import { mapState, mapActions, mapGetters } from 'vuex';
import AddAlertPopup from '@/components/trading/components/tables/components/AddAlertPopup.vue';

export default {
  name: 'PricingAlerts',
  components: {
    SubtleIcon,
    IconPlus,
    Subtle,
    AddAlertPopup,
  },
  data() {
    return {
      alertPopup: false,
    };
  },

  computed: {
    ...mapState('trading', [
      'priceAlerts',
    ]),
  },

  methods:{
    ...mapActions('trading', [
      'priceAlertsGetAll',
      'priceAlertsRemove',
      'priceAlertsAdd',
    ]),
    _priceAlertsRemove( obj ){
      this.priceAlertsRemove( obj );
    },

  },

  beforeMount(){
    this.priceAlertsGetAll();
  },

};
</script>


