import { setCookieWithExpiry } from "@/auth/useLogin";
import { APP_ACCESSTOKEN, APP_REFRESHTOKEN } from "@/config/auth.config";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { getCookie } from "cookies-next";

const renewAccessToken = async (refreshToken: string) => {
  if (!refreshToken) {
    window.location.href = "/login";
    return;
  }
  try {
    const response = await fetch(
      `${process.env.HOST}/api/tokens/renew_access`,
      {
        method: "POST",
        body: JSON.stringify({
          refresh_token: refreshToken,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response) {
      const data: {
        code: number;
        data: { access_token: string; access_token_expires_at: string };
        message: string;
      } = await response.json();
      if (data && data.data) {
        const _data = data.data;
        return {
          access_token: _data.access_token,
          access_token_expires_at: new Date(_data.access_token_expires_at),
        };
      }
    }
    return null;
  } catch (error) {
    console.error(
      "Xảy ra lỗi khi làm mới phiên đăng nhập. Vui lòng đăng nhập lại"
    );
    window.location.href = "/login";
  }
};

interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export const transformResponse = <T>(response: ApiResponse<T>): T => {
  if ("code" in response && "message" in response && "data" in response) {
    return response.data;
  }

  console.warn("Unexpected response format:", response);
  throw new Error("Unexpected API response format"); // Or return an ApiError
};

export const getBaseQuery = (baseUrl = `${process.env.HOST}`) => {
  return fetchBaseQuery({
    baseUrl,
    // prepareHeaders: async (headers) => {
    //   let accessToken = "";
    //   try {
    //     if (typeof window !== "undefined") {
    //       accessToken = getCookie(APP_ACCESSTOKEN) || "";
    //     }
    //   } catch (error) {
    //     console.error("Error getting access token from cookie:", error);
    //   }

    //   if (accessToken) {
    //     headers.set("authorization", `Bearer ${accessToken}`);
    //   } else {
    //     const refreshToken = getCookie(APP_REFRESHTOKEN) || "";
    //     const renew_token = await renewAccessToken(refreshToken);
    //     if (
    //       renew_token &&
    //       renew_token.access_token &&
    //       renew_token.access_token_expires_at
    //     ) {
    //       setCookieWithExpiry(
    //         APP_ACCESSTOKEN,
    //         renew_token.access_token,
    //         renew_token.access_token_expires_at
    //       );
    //       headers.set("authorization", `Bearer ${renew_token.access_token}`);
    //     } else {
    //       console.error(
    //         "Không thể xác định phiên đăng nhập. Vui lòng đăng nhập lại"
    //       );
    //       window.location.href = "/login";
    //     }
    //   }
    //   return headers;
    // },
  });
};
