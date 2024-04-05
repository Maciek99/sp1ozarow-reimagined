import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


import Link from "next/link"
import fs from 'fs'

const data = [
  {
    lesson: {
      start: '08:00',
      end: '08:45',
    },
    break: {
      time: 10
    }
  },
  {
    lesson: {
      start: '08:55',
      end: '09:40',
    },
    break: {
      time: 10
    }
  },
  {
    lesson: {
      start: '09:50',
      end: '10:35'
    },
    break: {
      time: 10
    }
  },
  {
    lesson: {
      start: '10:45',
      end: '11:30'
    },
    break: {
      time: 20
    },

  },
  {
    lesson: {
      start: '11:50',
      end: '12:35'
    },
    break: {

      time: 20
    }
  },
  {
    lesson: {
      start: '12:55',
      end: '13:40'
    },
    break: {
      time: 15
    }
  },
  {
    lesson: {
      start: '13:55',
      end: '14:40'
    },
    break: {
      time: 10
    }
  },
  {
    lesson: {
      start: '14:50',
      end: '15:35'
    },
    break: {
      time: 10
    }
  },
  {
    lesson: {
      start: '15:45',
      end: '16:30'
    }
  }
]

export default function DzwonkiPage() {
  return (
    <Card className="max-w-screen-xl">
      <CardHeader className="items-start">
        <CardTitle className="text-3xl">Dzwonki</CardTitle>
        <div className="flex flex-row gap-8 items-center justify-center">
          <Link className="text-muted-foreground hover:underline" href={`${process.env.NEXT_PUBLIC_SCHOOL_WEBSITE_URL}/dzwonki`}>Zobacz artykuł na orginalnej stronie szkoły</Link>
        </div>
      </CardHeader>
      <CardContent >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Początek</TableHead>
              <TableHead>Koniec</TableHead>
              <TableHead>Długość przerwy</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.lesson.start}</TableCell>
                <TableCell>{row.lesson.end}</TableCell>
                {
                  row.break ?
                    <>
                      <TableCell>{row.break.time} minut</TableCell>
                    </> :
                    null
                }
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}