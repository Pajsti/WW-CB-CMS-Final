# Decap CMS Quick Start

## 1. Publikace na GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/ww-cb-astro.git
git push -u origin main
```

## 2. Deploy na Netlify

1. Přihlaš se na [Netlify](https://netlify.com)
2. "Add new site" → "Import an existing project"
3. Vyber GitHub repo
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Deploy!

## 3. Aktivace Netlify Identity (pro Git Gateway)

1. V Netlify dashboard → Site settings → Identity
2. Click "Enable Identity"
3. Settings → Identity → Registration: "Invite only" (bezpečnější)
4. Services → Git Gateway → "Enable Git Gateway"

## 4. Pozvání prvního uživatele

1. Identity tab → "Invite users"
2. Zadej email
3. Dostaneš pozvánku mailem
4. Nastav heslo

## 5. Přihlášení do CMS

1. Jdi na `https://tvuj-web.netlify.app/admin`
2. Přihlaš se přes Netlify Identity
3. Začni spravovat obsah!

## Alternativa: GitHub Backend

Pokud nechceš používat Netlify Identity, můžeš použít GitHub OAuth:

1. V `public/admin/config.yml` změň backend na:
```yaml
backend:
  name: github
  repo: username/ww-cb-astro
  branch: main
```

2. GitHub → Settings → Developer settings → OAuth Apps → New OAuth App
3. Homepage URL: `https://tvuj-web.netlify.app`
4. Authorization callback URL: `https://api.netlify.com/auth/done`
5. Zkopíruj Client ID a Client Secret
6. Netlify → Site settings → Access control → OAuth → Install provider → GitHub
7. Vlož Client ID a Secret

## Lokální vývoj s CMS

Pro testování CMS lokálně:

```bash
npx netlify-cms-proxy-server
```

V jiném terminálu:

```bash
npm run dev
```

Pak otevři `http://localhost:4321/admin`

Lokálně nebude vyžadovat přihlášení a změny se ukládají přímo do souborů.
