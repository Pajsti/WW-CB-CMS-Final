# WW-CB — Oficiální web

Moderní webová stránka pro klub Divoká voda České Budějovice postavená na **Astro** + **Decap CMS** + **Netlify**.

---

## 📋 Obsah

- [Quick Start](#-quick-start)
- [Deployment](#-deployment)
- [Struktura projektu](#-struktura-projektu)
- [Správa obsahu](#-správa-obsahu)
- [Nastavení](#-nastavení)
- [Jak to funguje](#-jak-to-funguje)
- [Troubleshooting](#-troubleshooting)

---

## 🚀 Quick Start

### Požadavky
- **Node.js** 18+ ([stáhnout zde](https://nodejs.org))
- **Git** ([stáhnout zde](https://git-scm.com))
- **GitHub účet** (pro verzování a Netlify)

### Lokální vývoj

```bash
# 1. Naklonuj repo
git clone https://github.com/Pajsti/WW-CB-CMS-Final.git
cd WW-CB-CMS-Final

# 2. Nainstaluj závislosti
npm install

# 3. Spusť dev server
npm run dev
```

Web běží na **http://localhost:4321**

### Build

```bash
# Kompilace statického webu
npm run build

# Náhled produkční verze
npm run preview
```

Build vytvoří složku `dist/` s kompletním statickým webem.

---

## 📦 Deployment

### Netlify (doporučeno)

1. **Push na GitHub:**
   ```bash
   git add .
   git commit -m "initial commit"
   git push origin main
   ```

2. **Propoj Netlify:**
   - Jdi na [netlify.com](https://netlify.com)
   - New site from Git → GitHub → vyber repo
   - Build settings:
     - **Build command:** `npm run build`
     - **Publish directory:** `dist`

3. **Netlify automaticky:**
   - Builduje při každém pushu na `main`
   - Poskytuje HTTPS certifikát
   - CDN hosting

### Netlify Identity Setup (CMS přístup)

**Povinné kroky pro fungující Decap CMS:**

1. **Site Settings → Identity → Enable Identity**
2. **Services → Git Gateway → Enable Git Gateway**  
   *(vyžaduje autorizaci GitHubu)*
3. **Registration preferences → Invite only**
4. **Identity tab → Invite users**  
   Zadej email → odešle se pozvánka
5. **Otevři email → Accept the invite → nastav heslo**
6. **Jdi na `tvuj-web.netlify.app/admin/` → přihlaš se**

**Bez Git Gateway nemůže CMS zapisovat do GitHubu!**

---

## 📁 Struktura projektu

```
WW-CB-CMS-Final/
├── public/                    # Statické soubory
│   ├── admin/
│   │   ├── config.yml        # Decap CMS konfigurace
│   │   └── index.html        # CMS admin rozhraní
│   ├── gallery/              # Fotky (organizované do složek)
│   │   ├── mcr-2025/
│   │   ├── tabor/
│   │   └── uploads/          # CMS uploady
│   ├── images/               # Loga, ikony
│   ├── css/
│   │   └── style.css         # Globální styly
│   └── js/
│       └── scripts.js        # Téma, jazyk, mobilní menu
├── src/
│   ├── components/           # Astro komponenty
│   │   ├── Header.astro
│   │   └── Footer.astro
│   ├── content/              # Obsah (markdown soubory)
│   │   ├── config.ts         # Zod schema pro collections
│   │   ├── news/             # Články (.md)
│   │   ├── gallery/          # Galerie (.md)
│   │   ├── events/           # Kalendář událostí (.md)
│   │   └── settings/         # Nastavení webu (.md)
│   ├── layouts/
│   │   └── Layout.astro      # Hlavní layout
│   └── pages/                # Astro stránky
│       ├── index.astro       # Homepage
│       ├── media.astro       # Seznam článků
│       ├── fotogalerie.astro # Galerie
│       ├── kalendar.astro    # Kalendář
│       └── article/
│           └── [slug].astro  # Dynamický článek
├── astro.config.mjs          # Astro konfigurace
├── package.json
└── netlify.toml              # Netlify build settings
```

---

## ✍️ Správa obsahu

### Přístup do CMS

**URL:** `https://tvuj-web.netlify.app/admin/`  
**Tajný vstup:** Klikni **2× rychle** na logo (horní levý roh)

### Přidání článku

1. **Aktuality → New Článek**
2. Vyplň:
   - **Název** (povinné)
   - **Datum** (povinné, formát auto)
   - **Krátký popis** (povinné, zobrazí se v seznamu)
   - **Náhledový obrázek** (upload nebo URL)
   - **Galerie fotek** (optional):
     - Klikni "Add Galerie fotek"
     - Upload fotky (uloží se do `/public/gallery/uploads/`)
   - **Obsah** (Markdown editor)
3. **Save** → **Publish**

**Výsledek:** Vytvoří `.md` soubor v `src/content/news/`  
**Git:** Automatický commit → push do GitHubu  
**Build:** Netlify automaticky rebuildne web

### Přidání galerie

1. **Fotogalerie → New Galerie**
2. Vyplň název, datum, náhledový obrázek
3. **Fotky** → Add Fotky → upload každou zvlášť
4. **Save → Publish**

**Výsledek:** `.md` v `src/content/gallery/`

### Přidání události do kalendáře

1. **Kalendář událostí → New Událost**
2. Vyplň:
   - Název, datum začátku/konce
   - Místo (např. "Lipno nad Vltavou")
   - Kategorie: **zavod**, **trenink**, nebo **akce**
   - Popis (Markdown)
3. **Publish**

**Zobrazí se na:** `/kalendar`

### Nastavení viditelnosti sekcí

1. **Nastavení webu → Viditelnost sekcí**
2. Zapni/vypni:
   - ✅ **Zobrazit kalendář** → tlačítko na homepage + stránka `/kalendar`
   - ✅ **Zobrazit rychlé odkazy** → aside panel na homepage
   - ✅ **Zobrazit Live TV** → odkaz v rychlých odkazech
   - ✅ **Zobrazit Race Office** → odkaz v rychlých odkazech
   - ✅ **Zobrazit oficiální dokumenty** → odkaz v rychlých odkazech
   - ✅ **Zobrazit sponzory** → odkaz v rychlých odkazech
   - ✅ **Zobrazit nejnovější články** → carousel na homepage
3. **Save → Publish**

**Live změny:** Netlify rebuildne → sekce se zobrazí/skryjí

---

## ⚙️ Nastavení

### Email templates (Netlify Identity)

**Netlify Dashboard → Site Settings → Identity → Emails**

Všechny 4 templates najdeš v projektu (jsou připravené):
- `invitation.html` → Pozvánka do administrace
- `confirmation.html` → Potvrzení emailu po registraci
- `recovery.html` → Obnovení hesla
- `email-change.html` → Změna emailové adresy

**Postup:**
1. Otevři template v editoru
2. Zkopíruj **celý obsah** (bez html/head/body tagů)
3. V Netlify → klikni "Edit settings" u příslušného templatu
4. Vlož obsah → Save

### Vlastní doména

**Netlify Dashboard → Domain settings → Add custom domain**

1. Zadej doménu (např. `ww-cb.cz`)
2. Nastav DNS záznamy u registrátora:
   ```
   Type: CNAME
   Name: www
   Value: tvuj-web.netlify.app
   ```
3. Netlify automaticky nastaví HTTPS

### Netlify build settings

V `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## 🔧 Jak to funguje

### Architektura: Astro Content Collections

**Astro** je static site generator. Web je **kompilován při buildu**, ne za běhu.

#### 1. Content Collections (`src/content/`)

**Schema definice** (`src/content/config.ts`):
```typescript
const newsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    excerpt: z.string(),
    image: z.string(),
    images: z.array(z.object({ src: z.string() })).optional(),
  }),
});
```

**Co to dělá:**
- Definuje strukturu `.md` souborů
- Validuje frontmatter při buildu
- Poskytuje TypeScript typy

#### 2. Build proces

```
1. npm run build
   ↓
2. Astro načte všechny .md soubory z src/content/
   ↓
3. Validuje podle Zod schémat
   ↓
4. Vytvoří statické HTML stránky
   ↓
5. Výstup: dist/ (kompletní web)
```

**Příklad:** Když přidáš článek v CMS:
```
CMS upload → GitHub commit → Netlify webhook
  ↓
Netlify spustí: npm run build
  ↓
src/content/news/2025-12-20-clanek.md → dist/article/2025-12-20-clanek/index.html
  ↓
Deploy na CDN
```

#### 3. Dynamické stránky (`[slug].astro`)

**Soubor:** `src/pages/article/[slug].astro`

```typescript
export async function getStaticPaths() {
  const articles = await getCollection('news');
  return articles.map(article => ({
    params: { slug: article.slug },  // URL slug
    props: { article },              // Data pro stránku
  }));
}
```

**Co se stane při buildu:**
- Načte všechny `.md` z `src/content/news/`
- Pro každý vytvoří samostatnou HTML stránku:
  - `2025-12-20-clanek.md` → `/article/2025-12-20-clanek/`

**Výsledek:** Každý článek má svou statickou HTML stránku.

#### 4. Decap CMS workflow

```
User v CMS klikne "Publish"
  ↓
Decap CMS zavolá GitHub API (přes Git Gateway)
  ↓
Vytvoří/upraví .md soubor v src/content/news/
  ↓
Git commit + push do main větve
  ↓
Netlify webhook → spustí build
  ↓
Astro přečte změněné .md soubory
  ↓
Vygeneruje nové HTML stránky
  ↓
Deploy na CDN (automaticky)
```

**Důležité:** CMS **nepíše přímo** do webu. Píše do GitHubu → Git je single source of truth.

#### 5. Settings systém

**Soubor:** `src/content/settings/site-settings.md`

```yaml
---
showCalendar: true
showQuickLinks: true
showLiveTV: true
---
```

**Načtení v Astro:**
```typescript
const settings = await getEntry('settings', 'site-settings');

{settings?.data.showCalendar && (
  <div>Kalendář tlačítko</div>
)}
```

**Redirect pokud vypnuto:**
```typescript
if (!settings?.data.showCalendar) {
  return Astro.redirect('/');
}
```

### Fotky v galerii

**Upload v CMS:**
```
User uploaduje fotku v CMS
  ↓
Decap CMS nahraje do public/gallery/uploads/
  ↓
Uloží URL do .md: images: [{src: "/gallery/uploads/foto.jpg"}]
  ↓
Git commit
  ↓
Netlify build → fotka je v dist/gallery/uploads/
```

**Čtení v Astro:**
```typescript
const images = (article.data.images || []).map(i => i.src);
// Výsledek: ["/gallery/uploads/foto1.jpg", "/gallery/uploads/foto2.jpg"]
```

**Fullscreen modal:**
- Inline `<script define:vars={{ images }}>` v `.astro` souboru
- Vanilla JS pro navigaci (prev/next, keyboard)
- Žádný framework potřeba

### Téma (dark/light mode)

**localStorage** + CSS custom properties:

```javascript
// scripts.js
function setTheme(theme) {
  if (theme === 'light') {
    document.documentElement.classList.add('light');
  } else {
    document.documentElement.classList.remove('light');
  }
  localStorage.setItem('wwcb_theme', theme);
}
```

**CSS:**
```css
:root {
  --bg: #0f172a;
  --text: #f1f5f9;
}

:root.light {
  --bg: #ffffff;
  --text: #0f172a;
}
```

### Tajný admin vstup

**Header.astro:**
```javascript
// 2 kliky na logo do 5 sekund → /admin/index.html
let clicks = 0;
logoLink.addEventListener('click', (e) => {
  e.preventDefault();
  clicks++;
  if (clicks === 2) window.location.href = '/admin/index.html';
});
```

---

## 🐛 Troubleshooting

### CMS neukazuje články

**Problém:** V CMS vidím jen 2 články, ale v `src/content/news/` jich je víc.

**Důvod:** CMS čte z GitHubu, ne z lokálního disku.

**Fix:**
```bash
git add src/content/news/
git commit -m "add articles"
git push origin main
```
Počkej na Netlify build → refresh CMS.

---

### "TypeError: Cannot read properties of undefined (reading 'path')"

**Problém:** CMS error při uploadu fotek.

**Důvod:** `field: widget: image` syntax nefunguje v Decap 3.x.

**Fix:** Používej `fields` (plural):
```yaml
- label: "Galerie fotek"
  name: "images"
  widget: "list"
  fields:
    - { label: "Fotka", name: "src", widget: "image" }
```

---

### "Authentication error requires api access"

**Problém:** Nemůžeš publikovat v CMS.

**Důvod:** Git Gateway není povolený.

**Fix:**
1. Netlify → Site Settings → Identity → Services
2. **Enable Git Gateway**
3. Autorizuj GitHub přístup

---

### Build fail: "does not match schema"

**Problém:** Build failuje s chybou validace.

**Důvod:** `.md` soubor má špatnou strukturu frontmatter.

**Fix:**
```bash
# Najdi problémový soubor v build logu
# Zkontroluj frontmatter:
---
title: "Název"  # ✅ string
date: 2025-12-20T00:00:00.000Z  # ✅ date ISO formát
excerpt: "Popis"  # ✅ string
image: "/path.jpg"  # ✅ string
images:  # ✅ array of objects
  - src: "/foto1.jpg"
  - src: "/foto2.jpg"
---
```

---

### Carousel ukazuje prázdno

**Problém:** Homepage carousel je prázdný.

**Důvod:** Žádné články v `src/content/news/` nebo `showLatestNews: false`.

**Fix:**
1. Zkontroluj `src/content/settings/site-settings.md` → `showLatestNews: true`
2. Přidej alespoň 1 článek v CMS
3. Push → build

---

### Fotky se nezobrazují

**Problém:** Obrázky mají 404.

**Možné důvody:**

**1. Špatná cesta v .md:**
```yaml
# ❌ Relativní cesta
image: "gallery/foto.jpg"

# ✅ Absolutní cesta (začíná /)
image: "/gallery/foto.jpg"
```

**2. Fotka není v `public/`:**
```
public/gallery/uploads/foto.jpg  ✅
src/gallery/uploads/foto.jpg     ❌ (nezkopíruje se do dist/)
```

**3. Build cache:**
```bash
rm -rf dist/ .astro/
npm run build
```

---

### Non-fast-forward error při push

**Problém:** Git odmítá push.

**Důvod:** Remote (GitHub) má novější commits než lokální.

**Fix:**
```bash
# Bezpečná varianta (merge)
git pull origin main --rebase
git push origin main

# Nebo force (PŘEPÍŠE remote!)
git push origin main --force
```

**Doporučení:** Edituj **buď** lokálně **NEBO** v CMS, ne obojí najednou.

---

## 📚 Další informace

### Dokumentace

- **Astro:** https://docs.astro.build
- **Decap CMS:** https://decapcms.org/docs/
- **Netlify:** https://docs.netlify.com

### Stack

- **Framework:** Astro 5.x (Static Site Generator)
- **CMS:** Decap CMS 3.x (Git-based)
- **Hosting:** Netlify (CDN + CI/CD)
- **Styling:** Vanilla CSS (custom properties)
- **Content:** Markdown + YAML frontmatter
- **Validation:** Zod schema

### Výhody tohoto setupu

✅ **Statický web** → rychlý, bezpečný, levný hosting  
✅ **Git jako databáze** → versionování, rollback, offline edit  
✅ **No-code CMS** → netechničtí uživatelé mohou spravovat obsah  
✅ **TypeScript validace** → build failne při chybných datech  
✅ **Automatický deploy** → push → web je live za ~1 minutu  

---

## 🤝 Podpora

**Issues:** https://github.com/Pajsti/WW-CB-CMS-Final/issues  
**Email:** kontakt na klubu

---

**Made with ❤️ for WW-CB**
