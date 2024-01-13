import { yupResolver } from "@hookform/resolvers/yup";
import { LoginOutlined, VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import { Button, Card, CardContent, CardHeader, Container, IconButton, InputAdornment, Link, Stack, TextField, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { useBasename } from "../../hooks/basename.hook";
import { getSgninFormSchema } from "./schema";
const SignInFormComponent = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const basename = useBasename();
    const { t: translate } = useTranslation();
    const {
        register,
        handleSubmit,
        formState: {
            isSubmitting,
            errors
        }
    } = useForm({
        resolver: yupResolver(getSgninFormSchema(basename))
    });

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    }

    const onFormSubmit = async (data: any) => {

    }
    return (
        <Container maxWidth="xs" sx={{ py: 4 }}>
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
                                key="signin-username"
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
                                key="signin-password"
                                error={!!errors.username}
                                required
                                disabled={isSubmitting}
                                {...register("password")}
                                helperText={errors?.password?.message?.toString()}
                                InputProps={
                                    {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <Tooltip title={passwordVisible ? 'Hide password' : 'Show password'}>
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
                                    {translate('signInPage.form.buttons.signIn')}
                                </Button>
                                <Button component={NavLink} to="/recover" variant='text'>
                                    {translate('signInPage.form.buttons.forgotPassword')}
                                </Button>
                            </Stack>
                        </Stack>
                        {/* <Typography variant="caption">
                            By signin, you agree to our{" "}
                            <Link
                                component={NavLink}
                                underline="hover"
                                to="/terms"
                            >
                                Terms of Use
                            </Link>
                            , and &nbsp;
                            <Link
                                component={NavLink}
                                underline="hover"
                                to="/privacy"
                            >
                                Privacy Policy
                            </Link>
                            . If you need help with your account, please contact us at{" "}
                            <Link
                                underline="hover"
                                href={`mailto:${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}`}
                                className="nx-anchor"
                                target="_blank"
                            >
                                {process.env.NEXT_PUBLIC_SUPPORT_EMAIL}
                            </Link>
                            .
                        </Typography> */}
                        <Typography variant="caption" color='text.secondary'>
                            {translate('signInPage.form.termsLabel')}
                        </Typography>
                    </form>
                </CardContent>
            </Card>
        </Container>
    )
}

export default SignInFormComponent