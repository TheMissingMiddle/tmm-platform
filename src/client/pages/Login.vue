<template>
	<div class="ui middle aligned center aligned grid">
	  <div class="column">
	    <h2 class="ui teal image header">
	      <img src="assets/logo.png" class="image">
	      <div class="content">
	        Log-in to your account
	      </div>
	    </h2>
	    <form ref="form" class="ui form" @submit.prevent="doLogin">
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
	        <button type="submit" class="ui fluid teal submit button">Login</button>
	      </div>
	      <div class="ui error message" v-if="error">{{ error }}</div>
	    </form>
	  </div>
	</div>
</template>

<style scoped>
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

	export default {
		data() {
			return {
				email: '',
				password: '',
				error: ''
			}
		},
    mounted() {
      $(this.$refs.form).form({
        fields: {
          email : ['email', 'empty'],
          password : 'empty'
        }
      });
    },
		methods: {
			doLogin() {
				if($(this.$refs.form).form('validate form')){
					app.authenticate({
						email: this.email,
						password: this.password,
						strategy: 'local'
					}).then((response) => {
						const user = response.user;
						window.localStorage.setItem('tmm-user', JSON.stringify(user));
						switch(user.role){
							case 'tmm': 
								page('/');
								break;
							case 'org': 
								page('/org-home');
								break;
						}
					}).catch((error) => this.error = 'E-mail/password incorrect.');
				}
			}
		}
	}
</script>
