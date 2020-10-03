import * as Yup from "yup";

const TimesheetRowValidationSchema = Yup.object({
    project: Yup.string().required("Project must be selected!"),
    task: Yup.string().required("Task must be selected!"),
    monday: Yup.number().positive().min(0).max(24),
    tuesday: Yup.number().positive().min(0).max(24),
    wednesday: Yup.number().positive().min(0).max(24),
    thursday: Yup.number().positive().min(0).max(24),
    friday: Yup.number().positive().min(0).max(24),
    saturday: Yup.number().positive().min(0).max(24),
    sunday: Yup.number().positive().min(0).max(24),
});

export { TimesheetRowValidationSchema };
