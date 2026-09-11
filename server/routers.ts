import { COOKIE_NAME } from "@shared/const";
import { parse } from "cookie";
import { createHmac, timingSafeEqual } from "node:crypto";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { ENV } from "./_core/env";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";

const ADMIN_COOKIE = "masaa_admin";
const safeEqual = (left: string, right: string) => {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
};
const adminToken = (email: string) => createHmac("sha256", ENV.cookieSecret).update(email.toLowerCase()).digest("hex");

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),
  admin: router({
    login: publicProcedure.input(z.object({ email: z.string().email(), password: z.string().min(1) })).mutation(({ input, ctx }) => {
      const email = process.env.ADMIN_EMAIL ?? "";
      const password = process.env.ADMIN_PASSWORD ?? "";
      if (!email || !password || !safeEqual(input.email.toLowerCase(), email.toLowerCase()) || !safeEqual(input.password, password)) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "بيانات الدخول غير صحيحة" });
      }
      ctx.res.cookie(ADMIN_COOKIE, adminToken(email), { ...getSessionCookieOptions(ctx.req), maxAge: 7 * 24 * 60 * 60 * 1000 });
      return { success: true } as const;
    }),
    session: publicProcedure.query(({ ctx }) => {
      const email = process.env.ADMIN_EMAIL ?? "";
      const token = parse(ctx.req.headers.cookie ?? "")[ADMIN_COOKIE] ?? "";
      const authenticated = Boolean(email && token && safeEqual(token, adminToken(email)));
      return { authenticated, email: authenticated ? email : null };
    }),
    logout: publicProcedure.mutation(({ ctx }) => {
      ctx.res.clearCookie(ADMIN_COOKIE, { ...getSessionCookieOptions(ctx.req), maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // TODO: add feature routers here, e.g.
  // todo: router({
  //   list: protectedProcedure.query(({ ctx }) =>
  //     db.getUserTodos(ctx.user.id)
  //   ),
  // }),
});

export type AppRouter = typeof appRouter;
