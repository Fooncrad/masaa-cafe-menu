import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

describe("admin authentication secrets", () => {
  it("accepts the configured admin credentials through the API", async () => {
    expect(process.env.ADMIN_EMAIL).toBeTruthy();
    expect(process.env.ADMIN_PASSWORD).toBeTruthy();
    const cookies: Array<{ name: string; value: string }> = [];
    const ctx = {
      user: null,
      req: { protocol: "https", headers: {} },
      res: { cookie: (name: string, value: string) => cookies.push({ name, value }) },
    } as unknown as TrpcContext;
    const result = await appRouter.createCaller(ctx).admin.login({
      email: process.env.ADMIN_EMAIL!,
      password: process.env.ADMIN_PASSWORD!,
    });
    expect(result).toEqual({ success: true });
    expect(cookies[0]?.name).toBe("masaa_admin");
    expect(cookies[0]?.value).toBeTruthy();
  });
});
