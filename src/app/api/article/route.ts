import { getArticle } from "@/utils/sp1ozarow";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const reqUrl = new URL(req.url)
  const slug = reqUrl.searchParams.get('slug')
  if(!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 })
  }
  const article = await getArticle(slug)

  return NextResponse.json(article)
}