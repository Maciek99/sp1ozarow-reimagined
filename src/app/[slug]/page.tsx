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



async function getData(slug: string): Promise<ArticleContent | { error: string }> {

  const res = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/article?slug=${slug}`, {
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
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl">{data.title}</CardTitle>
      </CardHeader>
      <CardContent >
        <ArticleContentComponent markdown={data.markdown} />
      </CardContent>
      <CardFooter>
        <Button variant="link">
          <Link href={`/category/${searchParams?.category || 'aktualnosci'}`}>Powrót</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}