# מבנה האתר ותוכנית העבודה

## השלב הנוכחי: עמוד תדמית מעוצב

React + Vite + TypeScript, Tailwind CSS ו־shadcn/ui. נבנה עמוד מלא בגווני הלוגו עם גלריית עבודות אמיתיות של נופר.
כיוון המסמך RTL, השפה עברית, ו־DirectionProvider מעביר כיוון לרכיבי Radix.
ב־build נוצר HTML סטטי מלא באמצעות `src/entry-server.tsx` ו־`scripts/build.mjs`; `src/main.tsx` מפעיל hydration בייצור. כך התוכן גלוי למנועי חיפוש גם לפני JavaScript.
`src/config/seo.ts` ו־`src/lib/seo.ts` מגדירים metadata, canonical ונתונים מובנים. robots.txt ומפת האתר נוצרים לפי הדומיין ומצב האינדוקס.
`scripts/optimize-images.mjs` יוצר נגזרות WebP תוך שמירת התמונות המקוריות. מדריך השקה וקידום נמצא ב־`docs/SEO.md`.
קובצי הלוגו המקוריים נשמרים בשורש ומועתקים ללא שינוי אל `public/brand/`.
סמל `Symbol1.png` משמש בכותרת, בתחתית העמוד וב־favicon. השם בעברית נבדק מול הפרופיל: נופר קפורי.

## מבנה מתוכנן

הקבצים והספריות המסומנים כמתוכננים ייווצרו כאשר ימומש השלב שלהם.

```text
public/brand/                   שני קובצי הלוגו
src/
  app/
    App.tsx                     נקודת הכניסה לאפליקציה
    providers.tsx               ספק כיוון RTL
    router.tsx                  מתוכנן: ניווט לעמודי האתר
  components/
    ui/                         רכיבי shadcn/ui משותפים
    layout/                     Header עם תפריט נייד, Footer; קישור דילוג נמצא ב־App
    shared/                     Logo, WhatsAppButton, SectionHeading
  pages/                        מתוכנן: HomePage, PrivacyPage, AccessibilityPage, NotFoundPage
  features/
    home/sections/              Hero, About, Services, Experience, Questions, Contact
    portfolio/                  PortfolioSection: סינון ו־Dialog להגדלה
    instagram/                  מתוכנן: InstagramSection, InstagramPost, useInstagramFeed, instagram-api
  content/home.ts               טקסטים בעברית, שירותים, שאלות ותמונות עם מקורות
  config/site.ts                פרטי העסק וקישורי יצירת קשר
  hooks/                        מתוכנן: רק לוגיקה משותפת שנדרשת בפועל
  lib/utils.ts                  עזר לאיחוד מחלקות Tailwind
  styles/globals.css            חיבור Tailwind ומשתני shadcn בסיסיים
docs/ARCHITECTURE.md
```

## חלוקת אחריות

- עמוד בית עם מקטעים וקישורי עוגן; עמודים עצמאיים למדיניות פרטיות ולהצהרת נגישות.
- קיימים רכיבי shadcn: Button לפעולות, Sheet לתפריט נייד, Dialog לגלריה ו־Accordion לשאלות. נוסחי הממשק כולל סגירה בעברית. המלצות יתווספו כשיהיה תוכן מאומת.
- הטקסטים והמידע יופרדו מהתצוגה. אין מחירון, טווחי מחיר או טופס יצירת קשר.
- קישור WhatsApp מרכזי: `https://wa.me/972546477885`.
- שימוש במחלקות לוגיות כגון `ms-*`, `pe-*`, `text-start`, `start-*`; גם רכיבים שמוצגים ב־portal ייבדקו ב־RTL.
- עיצוב mobile-first, תמונות מותאמות בגודלן, וכיבוד העדפת תנועה מופחתת.

## אינסטגרם ותוכן להמשך

הפיד החי נדחה לשלב הבא לפי הנחיית המשתמש. הגלריה הנוכחית היא אוסף מקומי של תמונות עבודות מהחשבון, עם קישורי מקור; היא אינה מוצגת כפיד חי.
להמשך הפיד: יש לבחור חיבור רשמי או ספק embed ולברר את דרישות החיבור לחשבון לפני המימוש.
רכיב התצוגה יופרד מהשגת הנתונים; אם נדרשים סודות, הם יישמרו בשרת בלבד ולא במשתני `VITE_*`.
יוגדרו מצבי טעינה, שגיאה והיעדר פוסטים, עם קישור לפרופיל. אין להציג תמונות קבועות כפיד חי.
נדרשים להמשך תמונות עבודות מאושרות, המלצות אמיתיות ומקורן, קישור פייסבוק ופרטי העסק למסמכים.

## נגישות ופרטיות

יעד הפרויקט הוא דרישת הנגישות המפורטת ב־REQUIREMENTS.md. התקנת רכיבי UI אינה אישור עמידה בתקן.
בשלב המימוש ייבדקו מקלדת, סדר מיקוד, חלוניות, כותרות, טקסט חלופי, ניגודיות, הגדלה וקורא מסך.
הצהרת הנגישות תתאר את מצב האתר שנבדק בפועל. מדיניות הפרטיות תותאם לשירותים שיחוברו ולאיסוף הנתונים בפועל.
טעינת תוכן חיצוני והצורך בהודעת עוגיות ייקבעו לפי פתרון האינסטגרם ושירותים נוספים, אם יהיו.

## שלבים הבאים

1. סיכום מבנה התיקיות והקומפוננטות עם בעל הפרויקט.
2. בחירת צבעים, טיפוגרפיה עברית ושימוש בלוגו לכיוון soft luxury bridal.
3. מימוש מעטפת האתר ומקטעי התוכן בהדרגה.
4. גלריה, פיד חי ותוכן מאומת.
5. מסמכי פרטיות ונגישות, בדיקות רספונסיביות ונגישות, SEO וביצועים.

## מקורות תשתית

- https://vite.dev/guide/
- https://tailwindcss.com/docs/installation/using-vite
- https://ui.shadcn.com/docs/installation/vite
- https://ui.shadcn.com/docs/rtl
# עמודי פרטיות ונגישות

העמודים `/privacy.html` ו־`/accessibility.html` משתמשים באותו יישום React ובתבנית `src/features/legal/LegalPage.tsx`. התוכן נמצא ב־`src/content/legal.ts`. Vite בונה שלוש כניסות HTML, ו־`scripts/build.mjs` מרנדר כל עמוד לתוכן סטטי עם מטא־נתונים ייעודיים. קישורי HTML רגילים מאפשרים ניווט גם בלי JavaScript. פרטים להשלמה לפני השקה נמצאים ב־`docs/LEGAL.md`.
