import { Article } from "../../../utils/sp1ozarow"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link";
import { Clock } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { redirect } from "next/navigation";
import { ResolvingMetadata } from "next"
import ArticleDate from "./date";



export async function generateMetadata(
  { params, searchParams }: { params: { category: string }, searchParams: { page: string } },
) {
  const data = await getData(params.category, searchParams.page)
  if ('error' in data) {
    return {
      title: 'Błąd',
      description: 'Nie udało się pobrać danych',
    }
  }


  return {
    title: data[0]?.categories[0].name + " | Szkoła Podstawowa nr 1 w Ożarowie Mazowieckim",
  }
}


async function getData(category: string, page?: string): Promise<Article[] | { error: string }> {
  const searchParams = new URLSearchParams()
  searchParams.set('category', category)
  if (page) {
    searchParams.set('page', page)
  }


  const res = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/articles?${searchParams.toString()}`, {
    next: {
      revalidate: 60 * 60 * 8 // 8 hours
    }
  })
  if (!res.ok) {
    return {
      error: 'Failed to fetch data'
    }
  }

  const rawData = await res.json()
  const data = rawData.map((article: any) => ({
    ...article,
    date: new Date(article.date)
  }))

  return data
}

export default async function CategoryPage({ params, searchParams }: { params: { category: string }, searchParams: { page: string } }) {
  const data = await getData(params.category, searchParams.page)
  if ('error' in data) {
    return <div>{data.error}</div>
  }

  const page = parseInt(searchParams.page || '1')

  if (searchParams?.page && page === 1) {
    await redirect(`/category/${params.category}`)
  }

  const pagination = [
    page - 1,
    page,
    page + 1
  ].toReversed()
    .filter(p => p > 0)


  return (
    <div className="flex flex-col gap-5">
      {
        data.map((post) => (
          <Card key={post.slug} className="max-w-screen-2xl">
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>
                {
                  post.categories.map((category, index) => (
                    <Link key={category.slug} href={`/category/${category.slug}`} >{category.name}{index < post.categories.length - 1 ? ', ' : ''}</Link>
                  ))
                }
              </CardDescription>
            </CardHeader>
            <CardFooter className="justify-between">
              <ArticleDate date={post.date} />
              <Button variant="link">
                <Link href={`/${post.slug}${params.category !== 'aktualnosci' ? `?category=${params.category}` : ''}`}>
                  Czytaj
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))
      }
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href={`/category/${params.category}?page=${page + 1}`} />
          </PaginationItem>
          {
            pagination.map(p => (
              <PaginationItem key={p}>
                <PaginationLink href={`/category/${params.category}?page=${p}`}>{p}</PaginationLink>
              </PaginationItem>
            ))
          }
          {
            page > 1 && (
              <PaginationItem>
                <PaginationNext href={`/category/${params.category}?page=${page - 1}`} />
              </PaginationItem>
            )
          }
        </PaginationContent>
      </Pagination>

    </div>
  )
}