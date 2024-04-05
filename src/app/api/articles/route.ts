import { SCHOOL_WEBSITE_URL, getArticles } from "@/utils/sp1ozarow";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
  const reqUrl = new URL(req.url)
  const category = reqUrl.searchParams.get('category')
  const page = parseInt(reqUrl.searchParams.get('page') || '1')
  if(!category) {
    return NextResponse.json({ error: 'Category is required' }, { status: 400 })
  }
  const url = `${SCHOOL_WEBSITE_URL}/category/${category}/` + (page > 1 ? `page/${page}/` : '')
  const articles = await getArticles(url)

  return NextResponse.json(articles)
}