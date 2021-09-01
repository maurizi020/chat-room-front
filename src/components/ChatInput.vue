<template>
    <div id="app">
        <v-app app>
        <v-app-bar color="blue" app>
            <!-- <v-app-bar-nav-icon>
            <v-icon color="white">mdi-arrow-left</v-icon>
            </v-app-bar-nav-icon> -->
            <v-toolbar-title class="white--text">{{ input.userName }} </v-toolbar-title>
        </v-app-bar>
        <v-container>
            <v-row class="mb-8 pb-14" align="end">
            <v-col>
                <!-- Apollo watched Graphql query -->
                <ApolloQuery :query="require('../graphql/queries.gql')">
                <ApolloSubscribeToMore
                    :document="require('../graphql/subscription.gql')"
                    :updateQuery="onMessageAdded"
                />

                <div slot-scope="{ result: { data } }">
                    <template v-if="data">
                    <!-- <div
                        v-for="message of data.getMessages"
                        :key="message._id"
                        class="message"
                    >
                        {{ message.text }}
                    </div> -->
                    <div
                        v-for="message of data.getMessages"
                        :key="message._id"
                        :class="[
                        'd-flex flex-row align-center my-2',
                        message.userName == input.userName ? 'justify-end' : null,
                        ]"
                    >
                        <div v-if="message.userName == input.userName"
                        class="rounded-lg light-blue lighten-5 row-6"
                        style="min-width: 300px; height: 150px;">
                            <div class="col d-flex justify-start">
                                <v-avatar
                                color="indigo" size="36">
                                    <span v-if="message.userName" class="white--text">
                                        {{ message.userName.charAt(0) }}
                                    </span>
                                </v-avatar>
                                <span
                                class="ml-2 mt-1 d-flex"
                                >{{ message.userName + ": " }}
                                </span>
                            </div>
                            <div class="col">
                                <span
                                class="blue--text"
                                >{{ message.text }}
                                </span>
                            </div>
                            <div class="col d-flex justify-end">
                                <span>
                                {{ new Date(message.timestamp)
                                    .toLocaleTimeString('en-US') }}
                                </span>
                            </div>

                        </div>
                        <div v-else class="rounded-lg red lighten-4 row-6">
                            <div class="col d-flex justify-start"
                            style="min-width: 20em;">
                                <v-avatar color="red" size="36">
                                    <span v-if="message.userName" class="white--text">
                                        {{ message.userName.charAt(0) }}
                                    </span>
                                </v-avatar>
                                <span
                                class="ml-2 mt-1 d-flex"
                                >{{ message.userName + ": "}}
                                </span>
                            </div>
                            <div class="col">
                                <span
                                class="blue--text "
                                >{{ message.text }}
                                </span>
                            </div>
                            <div class="col d-flex justify-end">
                                <span>
                                {{ new Date(message.timestamp)
                                    .toLocaleTimeString('en-US') }}
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
                    <!-- <form v-on:submit.prevent="formValid && mutate()">
                                <input
                                    id="field-message"
                                    v-model="input.text"
                                    placeholder="Type a message"
                                    class="input"
                                >
                            </form> -->
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
// import QUERIES from '../graphql/queries.gql';

export default {
  name: 'ChatInput',

  data() {
    return {
      newMessage: '',
      input: {
        userName: '',
        timestamp: 0,
        typography: '',
        color: '',
        text: '',
      },
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
    onMessageAdded(previousResult, { subscriptionData }) {
      // console.log(previousResult, subscriptionData);
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
  },
};
</script>
