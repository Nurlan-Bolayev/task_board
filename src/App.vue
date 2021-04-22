<template>
  <v-app>
    <v-app-bar
        app
        color="green"
    >
      <div>
        <v-list-item :to="1 ? '/dashboard' : '/'">
          <v-list-item-title style="color: #fff">
            Home
          </v-list-item-title>
        </v-list-item>
      </div>
      <div class="bar">
        <v-menu v-if="$store.state.user" offset-y>
          <template #activator="{on}">
            <v-btn dark text v-on="on">
              {{ $store.state.user.name }}
            </v-btn>
          </template>

          <v-list>
            <v-list-item @click="logout">
              <v-list-item-title>
                Log out
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

    </v-app-bar>

    <v-main :class="$route.path === '/' ? 'main' : ($route.path.includes('dashboard') ? 'dashboard' : '') ">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import axios from '@/./axios'
export default {
  name: 'App',
  components: {},

  data: () => ({}),
  methods: {
    async logout() {
      try {
        const {data} = await axios.post('api/logout');
        console.log(data);
        this.$store.commit('logoutUser', null);
        console.log(this.$store.state.user);
        this.$router.push('/')
      } catch (e) {
        console.log(e);
      } finally {
        //
      }
    }
  },
  mounted() {
    this.$store.dispatch('fetchUser');
    console.log(this.$store.state.user);
  }
};
</script>

<style>
.main {
  background-image: url("assets/register/dribbble.webp");
  background-size: contain;
  position: relative;
}

.dashboard {
  position: relative;
}

.bar {
  margin-left: 80%;
}

</style>
