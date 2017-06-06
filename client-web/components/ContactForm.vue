<template>
  <div>
    <div v-if="!contact">Loading...</div>
    <fieldset v-else class="form-group">
      <legend v-if="contact.id">Edit Contact</legend>
      <legend v-else>New Contact</legend>
      <form v-on:submit.prevent="onSubmit">
        <div v-bind:class="{ 'has-danger': indexedErrors.lastName }" class="form-group">
          <label htmlFor="inputLastName" class="form-control-label">Last Name</label>
          <input type="text" v-focus name="lastName" id="inputLastName" v-model="contact.lastName" class="form-control form-control-danger" />
          <div class="form-control-feedback">{{ indexedErrors.lastName }}</div>
        </div>
        <div v-bind:class="{ 'has-danger': indexedErrors.firstName }" class="form-group">
          <label htmlFor="inputFirstName" class="form-control-label">First Name</label>
          <input type="text" name="firstName" id="inputFirstName" v-model="contact.firstName" class="form-control form-control-danger" />
          <div class="form-control-feedback">{{ indexedErrors.firstName }}</div>
        </div>
        <div v-bind:class="{ 'has-danger': indexedErrors.email }" class="form-group">
          <label htmlFor="inputEmail" class="form-control-label">Email</label>
          <input type="text"c name="email" id="inputEmail" v-model="contact.email" class="form-control form-control-danger" />
          <div class="form-control-feedback">{{ indexedErrors.email }}</div>
        </div>
        <div v-bind:class="{ 'has-danger': indexedErrors.phone }" class="form-group">
          <label htmlFor="inputPhone" class="form-control-label">Phone</label>
          <input type="tel" name="phone" id="inputPhone" v-model="contact.phone" class="form-control form-control-danger" />
          <div class="form-control-feedback">{{ indexedErrors.phone }}</div>
        </div>
        <button class="btn btn-lg btn-primary btn-block" type="submit">Save</button>
        <button class="btn btn-lg btn-secondary btn-block" type="button" v-on:click="$router.go(-1)">Cancel</button>
      </form>
    </fieldset>
  </div>
</template>

<script lang="ts">
import ContactForm from './ContactForm';
export default ContactForm;
</script>
