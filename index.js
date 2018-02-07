const RingCentral = require('ringcentral-js-concise')

const token = { 'access_token': 'U0pDMTFQMDFQQVMwMHxBQURsSW80YjFNbEZfWXE5LUc4NW9PMDBTQkNKbkNSQzBVeTBJbms2YjM4bmQzVm1tOUROYlNUVmtMeHpkRi1QcE4xNF9QWWRPMEVYNENYQjd4dmJsWHJocllOQ2dpZG5FNWVlWmlSNGNzOWtHa2Z3d3Y1REJOTmwzY0k0R09memlkcXdOOS1MR2NtaWIxUmZzSnVzeUttanZzT0dCZ3MwSVFaM0NjbXBxYTdUVkZWYXZxaGxEU2cyUmljQ1EyNzh5V2d8LWtVdDF3fHpYMjlWdnFlczVYR1k3R3pnS1FVckE', 'token_type': 'bearer', 'expires_in': 2147483647, 'scope': 'SubscriptionWebhook Glip', 'owner_id': '235694004', 'endpoint_id': '81UZfQvUS3eQzLHudXG4yw' }

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
