# מבנה האתר ומצב המימוש

עודכן ב־18.09.2026.

## תשתית וזרימת build

האתר בנוי ב־React, ‏Vite ו־TypeScript, עם Tailwind CSS ו־shadcn/ui על רכיבי Radix. כל הממשק בעברית וב־RTL דרך `DirectionProvider`.

Vite בונה שלושה קובצי HTML: עמוד הבית, `/privacy.html` ו־`/accessibility.html`. לאחר build הלקוח, `scripts/build.mjs` בונה כניסת SSR מ־`src/entry-server.tsx`, מרנדר לכל עמוד HTML מלא ומוסיף metadata, canonical ו־JSON-LD. בדפדפן `src/main.tsx` מבצע hydration. קיים `404.html` אמיתי כדי למנוע fallback גורף לעמוד הבית.

`scripts/optimize-images.mjs` מייצר WebP לתמונת הפתיחה ולגלריה. המקורות נשמרים ב־`public/images/`, והנגזרות ב־`public/images/optimized/`.

## מבנה קיים

```text
public/
  brand/                         עותקי הלוגו
  images/                        תמונות מקור אמיתיות מהאינסטגרם
    optimized/                   נגזרות WebP ותמונת שיתוף
scripts/
  build.mjs                      build, prerender, SEO, sitemap ו־404
  optimize-images.mjs            אופטימיזציית תמונות
src/
  app/                           App ובחירת עמוד לפי pathname, ספק RTL
  components/                    layout, shared ורכיבי shadcn/ui
  config/                        פרטי העסק והגדרות SEO
  content/                       תוכן הבית והעמודים המשפטיים
  features/
    accessibility/               כלי התאמות התצוגה
    home/sections/                מקטעי עמוד הבית
    legal/                        תבנית עמוד משפטי
    portfolio/                    גלריה, סינון ו־Dialog
  lib/                           יצירת SEO וכלי CSS
  entry-server.tsx                רינדור סטטי בזמן build
  main.tsx                        hydration/הרצת לקוח
  styles/globals.css              עיצוב, RTL, רספונסיביות ונגישות
tests/                            home, legal, navigation, SEO ו־build
```

## החלטות מוצר ותוכן

- אין מחירון ואין טופס יצירת קשר. הפנייה נעשית בטלפון או ב־WhatsApp.
- נופר יוצאת מאשדוד ומגיעה למקום ההתארגנות ברחבי הארץ. אין קבלת לקוחות בכתובת העסק.
- פגישת ההיכרות מתקיימת בבית קפה באשדוד, עם קפה ועוגה, ללא ניסיון איפור או שיער.
- הגלריה משתמשת בתמונות אמיתיות ומאושרות. היא מדורגת כמדרגות; הקטגוריות הן „שיער אסוף” ו„שיער פזור”.
- תפריט המובייל נסגר לפני המעבר, מעביר מיקוד לסקשן ומבצע גלילה חלקה. הפחתת תנועה מבטלת את האנימציה.
- פיד אינסטגרם חי נדחה. מקטע המלצות אמיתיות מ־mit4mit קיים ללא embed; אין כרגע אנליטיקה או קוד מעקב.

## נגישות ומשפטי

קיימים skip link, ניווט מקלדת, מבנה סמנטי, חלוניות נגישות, טקסטים חלופיים, ניגודיות, תמיכה בהפחתת תנועה וכפתור להתאמת טקסט/ניגודיות/תנועה. קיימים עמודי פרטיות ונגישות עם פרטי קשר. בדיקות Playwright ו־axe מכסות את הזרימות הקיימות, אך אינן אישור לעמידה מלאה בת״י 5568; נדרשת בדיקה ידנית מקצועית לפני הצהרה מלאה.

## פריסה

Cloudflare Pages מחובר לריפו `ronbn1/nofarKapuryNew` ולענף `main`. הגדרות הייצור: `npm run build`, פלט `dist`, ‏Node 22. בעת ההקמה הוגדר `SITE_INDEXABLE=false` עד השלמת DNS ובדיקות הדומיין.

הדומיין רשום ב־Internic ושרתי השמות הועברו ל־Cloudflare. נכון ל־18.09.2026 שני הדומיינים פעילים עם SSL ו־DNS ציבורי תקין. האתר נפתח אצל המשתמש לאחר הפעלת Secure DNS בדפדפן. פרטי ההמשך נמצאים ב־`docs/HANDOFF.md`.

## משימות עתידיות

1. להגדיר הפניית 301 מה־apex ל־www. בבדיקה מ־18.09.2026 שתי הגרסאות עדיין החזירו 200.
2. לבדוק וליישר את כתובות העמודים המשפטיים עם canonical ו־sitemap לפני אינדוקס.
3. לאחר העלאת השינויים המקומיים, להפעיל `SITE_INDEXABLE=true` ב־Cloudflare ולבצע deploy. כרגע האתר החי מחזיר `noindex, follow` ו־`sitemap.xml` מחזיר 404 כמתוכנן למצב staging.
4. לבדוק שוב 200/404, robots, sitemap, canonical ו־JSON-LD, ואז לחבר Search Console.
5. להשלים בדיקת נגישות ידנית ובדיקה משפטית של תנאי ההזמנה, המקדמה והביטול.
6. לשקול פיד אינסטגרם חי רק לאחר בחירת פתרון והרשאות ותכולת פרטיות מתאימה.
