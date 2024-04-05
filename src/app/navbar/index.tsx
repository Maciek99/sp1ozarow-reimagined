'use client'

import { Button } from "@/components/ui/button"
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

export const NavbarButton = ({ href, text }: { href: string, text: string }) => {
  const pathname = usePathname()
  const highlighted = pathname === href
  return (
    <Button className={cn(!highlighted ? 'text-white' : 'text-green-500')} variant={'link'}>
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
  const pageSize = {
    width: 1920,
    height: 1080
  }

  return (
    <nav className={`flex max-[1060px]:flex-col  flex-row pad-5 bg-card border rounded-md  justify-between `}>
      <div className="flex flex-row max-[1430px]:flex-col max-[1060px]:flex-row max-[900px]:flex-col">
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
        <NavigationMenu className="hidden max-[650px]:block">
          <NavigationMenuList>
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
        </NavigationMenu>
      </div>
      <NavigationMenu className={`max-[490px]:flex flex-wrap  items-center justify-start`}>
        {data.menus.map(menu => (
          <NavigationMenuList key={menu.title}>
            <NavigationMenuItem>
              <NavigationMenuTrigger>{menu.title}</NavigationMenuTrigger>
              <NavigationMenuContent >
                <div className="w-96">
                  {menu.links.map(link => (
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
    </nav>
  )
}
