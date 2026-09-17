# אתר נופר קפורי

תשתית אתר בעברית עם React, Vite, TypeScript, Tailwind CSS ו־shadcn/ui.
עמוד תדמית מלא בגווני הלוגו, עם פתיח, אודות, גלריית עבודות אמיתיות, שירותים, תהליך עבודה, שאלות נפוצות וקישורי WhatsApp.
גלריית העבודות משתמשת בעותקים מקומיים של תמונות מחשבון האינסטגרם של נופר, לפי בקשת בעלת העסק. אין באתר תמונות שנוצרו בבינה מלאכותית.

## הרצה

נדרשת Node.js בגרסה 22.12 ומעלה. גרסת היעד נמצאת ב־`.nvmrc`.

```sh
npm ci
npm run dev
npm run build
npm run lint
npm run test:e2e
```

במחשב הנוכחי מותקנת Node.js 16, ולכן הותקנה סביבת Node 22 מקומית בתוך `.tools/`, ללא שינוי התקנת המערכת.
ב־PowerShell מתוך תיקיית הפרויקט אפשר להשתמש בה כך:

```powershell
.\npm-local.cmd run dev
.\npm-local.cmd run build
.\npm-local.cmd run lint
.\npm-local.cmd run test:e2e
```

תיקיית `.tools/` אינה חלק מהקוד המשותף. במחשב אחר יש להתקין Node.js תואם ולהשתמש בפקודות npm הרגילות.
בדיקות הדפדפן משתמשות ב־Microsoft Edge ב־Windows. במערכות אחרות יש להתקין את Chromium של Playwright באמצעות `npx playwright install chromium`.
הבדיקות מכסות מחשב ונייד, גלריה, תפריט, מקלדת, קישורים, טעינת תמונות וסריקת axe. צילומי הבדיקה נכתבים ל־`artifacts/`.

## ארגון הפרויקט

ראו [מבנה הקומפוננטות ותוכנית ההמשך](docs/ARCHITECTURE.md) ואת [מסמך הדרישות](REQUIREMENTS.md).

- `src/app/`: נקודת כניסה וספק RTL.
- `src/components/ui/`: רכיבי shadcn/ui; יתווספו לפי צורך.
- `src/config/site.ts`: פרטי העסק וקישורי WhatsApp ואינסטגרם.
- `src/lib/`: כלי עזר משותפים.
- `src/styles/globals.css`: הגדרת Tailwind ובסיס shadcn.
- `public/brand/`: עותקים של שני הלוגואים שסופקו.
- `public/images/`: תמונות אמיתיות מתוך החשבון של נופר.
- `src/content/home.ts`: תוכן האתר ופרטי הגלריה, כולל קישורים לפוסטים המקוריים.
- `docs/instagram-assets.json`: תיעוד מקור תמונות האינסטגרם ותאריך הורדתן.
- `docs/DESIGN.md`: מחקר ההשראה והחלטות העיצוב.
- `docs/SEO.md`: שיפורי SEO, בדיקות ותוכנית ההשקה והקידום.

## בנייה לקידום אורגני

`npm run build` מייצר HTML מלא מראש, תמונות WebP, canonical, נתונים מובנים, robots.txt ומפת אתר עבור `https://www.nofarkapury.co.il/`.
העלאה לאחסון נעשית מתוך `dist/`. אין לפרסם את שרת הפיתוח. לסביבת staging מגדירים `SITE_INDEXABLE=false`; להגדרת דומיין שונה משתמשים ב־`SITE_URL`.
לאחר בנייה ניתן להריץ `npm run test:seo` ו־`npm run test:e2e:production` לבדיקת הקבצים והתנהגות האתר ללא JavaScript ועם hydration.

נוספו מדיניות פרטיות, הצהרת נגישות וכלי התאמת תצוגה. פרטים והשלמות לקראת השקה נמצאים ב־[מסמך הנושאים המשפטיים](docs/LEGAL.md). פיד אינסטגרם חי ובדיקת עמידה מלאה בנגישות טרם הושלמו.
