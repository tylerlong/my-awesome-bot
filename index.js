const RingCentral = require('ringcentral')
const dotenv = require('dotenv')

dotenv.config()
const token = JSON.parse(process.env.token)
const rc = new RingCentral({
  server: RingCentral.server.sandbox,
  appKey: '',
  appSecret: ''
})
rc.platform().auth().setData(token)

const subscription = rc.createSubscription()
subscription.on(subscription.events.notification, message => {
  if (message.body.creatorId !== token.owner_id) { // not a message from the bot
    if (message.body.text === 'ping') {
      rc.platform().post('/glip/posts', {
        groupId: message.body.groupId,
        text: 'pong',
        attachments: undefined
      })
    }
  }
})
subscription.setEventFilters(['/glip/posts']).register().then(() => {
  console.log('subscription registered')
})
