'use client'

import Markdown from "marked-react"
import { ReactRenderer } from 'marked-react'
import NextImage from "next/image"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


export default function ArticleContentComponent({
  markdown
}: {
  markdown: string
}) {
  const renderer: Partial<ReactRenderer> = {

    link(href: string, text: string) {
      {
        return (<a className="text-green-500 hover:underline" href={href} target="_blank">{text}</a>)
      }
    },
    list(body: string, ordered: boolean) {
      if (ordered) {
        return (<ol className="list-decimal list-inside">{body}</ol>)
      }
      return (<ul className="list-disc list-inside">{body}</ul>)
    },
    image(src, alt, title) {
      const toOptimizeExtensions = ['jpg', 'jpeg', 'png']

      const extension = src.split('.').pop()
      const shouldOptimize = toOptimizeExtensions.includes(extension!)
      if (shouldOptimize) {
        return (
          <NextImage
            className="rounded-lg"
            width={1024}
            height={1024}
            alt={alt} title={title || undefined} src={src}
          />
        )
      }

      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          title={title || undefined}
        />
      )
    },
    table(children) {
      return (
        <Table className="text-md max-w-screen-lg">
          {children}
        </Table>
      )
    },
    tableHeader(children) {
      return (
        <TableHeader>
          {children}
        </TableHeader>
      )
    },
    tableRow(children) {
      return (
        <TableRow>
          {children}
        </TableRow>
      )
    },
    tableCell(children) {
      return (
        <TableCell>
          {children}
        </TableCell>
      )
    },
    tableBody(children) {
      return (
        <TableBody>
          {children}
        </TableBody>
      )
    },
  }


  return (
    <article className="flex flex-col ">
      <Markdown
        value={markdown.replace(/\n(?=\n)/g, "\n<br>")}
        breaks={true}
        gfm={true}
        renderer={renderer}
      />
    </article>
  )
}