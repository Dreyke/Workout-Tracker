<template>
  <div class="1-auth-container">
    <div class="1-auth">
      <v-form v-model="validLogin">
        <v-text-field label="Username"
                      v-model="credentials.username"
                      prepend-icon="account_box"
                      :rules="rules"
                      required
                      color="light-blue lighten-1">
        </v-text-field>

        <v-text-field label="Password"
                      v-model="credentials.password"
                      prepend-icon="lock"
                      :rules="rules"
                      :append-icon="loginPasswordVisible ? 'visibility' : 'visibility_off'"
                      :append-icon-cb="() => (loginPasswordVisible = !loginPasswordVisible)"
                      :type="loginPasswordVisible ? 'text' : 'password'"
                      color="light-blue lighten-1"
                      required>
        </v-text-field>

        <v-btn flat color="light-blue lighten-1" @click.native="signupVisible = true">Create Account</v-btn>
        <v-btn color="light-blue lighten-1" @click.native="submitAuthentication()">Login</v-btn>
      </v-form>
    </div>

    <div class="1-signup" v-if="signupVisible">
      <v-form v-model="validSignup">
        <v-text-field label="Username"
                      v-model="newUser.username"
                      prepend-icon="account_box"
                      :rules="rules"
                      required
                      color="light-blue lighten-1">
        </v-text-field>

        <v-text-field label="Password"
                      v-model="newUser.password"
                      prepend-icon="lock"
                      :rules="rules"
                      :append-icon="signupPasswordVisible ? 'visibility' : 'visibility_off'"
                      :append-icon-cb="() => (signupPasswordVisible = !signupPasswordVisible)"
                      :type="signupPasswordVisible ? 'text' : 'password'"
                      color="light-blue lighten-1"
                      required>
        </v-text-field>

        <v-btn block color="light-blue lighten-1" @click.native="submitSignup()">Sign up</v-btn>
      </v-form>
    </div>

    <v-snackbar timeout="6000"
                bottom="bottom"
                color="red lighten-1"
                v-model="snackbar">
      {{ message }}
    </v-snackbar>
  </div>
</template>

<script>
import Authentication from '@/components/pages/Authentication'
export default {
  data () {
    return {
      snackbar: false,
      validLogin: false,
      validSignUp: false,
      signupVisible: false,
      loginPasswordVisible: false,
      signupPasswordVisible: false,
      rules: [ (value) => !!value || 'This field is required' ],
      credentials: {
        username: '',
        password: ''
      },
      newUser: {
        username: '',
        password: ''
      },
      message: ''
    }
  },
  methods: {
    submitAuthentication () {
      Authentication.authenticate(this, this.credentials, '/')
    },
    submitSignUp () {
      Authentication.signup(this, this.newUser, '/')
    }
  }
}
</script>

<style lang="scss">
  @import "./../../../assets/styles";

  #1-auth {
    background-color: $background-color;
    padding: 15px;
    margin: 45px auto;
    min-width: 272px;
    max-width: 320px;
    animation: bounceIn 1s forwards ease;

    label, input, .icon {
      color: #29b6f6!important;
    }

    .input-group__details {
      &:before {
        background-color: $border-color-input !important;
      }
    }
  }

  #1-signup {
    @extend #1-auth;
    animation: slideInFromLeft 1s forwards ease;
    }

</style>
