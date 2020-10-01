import * as yup from "yup";

const RegisterValidationSchema = yup.object({
<<<<<<< HEAD
    email: yup
        .string()
        .min(5, "Email must be at least 5 characters!")
        .max(30, "Email must not be longer than 30 characters!")
        .required("Email is required!"),
=======
    username: yup
        .string()
        .min(5, "Username must be at least 5 characters!")
        .max(30, "Username must not be longer than 30 characters!")
        .required("Username is required!"),
>>>>>>> e6b5fce2d1545897eea074ead5d8f553a7025017
    password: yup
        .string()
        .min(6, "Password must be at least 6 characters!")
        .max(20, "Password must not be longer than 20 characters!")
        .required("Password is required!"),
    confirmPassword: yup
        .string()
        .required("Please confirm your password")
        .when("password", {
            is: password => (!!(password && password.length > 0)),
            then: yup.string().oneOf([yup.ref("password")], "Password doesn't match")
        })
});

export { RegisterValidationSchema };
