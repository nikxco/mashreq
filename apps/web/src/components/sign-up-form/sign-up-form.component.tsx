import { yupResolver } from "@hookform/resolvers/yup";
import { AddCircleOutline, LoginOutlined, VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Button, Card, CardContent, CardHeader, Container, IconButton, InputAdornment, Stack, TextField, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppSnackbar } from "../../hooks/app-snackbar.hook";
import { useBasename } from "../../hooks/basename.hook";
import { createUser } from "../../services/users.service";
import { basenameToCountry } from "../../util";
import AppSnackbarComponent from "../app-snackbar/app-snackbar.component";
import { getSignUpFormSchema } from "./schema";
import { HttpStatus } from "../../http.contstant";
const SignUpFormComponent = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const basename = useBasename();
    const selectedCountry = basenameToCountry(basename)
    const { t: translate } = useTranslation();
    const navigate = useNavigate();
    const { state: { open: isSnackbarOpen, message: snackbarMessage, severity: snackbarSeverity }, closeSnackbar, openSnackbar } = useAppSnackbar();
    const {
        register,
        handleSubmit,
        setError,
        formState: {
            isSubmitting,
            errors
        }
    } = useForm({
        defaultValues: {
            basename,
        },
        resolver: yupResolver(getSignUpFormSchema(selectedCountry))
    });

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    }

    const onFormSubmit = async (data: any) => {
        return createUser(data).then(() => {
            openSnackbar({
                message: 'Success!',
                severity: 'success',
            });
            navigate('/signin');
        }).catch(({ code }) => {
            if (code === HttpStatus.Conflict) {
                setError('username', {
                    message: 'Username already exist'
                })
            } else {
                openSnackbar({
                    message: 'Failed',
                    severity: 'error'
                })
            }
        });
    }
    return (
        <Container maxWidth="xs">
            <Card variant={isMobile ? 'flat' : 'outlined'}>
                <CardHeader
                    title={<Typography variant='h4'>{translate('signUpPage.form.title')}</Typography>}
                />
                <CardContent>
                    <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
                        <Stack gap={3} mb={2}>
                            <TextField
                                fullWidth
                                label={translate('signUpPage.form.inputs.username.label')}
                                placeholder={translate('signUpPage.form.inputs.username.placeholder')}
                                key="signUp-username"
                                error={!!errors.username}
                                required
                                disabled={isSubmitting}
                                {...register("username")}
                                helperText={errors?.username?.message?.toString()}
                            />
                            <TextField
                                type={passwordVisible ? 'text' : 'password'}
                                fullWidth
                                label={translate('signUpPage.form.inputs.password.label')}
                                placeholder={translate('signUpPage.form.inputs.password.placeholder')}
                                key="signUp-password"
                                error={!!errors.password}
                                required
                                disabled={isSubmitting}
                                {...register("password")}
                                helperText={errors?.password?.message?.toString()}
                                InputProps={
                                    {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <Tooltip title={translate(passwordVisible ? 'tooltips.hidePassword' : 'tooltips.showPassword')}>
                                                    <IconButton onClick={() => togglePasswordVisibility()} disabled={isSubmitting}>
                                                        {
                                                            passwordVisible ? <VisibilityOffOutlined /> : <VisibilityOutlined />
                                                        }
                                                    </IconButton>
                                                </Tooltip>
                                            </InputAdornment>
                                        )
                                    }
                                }
                            />
                            <TextField
                                type="password"
                                fullWidth
                                label={translate('signUpPage.form.inputs.confirmPassword.label')}
                                placeholder={translate('signUpPage.form.inputs.confirmPassword.placeholder')}
                                key="signUp-confirmPassword"
                                error={!!errors.confirmPassword}
                                required
                                disabled={isSubmitting}
                                {...register("confirmPassword")}
                                helperText={errors?.confirmPassword?.message?.toString()}
                            />
                            <Stack direction="row" gap={2}>
                                <LoadingButton
                                    type="submit"
                                    size="large"
                                    loading={isSubmitting}
                                    loadingPosition="start"
                                    startIcon={<AddCircleOutline />}
                                    variant="contained"
                                    disableElevation
                                >
                                    {translate('buttons.create')}
                                </LoadingButton>
                                <Button component={NavLink} to="/signin" variant='text' color="inherit">
                                    {translate('buttons.signInInstead')}
                                </Button>
                            </Stack>
                        </Stack>
                        <Typography variant="caption" color='text.secondary'>
                            {translate('signUpPage.form.termsLabel')}
                        </Typography>
                    </form>
                </CardContent>
            </Card>
            <AppSnackbarComponent open={isSnackbarOpen} severity={snackbarSeverity} message={snackbarMessage} onClose={closeSnackbar} />
        </Container>
    )
}

export default SignUpFormComponent