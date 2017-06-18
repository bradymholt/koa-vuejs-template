import { assert } from "chai";
import Vue from 'vue'
import RegisterComplete from '../../../client-web/components/RegisterComplete.vue'

describe('RegisterComplete', () => {
  // Inspect the component instance on mount
  it('correctly sets the message when created', () => {
    let testEmail = "jdoe@gmail.com";
    const ctor = Vue.extend(RegisterComplete)
    const vm: any = new ctor({ propsData: { email: testEmail } }).$mount();

    assert.equal(vm.email, testEmail);
    assert.include(vm.$el.textContent, `sent to ${testEmail}`);
  })
});
