// import type { HttpContext } from '@adonisjs/core/http'

import { HttpContext } from "@adonisjs/core/http";
import Volunteer from "../models/volunteer.js";

export default class VolunteersController {
    async createVolunteer({request}: HttpContext) {
        try {
            Volunteer.create({ 
                userId: request.body().userId,
                reportId: request.body().reportId,
            });
            return "vounteer submited";
        } catch(Error: any) {
            return Error;
        }
    }

    async deleteVolunteerById({params}: HttpContext) {
        try {
            const volunteer = await Volunteer.find(params.id);
            volunteer?.delete();

            return "vounteer deleted";
        } catch(Error: any) {
            return Error;
        }
    }

    async deleteVolunteer({params}: HttpContext) {
        try {
            const volunteer = await Volunteer.findBy({
                userId: params.userId,
                reportId: params.reportId
            });
            volunteer?.delete();

            return "vounteer deleted";
        } catch(Error: any) {
            return Error;
        }
    }
}