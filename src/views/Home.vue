<template>
  <div class="mt-16">
    <v-form v-if="!haveAccount" class="form" @submit.prevent="register">
      <span style="font-weight: bold;font-size: 30px;">Get started</span>
      <v-text-field
          class="mt-16"
          id="email"
          v-model="bodyR.email"
          placeholder="Ex: bol@mail.ru"
          outlined
          label="Email"
          :error-messages="errors.email"
      />
      <v-text-field
          class="mt-6"
          id="name"
          v-model="bodyR.name"
          outlined
          placeholder="Ex: Nurlan"
          label="Name"
          :error-messages="errors.name"
      />

      <v-text-field
          class="mt-6"
          outlined
          v-model="bodyR.password"
          placeholder="6+ characters"
          type="password"
          label="Password"
          :error-messages="errors.password"
      />
      <v-btn style="left: 200px" type="submit" :loading="isRegistering" color="green" class="mt-12">Register</v-btn>
      <div style="display: flex;justify-content: center;margin-top: 20px">
        <span style="margin-right: 10px">Already have an account?</span>
        <a @click="haveAccount = !haveAccount" style="" href="#">Sign in</a>
      </div>
    </v-form>
    <div class="mt-16">
      <v-form v-if="haveAccount" @submit.prevent="login" class="form">
        <span class="mb-10" style="font-weight: bold;font-size: 30px;">Sign In</span>
        <v-text-field
            outlined
            class="mt-16"
            label="Email"
            placeholder="Ex: bol@mail.ru"
            v-model="bodyL.email"
            :error-messages="errorsL.email"
        />
        <v-text-field
            outlined
            class="mt-8"
            label="Password"
            placeholder="******"
            v-model="bodyL.password"
            type="password"
            :error-messages="errorsL.password"
        />
        <v-btn class="mt-16" style="left: 200px" type="submit" :loading="isLogingIn" color="green">Login</v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from '@/axios'

export default {
  // async beforeRouteEnter(from, to, next) {
  //   await this.$store.dispatch('fetchUser').catch(() => {
  //   })
  //   if (this.$store.state.user) {
  //     next('/dashboard')
  //   } else {
  //     next();
  //   }
  // }
  // ,
  data() {
    return {
      isRegistering: false,
      isLogingIn: false,
      haveAccount: false,
      bodyR: {
        email: '',
        name: '',
        password: ''
      },
      bodyL: {
        email: '',
        password: ''
      },
      errors: {},
      errorsL: {}
    }
  },
  methods: {
    async register() {
      try {
        this.isRegistering = true;
        const {data} = await axios.post('api/register', this.bodyR);
        this.isRegistering = false;
        this.$store.state.user = data;
        return data;
      } catch (e) {
        this.errors = e.response?.data?.errors;
      } finally {
        this.errors = {}
        this.isRegistering = false;
      }
    },
    async login() {
      try {
        this.isLogingIn = true;
        const {data} = await axios.post('/api/login', this.bodyL);
        this.isLogingIn = false;
        console.log(data);
        this.$store.state.user = data;
        console.log(this.$store.state.user);
        this.$router.push('/dashboard')
        return data;
      } catch (e) {
        this.errorsL = e.response?.data?.errors;
      } finally {
        this.errorsL = {}
        this.isLogingIn = false;
      }
    }
  }
}
</script>

<style>
.form {
  /*border: 2px solid black;*/
  position: absolute;
  right: 0;
  width: 34%;
  height: 100%;
}
</style>