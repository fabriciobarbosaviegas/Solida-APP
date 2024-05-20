// import type { HttpContext } from '@adonisjs/core/http'
import type { HttpContext } from '@adonisjs/core/http'
import Report from "../models/report.js";

export default class ReportsController {
    async getReportById({params}: HttpContext) {
        try {
            const report = await Report.find(params.id);
            await report?.load('creator');
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
}