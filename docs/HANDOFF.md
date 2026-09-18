# המשך עבודה בסשן חדש

עודכן ב־18.09.2026. זהו מקור האמת הקצר למצב הפרויקט.

## מצב Git

- תיקייה: `C:\nofar_kapury_new_web`
- remote: `https://github.com/ronbn1/nofarKapuryNew.git`
- ענף: `main`
- ענף `main` מחובר ל־Cloudflare Pages; יש לבדוק את ה־commit האחרון באמצעות `git log -1 --oneline`.
- יש שינויים מקומיים שטרם בוצע להם commit או push. אין למחוק או לדרוס אותם.

השינויים המקומיים כוללים:

- מקטע המלצות חדש עם שלוש ביקורות מאומתות ב־mit4mit של קייט, ירדן וענבר. לכל כרטיס יש תמונה שהלקוחה צירפה, ציטוט קצר, שם פרטי וקישור ישיר למקור. המקטע נמצא מיד אחרי הגלריה, מובדל ממנה באמצעות רקע, קו עליון וסמן ממורכז, ומופיע בתפריט בשם „כלות מספרות” מיד אחרי „הכלות שלי”. במובייל הוא מוצג כקרוסלת swipe עם בקרי ניווט נגישים.
- בדיקות לתמונות ההמלצות, לקרוסלה ולניווט אל המקטע.
- עדכון מסמכי הפרויקט למצב הנוכחי. השינויים האלה טרם עברו commit או push.

## מצב בדיקות

- `npm run build` עבר אחרי החלפת התמונה, שינוי הקטגוריה ותיקוני הגלריה/ניווט.
- `npm run test:e2e:production -- tests/navigation.spec.ts tests/home.spec.ts` עבר: 4 בדיקות.
- לאחר הוספת הגלילה החלקה, `npm run test:e2e:production -- tests/navigation.spec.ts` עבר: 2 בדיקות.
- לאחר הוספת ההמלצות: build ו־lint עברו, `test:seo` עבר 3 בדיקות ו־`test:e2e` עבר 8 בדיקות בדסקטופ ובמובייל, כולל axe.
- לאחר שינוי המיקום, העיצוב והתפריט: build ו־lint עברו; בדיקות `home` ו־`navigation` עברו בדסקטופ ובמובייל. לפני push יש להריץ שוב את החבילה המלאה.
- חבילת ה־production המלאה הורצה לפני העלאה: 12 בדיקות עברו בדסקטופ ובמובייל, נוסף ל־3 בדיקות SEO, build ו־lint.
- לפני commit/push יש להריץ חבילה מלאה:

```powershell
.\npm-local.cmd run build
.\npm-local.cmd run lint
.\npm-local.cmd run test:seo
.\npm-local.cmd run test:e2e:production
```

## Cloudflare Pages

- פרויקט: `nofarkapurynew`
- כתובת זמנית: `https://nofarkapurynew.pages.dev/`
- מחובר ל־GitHub ול־`main`; כל push ל־`main` אמור להפעיל build ופריסה.
- Build command: `npm run build`; Output directory: `dist`; Root directory: ריק; Framework preset: None.
- משתנים שהוגדרו בעת ההקמה: `NODE_VERSION=22`, ‏`SITE_URL=https://www.nofarkapury.co.il/`, ‏`SITE_INDEXABLE=false`.
- לא להפעיל `SITE_INDEXABLE=true` עד שהדומיין, ההפניות והעמודים המשפטיים נבדקו בייצור.

## DNS ודומיין

- הדומיין רשום ב־Internic ואין עליו מייל או שירות פעיל אחר לפי המשתמש.
- ב־Internic הוזנו `beth.ns.cloudflare.com` ו־`rene.ns.cloudflare.com`.
- Cloudflare מציגה את `nofarkapury.co.il` ואת `www.nofarkapury.co.il` כ־Active עם SSL enabled. שני הדומיינים מחוברים לפרויקט Pages.
- DNS ציבורי של Cloudflare ושל Google כבר מחזיר את `beth.ns.cloudflare.com` ו־`rene.ns.cloudflare.com`. בדיקת HTTPS ישירה מול Cloudflare החזירה `200 OK` לשתי הכתובות.
- שרת ה־DNS המקומי/של ספק האינטרנט החזיר תחילה את רשומות SitesDepot/Heroku הישנות. לאחר הפעלת Secure DNS בדפדפן המשתמש אישר שהאתר נפתח.

בדיקת ייצור מ־18.09.2026:

- הוגדרה הפניית Single Redirect ב־Cloudflare מה־apex ל־www. בדיקות לעמוד הבית ול־`/privacy?source=test` החזירו 301 לכתובת הנכונה תוך שמירת הנתיב והפרמטר; גרסת www החזירה 200 ללא לולאה.
- דפי `/privacy` ו־`/accessibility` מחזירים 200.
- האתר החי כולל `noindex, follow`, ו־`/sitemap.xml` מחזיר 404 משום ש־`SITE_INDEXABLE=false`.

הצעדים הבאים:

1. לבדוק HTTPS, סטטוס 200, ‏404 אמיתי, robots, sitemap, canonical, התמונות והעמודים המשפטיים.
2. לבדוק אם Pages מפנה `/privacy.html` אל `/privacy` ו־`/accessibility.html` אל `/accessibility`, וליישר קישורים, canonical ו־sitemap לפני אינדוקס.
3. רק לאחר שהכול תקין לשנות `SITE_INDEXABLE=true`, לבצע deploy חדש ולהוסיף Search Console.

## תוכן והחלטות עסקיות

- המסר הראשי: „איפור ועיצוב שיער לכלות באשדוד ובכל הארץ”. המיקוד המקומי הוא אשדוד, אך נופר מגיעה למקום ההתארגנות בכל הארץ.
- אין קבלת לקוחות בכתובת העסק. פגישת היכרות מתקיימת בבית קפה באשדוד עם קפה ועוגה; אין בה איפור או עיצוב שיער.
- טלפון/WhatsApp: `054-6477885`; דוא״ל: `nofarkapury@gmail.com`; Instagram: `@nofar_kapury`.
- פרופיל Google Maps שאושר: `https://www.google.com/maps?cid=18267426247887072473`. קיים רישום נוסף ישן/כפול שטרם טופל.
- אין מחירון ואין טופס. יש מקדמה לשריון, אך תנאי ההזמנה והביטול לא נוסחו באתר.
- קישור ייעודי לביטול בדוא״ל הוסר לבקשת המשתמש.
- המשתמש אישר שיש הרשאות לפרסום התמונות. המסמכים עצמם לא נבדקו.
- פיד Instagram חי נדחה להמשך. שלוש המלצות אמיתיות מ־mit4mit נוספו עם קישורי מקור; אין דירוג מצטבר באתר.

## מגבלות ידועות

- כפתור הנגישות הוא כלי עזר בלבד ואינו מכסה לבדו את הרגולציה. חסרה בדיקת נגישות ידנית מקצועית, לרבות קורא מסך.
- מדיניות הפרטיות והצהרת הנגישות הן בסיס מותאם למידע שנמסר, לא חוות דעת משפטית.
- אין כרגע analytics, pixels, embeds, localStorage או עוגיות מהקוד. יש לבדוק מחדש אם מוסיפים שירותים.
- ציון Lighthouse מקומי אחרון לפני השינויים האחרונים: Performance 98, Accessibility 100, Best Practices 100, SEO 100. זה אינו מבטיח דירוג או עמידה חוקית.
