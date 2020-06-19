<template>
  <v-container text-xs-center mt-5 pt-5>
    <v-row>
      <v-col xs="12" sm="6" offset-sm="3">
        <v-card>
          <v-container>
            <v-form ref="form" v-model="valid" @submit.prevent="handleSignIn">
              <v-row>
                <v-col xs="12">
                  <v-text-field
                    v-model="usermail"
                    :rules="emailRules"
                    label="E-mail"
                    required
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col xs="12">
                  <v-text-field
                    v-model="password"
                    :rules="passRules"
                    label="Senha"
                    type="password"
                    required
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col xs="12">
                  <v-btn color="accent" type="submit">
                    Enviar
                  </v-btn>
                  <h3>
                    Não tem uma conta?
                    <nuxt-link to="/signup">
                      Cadastrar-se
                    </nuxt-link>
                  </h3>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator'

@Component
export default class SignIn extends Vue {
  usermail = '';
  password = '';
  valid = false;

  emailRules = [
    (v: string) => !!v || 'E-mail é obrigatório',
    (v: string) => /.+@.+\..+/.test(v) || 'E-mail precisa ser válido'
  ];

  passRules = [
    (v: string) => !!v || 'Senha é obrigatório'
  ]

  get user (): any {
    return this.$store.getters.currentUser
  }

  @Watch('user')
  onUserChanged (value: any) {
    if (value) {
      this.$router.push({ path: '/' })
    }
  }

  async handleSignIn () {
    await this.$store.dispatch('signIn', {
      email: this.usermail,
      senha: this.password
    })
  }
}
</script>
