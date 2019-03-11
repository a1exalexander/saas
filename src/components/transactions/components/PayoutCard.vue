<template>
  <div class="transaction-card__wrapper">
    <div class="transaction-card">
      <ul class="transaction-card__list">
        <li class="transaction-card__item">
          <div class="transaction-card__image-wrapper">
            <!-- TODO: change to image URL by API -->
            <img class="transaction-card__image" src="@/assets/images/ava.jpg" alt="photo">
          </div>
          <div class="transaction-card__col">
            <p class="transaction-card__text transaction-card__text--name">{{ payout.name }}</p>
            <div class="transaction-card__row mobile-flex">
              <p class="transaction-card__text transaction-card__text--date">{{ payout.date }}</p>
              <p class="transaction-card__text transaction-card__text--time">{{ payout.time }}</p>
            </div>
            <a
              :href='`mailto:${payout.email}`'
              target='_blank'
              class="transaction-card__text tablet-flex">{{ payout.email }}
            </a>
          </div>
        </li>
        <li class="transaction-card__item transaction-card__item--end tablet-flex">
          <div class="transaction-card__col transaction-card__col--end">
            <p class="transaction-card__text transaction-card__text--date">{{ payout.date }}</p>
            <p class="transaction-card__text transaction-card__text--time">{{ payout.time }}</p>
          </div>
        </li>
        <li class="transaction-card__item tablet-flex">
          <p class="transaction-card__text transaction-card__text--white">{{ payout.currency }}</p>
        </li>
        <li class="transaction-card__item tablet-flex">
          <icon-wallet class='transaction-card__item-icon'/>
          <p
            class="transaction-card__text transaction-card__text--white"
            >{{ payout.payoutAddress }}
          </p>
        </li>
        <li class="transaction-card__item transaction-card__item--end">
          <p
            class="transaction-card__text transaction-card__text--balance"
            :class='{"transaction-card__text--rejected": payout.status === "rejected",
                    "transaction-card__text--successful": payout.status === "successful"}'
            >{{ payout.balance | numeral('0,0') }} $
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
          :class='{"transaction-card__text--rejected": payout.status === "rejected",
                  "transaction-card__text--successful": payout.status === "successful"}'
          >{{ payout.status }}
        </p>
          <icon-info
            class='transaction-card__item-icon transaction-card__item-icon--small-right'
            v-if='payout.status === "rejected"'/>
        </li>
      </ul>
    </div>
    <transition
    name="custom-classes-transition"
    enter-active-class="animated dur03 fadeIn"
    leave-active-class="animated dur02 fadeOut"
    mode="out-in">
    <div class="transaction-card__drop-menu" v-if='dropMenu'>
      <div class="transaction-card__drop-item">
        <p class="transaction-card__label">Currency</p>
        <p class="transaction-card__text">{{ payout.currency }}</p>
      </div>
      <div class="transaction-card__drop-item">
        <p class="transaction-card__label">Payout adress</p>
        <div class="transaction-card__row transaction-card__row--end">
          <icon-wallet class='transaction-card__drop-icon'/>
          <p class="transaction-card__text">{{ payout.payoutAddress }}</p>
        </div>
      </div>
      <div class="transaction-card__drop-item">
        <p class="transaction-card__label">Investor Email</p>
        <a
          :href='`mailto:${payout.email}`'
          target='_blank'
          class="transaction-card__text">{{ payout.email }}
        </a>
      </div>
      <div class="transaction-card__drop-item">
        <p class="transaction-card__label">Status</p>
        <p
          class="transaction-card__text transaction-card__text--status"
          :class='{"transaction-card__text--rejected": payout.status === "rejected",
                  "transaction-card__text--successful": payout.status === "successful"}'
          >{{ payout.status }}
        </p>
      </div>
    </div>
    </transition>
  </div>
</template>
<script>
import IconArrowDown from '@/components/common/icons/IconArrowDown.vue';
import IconInfo from '@/components/common/icons/IconInfo.vue';
import IconWallet from '@/components/common/icons/IconWallet.vue';

export default {
  name: 'TransactionCard',
  props: {
    payout: {
      type: Object,
    },
  },
  components: {
    IconArrowDown,
    IconWallet,
    IconInfo,
  },
  data() {
    return {
      dropMenu: false,
    };
  },
};
</script>
<style lang="scss">
@import '~@/scss/components/transaction-card';
</style>
