<template>
  <div id="app">
    <v-app app>
      <v-app-bar color="blue" app>
        <v-toolbar-title class="white--text">
          <div class="text-body-1">
            <h2>Chat - Room App</h2>
          </div>
        </v-toolbar-title>
      </v-app-bar>
      <v-alert
      v-show="alertFlag"
      dense
      border="left"
      type="warning"
      close-text="Close Alert"
      dismissible>
        You must not leave empty fields
      </v-alert>
      <v-container>
        <v-card max-width="400" class="mx-auto">
          <v-app-bar dark color="teal lighten-2">
            <v-toolbar-title class="white--text">
              <div class="text-body-1">
                <h3>Your Info:</h3>
              </div>
            </v-toolbar-title>
          </v-app-bar>

          <v-container>
            <v-row dense>
              <v-col cols="12">
                <v-form>
                  <v-container>
                    <v-row>
                      <v-col>
                        <v-text-field
                          v-model="userName"
                          label="UserName"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-select
                          v-model="color"
                          :items="colors"
                          label="Avatar Color"
                        ></v-select>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-select
                          v-model="typography"
                          :items="typographies"
                          label="Typography"
                        >
                        </v-select>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col align="center" justify="space-around">
                        <v-btn color="primary"
                        :disabled="clickFlag"
                        @click="saveData()">
                          Login
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-container>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      alertFlag: false,
      clickFlag: false,
      userName: '',
      color: '',
      typography: '',
      colors: ['red', 'pink', 'purple', 'blue', 'deep-purple'],
      typographies: [
        'subtitle-1',
        'subtitle-2',
        'body-1',
        'body-2',
        'button',
        'caption',
        'overline',
      ],
    };
  },
  methods: {
    isEmpty() {
      return (
        this.userName === '' && this.color === '' && this.typography === ''
      );
    },
    saveData() {
      this.clickFlag = true;
      if (!this.isEmpty()) {
        const textTypography = `text-${this.typography}`;
        sessionStorage.setItem('user', JSON.stringify({
          typography: textTypography,
          color: this.color,
          userName: this.userName,
        }));
        this.$router.push('chat');
      } else {
        this.alertFlag = true;
        this.clickFlag = false;
      }
    },
  },
};
</script>
