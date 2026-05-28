#!/bin/bash
echo ""
echo " WW-CB — Push na GitHub"
echo " ========================"
echo ""

# Inicializovat git pokud neni
if [ ! -d ".git" ]; then
  echo " Inicializuji Git..."
  git init
  git branch -M main
fi

# Nastavit remote
if ! git remote get-url origin > /dev/null 2>&1; then
  git remote add origin https://github.com/Pajsti/WW-CB-CMS-Final.git
else
  git remote set-url origin https://github.com/Pajsti/WW-CB-CMS-Final.git
fi

# Commit
git add .
read -p " Commit zprava (Enter = 'update'): " MSG
MSG=${MSG:-update}
git commit -m "$MSG"

# Push
echo ""
echo " Pushuji na GitHub..."
git push -u origin main --force

if [ $? -eq 0 ]; then
  echo ""
  echo " Hotovo! Netlify rebuildne za ~2 minuty."
else
  echo ""
  echo " Push selhal. Zkontroluj GitHub přihlašení."
fi
echo ""
