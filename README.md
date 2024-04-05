# sp1ozarow.pl - Reimagined

Jest to odświeżona wersja strony http://sp1ozarow.pl, stworzona przy użyciu technologii:

- [Next.js](https://nextjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Cheerio](https://cheerio.js.org/) (do interpretacji danych z serwisu)

## Struktura projektu

- `src/app`: Zawiera strony projektu oraz API.
- `src/components`: Zawiera komponenty używane w aplikacji.
- `src/lib`: Zawiera funkcje pomocnicze dla komponentów.
- `src/utils`: Zawiera funkcje do interpretacji danych ze strony sp1ozarow.pl.

## Pierwsze kroki

Po pierwsze, zainstaluj wymagane paczki:

```sh
npm install
```

Następnie, uruchom serwer deweloperski:

```js
npm run dev
```

Otwórz http://localhost:3000 w przeglądarce, aby zobaczyć stronę.

## Budowanie i uruchamianie w Produkcji

Aby wybudować aplikację, użyj komendy:

```js
npm run build
```

Po tym, możesz uruchomić serwer w wersji produkcyjnej:

```js
npm start
```

## Współpraca

Zapraszamy do tworzenia Pull Requestów. W przypadku większych zmian, prosimy o otwarcie nowego zgłoszenia (issue), aby móc najpierw omówić proponowane modyfikacje.

Jeśli znajdziesz błąd, prosimy o otwarcie nowego zgłoszenia (issue), abyśmy mogli go naprawić.

## Uznania:

- Oryginalna strona szkoły: **Krzysztof Markowski**
- Logo szkoły: **Marcel Szczepek**
