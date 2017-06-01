<template>
  <div>
    <form v-if="!registerComplete" class="formAuth" v-on:submit.prevent="onSubmit">
      <h2 class="formAuthHeading">Please register for access</h2>
      <div v-if="errors.general" class="alert alert-danger" role="alert">
        {{indexedErrors.general}}
      </div>
      <div v-bind:class="{ 'has-danger': errors.email }" class="form-group">
        <label htmlFor="inputEmail">Email address</label>
        <input type="email" id="inputEmail" v-model="email" class="form-control" placeholder="Email address" />
        <div class="form-control-feedback">{{ indexedErrors.email }}</div>
      </div>
      <div v-bind:class="{ 'has-danger': errors.password }" class="form-group">
        <label htmlFor="inputPassword">Password</label>
        <input type="password" id="inputPassword" v-model="password" class="form-control" placeholder="Password" />
        <div class="form-control-feedback">{{ indexedErrors.password }}</div>
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign up</button>
    </form>
    <register-complete v-else v-bind:email="email" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import RegisterComplete from '../components/RegisterComplete.vue';
import AuthService from '../services/Auth';
import { IError } from '../services/RestUtilities';

@Component({ components: { RegisterComplete } })
export default class Register extends Vue {
  email: string = "";
  password: string = "";
  registerComplete = false;
  errors: Array<IError> = [];

  get indexedErrors() {
    if (!this.errors) {
      return {};
    }

    return this.errors.reduce((value: { [key: string]: string }, current: IError) => {
      value[current.property] = current.constraints[Object.keys(current.constraints)[0]];
      return value;
    }, {});
  }

  onSubmit() {
    let authService = new AuthService();
    authService.register(this.email, this.password).then(response => {
      if (!response.is_error) {
        this.registerComplete = true;
      } else {
        this.errors = response.error_content.errors;
      }
    });
  }
}
</script>

<style scoped lang="stylus">
</style>
