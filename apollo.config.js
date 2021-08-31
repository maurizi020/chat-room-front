// apollo.config.js
module.exports = {
  client: {
    service: {
      name: 'chat-room',
      // URL to the GraphQL API
      url: 'http://localhost:3000/chats',
    },
    // Files processed by the extension
    includes: [
      'src/**/*.vue',
      'src/**/*.js',
    ],
  },
}
