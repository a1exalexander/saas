<template>
  <main class="customer-introduction">
    <div class="customer-introduction__mobile">
      <div class="customer-introduction__section customer-introduction__section--info">
        <h2 class="customer-introduction__title">Personal info</h2>
        <label class="customer-introduction__label">
          <p class="customer-introduction__label-text">Full name</p>
          <input
            type="text"
            class="customer-introduction__input"
            :class='{"input-error": myErrors.name}'
            v-model.trim='newData.name'
            @blur='errorName(newData.name)'>
          <p
            class="input-text-error animated dur04 bounceIn"
            v-html='myErrors.name'
            v-show='myErrors.name'>
          </p>
        </label>
        <div class="customer-introduction__label-wrapper">
          <label class="customer-introduction__label customer-introduction__label--age">
            <p class="customer-introduction__label-text">Age</p>
            <input
              type="text"
              class="customer-introduction__input"
              :class='{"input-error": myErrors.age}'
              v-model.trim.number='newData.age'
              @blur='errorAge(newData.age)'>
            <p
              class="input-text-error animated dur04 bounceIn"
              v-html='myErrors.age'
              v-show='myErrors.age'>
            </p>
          </label>
          <label class="customer-introduction__label customer-introduction__label--city">
            <p class="customer-introduction__label-text">Living city</p>
            <input
              type="text"
              class="customer-introduction__input"
              v-model.trim='newData.city'>
          </label>
        </div>
        <label class="customer-introduction__label">
          <p class="customer-introduction__label-text">Company</p>
          <input
            type="text"
            class="customer-introduction__input"
            v-model.trim='newData.company'>
        </label>
        <label class="customer-introduction__label">
          <p class="customer-introduction__label-text">Working sphere</p>
          <input
            type="text"
            class="customer-introduction__input"
            v-model.trim='newData.sphere'>
        </label>
        <label class="customer-introduction__label">
          <p class="customer-introduction__label-text">Current position</p>
          <input
            type="text"
            class="customer-introduction__input"
            v-model.trim='newData.position'>
        </label>
      </div>
      <div class="customer-introduction__section customer-introduction__section--contacts">
        <h2 class="customer-introduction__title">Contacts</h2>
        <label class="customer-introduction__label">
          <p class="customer-introduction__label-text">Phone</p>
          <input
            type="text"
            class="customer-introduction__input"
            :class='{"input-error": myErrors.phone}'
            v-model.trim="newData.phone"
            @blur='errorPhone(newData.phone)'>
          <p
            class="input-text-error animated dur04 bounceIn"
            v-html='myErrors.phone'
            v-show='myErrors.phone'>
          </p>
        </label>
        <label class="customer-introduction__label">
          <p class="customer-introduction__label-text">Email</p>
          <input
            type="text"
            class="customer-introduction__input"
            :class='{"input-error": myErrors.email}'
            v-model.trim='newData.email'
            @blur='errorEmail(newData.email)'>
          <p
            class="input-text-error animated dur04 bounceIn"
            v-show='myErrors.email'
            v-html="myErrors.email">
          </p>
        </label>
      </div>
      <div class="customer-introduction__section customer-introduction__section--metadata">
        <h2 class="customer-introduction__title customer-introduction__title--meta">Metadata</h2>
        <div class="customer-introduction__meta-item customer-introduction__meta-item--seen">
          <p class="customer-introduction__meta-label">Last seen</p>
          <p type="text" class="customer-introduction__meta-text">{{ getInvestorById.lastSeen }}</p>
        </div>
        <div class="customer-introduction__meta-item customer-introduction__meta-item--date">
          <p class="customer-introduction__meta-label">Registration date</p>
          <p
            type="text"
            class="customer-introduction__meta-text"
            >{{ getInvestorById.registrationDate }}
          </p>
        </div>
        <div class="customer-introduction__meta-item customer-introduction__meta-item--status">
          <p class="customer-introduction__meta-label">Client status</p>
          <drop-status
            class="customer-introduction__drop"
            :getStatus='newData.status'
            @select='selectStatus'/>
        </div>
      </div>
      <div class="customer-introduction__buttons-wrapper">
        <button-primary
          class='customer-introduction__button customer-introduction__button--save'
          :disabled='!comparedData'
          @click.native='save'
          :class='{"button-loading": loading}'
          >Save
        </button-primary>
        <button-transparent
          class='customer-introduction__button customer-introduction__button--cancel-transparent'
          @click.native='cancel'>Cancel
        </button-transparent>
      </div>
    </div>
    <div class="customer-introduction__tablet">
      <div class="customer-introduction__card">
        <div class="customer-introduction__head">
          <p class="customer-introduction__title">Personal info</p>
          <a href="#" class="customer-introduction__dots-button">
            <icon-dots class='customer-introduction__dots-icon'/>
          </a>
        </div>
        <div class="customer-introduction__grid customer-introduction__grid--info">
          <card-item
            label-name='Full name'
            input-type='name'
            :get-value='getInvestorById.name'/>
          <card-item
            label-name='Age'
            input-type='age'
            :get-value='getInvestorById.age'/>
          <card-item
            label-name='Living city'
            input-type='city'
            :get-value='getInvestorById.city'/>
          <card-item
            label-name='Company'
            input-type='company'
            :get-value='getInvestorById.company'/>
          <card-item
            label-name='Working sphere'
            input-type='sphere'
            :get-value='getInvestorById.sphere'/>
          <card-item
            label-name='Current position'
            input-type='position'
            :get-value='getInvestorById.position'/>
        </div>
      </div>
      <div class="customer-introduction__card">
        <div class="customer-introduction__head">
          <p class="customer-introduction__title">Metadata</p>
          <a href="#" class="customer-introduction__dots-button">
            <icon-dots class='customer-introduction__dots-icon'/>
          </a>
        </div>
        <div class="customer-introduction__grid customer-introduction__grid--metadata">
          <card-item
            class='disable'
            label-name='Last seen'
            input-type='age'
            :get-value='getInvestorById.lastSeen'/>
          <div class="customer-introduction__meta-item">
            <p class="customer-introduction__meta-label">Client status</p>
            <drop-status
              class="customer-introduction__drop"
              :getStatus='getInvestorById.status'
              @select='selectStatusGlobal'/>
          </div>
          <card-item
            class='disable'
            label-name='Living city'
            input-type='city'
            :get-value='getInvestorById.registrationDate'/>
        </div>
      </div>
      <div class="customer-introduction__card">
        <div class="customer-introduction__head">
          <p class="customer-introduction__title">Contacts</p>
          <a href="#" class="customer-introduction__dots-button">
            <icon-dots class='customer-introduction__dots-icon'/>
          </a>
        </div>
        <div class="customer-introduction__grid customer-introduction__grid--contacts">
          <card-item
            label-name='Phone'
            input-type='phone'
            :get-value='getInvestorById.phone'/>
          <card-item
            label-name='Email'
            input-type='email'
            :get-value='getInvestorById.email'/>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import ButtonPrimary from '@/components/common/buttons/ButtonPrimary.vue';
