'use client'

import { ThemeSwitcher } from "@/components/theme-switcher"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { Menu } from "@/utils/sp1ozarow"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import Image from 'next/image'

export const NavbarButton = ({ href, text }: { href: string, text: string }) => {
  const pathname = usePathname()
  const highlighted = pathname === href
  return (
    <Button className={cn(!highlighted ? 'text-card-foreground' : 'text-green-500')} variant={'link'}>
      <Link href={href}>
        {text}
      </Link>
    </Button>
  )
}



export const Navbar = ({
  data
}: {
  data: {
    menus: Menu[]
  }
}) => {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <nav className="p-5 bg-card border rounded-md">
      <div className="flex flex-row justify-between items-center">
        <h2 className="font-bold">
          Szkoła Podstawowa Nr 1 Im. Janusza Kusocińskiego
        </h2>
        <ThemeSwitcher />
      </div>
      <div className={`flex max-[1060px]:flex-col max-[1060px]:gap-2 max-[650px]:gap-0  flex-row p-0   gap-16 justify-between max-w-screen-2xl`}>
        <div className="flex flex-row max-[1470px]:flex-col max-[1060px]:flex-row max-[900px]:flex-col">
          <div className="flex flex-row max-[650px]:hidden">
            <NavbarButton href="/category/aktualnosci" text="Aktualności" />
            <NavbarButton href="/plan-lekcji" text="Plan lekcji" />
            <NavbarButton href="/dzwonki" text="Dzwonki" />
            <NavbarButton href="/galeria" text="Galeria" />
            <NavbarButton href="/category/rada-rodzicow" text="Rada Rodziców" />
          </div>
          <div className="flex flex-row max-[650px]:hidden" >
            <NavbarButton href="/konkurs-maly-pitagoras" text="Mały Pitagoras" />
            <NavbarButton href="/dziennik-elektroniczny" text="eDziennik" />
            <NavbarButton href="/kontakt" text="Kontakt" />
            <NavbarButton href="https://sp1ozarow.bip.gov.pl/" text="BIP" />
          </div>
        </div>
        <NavigationMenu className={`max-[490px]:flex flex-wrap  items-center justify-start`}>
          <NavigationMenuList className="hidden max-[650px]:block">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-green-500">Najważniejsze</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavbarButton href="/category/aktualnosci" text="Aktualności" />
                <NavbarButton href="/plan-lekcji" text="Plan lekcji" />
                <NavbarButton href="/dzwonki" text="Dzwonki" />
                <NavbarButton href="/galeria" text="Galeria" />
                <NavbarButton href="/category/rada-rodzicow" text="Rada Rodziców" />
                <NavbarButton href="/konkurs-maly-pitagoras" text="Mały Pitagoras" />
                <NavbarButton href="/dziennik-elektroniczny" text="eDziennik" />
                <NavbarButton href="/kontakt" text="Kontakt" />
                <NavbarButton href="https://sp1ozarow.bip.gov.pl/" text="BIP" />
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
          {data.menus.map(menu => (
            <NavigationMenuList key={menu.title}>
              <NavigationMenuItem>
                <NavigationMenuTrigger>{menu.title}</NavigationMenuTrigger>
                <NavigationMenuContent >
                  <div className="w-[512px] max-[560px]:w-96 max-[430px]:w-80">
                    <Input placeholder="Wyszukaj" value={searchTerm} onChange={(e) => setSearchTerm(e.currentTarget.value)} />
                    {menu.links.filter((link) => {
                      return link.name.toLowerCase().includes(searchTerm) || link.url.toLowerCase().includes(searchTerm)
                    }).map(link => (
                      <NavigationMenuLink key={link.url}>
                        <Button variant={'link'}>
                          <Link href={link.url}>
                            {link.name}
                          </Link>
                        </Button>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          ))}
        </NavigationMenu>
      </div>
    </nav>
  )
}
