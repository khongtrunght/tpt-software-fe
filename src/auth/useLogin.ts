import { APP_ACCESSTOKEN, APP_REFRESHTOKEN } from "@/config/auth.config";
import { setCookie } from "cookies-next";

export const setCookieWithExpiry = (
  name: string,
  value: string,
  expires_at: Date
) => {
  setCookie(name, value, {
    expires: expires_at,
    // httpOnly: true, // Optionally, make it HTTP-only for security
    secure: process.env.NODE_ENV === "production", // Secure flag for production
    sameSite: "strict", // SameSite attribute for CSRF protection
  });
};
export const handleLogin = ({
  access_token,
  refresh_token,
  access_token_expires_at,
  refresh_token_expires_at,
}: {
  access_token: string;
  refresh_token: string;
  access_token_expires_at: Date;
  refresh_token_expires_at: Date;
}) => {
  if (access_token && refresh_token) {
    setCookieWithExpiry(APP_ACCESSTOKEN, access_token, access_token_expires_at);
    setCookieWithExpiry(
      APP_REFRESHTOKEN,
      refresh_token,
      refresh_token_expires_at
    );
  }
};
