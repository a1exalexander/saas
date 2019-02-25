<template>
  <div class="customers">
    <header class="customers__header">
      <nav class="customers__nav">
        <ul class="customers__nav-list">
          <li class="customers__nav-item">
            <router-link
              to='/customers'
              class="customers__nav-link"
              :class='{"inline-nav-link-active": routeName === "leads"}'>Leads
            </router-link>
          </li>
          <li class="customers__nav-item">
            <router-link
              to='/customers'
              class="customers__nav-link"
              :class='{"inline-nav-link-active": routeName === "contacts"}'>Contacts
            </router-link>
          </li>
          <li class="customers__nav-item">
            <router-link
              to='/customers/investors'
              class="customers__nav-link"
              :class='{"inline-nav-link-active": routeName === "investors"}'>Investors
            </router-link>
          </li>
        </ul>
      </nav>
    </header>
    <main class="customers__main">
      <router-view/>
    </main>
  </div>
</template>
<script>
export default {
  name: 'Customers',
  computed: {
    routeName() {
      return this.$route.name;
    },
  },
};
</script>
<style lang="scss">
.customers {
  background-color: $N13;
  padding: 56px 0;
  height: 100vh;
  @include flex-col(stretch, stretch);
  &__header {
    background-color: $B12;
    padding: 32px 28px 0;
  }
  &__nav-list {
    @extend %inline-nav-list;
  }
  &__nav-item {
    @extend %inline-nav-item;
  }
  &__nav-link {
    @extend %inline-nav-link;
  }
  &__main {
    flex: 1 1;
    overflow: auto;
  }
}
</style>
