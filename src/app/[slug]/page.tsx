import { Article, ArticleContent } from "@/utils/sp1ozarow"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import ArticleContentComponent from "./client"
import { ArrowLeft } from "lucide-react"



async function getData(slug: string): Promise<ArticleContent | { error: string }> {

  const res = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/article?slug=${slug}`, {
    // TODO
    /*
    next: {
      revalidate: 60 * 60 * 8 // 8 hours
    }
    */
   cache: 'no-cache'
  })
  if (!res.ok) {
    return {
      error: 'Failed to fetch data'
    }
  }

  return res.json()
}

export default async function ArticlePage({ params, searchParams }: { params: { slug: string }, searchParams: { category?: string } }) {
  const slug = params.slug

  const data = await getData(slug)
  if ('error' in data) {
    return <div>{data.error}</div>
  }




  return (
    <Card className="max-w-screen-xl">
      <CardHeader className="items-start">
        <CardTitle className="text-3xl">{data.title}</CardTitle>
        <div className="flex flex-row gap-8 items-center justify-center">
          <Link className="flex items-center text-green-500  hover:underline" href={`/category/${searchParams?.category || 'aktualnosci'}`}>
            <ArrowLeft />
            Powrót
          </Link>
          <Link className="text-muted-foreground hover:underline" href={`${process.env.NEXT_PUBLIC_SCHOOL_WEBSITE_URL}/${params.slug}`}>Zobacz artykuł na orginalnej stronie szkoły</Link>
        </div>
      </CardHeader>
      <CardContent >
        <ArticleContentComponent markdown={data.markdown} />
      </CardContent>
    </Card>
  )
}