import * as Yup from "yup";

const LoginValidationSchema = Yup.object({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required')
    });

export {LoginValidationSchema};