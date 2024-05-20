import type { HttpContext } from '@adonisjs/core/http'
import User from '../models/user.js';

export default class UsersController {
    async getUserById({params}: HttpContext) {
        try {
            return User.find(params.id);
        } catch(Error) {
            return "Error";
        }
    }
    async createUser({request}: HttpContext) {
        try {
            User.create({
                fullName:request.body().fullName,
                password:request.body().password,
                email: request.body().email,
                type:request.body().type,
            });
            return "User created";
        } catch(Error) {
            return 'Error';
        }
    }

    async updateUser({request, params}: HttpContext) {
        try {
            const user = await User.findOrFail(params.id);
            console.log(user.fullName);
            user.fullName = request.body().fullName;
            user.password = request.body().password;
            user.email = request.body().email;
            user.type = request.body().type;

            await user.save();
            
            return "User updated";
        } catch(Error) {
            return 'Error';
        }
    }

    async deleteUser({params}: HttpContext) {
        try {
            const user = await User.find(params.id);
            user?.delete();
            return "User delete";
        } catch(Error) {
            return "Error";
        }
    }

}