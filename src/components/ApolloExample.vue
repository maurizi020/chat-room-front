<template>
  <div class="apollo-example">
    <!-- Cute tiny form -->
    <div class="form">
      <label for="field-name" class="label">Name</label>
      <input
        v-model="name"
        placeholder="Type a name"
        class="input"
        id="field-name"
      >
    </div>

    <!-- Apollo watched Graphql query -->
    <ApolloQuery
      :query="require('../graphql/queries.gql')"
    >
      <ApolloSubscribeToMore
        :document="require('../graphql/subscription.gql')"
        :updateQuery="onMessageAdded"
      />

      <div slot-scope="{ result: { data } }">
        <template v-if="data">
          <div
            v-for="message of data.getMessages"
            :key="message._id"
            class="message"
          >
            {{ message.text }}
          </div>
        </template>
      </div>
    </ApolloQuery>

    <!-- Tchat example -->


    <ApolloMutation
      :mutation="require('../graphql/mutation.gql')"
      :variables="{
        input,
      }"
      class="form"
      @done="input.text = ''"
    >
      <template slot-scope="{ mutate }">
        <form v-on:submit.prevent="formValid && mutate()">
          <label for="field-message">Message</label>
          <input
            id="field-message"
            v-model="input.text"
            placeholder="Type a message"
            class="input"
          >
        </form>
      </template>
    </ApolloMutation>
  </div>
</template>

<script>
import QUERIES from '../graphql/queries.gql';

export default {
  data () {
    return {
      name: 'Anne',
      newMessage: '',
      input: {
        userName: "Sergio",
        timestamp: Date.now(),
        typography: "negritas",
        color: "negro",
        text: '',
      }
    }
  },
  async created() {
    const result = await this.$apollo.query({ query: QUERIES});
    console.log(result);
    
  },

  computed: {
    formValid () {
      return this.input.text
    },
  },

  methods: {
    onMessageAdded (previousResult, { subscriptionData }) {
      console.log(previousResult, subscriptionData);
      previousResult.getMessages.push(subscriptionData.data.newMessage);
      return previousResult;
    },
  },
}
</script>

<style scoped>
.form,
.input,
.apollo,
.message {
  padding: 12px;
}

label {
  display: block;
  margin-bottom: 6px;
}

.input {
  font-family: inherit;
  font-size: inherit;
  border: solid 2px #ccc;
  border-radius: 3px;
}

.error {
  color: red;
}

.images {
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  grid-auto-rows: 300px;
  grid-gap: 10px;
}

.image-item {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ccc;
  border-radius: 8px;
}

.image {
  max-width: 100%;
  max-height: 100%;
}

.image-input {
  margin: 20px;
}
</style>