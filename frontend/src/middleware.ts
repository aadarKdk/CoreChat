//CoreChat/frontend/src/middleware.ts

import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
   return NextResponse.redirect(new URL('/', req.url));
}

export const config = {
   matcher: [ '/home', '/about', '/features', '/pricing', '/contact', '/privacy', '/terms', '/cookies', '/support'],
};