import ButtonTransparent from '@/components/common/buttons/ButtonTransparent.vue';
import DropStatus from '@/components/customers/components/DropStatus.vue';
import InputError from '@/js/inputError';
import validation from '@/js/validation';
import format from '@/js/format';
import IconDots from '@/components/common/icons/IconDots.vue';
import CardItem from '@/components/customers/components/CardItem.vue';
import {
  mapState,
  mapGetters,
  mapActions,
  mapMutations,
} from 'vuex';

export default {
  name: 'CustomerIntroduction',
  components: {
    ButtonPrimary,
    ButtonTransparent,
    DropStatus,
    IconDots,
    CardItem,
  },
  data() {
    return {
      loading: false,
      newData: {
        name: '',
        email: '',
        age: '',
        phone: '',
        city: '',
        company: '',
        sphere: '',
        position: '',
        status: '',
      },
      errorsText: {
        name: [
          this.$t('auth.errors.name.numbers'),
          this.$t('auth.errors.name.enter'),
        ],
        email: [
          this.$t('auth.errors.email.enter'),
          this.$t('auth.errors.email.at'),
          this.$t('auth.errors.email.domain'),
          this.$t('auth.errors.email.valid'),
        ],
        phone: [
          this.$t('auth.errors.phone.letters'),
          this.$t('auth.errors.phone.count'),
          this.$t('auth.errors.phone.correct'),
        ],
        age: [
          this.$t('auth.errors.age.letters'),
          this.$t('auth.errors.age.correct'),
        ],
      },
      myErrors: {
        name: '',
        email: '',
        phone: '',
        age: '',
      },
      formError: {},
    };
  },
  methods: {
    ...mapMutations('investors', [
      'updateProfile',
      'setValue',
    ]),
    ...mapActions('investors', [
      'checkInvestorById',
    ]),
    save() {
      this.loading = true;
      setTimeout(() => {
        this.updateProfile(this.newData);
        this.loading = false;
      }, 1000);
    },
    saveValue([type, value]) {
      this.newData[type] = value;
    },
    cancel() {
      this.$router.go(-1);
    },
    selectStatus(status) {
      this.newData.status = status;
    },
    selectStatusGlobal(value) {
      this.setValue(['status', value]);
    },
    errorEmail(email) {
      this.myErrors.email = '';
      setTimeout(() => {
        this.myErrors.email = this.formError.errorEmail(email);
      }, 15);
    },
    errorName(name) {
      this.myErrors.name = '';
      setTimeout(() => {
        this.myErrors.name = this.formError.errorName(name);
      }, 15);
    },
    errorAge(age) {
      this.myErrors.age = '';
      setTimeout(() => {
        this.myErrors.age = this.formError.errorAge(age);
      }, 15);
    },
    errorPhone(phone) {
      this.myErrors.phone = '';
      setTimeout(() => {
        this.myErrors.phone = this.formError.errorPhone(phone);
      }, 15);
    },
    getData() {
      Object.keys(this.newData).forEach((key) => {
        this.newData[key] = this.getInvestorById[key];
      });
    },
    redirectRoute() {
      this.$router.push('/customers');
    },
    compareData(newData, oldData) {
      if (newData && oldData) {
        let negFlag = false;
        Object.entries(newData).forEach((newItem) => {
          Object.entries(oldData).forEach((oldItem) => {
            if (newItem[0] === oldItem[0]) {
              if (newItem[1] !== oldItem[1]) {
                negFlag = true;
              }
            }
          });
        });
        return negFlag;
      }
      return false;
    },
  },
  computed: {
    ...mapGetters('investors', [
      'getInvestorById',
    ]),
    ...mapState('investors', [
      'investors',
    ]),
    readyName() {
      return validation.name(this.newData.name);
    },
    readyEmail() {
      return validation.email(this.newData.email);
    },
    readyPhone() {
      if (this.newData.phone) {
        return validation.phone(this.newData.phone);
      }
      return true;
    },
    readyAge() {
      if (this.newData.age) {
        return validation.age(this.newData.age);
      }
      return true;
    },
    allReady() {
      return this.readyName && this.readyEmail && this.readyPhone && this.readyAge;
    },
    comparedData() {
      const flag = this.compareData(this.newData, this.getInvestorById);
      return flag && this.allReady;
    },
  },
  watch: {
    readyName(value) {
      if (value) this.myErrors.name = '';
    },
    readyEmail(value) {
      if (value) this.myErrors.email = '';
    },
    readyPhone(value) {
      const { phone } = this.newData;
      if (value) this.myErrors.phone = '';
      if (validation.phone(phone)) {
        this.newData.phone = format.phone(phone);
      } else {
        this.newData.phone = phone;
      }
    },
    readyAge(value) {
      if (value) this.myErrors.age = '';
    },
  },
  beforeMount() {
    const timer = setInterval(() => {
      if (this.getInvestorById && this.newData) {
        this.getData();
        clearInterval(timer);
      }
    }, 10);
    this.formError = new InputError(this.errorsText);
  },
};
</script>
<style lang="scss">
.customer-introduction {
  padding: 32px 28px;
  &__title {
    font-size: $H600;
    font-weight: 500;
    margin-bottom: 16px;
    &--meta {
      grid-template: title;
    }
  }
  &__mobile {
    @media screen and (min-width: $screen-tablet) {
      display: none;
    }
  }
  &__tablet {
    display: none;
    @media screen and (min-width: $screen-tablet) {
      display: flex;
      flex-wrap: wrap;
    }
  }
  &__label-wrapper {
    @include flex-row(space-between, flex-start);
    margin-bottom: 16px;
  }
  &__label {
    @include flex-col(flex-start, stretch);
    margin-bottom: 16px;
    &:last-child {
      margin: 0;
    }
    &--age {
      flex: 0 0 80px;
      margin: 0 20px 0 0;
    }
    &--city {
      flex: 1 1;
      margin: 0;
    }
  }
  &__label-text {
    @extend %input-label-text;
  }
  &__input {
    @extend %input;
    width: 100%;
  }
  &__section {
    border-bottom: 1px solid $N10;
    margin-bottom: 24px;
    padding-bottom: 24px;
    &--metadata {
      border: none;
      margin-bottom: 32px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-auto-rows: auto;
      grid-template-areas:
      'title title'
      'seen status'
      'date .';
      grid-column-gap: 24px;
      grid-row-gap: 14px;
    }
  }
  &__meta-item {
    &--seen {
      grid-area: seen;
    }
    &--status {
      grid-area: status;
    }
    &--date {
      grid-area: date;
    }
  }
  &__meta-label {
    font-size: $H300;
    font-weight: 500;
    color: $N7;
    margin-bottom: 7px;
  }
  &__meta-text {
    font-size: $H400;
  }
  &__button {
    width: 100%;
    &--save {
      margin-bottom: 20px;
    }
  }
  &__card {
    flex: 0 1 28%;
    min-width: 400px;
    height: 180px;
    border: 1px solid $N10;
    padding: 16px 20px;
    margin: 0 24px 24px 0;
  }
  &__head {
    @include flex-row(space-between, flex-start);
  }
  &__grid {
    width: 100%;
    display: grid;
    grid-gap: 12px;
    justify-content: space-between;
    align-content: space-between;
    &--info {
      grid-template-columns: repeat(3, auto);
      grid-auto-rows: auto;
    }
    &--metadata {
      justify-content: start;
      grid-template-columns: 160px auto;
      grid-auto-rows: auto;
      justify-items: start;
    }
    &--contacts {
      grid-template-columns: repeat(2, auto);
      grid-auto-rows: auto;
    }
  }
  &__dots-button {
    width: 20px;
    height: 20px;
    fill: $B3;
  }
}
</style>
