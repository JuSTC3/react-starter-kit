import React, { useMemo } from "react";
import { usePage } from '@inertiajs/react';
import { useAppearance } from "@/hooks/use-appearance";

type GoogleLoginButtonProps = {
    onClick?: () => void;
};

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ onClick }) => {
    const { errors } = usePage().props as { errors: Record<string, string> };

    const { appearance } = useAppearance();

    const theme = useMemo(() => (appearance === "dark" ? "dark" : "light"), [appearance]);

    const handleGoogleLogin = () => {
        window.location.href = route('auth.google');
    };

    return (
        <>
            <button
                type="button"
                className={`gsi-material-button ${theme} bg-${theme === "dark" ? "#1a1a1a" : "#fff"} text-${theme === "dark" ? "#fff" : "#000"} border border-gray-300 rounded-lg flex items-center self-center px-3 py-2 cursor-pointer text-sm font-medium shadow-md dark:shadow-white/10 shadow-black/10 transition-all duration-200 ease-in-out w-fit`}
                onClick={onClick || handleGoogleLogin}
            >
                <div className="gsi-material-button-icon" style={{ marginRight: "8px", display: "flex" }}>
                    <svg
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        style={{ display: "block", width: "20px", height: "20px" }}
                    >
                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                    </svg>
                </div>
                <span>Sign in with Google</span>
            </button>

            <p className={'text-center text-sm text-red-600 dark:text-red-400'}>
                {errors.google}
            </p></>
    );
};

export default GoogleLoginButton;
