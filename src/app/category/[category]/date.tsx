'use client'

import { Clock } from "lucide-react";

export default function ArticleDate({
  date
}: {
  date: Date
}) {
  return (
    <span className="flex flex-row justify-center items-center gap-1 text-sm text-muted-foreground">
    <Clock size={16} className="text-card-foreground" />
    {date.toLocaleDateString()} {date.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit'
    })}
  </span>
  )
}