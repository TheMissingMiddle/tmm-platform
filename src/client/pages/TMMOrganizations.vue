<template>
  <main-layout>
  	<template slot="navigation-bar">
      <v-link href="/tmm-organizations" class="item">Organizations</v-link>
      <v-link href="/tmm-experts" class="item">Experts</v-link>
    </template>
    <div class="ui stackable grid">
      <div class="column ten wide">
        <div class="ui stackable grid">
          <div class="row" v-show="successMessage">
            <div class="column">
              <div class="ui teal message">
                <i class="close icon" @click="closeSuccessMessage"></i>
                <div class="header">{{ successMessage }}</div>
              </div>
              <button class="ui teal button" @click="showInviteOrganizationForm">Invite New Organization</button>
            </div>
          </div>
          <div class="row">
            <div class="column">
              <v-accordion>
                <v-accordion-title :is-active="true">Active Organizations</v-accordion-title>
                <v-accordion-content :is-active="true">
                  <div class="ui middle aligned divided list organizations-list" v-if="activeOrganizations.length">
                    <div class="item" v-for="item in activeOrganizations">
                      <img class="ui avatar image" :src="item.logo">
                      <div class="content">
                        <a class="header">{{ item.name }}</a>
                      </div>
                      <div class="right floated content">
                        <button class="ui teal button" @click="viewOrganization(item._id)">View</button>
                      </div>
                    </div>
                  </div>
                  <div class="ui message" v-if="!activeOrganizations.length">
                    There are no active organizations.
                  </div>
                </v-accordion-content>
                <v-accordion-title>Invited Organizations</v-accordion-title>
                <v-accordion-content>
                  <div class="ui middle aligned divided list" v-if="invitedOrganizations.length">
                    <div class="item" v-for="item in invitedOrganizations">
                      <img class="ui avatar image" :src="item.logo">
                      <div class="content">
                        <a class="header">{{ item.name }}</a>
                        {{ item.email }}
                      </div>
                    </div>
                  </div>
                  <div class="ui message" v-if="!invitedOrganizations.length">
                    There are no invited organizations pending to register.
                  </div>
                </v-accordion-content>
                <v-accordion-title>Archived Organizations</v-accordion-title>
                <v-accordion-content>
                  <div class="ui middle aligned divided list" v-if="archivedOrganizations.length">
                    <div class="item" v-for="item in archivedOrganizations">
                      <img class="ui avatar image" :src="item.logo">
                      <div class="content">
                        <a class="header">{{ item.name }}</a>
                      </div>
                    </div>
                  </div>
                  <div class="ui message" v-if="!archivedOrganizations.length">
                    There are no archived organizations.
                  </div>
                </v-accordion-content>
              </v-accordion>
            </div>
          </div>
          <div class="row">
            <div class="column">
              <button class="ui teal button" @click="showInviteOrganizationForm">Invite New Organization</button>
            </div>
          </div>
        </div>
      </div>
      <div class="column six wide">
        <div ref="tab" class="ui top attached tabular menu">
          <a class="active item" data-tab="form">Registration Form</a>
          <a class="item" data-tab="terms">Terms And Conditions</a>
        </div>
        <div class="ui bottom attached active tab segment" data-tab="form">
          <div class="ui middle aligned divided list">
            <div class="item" v-for="item in formFields">
              <div class="right floated content">
                <button class="ui icon button" @click="deleteField(item._id)">
                  <i class="trash icon"></i>
                </button>
              </div>
              <div class="content">
                <a class="header">{{ item.label }}</a>
                <div class="ui label">{{ getFieldType(item.type) }}</div>
                <div class="ui teal label" v-if="item.isRequired">required</div>
                <div class="ui list">
                  <div class="item" v-for="option in item.options.split(',')" v-if="item.options">
                    {{ option }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <form ref="organization-registration-field" @submit.prevent class="ui form">
            <div class="field">
              <input type="text" name="questionLabel" v-model="questionLabel" placeholder="Question">
            </div>
            <div class="field">
              <div class="ui checkbox question-required">
                <input type="checkbox" name="questionRequired" v-model="questionRequired">
                <label>Is required?</label>
              </div>
            </div>
            <div class="grouped fields">
              <label for="questionType">Question type:</label>
              <div class="field">
                <div class="ui radio checkbox">
                  <input type="radio" name="questionType" value="text" v-model="questionType">
                  <label>Answer</label>
                </div>
              </div>
              <div class="field">
                <div class="ui radio checkbox">
                  <input type="radio" name="questionType" value="yes-no" v-model="questionType">
                  <label>Yes/No</label>
                </div>
              </div>
              <div class="field">
                <div class="ui radio checkbox">
                  <input type="radio" name="questionType" value="select" v-model="questionType">
                  <label>Select One</label>
                </div>
              </div>
              <div class="field">
                <div class="ui radio checkbox">
                  <input type="radio" name="questionType" value="multiple" v-model="questionType">
                  <label>Select Multiple</label>
                </div>
              </div>
            </div>
            <div class="ui error message" v-if="questionError">{{ questionError }}</div>
          </form>
          <form ref="organization-field-option" @submit.prevent class="ui form organization-field-option" v-show="questionType === 'select' || questionType === 'multiple'">
            <div class="field">
              <label>Quesion Options</label>
              <div class="ui middle aligned divided list">
                <div class="item" v-for="(item, index) in questionOptions">
                  <div class="right floated content">
                    <button class="ui icon button" @click="deleteFieldOption(index)">
                      <i class="trash icon"></i>
                    </button>
                  </div>
                  <div class="content">{{ item }}</div>
                </div>
              </div>
            </div>
            <div class="field">
              <input type="text" @keyup.enter.stop.prevent="addNewFieldOption" @keypress.enter.stop.prevent @keydown.enter.stop.prevent name="questionOption" v-model="questionOption" placeholder="Question option">
            </div>
          </form>
          <button @click="addNewField" class="ui teal submit button">Add New Field</button>
        </div>
        <div class="ui bottom attached tab segment" data-tab="terms">
          <form ref="organization-terms-conditions" @submit.prevent="updateTermsConditions" class="ui form organization-terms-conditions">
            <div class="field">
              <textarea name="terms" v-model="terms" placeholder="Terms and Conditions"></textarea>
            </div>
            <button type="submit" class="ui teal submit button">Update Terms And Conditions</button>
          </form>
        </div>
      </div>
    </div>
    <v-modal ref="invite-organization-modal">
      <span slot="header">Invite New Organization</span>
      <form ref="invite-organization-form" @submit.prevent class="ui form">
        <div class="field">
          <input type="text" name="name" v-model="name" placeholder="Organization name">
        </div>
        <div class="field">
          <input type="text" name="email" v-model="email" placeholder="Contact E-mail address">
        </div>
        <div class="ui error message" v-if="error">{{ error }}</div>
      </form>
      <button slot="actions" @click="inviteOrganization" class="ui teal submit button">Send Invite</button>
    </v-modal>
  </main-layout>
</template>

<style>
  .ui.checkbox input.hidden {
    z-index: 3;
  }
  .ui.form.organization-field-option {
    margin: 1em 0;
  }
  .ui.form.organization-field-option .ui.list .ui.button {
    padding: 4px;
  }
  .ui.form .error.message {
    display: block;
  }
  .ui.list .floated.content {
    padding: 0;
  }
  .ui.list.organizations-list .ui.button {
    padding: .5em 1.5em;
  }
</style>

<script>
  import MainLayout from '../layouts/Main.vue';
  import VLink from '../components/VLink.vue';
  import VAccordion from '../components/VAccordion.vue';
  import VAccordionTitle from '../components/VAccordionTitle.vue';
  import VAccordionContent from '../components/VAccordionContent.vue';
  import VModal from '../components/VModal.vue';

  export default {
    data() {
      return {
        name: '',
        email: '',
        error: '',
        questionLabel: '',
        questionRequired: false,
        questionType: 'text',
        questionError: '',
        questionOption: '',
        questionOptions: [],
        terms: '',
        termsId: '',
        successMessage: false,
        activeOrganizations: [],
        invitedOrganizations: [],
        archivedOrganizations: [],
        formFields: []
      }
    },
    components: {
      MainLayout,
      VLink,
      VAccordion,
      VAccordionTitle,
      VAccordionContent,
      VModal
    },
    mounted() {
      $(this.$refs.tab).find('.item').tab();
      $(this.$refs['invite-organization-form']).form({
        fields: {
          name: 'empty',
          email: ['email', 'empty']
        }
      });
      $(this.$refs['organization-registration-field']).form({
        fields: {
          questionLabel: 'empty',
          questionType: 'empty'
        }
      });
      $(this.$refs['organization-registration-field']).find('.ui.checkbox').checkbox();
      $(this.$refs['organization-field-option']).form({
        fields: {
          questionOption: 'empty'
        }
      });
      $(this.$refs['organization-terms-conditions']).form({
        fields: {
          terms: 'empty'
        }
      });
      this.loadActiveOrganizations();
      this.loadInvitedOrganizations();
      this.loadArchivedOrganizations();
      this.loadFormFields();
      this.loadTermsAndConditions();
      app.service('organizations').on('created', this.loadInvitedOrganizations);
      app.service('organization-form').on('created', this.loadFormFields);
      app.service('organization-form').on('removed', this.loadFormFields);
    },
    methods: {
      loadActiveOrganizations() {
        app.service('organizations').find({
          query: {
            status: 'active'
          }
        }).then((response) => {
          this.activeOrganizations = response;
        });
      },
      loadInvitedOrganizations() {
        app.service('organizations').find({
          query: {
            status: 'pending'
          }
        }).then((response) => {
          this.invitedOrganizations = response;
        });
      },
      loadArchivedOrganizations() {
        app.service('organizations').find({
          query: {
            status: 'inactive'
          }
        }).then((response) => {
          this.archivedOrganizations = response;
        });
      },
      loadFormFields() {
        app.service('organization-form').find()
        .then((response) => {
          this.formFields = response;
        });
      },
      loadTermsAndConditions() {
        app.service('organization-terms-conditions').find()
        .then((response) => {
          this.termsId = response[0]._id;
          this.terms = response[0].text;
        });
      },
      showInviteOrganizationForm() {
        this.name = '';
        this.email = '';
        this.error = '';
        $(this.$refs['invite-organization-form']).form('clear');
        this.$refs['invite-organization-modal'].show();
      },
      inviteOrganization() {
        if ($(this.$refs['invite-organization-form']).form('validate form')) {
          app.service('organizations').create({
            name: this.name,
            email: this.email
          }).then(() => {
            this.$refs['invite-organization-modal'].hide();
            this.successMessage = 'Invite to New Organization sent!';
          }).catch((error) => this.error = error.message);
        }
      },
      closeSuccessMessage() {
        this.successMessage = false;
      },
      addNewFieldOption() {
        if ($(this.$refs['organization-field-option']).form('validate form')) {
          this.questionOptions.push(this.questionOption);
          this.questionOption = '';
        }
      },
      deleteFieldOption(index) {
        this.questionOptions.splice(index, 1);
      },
      getFieldType(type) {
        switch(type) {
          case 'text':
            return 'Answer';
          case 'yes-no':
            return 'Yes/No';
          case 'select':
            return 'Select One';
          case 'multiple':
            return 'Select Multiple';

        }
      },
      addNewField() {
        if ($(this.$refs['organization-registration-field']).form('validate form')) {
          if(this.questionType !== 'select' && this.questionType !== 'multiple') {
            this.questionOptions = [];
          }
          app.service('organization-form').create({
            label: this.questionLabel,
            type: this.questionType,
            options: this.questionOptions.join(','),
            isRequired: this.questionRequired
          }).then(() => {
            this.questionLabel = '';
            this.questionRequired = false;
            this.questionType = 'text';
            this.questionError = '';
            this.questionOption = '';
            this.questionOptions = [];
            this.successMessage = 'Field added to Registration Form!';
          }).catch((error) => this.questionError = error.message);
        }
      },
      deleteField(id) {
        app.service('organization-form').remove(id);
      },
      updateTermsConditions() {
        if ($(this.$refs['organization-terms-conditions']).form('validate form')) {
          app.service('organization-terms-conditions').update(this.termsId, {
            text: this.terms
          }).then(() => {
            this.successMessage = 'Terms and Conditions Updated!';
          });
        }
      },
    }
  }
</script>
