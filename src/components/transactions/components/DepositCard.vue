<template>
  <div class="transaction-card__wrapper">
    <div class="transaction-card">
      <ul class="transaction-card__list">
        <li class="transaction-card__item">
          <div class="transaction-card__image-wrapper">
            <!-- TODO: change to image URL by API -->
            <img
              class="transaction-card__image"
              :src="deposit.ava"
              alt="photo"
              v-if='deposit.ava'>
            <icon-ava
              class="default-ava"
              v-else/>
          </div>
          <div class="transaction-card__col">
            <p class="transaction-card__text transaction-card__text--name">{{ deposit.name }}</p>
            <div class="transaction-card__row mobile-flex">
              <p class="transaction-card__text transaction-card__text--date">{{ deposit.date }}</p>
              <p class="transaction-card__text transaction-card__text--time">{{ deposit.time }}</p>
            </div>
            <a
              :href='`mailto:${deposit.email}`'
              target='_blank'
              class="transaction-card__text tablet-flex">{{ deposit.email }}
            </a>
          </div>
        </li>
        <li class="transaction-card__item transaction-card__item--end tablet-flex">
          <div class="transaction-card__col transaction-card__col--end">
            <p class="transaction-card__text transaction-card__text--date">{{ deposit.date }}</p>
            <p class="transaction-card__text transaction-card__text--time">{{ deposit.time }}</p>
          </div>
        </li>
        <li class="transaction-card__item tablet-flex">
          <p
            class="transaction-card__text transaction-card__text--white"
            >{{ currency }}</p>
        </li>
        <li class="transaction-card__item tablet-flex">
          <icon-wallet class='transaction-card__item-icon'/>
          <p
            class="transaction-card__text transaction-card__text--wallet"
            >{{ deposit.wallet }}</p>
        </li>
        <li class="transaction-card__item transaction-card__item--end">
          <p
            class="transaction-card__text transaction-card__text--balance"
            :class='{"transaction-card__text--rejected": deposit.status === "rejected",
                    "transaction-card__text--successful": deposit.status === "approved"
                    || deposit.status === "successful" || deposit.status === "successfull"}'
            >$ {{ deposit.balance | numeral('0,0.[000000]')}}
          </p>
          <icon-info
            class='transaction-card__item-icon
              transaction-card__item-icon--small-right
              tablet-block'/>
          <a
            class="transaction-card__icon-arrow-button only-mobile-block"
            @click.stop.prevent='dropMenu = !dropMenu'>
          <icon-arrow-down
            class='transaction-card__icon-arrow'
            :class='{"rotate-180": dropMenu}'/>
          </a>
        </li>
        <li class="transaction-card__item tablet-flex">
          <p
          class="transaction-card__text transaction-card__text--status"
          :class='{"transaction-card__text--rejected": deposit.status === "rejected",
                    "transaction-card__text--successful": deposit.status === "approved"
                    || deposit.status === "successful" || deposit.status === "successfull"}'
          >{{ deposit.status }}
        </p>
          <icon-info
            class='transaction-card__item-icon transaction-card__item-icon--small-right'
            v-if='deposit.status === "rejected"'/>
        </li>
      </ul>
    </div>
    <transition
      name="custom-classes-transition"
      enter-active-class="animated dur02 fadeIn"
      leave-active-class="animated dur02 fadeOut"
      mode="out-in">
    <div class="transaction-card__drop-menu" v-if='dropMenu'>
      <div class="transaction-card__drop-item">
        <p class="transaction-card__label">Currency</p>
        <p class="transaction-card__text">{{ currency }}</p>
      </div>
      <div class="transaction-card__drop-item">
        <p class="transaction-card__label">Recieved on</p>
        <div class="transaction-card__row transaction-card__row--end">
          <icon-wallet class='transaction-card__drop-icon'/>
          <p class="transaction-card__text">{{ wallet }}</p>
        </div>
      </div>
      <div class="transaction-card__drop-item">
        <p class="transaction-card__label">Investor Email</p>
        <a
          :href='`mailto:${deposit.email}`'
          target='_blank'
          class="transaction-card__text">{{ deposit.email }}
        </a>
      </div>
      <div class="transaction-card__drop-item">
        <p class="transaction-card__label">Status</p>
        <p
          class="transaction-card__text transaction-card__text--status"
          :class='{"transaction-card__text--rejected": deposit.status === "rejected",
                  "transaction-card__text--successful": deposit.status === "successful"}'
          >{{ deposit.status }}
        </p>
      </div>
      <div class="transaction-card__drop-item">
        <p class="transaction-card__label">Fees</p>
        <p class="transaction-card__text">{{ deposit.fees }}</p>
      </div>
    </div>
    </transition>
  </div>
</template>
<script>
import IconArrowDown from '@/components/common/icons/IconArrowDown.vue';
import IconWallet from '@/components/common/icons/IconWallet.vue';
import IconInfo from '@/components/common/icons/IconInfo.vue';
import IconAva from '@/components/common/icons/IconAva.vue';
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'TransactionCard',
  props: {
    deposit: {
      type: Object,
    },
  },
  components: {
    IconArrowDown,
    IconWallet,
    IconInfo,
    IconAva,
  },
  data() {
    return {
      dropMenu: false,
    };
  },
  computed: {
    ...mapState({
      methods: state => state.billing.methods,
      currencies: state => state.billing.currencies,
      cost: state => state.transactions.cost,
    }),
    currency() {
      const { currency } = this.deposit;
      if (currency === 'ETH') {
        return 'Ethereum';
      } else if (currency === 'BTC') {
        return 'Bitcoin';
      } else {
        return currency;
      }
    },
    balance() {
      return Number(this.cost[this.deposit.currency] * this.deposit.balance).toFixed(6);
    },
  },
};
</script>
<style lang="scss">
@import '~@/scss/components/transaction-card';
</style>
