import { authMiddleware } from "@clerk/nextjs";
import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware({
  locales: ["en", "hr"],
  defaultLocale: "en",
});

export default authMiddleware({
  beforeAuth: (req) => {
    return intlMiddleware(req);
  },

  publicRoutes: [
    "/",
    // "/hr",
    "/:locale/sign-in",
    "/:locale/sign-up",
    "/:locale/label",
    "/label",
  ],
});

// export const config = {
//   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// };

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)",
    "/",
    "/(api|trpc)(.*)",
    "/(hr|en)/:path*",
  ],
};
