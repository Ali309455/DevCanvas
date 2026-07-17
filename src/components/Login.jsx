import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login, login as StoreLogin } from "../Store/authSlice";
import authService from "../appwrite/auth";
import { Input, Button, Logo, GoogleButton } from "./index";

const Login = () => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();

    const LoginUser = async (data) => {
        setError("");
        setLoading(true);
        try {
            const session = await authService.login(data);
            if (session) {
                // FIXED: added await to get the actual user object instead of a Promise
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(StoreLogin(userData));
                    navigate("/");
                }
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

const handlegooglelogin = async () => {
        try {
            const session = await authService.googleLogin();
            if (session) {
                // FIXED: added await to get the actual user object instead of a Promise
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(login(userData));
                    navigate("/");
                }
            }
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className="flex items-center justify-center w-full min-h-[70vh] px-4 py-12">
            <div className="w-full max-w-[450px] flex flex-col gap-[32px] py-12 px-8 border-2 border-border bg-surface rounded-[var(--radius-card)] shadow-brutal dark:shadow-brutal-accent">
                <div className="flex justify-center border-b border-border dark:border-neutral-800 pb-6">
                    <Logo />
                </div>

                <div className="flex flex-col gap-2 text-center">
                    <h2 className="text-[28px] font-bold font-heading text-primary-text uppercase tracking-tight">System Login</h2>
                    <p className="text-[14px] text-secondary-text font-mono">
                        <span className="text-primary-accent">/</span> Unregistered?&nbsp;
                        <Link
                            to="/signup"
                            className="font-bold text-primary-text hover:text-primary-accent transition-colors underline decoration-2 decoration-primary-accent"
                        >
                            Initialize Account
                        </Link>
                    </p>
                </div>

                {error && (
                    <p className="text-white bg-black dark:bg-red-950/20 border-l-4 border-danger p-3 text-center text-[14px] font-mono font-bold uppercase tracking-widest rounded-r">
                        Error: {error}
                    </p>
                )}

                <form onSubmit={handleSubmit(LoginUser)} className="mt-2">
                    <div className="space-y-[24px] m-2">
                        <Input
                            label="Email Node"
                            type="email"
                            placeholder="user@domain.com"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Invalid format",
                                }
                            })}
                        />
                        <Input
                            label="Access Key"
                            type="password"
                            placeholder="••••••••"
                            {...register("password", {
                                required: true
                            })}
                        />
                        <Button
                            type="submit"
                            variant="primary"
                            size="large"
                            className="w-full justify-center shadow-brutal-accent hover:shadow-brutal-accent-hover"
                            loading={loading}
                        >
                            Authenticate
                        </Button>
                        <GoogleButton onClick={handlegooglelogin}/>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;