import { yupResolver } from "@hookform/resolvers/yup";
import {
    LoginOutlined, VisibilityOffOutlined,
    VisibilityOutlined
} from '@mui/icons-material';
import {
    Button, Card, CardContent, CardHeader,
    Container, IconButton, InputAdornment,
    Stack, TextField, Tooltip, Typography,
    useMediaQuery, useTheme
} from '@mui/material';
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppSnackbar } from "../../hooks/app-snackbar.hook";
import { HttpStatus } from "../../http.contstant";
import { signIn } from "../../pages/services/auth.service";
import AppSnackbarComponent from "../app-snackbar/app-snackbar.component";
import { getSgnInFormSchema } from "./schema";
const SignInFormComponent = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const { state: { open: isSnackbarOpen, message: snackbarMessage, severity: snackbarSeverity }, closeSnackbar, openSnackbar } = useAppSnackbar();
    const navigate = useNavigate()
    const { t: translate } = useTranslation();
    const [cookies, setCookie, removeCookie] = useCookies();
    const {
        register,
        handleSubmit,
        setError,
        formState: {
            isSubmitting,
            errors
        }
    } = useForm({
        resolver: yupResolver(getSgnInFormSchema())
    });

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    }

    const onFormSubmit = async (data: any) => {
        return signIn(data).then(({ accessToken }) => {
            setCookie('mq-at', accessToken, {
                path: '/'
            });
            openSnackbar({
                message: 'Success!',
                severity: 'success',
            });
            navigate('/');
        }).catch(({ code }) => {
            if (code === HttpStatus.Unauthorized) {
                setError('username', {
                    message: 'Wrong username or password'
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
            <Card variant={isMobile ? 'flat' : 'elevation'}>
                <CardHeader
                    title={<Typography variant='h4'>{translate('signInPage.form.title')}</Typography>}
                />
                <CardContent>
                    <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
                        <Stack gap={3} mb={2}>
                            <TextField
                                fullWidth
                                label={translate('signInPage.form.inputs.username.label')}
                                placeholder={translate('signInPage.form.inputs.username.placeholder')}
                                key="signIn-username"
                                error={!!errors.username}
                                required
                                disabled={isSubmitting}
                                {...register("username")}
                                helperText={errors?.username?.message?.toString()}
                            />
                            <TextField
                                type={passwordVisible ? 'text' : 'password'}
                                fullWidth
                                label={translate('signInPage.form.inputs.password.label')}
                                placeholder={translate('signInPage.form.inputs.password.placeholder')}
                                key="signIn-password"
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
                                                    <IconButton onClick={() => togglePasswordVisibility()}>
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
                            <Stack direction="row" gap={2}>
                                <Button type='submit' variant='contained' disableElevation size='large' startIcon={<LoginOutlined />} >
                                    {translate('buttons.signIn')}
                                </Button>
                                <Button component={NavLink} to="/signup" variant='text' color="inherit">
                                    {translate('buttons.createAccount')}
                                </Button>
                            </Stack>
                        </Stack>
                        <Typography variant="caption" color='text.secondary'>
                            {translate('signInPage.form.termsLabel')}
                        </Typography>
                    </form>
                </CardContent>
            </Card>
            <AppSnackbarComponent open={isSnackbarOpen} severity={snackbarSeverity} message={snackbarMessage} onClose={closeSnackbar} />
        </Container>
    )
}

export default SignInFormComponent