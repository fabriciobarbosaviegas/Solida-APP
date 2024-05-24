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
    async createReport({ request }: HttpContext) {
        try {
          const files = request.files('images', {
            extnames: ['jpg', 'png', 'jpeg', 'webp'],
            size: '2mb',
          });
    
          let imageUrls: string[] = [];
          if (files) {
            for (let file of files) {
              await file.move(app.makePath('uploads'), {
                name: `${new Date().getTime()}-${file.clientName}`,
                overwrite: true,
              });
    
              if (file.fileName) {
                imageUrls.push(file.fileName);
              }
            }
          }
    
          await Report.create({
            userId: request.input('userId'),
            category: request.input('category'),
            cords: request.input('cords'),
            title: request.input('title'),
            description: request.input('description'),
            imageUrl: imageUrls.join(','),
            status: request.input('status'),
          });
    
          return "Report created";
        } catch (Error: any) {
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