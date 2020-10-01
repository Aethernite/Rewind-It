import * as Yup from "yup";

const LoginValidationSchema = Yup.object({
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required')
});

export { LoginValidationSchema };