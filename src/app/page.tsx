import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link";
import { Clock } from "lucide-react";

const data = [
  {
    title: 'Warsztaty charakteryzatorskie „Dziewczyna z perłą”',
    date: new Date('2024-03-26T10:12:00.000Z'),
    categories: ['Aktualności'],
    slug: 'warsztaty-charakteryzatorskie-2'
  },
  {
    title: 'Spotkania z wychowawcami klas 4-8  styczeń  2024',
    date: new Date('2024-03-13T09:37:00.000Z'),
    categories: ['Aktualności'],
    slug: 'spotkania-z-wychowawcami-klas-4-8-styczen-2024-2'
  },
  {
    title: 'DZIEŃ OTWARTY (mała Szkoła) 12.03.2024 r.',
    date: new Date('2024-03-10T08:35:00.000Z'),
    categories: ['Aktualności'],
    slug: 'dzien-otwarty-mala-szkola-12-03-2024-r'
  },
  {
    title: 'PLAN REKOLEKCJI WIELKOPOSTNYCH  DLA UCZNIÓW KLAS I -III',
    date: new Date('2024-03-06T10:26:00.000Z'),
    categories: ['Aktualności'],
    slug: 'plan-rekolekcji-wielkopostnych-dla-uczniow-klas-i-iii'
  },
  {
    title: 'Rekolekcje wielkopostne dla uczniów z klas IV-VIII',
    date: new Date('2024-03-01T12:21:00.000Z'),
    categories: ['Aktualności'],
    slug: 'rekolekcje-wielkopostne-dla-uczniow-z-klas-iv-viii'
  },
  {
    title: 'Spotkanie informacyjne w sprawie naboru do klasy sportowej',
    date: new Date('2024-02-28T12:23:00.000Z'),
    categories: ['Aktualności'],
    slug: 'spotkanie-informacyjne-w-sprawie-naboru-do-klasy-sportowej'
  },
  {
    title: 'WYNIKI XX GMINNEGO KONKURSU ORTOGRAFICZNEGO „O PIÓRO BURMISTRZA OŻAROWA MAZOWIECKIEGO”  2023/2024',
    date: new Date('2024-02-19T11:25:00.000Z'),
    categories: ['Aktualności'],
    slug: 'wyniki-xx-gminnego-konkursu-ortograficznego-o-pioro-burmistrza-ozarowa-mazowieckiego-20232024'
  },
  {
    title: 'Szkolne eliminacje do Konkursu Recytatorskiego „Warszawska Syrenka”- klasy I-III',
    date: new Date('2024-02-19T11:18:00.000Z'),
    categories: ['Aktualności'],
    slug: 'szkolne-eliminacje-do-konkursu-recytatorskiego-warszawska-syrenka-klasy-i-iii'
  },
  {
    title: 'Webinarium dla rodziców i nauczycieli „Samotne dzieci i samotni rodzice, czyli o tym jak nie stracić kontaktu z własnym dzieckiem”',
    date: new Date('2024-02-05T08:28:00.000Z'),
    categories: ['Aktualności'],
    slug: 'webinarium-dla-rodzicow-i-nauczycieli-samotne-dzieci-i-samotni-rodzice-czyli-o-tym-jak-nie-stracic-kontaktu-z-wlasnym-dzieckiem'
  },
  {
    title: 'Rekrutacja do oddziału przedszkolnego i klasy pierwszej na rok szkolny 2024/2025',
    date: new Date('2024-02-05T08:25:00.000Z'),
    categories: ['Aktualności'],
    slug: 'rekrutacja-do-oddzialu-przedszkolnego-i-klasy-pierwszej-na-rok-szkolny-20242025'
  },
  {
    title: 'Podsumowanie akcji „Zima w mieście 2024”',
    date: new Date('2024-02-02T11:41:00.000Z'),
    categories: ['Aktualności'],
    slug: 'podsumowanie-akcji-zima-w-miescie-2024'
  },
  {
    title: 'Terminy przeprowadzania postępowania rekrutacyjnego i postępowania uzupełniającego do szkół ponadpodstawowych na terenie województwa mazowieckiego na rok szkolny 2024/2025',
    date: new Date('2024-01-30T12:22:00.000Z'),
    categories: ['Aktualności', 'Doradztwo zawodowe'],
    slug: 'terminy-przeprowadzania-postepowania-rekrutacyjnego-i-postepowania-uzupelniajacego-do-szkol-ponadpodstawowych-na-terenie-wojewodztwa-mazowieckiego-na-rok-szkolny-20242025'
  }
]

export default function Home() {
  return (
    <main>
      <div className="flex flex-col gap-5">
        {
          data.map((post) => (
            <Card key={post.slug} className="max-w-2xl">
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>
                  {post.categories.join(', ')}
                </CardDescription>
              </CardHeader>
              <CardFooter className="justify-between">
                <span className="flex flex-row justify-center items-center gap-1 text-sm text-muted-foreground">
                  <Clock size={16} className="text-white" />
                  {post.date.toLocaleDateString()} {post.date.toLocaleTimeString(undefined, {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
                <Button variant="link">
                  <Link href={`http://sp1ozarow.pl/${post.slug}`}>
                    Czytaj
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))
        }
      </div>
    </main>
  );
}
