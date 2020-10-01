import * as Yup from "yup";

const LoginValidationSchema = Yup.object({
<<<<<<< HEAD
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required')
});

export { LoginValidationSchema };
=======
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required')
    });

export {LoginValidationSchema};
>>>>>>> e6b5fce2d1545897eea074ead5d8f553a7025017
