import type { HttpContext } from '@adonisjs/core/http'
import User from '../models/user.js';
import app from '@adonisjs/core/services/app'
import { normalize, sep } from 'node:path';
import fs from 'fs/promises';

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

            // Handle file upload
            const avatar = request.file('avatar', {
                size: '2mb',
                extnames: ['jpg', 'png', 'jpeg', 'webp']
            });

            await avatar?.move(app.makePath('uploads'));

            if (!avatar?.fileName) {
                return "Error uploading image";
            }

            await User.create({
                fullName: request.body().fullName,
                password: request.body().password,
                email: request.body().email,
                type: request.body().type,
                photo: avatar?.fileName // Store the filename in the database
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

    async getPhotoByUserId({params, response}: HttpContext) {
        try {
            const user = await User.find(params.id);
            if(!user) {
                return "User not found";
            }

            const filePath = [user.photo].join(sep)
            const normalizedPath = normalize(filePath)          
            const absolutePath = app.makePath('uploads', normalizedPath);

            return response.download(absolutePath);
        } catch (Error: any) {
            return Error;
        }
    }

    async updateUserPhoto({request, params}: HttpContext) {
        try {

            const avatar = request.file('avatar', {
                size: '2mb',
                extnames: ['jpg', 'png', 'jpeg', 'webp']
            });
              
            await avatar?.move(app.makePath('uploads'));
            
            if(!avatar?.fileName) {
                return "Error";
            }
              
            const user = await User.findOrFail(params.id);
            user.photo = avatar?.fileName;

            await user.save();
            
            return user.photo;
        } catch(Error: any) {
            return Error;
        }
    }

    async deleteUser({params}: HttpContext) {
        try {
            const user = await User.find(params.id);
            if (!user) {
              return 'User not found';
            }
      
            const filePath = app.makePath('uploads', normalize(user.photo));
            await fs.unlink(filePath).catch((error) => {
              console.error(`Error deleting user photo: ${error.message}`);
            });
      
            await user.delete();
            return 'User deleted';
          } catch (error: any) {
            return error;
          }
        }
    }