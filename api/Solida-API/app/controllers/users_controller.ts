import type { HttpContext } from '@adonisjs/core/http'
import User from '../models/user.js';

export default class UsersController {
    async getUserById({params}: HttpContext) {
        try {
            const user = await User.find(params.id);
            await user?.load('createdReports');
            await user?.load('volunteering');
            return user;
        } catch (Error: any) {
            return Error;
        }

    }
    async createUser({request}: HttpContext) {
        try {
            const user = await User.findBy({
                email: request.body().email
            })
            if(user) {
                return "Email already registred"
            }
            User.create({
                fullName:request.body().fullName,
                password:request.body().password,
                email: request.body().email,
                type:request.body().type,
            });
            return "User created";
        } catch(Error: any) {
            return Error;
        }
    }

    async updateUser({request, params}: HttpContext) {
        try {
            const user = await User.findOrFail(params.id);
            user.fullName = request.body().fullName;
            user.password = request.body().password;
            user.email = request.body().email;
            user.type = request.body().type;

            await user.save();
            
            return "User updated";
        } catch(Error: any) {
            return Error;
        }
    }

    async deleteUser({params}: HttpContext) {
        try {
            const user = await User.find(params.id);
            user?.delete();
            return "User deleted";
        } catch(Error: any) {
            return Error;
        }
    }

}