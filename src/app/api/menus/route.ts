import { getMenus } from "@/utils/sp1ozarow";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const menus = await getMenus()

  return NextResponse.json(menus)
}