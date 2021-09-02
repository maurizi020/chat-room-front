<template>
  <div id="app">
    <v-app app>
      <v-app-bar color="blue" app>
        <v-btn icon class="hidden-xs-only" @click="goHome()">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title class="white--text"
          >{{ input.userName }}
        </v-toolbar-title>
        <v-btn icon class="hidden-xs-only" @click="searchFlag = true">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-app-bar>
      <v-container>
        <v-row class="mb-8 pb-14" align="end">
          <v-col>
            <!-- search Dialog -->
            <v-dialog v-model="searchFlag" max-width="500px">
              <v-card>
                <v-card-title> Search Message</v-card-title>
                <v-col cols="12">
                  <v-text-field
                    v-model="searchMessage"
                    label="Message"
                  ></v-text-field>
                </v-col>
                <v-col class="d-flex justify-end">
                  <v-btn @click="searchMessages()">search</v-btn>
                </v-col>
                <v-container v-if="searchList.length !== 0">
                  <v-list>
                    <v-list-item
                      v-for="message of searchList"
                      :key="message._id"
                      :class="[
                      'd-flex flex-row align-center my-2',
                      message.userName == input.userName ? 'justify-end' : null,
                    ]"
                    >
                      <div
                        v-if="message.userName == input.userName"
                        class="rounded-lg light-blue lighten-5 row-6"
                        style="min-width: 300px; height: 150px"
                      >
                        <div class="col d-flex justify-start">
                          <v-avatar :color="message.color" size="36">
                            <span v-if="message.userName" class="white--text">
                              {{ message.userName.charAt(0) }}
                            </span>
                          </v-avatar>
                          <span class="ml-2 mt-1 d-flex"
                            >{{ message.userName + ": " }}
                          </span>
                        </div>
                        <div class="col">
                          <span :class="['blue--text ', message.typography]"
                            >{{ message.text }}
                          </span>
                        </div>
                        <div class="col d-flex justify-end">
                          <span>
                            {{
                              new Date(message.timestamp).toLocaleTimeString(
                                "en-US"
                              )
                            }}
                          </span>
                        </div>
                      </div>
                      <div
                        v-else
                        class="rounded-lg red lighten-4 row-6"
                        style="min-width: 300px; height: 150px"
                      >
                        <div class="col d-flex justify-start">
                          <v-avatar :color="message.color" size="36">
                            <span v-if="message.userName" class="white--text">
                              {{ message.userName.charAt(0) }}
                            </span>
                          </v-avatar>
                          <span class="ml-2 mt-1 d-flex"
                            >{{ message.userName + ": " }}
                          </span>
                        </div>
                        <div class="col">
                          <span :class="['blue--text ', message.typography]"
                            >{{ message.text }}
                          </span>
                        </div>
                        <div class="col d-flex justify-end">
                          <span>
                            {{
                              new Date(message.timestamp).toLocaleTimeString(
                                "en-US"
                              )
                            }}
                          </span>
                        </div>
                      </div>
                    </v-list-item>
                  </v-list>
                </v-container>
                <v-card-actions>
                  <v-btn color="primary" text @click="searchFlag = false">
                    Close
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <!-- Apollo watched Graphql query -->
            <ApolloQuery :query="require('../graphql/queries.gql')">
              <ApolloSubscribeToMore
                :document="require('../graphql/subscription.gql')"
                :updateQuery="onMessageAdded"
              />

              <div slot-scope="{ result: { data } }">
                <template v-if="data">
                  <div
                    v-for="message of data.getMessages"
                    :key="message._id"
                    :class="[
                      'd-flex flex-row align-center my-2',
                      message.userName == input.userName ? 'justify-end' : null,
                    ]"
                  >
                    <div
                      v-if="message.userName == input.userName"
                      class="rounded-lg light-blue lighten-5 row-6"
                      style="min-width: 300px; height: 150px"
                    >
                      <div class="col d-flex justify-start">
                        <v-avatar :color="message.color" size="36">
                          <span v-if="message.userName" class="white--text">
                            {{ message.userName.charAt(0) }}
                          </span>
                        </v-avatar>
                        <span class="ml-2 mt-1 d-flex"
                          >{{ message.userName + ": " }}
                        </span>
                      </div>
                      <div class="col">
                        <span :class="['blue--text ', message.typography]"
                          >{{ message.text }}
                        </span>
                      </div>
                      <div class="col d-flex justify-end">
                        <span>
                          {{
                            new Date(message.timestamp).toLocaleTimeString(
                              "en-US"
                            )
                          }}
                        </span>
                      </div>
                    </div>
                    <div
                      v-else
                      class="rounded-lg red lighten-4 row-6"
                      style="min-width: 300px; height: 150px"
                    >
                      <div class="col d-flex justify-start">
                        <v-avatar :color="message.color" size="36">
                          <span v-if="message.userName" class="white--text">
                            {{ message.userName.charAt(0) }}
                          </span>
                        </v-avatar>
                        <span class="ml-2 mt-1 d-flex"
                          >{{ message.userName + ": " }}
                        </span>
                      </div>
                      <div class="col">
                        <span :class="['blue--text ', message.typography]"
                          >{{ message.text }}
                        </span>
                      </div>
                      <div class="col d-flex justify-end">
                        <span>
                          {{
                            new Date(message.timestamp).toLocaleTimeString(
                              "en-US"
                            )
                          }}
                        </span>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </ApolloQuery>
          </v-col>
        </v-row>
      </v-container>
      <v-footer fixed>
        <v-container class="ma-0 pa-0">
          <v-row no-gutters>
            <v-col>
              <ApolloMutation
                :mutation="require('../graphql/mutation.gql')"
                :variables="messageInput()"
                @done="input.text = ''"
              >
                <template slot-scope="{ mutate }">
                  <div class="d-flex flex-row align-center">
                    <v-text-field
                      v-model="input.text"
                      placeholder="Type a message"
                      @keypress.enter="mutate"
                    ></v-text-field>
                    <v-btn icon class="ml-4" @click="mutate"
                      ><v-icon>mdi-send</v-icon></v-btn
                    >
                  </div>
                </template>
              </ApolloMutation>
            </v-col>
          </v-row>
        </v-container>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import SEARCHQUERY from '../graphql/search.gql';

export default {
  name: 'ChatInput',

  data() {
    return {
      searchFlag: false,
      newMessage: '',
      searchMessage: '',
      input: {
        userName: '',
        timestamp: 0,
        typography: '',
        color: '',
        text: '',
      },
      searchList: [],
    };
  },
  created() {
    const result = JSON.parse(sessionStorage.getItem('user'));
    this.input.userName = result.userName;
    this.input.typography = result.typography;
    this.input.color = result.color;
  },

  computed: {
    formValid() {
      return this.input.text;
    },
  },

  methods: {
    goHome() {
      sessionStorage.removeItem('user');
      this.$router.push({ name: 'Login' });
    },
    onMessageAdded(previousResult, { subscriptionData }) {
      previousResult.getMessages.push(subscriptionData.data.newMessage);
      return previousResult;
    },
    messageInput() {
      return {
        input: {
          userName: this.input.userName,
          timestamp: Date.now(),
          typography: this.input.typography,
          color: this.input.color,
          text: this.input.text,
        },
      };
    },
    async searchMessages() {
      if (this.searchMessage !== '') {
        const { data } = await this.$apollo.query({
          query: SEARCHQUERY,
          variables: { input: this.searchMessage },
        });
        this.searchList = data.searchMessage;
        // eslint-disable-next-line no-console
        console.log(this.searchList);
      }
    },
  },
};
</script>
