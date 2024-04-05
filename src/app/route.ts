import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const reqUrl = new URL(req.url)
  return NextResponse.redirect(`${reqUrl.origin}/category/aktualnosci`)
}