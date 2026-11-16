import { NextResponse } from "next/server";

// Password lock for the DoorLine billing app (Basic Auth).
// Set BILLING_USER and BILLING_PASS in your hosting Environment Variables.
export function middleware(req) {
  const user = process.env.BILLING_USER;
  const pass = process.env.BILLING_PASS;
  if (!user || !pass) {
    return new NextResponse("Billing app is locked", { status: 503 });
  }
  const h = req.headers.get("authorization") || "";
  if (h.startsWith("Basic ")) {
    try {
      const [u, ...p] = atob(h.slice(6)).split(":");
      if (u === user && p.join(":") === pass) return NextResponse.next();
    } catch (e) {}
  }
  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="DoorLine Billing"' },
  });
}

export const config = { matcher: ["/billing/index.html"] };
