import axios from "axios";
import cheerio from "cheerio";
import { dateStringToDate } from "./date";
import { tabletojson } from "tabletojson";
import TurndownService from "turndown";

export const SCHOOL_WEBSITE_URL = "http://sp1ozarow.pl";

const capitalize = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export interface Article {
  title: string;
  date: Date;
  categories: {
    name: string;
    slug: string;
  }[];
  slug: string;
}

export interface ArticleContent {
  title: string;
  markdown: string;
}

export interface Menu {
  title: string;
  links: {
    name: string;
    url: string;
  }[];

}

export async function getArticles(url: string) {
  try {
    // Fetch HTML content from the URL
    const response = await axios.get(url);
    const html = response.data;

    // Load HTML into Cheerio
    const $ = cheerio.load(html);

    const articles: Article[] = [];

    // Find the div with id="content" and iterate over each article
    $("#content article").each((index, element) => {
      // Extract relevant information from each article
      const title = $(element).find("header h1 a").attr("title");
      const date = $(element)
        .find("footer div span.date.updated a")
        .text()
        .trim();
      const hour = $(element)
        .find("footer div span.date.updated a")
        .attr("title")
        ?.trim();
      const categories: { name: string; slug: string }[] = [];
      $(element)
        .find("footer div span.category a")
        .each((index, element) => {
          categories.push({
            name: $(element).text().trim(),
            slug: $(element).attr("href")?.split('/').at(-2)|| "",
          });
        });
      const articleUrl = new URL(
        $(element).find("footer div span.read-more-link a").attr("href") || ""
      );

      // Create JSON object for each article
      const articleData = {
        title: title || "Brak tytułu",
        date: dateStringToDate(date, hour!),
        categories,
        slug: articleUrl.pathname.replaceAll("/", ""),
      };

      // Output JSON object for each article
      articles.push(articleData);
    });
    return articles;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

const turndownService = new TurndownService();

export async function getArticle(slug: string) {
  try {
    const url = SCHOOL_WEBSITE_URL + "/" + slug;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    console.log('fetching article:', url)

    const elementsToRemove = ["script", "style"];
    elementsToRemove.forEach((element) => $(element).remove());

    console.log('removed elements:', elementsToRemove)
    
    const replaceTables = () => {
      // Find all tables
      const tables = $("table");

      // Helper function to clean up values
      function cleanValue(value: any) {
        return value.replace(/\n/g, " ").replace(/\s+/g, " ").trim();
      }

      // Helper function to create a markdown row
      function createMarkdownRow(row: any) {
        const values = Object.values(row).map(cleanValue);
        return `|${values.join("|")}|`;
      }

      // Helper function to create a markdown table header
      function createMarkdownTableHeader(row: any) {
        const header = `|${Object.values(row)
          .map((v) => capitalize(v as string))
          .join("|")}|`;
        const divider = `|${Object.keys(row)
          .map(() => "---")
          .join("|")}|`;
        return `${header}\n${divider}`;
      }

      // Parse each table
      const mdTables: string[] = [];
      tables.each((index, element) => {
        const table = $(element).parent();
        const rows = table.find("tr");
        const data = tabletojson.convert(table.html() || "");

        // Generate a markdown table
        const markdownTable = data[0]
          .slice(1)
          .map(createMarkdownRow)
          .join("\n");
        const markdownTableHeader = createMarkdownTableHeader(data[0][0]);
        const markdownTableString = `${markdownTableHeader}\n${markdownTable}`;

        mdTables.push(markdownTableString);
      });

      //replace tables in original content with markdown tables
      tables.each((index, element) => {
        $(element).replaceWith(`<pre>${mdTables[index]}</pre>`);
      });
    };
    replaceTables();

    console.log('replaced tables')

    /*
    const parseGallery = async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      const pages = parseInt(
        $("span .paging-input_0").children().last().text()
      );
      if (!pages || isNaN(pages)) return console.log("No pages found");
      console.log(`Found ${pages} pages.`);

      await page.goto(url, { waitUntil: "networkidle2" });

      const images: string[] = [];

      for (let i = 1; i <= pages; i++) {
        const pageImages = await page.evaluate(() => {
          const imagesDiv = document.querySelector(
            ".bwg_standart_thumbnails_0"
          );
          if (!imagesDiv) return console.log("No images found");
          const images = Array.from(imagesDiv.children)
            .slice(0, 3)
            .map((img) => img.querySelector("img")?.src) as string[];
          return images;
        });

        if (!pageImages) return console.log("No images found");
        pageImages.forEach((img) => images.push(img));

        if (i < pages) {
          await page.evaluate(() => {
            const pagingInput = document.querySelector("span .paging-input_0");
            const lastChild = pagingInput?.lastElementChild as HTMLElement;
            if (lastChild) {
              lastChild.click();
            }
          });
        }
      }

      await browser.close();
      $("form").remove();
      return images;
    };

    const gallery = await parseGallery();
    */

    $("form").remove();

      // Move <br> out of <strong> tags
      $("strong br").each((index, element) => {
        $(element).insertAfter($(element).parent());
      });

      

    let markdown = turndownService.turndown(
      $("div .entry-content").html() || ""
    );

    console.log('turndownService.turndown')

    // Fixes lists that are not formatted correctly
    // find all llnes that begin with \- and remove the backslash and add a space between the - and the text
    const regex = /\\-/g;
    const matches = markdown.match(regex);
    if (matches) {
      matches.forEach((match) => {
        markdown = markdown.replace(match, "- ");
      });
    }

    // Fixes numbered lists that are not formatted correctly
    // find all llnes that begin with ex. 1\\. and remove the backslashes and add a space between the . and the text
    const regex2 = /(\d+)\\./gm;
    const matches2 = markdown.match(regex2);
    if (matches2) {
      matches2.forEach((match) => {
        const number = match.match(/\d+/);
        markdown = markdown.replace(match, `${number}. `);
      });
    }

    
    // Fixes over two new lines
    const regex3 = /(\n{2,})/gm;
    const matches3 = markdown.match(regex3);
    if (matches3) {
      matches3.forEach((match) => {
        markdown = markdown.replace(match, "\n");
      });
    }

    // Replace all "fake dashes"  like –  (U+2013) with - (U+002D)
    markdown = markdown.replace(/–/g, "-");



    const title = $("h1.header-post-title-class").html();

    console.log('returning article')

    return {
      title: title || "Brak tytułu",
      markdown,
      //gallery,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { error: "Error fetching data" };
  }
}


export async function getMenus() {
  try {
    // Fetch HTML content from the URL
    const response = await axios.get(SCHOOL_WEBSITE_URL);
    const html = response.data;

    // Load HTML into Cheerio
    const $ = cheerio.load(html);

    const menus: {
        title: string,
        links: {
            name: string,
            url: string
        }[]
    }[] = [];
    

    const disallowedLinks = ['/category/aktualnosci/', '/plan-lekcji/', '/dzwonki/', ' /galeria/', '/category/rada-rodzicow/', '/konkurs-maly-pitagoras/', '/dziennik-elektroniczny/', '/kontakt/', 'https://sp1ozarow.bip.gov.pl/']

    // Find the div with id="content" and iterate over each article
    $('.widget_nav_menu').each((index, element) => {
        const title = $(element).find('h3.widget-title').text().trim();
        const links: {
            name: string,
            url: string
        }[] = [];
        $(element).find('ul li.menu-item').each((index, element) => {
            const link = $(element).find('a');
            const rawUrl = link.attr('href');

            // if is file: return the file url
            // if not: return the slug

            const endsWithFile =! rawUrl?.endsWith('/')
            if(['#'].includes(rawUrl!)) {
                return;
            }
            const url = new URL(rawUrl || '')


            links.push({
                name: $(element).text().trim(),
                url:(endsWithFile ? rawUrl : url.pathname) || ''
            });
        });
        menus.push({
            title,
            links: links.filter(link => !disallowedLinks.includes(link.url))
        })
    });
    return menus
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}