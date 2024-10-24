import {
    Box,
    Button,
    Container,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import { FormikHelpers, useFormik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticate } from '../../services/auth/auth-service';
import { handleApi } from '../../utils/api-handler.util';
import { getLoginFields } from './helpers/fields';
import { LoginFormProps, loginInitialValues, loginValidationSchema } from './helpers/validation';
import Logo from "../../assets/ntd-logo-hr.png"


export const Login: React.FC = () => {
    const navigate = useNavigate();

    const onSubmit = async (values: LoginFormProps, helpers: FormikHelpers<LoginFormProps>) => {
        const successMessage = "Success!"

        const result = await handleApi(
            () => authenticate({ email: values.email, password: values.password }),
            successMessage,
            helpers.setSubmitting
        )

        if (!!result?.token) {
            localStorage.setItem("token", result.token)
            navigate("/home")
        }
    }

    const formik = useFormik<LoginFormProps>({
        initialValues: loginInitialValues,
        validationSchema: loginValidationSchema,
        onSubmit: onSubmit
    });

    const fields = getLoginFields(formik)

    return (
        <Container component="main" maxWidth="xs" sx={{ display: 'grid', gap: '40px', justifyItems: 'center', alignContent: "center", height: "100vh" }}>

            <img src={Logo} alt="NTD Software logo" width={300} />

            <Paper elevation={3} sx={{ padding: 4 }}>
                <Typography variant="h5" align="center">
                    Login
                </Typography>
                <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 2 }}>
                    <TextField {...fields.email} />
                    <TextField {...fields.password} sx={{ mt: 2 }} />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                        disabled={formik.isSubmitting}
                    >
                        {formik.isSubmitting ? 'Logging in...' : 'Login'}
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};