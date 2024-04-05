import { NextResponse } from "next/server";

// website_url /wp-content 2024/04/20240322_111441-1024x768.jpg
export async function GET(req: Request) {
  const reqUrl = new URL(req.url);
  const imageUrl = reqUrl.searchParams.get("image");
  if (!imageUrl) {
    return NextResponse.json({ error: "Image is required" }, { status: 400 });
  }
  if (!imageUrl.startsWith(process.env.NEXT_PUBLIC_SCHOOL_WEBSITE_URL!)) {
    return NextResponse.json({ error: "Invalid image URL" }, { status: 400 });
  }

  const image = await fetch(imageUrl, {
    next: {
      revalidate: 60 * 60 * 24 * 7, // 7 days
    },
  });

  const mime = image.headers.get("content-type");

  const response = new NextResponse(image.body);
  response.headers.set("Content-Type", mime || "image/png");
  return response;
}
