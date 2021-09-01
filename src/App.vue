<template>
  <v-app>
    <v-main>
      <!-- <ApolloExample/> -->
      <chatInput/>
    </v-main>
  </v-app>
</template>

<script>
// import ApolloExample from './components/ApolloExample';
import ChatInput from './components/ChatInput'

export default {
  name: 'App',

  components: {
    // ApolloExample,
    ChatInput
  },

  data: () => ({
    //
  }),
};
</script>