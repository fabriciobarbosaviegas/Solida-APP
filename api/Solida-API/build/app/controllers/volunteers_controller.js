import Volunteer from "../models/volunteer.js";
export default class VolunteersController {
    async createVolunteer({ request }) {
        try {
            Volunteer.create({
                userId: request.body().userId,
                reportId: request.body().reportId,
            });
            return "vounteer submited";
        }
        catch (Error) {
            return Error;
        }
    }
    async deleteVolunteerById({ params }) {
        try {
            const volunteer = await Volunteer.find(params.id);
            volunteer?.delete();
            return "vounteer deleted";
        }
        catch (Error) {
            return Error;
        }
    }
    async deleteVolunteer({ params }) {
        try {
            const volunteer = await Volunteer.findBy({
                userId: params.userId,
                reportId: params.reportId
            });
            volunteer?.delete();
            return "vounteer deleted";
        }
        catch (Error) {
            return Error;
        }
    }
}
//# sourceMappingURL=volunteers_controller.js.map