import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import ContactService, { IContact } from "../services/Contacts";
import { IError } from "../services/RestUtilities";

@Component
export default class ContactForm extends Vue {
  contact: IContact = null;
  errors: Array<IError> = [];

  get indexedErrors() {
    if (!this.errors) {
      return {};
    }

    return this.errors.reduce(
      (value: { [key: string]: string }, current: IError) => {
        value[current.property] =
          current.constraints[Object.keys(current.constraints)[0]];
        return value;
      },
      {}
    );
  }

  created() {
    let contactService = new ContactService();
    if (this.$route.params.id) {
      contactService.fetch(parseInt(this.$route.params.id)).then(response => {
        this.contact = response.content;
      });
    } else {
      let newContact: IContact = {
        lastName: "",
        firstName: "",
        email: "",
        phone: ""
      };
      this.contact = newContact;
    }
  }

  onSubmit() {
    this.saveContact(this.contact);
  }

  saveContact(contact: IContact) {
    //this.errors = {};
    let contactService = new ContactService();
    contactService.save(contact).then(response => {
      if (!response.is_error) {
        this.$router.go(-1);
      } else {
        this.errors = response.error_content.errors;
      }
    });
  }

  firstError(errors: string[]) {
    return errors ? errors[0] : "";
  }
}
