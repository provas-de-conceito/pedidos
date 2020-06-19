import { Middleware } from '@nuxt/types'

const AuthMiddleware: Middleware = (context) => {
  if (!context.store.getters.currentUser) {
    return context.redirect({ path: '/signin' })
  }
}

export default AuthMiddleware
