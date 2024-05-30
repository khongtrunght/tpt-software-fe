import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { resetAllApiActions } from "../store/store";
import { useAppDispatch } from "../store/hooks";
import { APP_ACCESSTOKEN } from "@/config/auth.config";
import { Skeleton } from "@/components/ui/skeleton";

export const Auth = ({ children }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useAppDispatch();

  const router = useRouter();

  useEffect(() => {
    const accessToken = getCookie(APP_ACCESSTOKEN);
    if (accessToken) {
      router.push(`/dashboard`);
      resetAllApiActions.map(dispatch);
      setIsAuthenticated(true);
    } else {
      router.push(`/login`);
    }
  }, [dispatch, router]);
  if (!isAuthenticated)
    return (
      <div className="flex items-center">
        <Skeleton />
      </div>
    );
  return children;
};
export default Auth;
