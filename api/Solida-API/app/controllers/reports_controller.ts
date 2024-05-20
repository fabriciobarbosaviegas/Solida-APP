// import type { HttpContext } from '@adonisjs/core/http'
import type { HttpContext } from '@adonisjs/core/http'
import Report from "../models/report.js";
import { normalize, sep } from 'path';
import app from '@adonisjs/core/services/app';

export default class ReportsController {
    async getReportById({params}: HttpContext) {
        try {
            const report = await Report.find(params.id);
            await report?.load('creator');
            await report?.load('volunteers');
            return report;

        } catch(Error: any) {
            return Error;
        }
    }

    async getAllReports() {
        try {
            return await Report.all();
        } catch(Error: any) {
            return Error;
        }
    }
    async createReport({request}: HttpContext) {
        try {
            Report.create({ 
                userId: request.body().userId,
                category: request.body().category,
                cords: request.body().cords,
                title: request.body().title,
                description: request.body().description,
                imageUrl: request.body().imageUrl,
                status: request.body().status
            });
            return "Report created";
        } catch(Error: any) {
            return Error;
        }
    }

    async updateReport({request, params}: HttpContext) {
        try {
            const report = await Report.findOrFail(params.id);
            report.category = request.body().category,
            report.cords = request.body().cords,
            report.title = request.body().title,
            report.description = request.body().description,
            report.imageUrl = request.body().imageUrl,
            report.status = request.body().status

            await report.save();
            
            return "Reports updated";
        } catch(Error: any) {
            return Error;
        }
    }

    async deleteReport({params}: HttpContext) {
        try {
            const report = await Report.find(params.id);
            report?.delete();
            return "Report deleted";
        } catch(Error: any) {
            return Error;
        }
    }

    async getPhotoByReportId({params, response}: HttpContext) {
        try {
            const report = await Report.find(params.id);
            if(!report) {
                return "User not found";
            }

            const filePath = [report.imageUrl].join(sep)
            const normalizedPath = normalize(filePath)          
            const absolutePath = app.makePath('uploads', normalizedPath);

            return response.download(absolutePath);
        } catch (Error: any) {
            return Error;
        }

    }

    async updateReportPhoto({request, params}: HttpContext) {
        try {

            const avatar = request.file('avatar', {
                size: '2mb',
                extnames: ['jpg', 'png', 'jpeg', 'webp']
            });
              
            await avatar?.move(app.makePath('uploads'));
            
            if(!avatar?.fileName) {
                return "Error";
            }
              
            const report = await Report.findOrFail(params.id);
            report.imageUrl = avatar?.fileName;

            await report.save();
            
            return report.imageUrl;
        } catch(Error: any) {
            return Error;
        }
    }
}