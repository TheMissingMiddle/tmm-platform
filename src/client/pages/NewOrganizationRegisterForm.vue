<template>
  <div class="ui container middle aligned left aligned grid">
    <div class="column">
      <h2 class="ui teal image header">
        <img src="assets/logo.png" class="image">
        <div class="content">
          Complete your Organization Profile
        </div>
      </h2>
      <form ref="form" @submit.prevent="submitForm" class="ui form">
        <div class="field" v-for="item in formFields">
          <label v-if="item.type !== 'yes-no'">{{ item.label }}<span v-if="item.isRequired">(*)</span></label>
          <input v-if="item.type === 'text'" type="text" :name="item._id" v-model="formData[item._id]" placeholder="item.label">
          <div v-else-if="item.type === 'yes-no'" class="ui checkbox">
            <input type="checkbox" :name="item._id" v-model="formData[item._id]">
            <label>{{ item.label }}<span v-if="item.isRequired">(*)</span></label>
          </div>
          <div v-else-if="item.options" class="grouped fields">
            <div class="field" v-for="option in item.options.split(',')">
              <div v-if="item.type === 'select'" class="ui radio checkbox">
                <input type="radio" :name="item._id" v-model="formData[item._id]" :value="option">
                <label>{{ option }}</label>
              </div>
              <div v-else-if="item.type === 'multiple'" class="ui checkbox">
                <input type="checkbox" :name="item._id" v-model="formData[item._id]" :value="option">
                <label>{{ option }}</label>
              </div>
            </div>
          </div>
        </div>
        <div class="ui error message" v-if="error">{{ error }}</div>
        <button type="submit" class="ui teal submit button">Done</button>
      </form>
    </div>
  </div>
</template>

<style>
  .ui.checkbox input.hidden {
    z-index: 3;
  }
  .ui.grid {
    height: 100%;
  }
  .ui.form .error.message {
    display: block;
  }
</style>

<script>
  import page from 'page';

  export default {
    data() {
      return {
        formData: {},
        error: '',
        formFields: []
      }
    },
    mounted() {
      this.loadFormFields();
    },
    methods: {
      loadFormFields() {
        app.service('organization-form').find()
        .then((response) => {
          this.formFields = response;
          setTimeout(() => {
            this.buildForm();
          });
        });
      },
      buildForm() {
        let form = {};
        this.formFields.forEach((field) => {
          form[field._id] = [];
          if (field.isRequired) {
            if (field.type === 'yes-no') {
              form[field._id].push('checkbox');
            } else {
              form[field._id].push('empty');
            }
          }
          if(field.type === 'multiple') {
            this.formData[field._id] = [];
          } else if(field.type === 'yes-no') {
            this.formData[field._id] = false;
          }
        });
        $(this.$refs.form).form({
          fields: form
        });
        $(this.$refs.form).find('.ui.checkbox').checkbox();
      },
      submitForm() {
        if ($(this.$refs.form).form('validate form')) {
          let profile = [];
          for(let i in this.formData){
            let value = this.formData[i];
            if(value instanceof Array){
              value = value.join(',');
            }
            profile.push({
              field: i,
              value: value
            });
          }
          app.service('organization-profile').create(profile)
          .then(() => page('/org-home')).catch((error) => this.error = error.message);
        }
      }
    }
  }
</script>
