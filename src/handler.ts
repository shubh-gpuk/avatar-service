import { Router, Request as IttyRequest } from 'itty-router'
import createAvatar from './avatar'

const router = Router()

router.get('/avatar/:username', async (request: IttyRequest) => {
  let username = ''
  if (request.params) {
    ;({ username } = request.params)
  }
  const avatar = createAvatar(username.toUpperCase())

  return new Response(avatar, {
    headers: { 'Content-Type': 'image/svg+xml' },
    status: 200,
  })
})

router.get('/favicon.ico', async () => new Response(null, { status: 204 }))

router.get('/', async () => {
  return new Response(
    JSON.stringify({ message: 'Welcome to the avatar service!' }),
    { headers: { 'Content-Type': 'application/json' }, status: 200 },
  )
})

export function handleRequest(request: Request): Promise<Response> {
  return router.handle(request)
}
