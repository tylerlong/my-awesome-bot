const RingCentral = require('ringcentral-js-concise')
const dotenv = require('dotenv')

dotenv.config()
const token = JSON.parse(process.env.token)
const rc = new RingCentral('', '', RingCentral.SANDBOX_SERVER)
rc.token(token)

const pubnub = rc.pubnub(['/restapi/v1.0/glip/posts'], message => {
  if (message.body.creatorId !== token.owner_id) { // not a message from the bot
    if (message.body.text === 'ping') {
      rc.post('/restapi/v1.0/glip/posts', {
        groupId: message.body.groupId,
        text: 'pong',
        attachments: undefined
      })
    }
  }
})

pubnub.subscribe()
