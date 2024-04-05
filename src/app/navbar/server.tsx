import { Menu } from "@/utils/sp1ozarow"
import { Navbar } from "./index"

async function getData(): Promise<Menu[] | { error: string }> {

  const res = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/menus`)
  if (!res.ok) {
    return {
      error: 'Failed to fetch data'
    }
  }

  return res.json()
}

export default async function NavbarServer() {
  const data = await getData()
  if ('error' in data) {
    return <div>{data.error}</div>
  }

  return (
    <Navbar data={{
      menus: data
    }} />
  )
}