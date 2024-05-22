import type { HttpContext } from '@adonisjs/core/http'
import User from '../models/user.js'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
  async login({ request }: HttpContext) {
    try {
      const user = await User.findByOrFail({
        email: request.body().email,
      })

      if (!(await hash.verify(user.password, request.body().password))) {
        return 'Wrong password/email'
      }

      const token = await User.accessTokens.create(user)

      return {
        type: 'bearer',
        value: token.value!.release(),
        userId: user.id,
      }
    } catch (Error: any) {
      return Error
    }
  }
}
