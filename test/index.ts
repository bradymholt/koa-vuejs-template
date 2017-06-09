import { assert } from "chai";
import Vue from 'vue'
import MyComponent from '../client-web/components/RegisterComplete.vue'

describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present!!!', function () {
      let i = 3;
      assert.equal(-1, [1, 2, 3].indexOf(4));
    });
  });
});


// helper function that mounts and returns the rendered text
function getRenderedText(Component:Vue.Component, propsData:any) {
  const Ctor = Vue.extend(Component)
  const vm = new Ctor({ propsData: propsData }).$mount()
  return vm.$el.textContent
}

// Import Vue and the component being tested
// Here are some Jasmine 2.0 tests, though you can
// use any test runner / assertion library combo you prefer
describe('MyComponent', () => {
  // // Inspect the raw component options
  // it('has a created hook', () => {
  //   expect(typeof MyComponent.created).to.be('function')
  // })
  // // Evaluate the results of functions in
  // // the raw component options
  // it('sets the correct default data', () => {
  //   expect(typeof MyComponent.data).to.be('function')
  //   const defaultData = MyComponent.data()
  //   expect(defaultData.message).to.be('hello!')
  // })
  // Inspect the component instance on mount
  it('correctly sets the message when created', () => {
    const Ctor = Vue.extend(MyComponent)
    const vma:any = new Ctor({ propsData: { email: "brady.holt@gmail.com" } }).$mount();
    assert.equal(vma.email, "brady.holt@gmail.com");
    assert.include(vma.$el.textContent, `sent to brady.holt@gmail.com`);

  })
  // // Mount an instance and inspect the render output
  // it('renders the correct message', () => {
  //   const Ctor = Vue.extend(MyComponent)
  //   const vm = new Ctor().$mount()
  //   expect(vm.$el.textContent).to.be('bye!')
  // })
})
