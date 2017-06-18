<template>
	<div class="ui middle aligned center aligned grid">
	  <div class="column">
	    <h2 class="ui teal image header">
	      <img src="assets/logo.png" class="image">
	      <div class="content">
	        Create your Organization Account
	      </div>
	    </h2>
	    <form ref="form" class="ui form" @submit.prevent="doRegisterOrganization">
	      <div class="ui segment">
	        <div class="field">
	          <div class="ui left icon input">
	            <i class="user icon"></i>
	            <input type="text" name="email" v-model="email" placeholder="E-mail address">
	          </div>
	        </div>
	        <div class="field">
	          <div class="ui left icon input">
	            <i class="lock icon"></i>
	            <input type="password" name="password" v-model="password" placeholder="Password">
	          </div>
	        </div>
	        <div class="field">
	          <div class="ui left icon input">
	            <i class="lock icon"></i>
	            <input type="password" name="confirm-password" placeholder="Confirm password">
	          </div>
	        </div>
	        <div class="field">
				    <div class="ui checkbox disabled" @click.stop.prevent="showTermsAndConditions">
				      <input type="checkbox" name="terms" v-model="terms">
				      <label>Accept Terms and Conditions</label>
				    </div>
				  </div>
	        <button type="submit" class="ui fluid teal submit button">Sign up</button>
	      </div>
	      <div class="ui error message" v-if="error">{{ error }}</div>
	    </form>
	    <v-modal ref="modal">
	      <span slot="header">Terms And Conditions</span>
	      <div ref="terms-text" class="terms-and-conditions-text" @scroll="verifyTermsScroll($event)">{{ termsText }}</div>
	      <button slot="actions" @click="acceptTerms" class="ui teal submit button" :class="{disabled : !hasReadTerms}">Accept</button>
	    </v-modal>
	  </div>
	</div>
</template>

<style scoped>
	.terms-and-conditions-text {
		max-height: 600px;
		overflow-y: auto;
	}
	.ui.grid {
		height: 100%;
	}
	.ui.grid .column {
		max-width: 500px;
	}
	.ui.form .error.message {
		display: block;
	}
</style>

<script>
	import page from 'page';
  import VModal from '../components/VModal.vue';

	export default {
		data() {
			return {
				email: '',
				password: '',
				terms: false,
				error: '',
				termsText: '',
				hasReadTerms: false
			}
		},
    components: {
      VModal
    },
    mounted() {
      $(this.$refs.form).form({
        fields: {
          email : ['email', 'empty'],
          password : ['minLength[6]', 'empty'],
          'confirm-password' : ['match[password]', 'empty'],
          terms: 'checked'
        }
      });
      $(this.$refs.form).find('.ui.checkbox').checkbox();
      this.loadTermsAndConditions();
    },
		methods: {
      loadTermsAndConditions() {
        app.service('organization-terms-conditions').find()
        .then((response) => this.termsText = response[0].text);
      },
      verifyTermsScroll(event) {
      	let target = event.target;
      	if((target.scrollHeight - target.scrollTop) < 650) {
      		this.hasReadTerms = true;
      	}
      },
			doRegisterOrganization() {
				if ($(this.$refs.form).form('validate form')) {
					app.service('users').create({
						email: this.email,
						password: this.password,
						role: 'org'
					}).then((response) => {
						window.localStorage.setItem('tmm-user', JSON.stringify(response));
						this.doLogin();
					}).catch((error) => this.error = error.message);
				}
			},
			doLogin() {
				app.authenticate({
					email: this.email,
					password: this.password,
					strategy: 'local'
				}).then((response) => {
					page('/org-complete-registration');
				});
			},
			showTermsAndConditions(){
				this.$refs.modal.show();
			},
			acceptTerms() {
				this.terms = true;
				this.$refs.modal.hide();
			}
		}
	}
</script>
