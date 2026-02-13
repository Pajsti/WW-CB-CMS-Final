# WW-CB Astro Web

Přeportovaný web vodního slalomu ČB do Astro generátoru s Decap CMS.

## Spuštění

```bash
npm install
npm run dev
```

Pak otevři:
- Web: `http://localhost:4321`
- CMS Admin: `http://localhost:4321/admin`

## Decap CMS Setup

### 1. GitHub Backend (doporučeno)

V `public/admin/config.yml` nastav:

```yaml
backend:
  name: github
  repo: username/repo-name  # Změň na svůj repo
  branch: main
```

### 2. Git Gateway (pro Netlify)

```yaml
backend:
  name: git-gateway
  branch: main
```

Pak v Netlify:
1. Jdi do Settings > Identity
2. Enable Identity
3. Enable Git Gateway
4. Settings > Identity > Registration: Invite only (doporučeno)

### 3. První přihlášení

1. Otevři `/admin`
2. Přihlaš se přes GitHub nebo Netlify Identity
3. Začni spravovat obsah!

## Funkce CMS

- ✅ **Aktuality** - Přidávej/edituj články
- ✅ **Fotogalerie** - Správa galerií
- ✅ **Stránky** - Editace O nás, Kontakt

## Build

```bash
npm run build
```

## Struktura

- `src/layouts/` - Layouty (hlavní Layout.astro)
- `src/components/` - Komponenty (Header, Footer)
- `src/pages/` - Stránky (automatický routing)
- `src/content/` - Markdown obsah pro CMS
  - `news/` - Aktuality
  - `gallery/` - Fotogalerie
  - `pages/` - Stránky
- `public/` - Statické soubory (CSS, JS, obrázky)
- `public/admin/` - Decap CMS config

## Features

- ✅ Multi-page routing
- ✅ Komponenty pro Header/Footer
- ✅ Zachované původní CSS/JS
- ✅ Dark/Light mode
- ✅ Česko/Anglický přepínač
- ✅ Mobilní menu
- ✅ News carousel
- ✅ Fotogalerie
- ✅ **Decap CMS** - Content Management System

## Poznámky

Původní web používal dynamické načítání header/footer přes JS. V Astru je to přímo v komponentách, což je rychlejší a SEO friendly.

JS scripty zůstaly pro zachování funkcionality (theme switcher, lang switcher, mobile menu, galerie, news feed).

Decap CMS umožňuje spravovat obsah bez nutnosti editovat kód. Obsah je uložený v Markdown souborech a commituje se do Git repository.
