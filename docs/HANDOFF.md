# המשך עבודה בסשן חדש

עודכן ב־18.09.2026. זהו מקור האמת הקצר למצב הפרויקט.

## מצב Git

- תיקייה: `C:\nofar_kapury_new_web`
- remote: `https://github.com/ronbn1/nofarKapuryNew.git`
- ענף: `main`
- commit האחרון שנמצא ב־GitHub: `2b9ff09` — `Build Nofar Kapury Hebrew bridal website with SEO and accessibility`
- יש שינויים מקומיים שטרם בוצע להם commit או push. אין למחוק או לדרוס אותם.

השינויים המקומיים כוללים:

- החלפת `public/images/nofar-12.jpg` בתמונה הראשונה מהפוסט `https://www.instagram.com/p/DTYPyl_DCPO/?img_index=1`, כולל WebP ותיעוד ב־`docs/instagram-assets.json`.
- שינוי קטגוריית „גלים ותנועה” ל־„שיער פזור”; כעת יש שתי תמונות „שיער אסוף” וארבע „שיער פזור”.
- תיקון הגלריה למדרגות מחזוריות עקביות: שלוש עמודות בדסקטופ ושתי עמודות במובייל.
- תיקון ניווט המובייל: סגירת Sheet, העברת מיקוד לסקשן וגלילה חלקה; במצב reduced motion המעבר מיידי.
- בדיקה חדשה `tests/navigation.spec.ts`.
- עדכון מסמכי הפרויקט למצב הנוכחי.

## מצב בדיקות

- `npm run build` עבר אחרי החלפת התמונה, שינוי הקטגוריה ותיקוני הגלריה/ניווט.
- `npm run test:e2e:production -- tests/navigation.spec.ts tests/home.spec.ts` עבר: 4 בדיקות.
- לאחר הוספת הגלילה החלקה, `npm run test:e2e:production -- tests/navigation.spec.ts` עבר: 2 בדיקות.
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
- Cloudflare הציגה מצב המתנה ל־nameserver propagation.
- בבדיקת `Resolve-DnsName` מ־18.09.2026 עדיין הופיעו `ns1.sitesdepot.com` ו־`ns2.sitesdepot.com`, עם רשומות ישנות ל־`95.175.38.2` ול־Heroku. לא לערוך עוד את אזור ה־DNS הישן ב־Internic; לאחר שהאצלה תושלם, מנהלים רשומות ב־Cloudflare.

הצעד הבא:

1. לבדוק אם ה־zone ב־Cloudflare הוא `Active` ואם NS ציבורי כבר מצביע ל־Cloudflare.
2. ב־Workers & Pages → `nofarkapurynew` → Custom domains, להוסיף את `nofarkapury.co.il` ואת `www.nofarkapury.co.il`.
3. לבחור `www` ככתובת הראשית, בהתאם ל־canonical בקוד, ולהגדיר 301 מה־apex ל־www.
4. לבדוק HTTPS, סטטוס 200, ‏404 אמיתי, robots, sitemap, canonical, התמונות והעמודים המשפטיים.
5. לבדוק אם Pages מפנה `/privacy.html` אל `/privacy` ו־`/accessibility.html` אל `/accessibility`, וליישר קישורים, canonical ו־sitemap לפני אינדוקס.
6. רק לאחר שהכול תקין לשנות `SITE_INDEXABLE=true`, לבצע deploy חדש ולהוסיף Search Console.

## תוכן והחלטות עסקיות

- המסר הראשי: „איפור ועיצוב שיער לכלות באשדוד ובכל הארץ”. המיקוד המקומי הוא אשדוד, אך נופר מגיעה למקום ההתארגנות בכל הארץ.
- אין קבלת לקוחות בכתובת העסק. פגישת היכרות מתקיימת בבית קפה באשדוד עם קפה ועוגה; אין בה איפור או עיצוב שיער.
- טלפון/WhatsApp: `054-6477885`; דוא״ל: `nofarkapury@gmail.com`; Instagram: `@nofar_kapury`.
- פרופיל Google Maps שאושר: `https://www.google.com/maps?cid=18267426247887072473`. קיים רישום נוסף ישן/כפול שטרם טופל.
- אין מחירון ואין טופס. יש מקדמה לשריון, אך תנאי ההזמנה והביטול לא נוסחו באתר.
- קישור ייעודי לביטול בדוא״ל הוסר לבקשת המשתמש.
- המשתמש אישר שיש הרשאות לפרסום התמונות. המסמכים עצמם לא נבדקו.
- פיד Instagram חי והמלצות נדחו להמשך.

## מגבלות ידועות

- כפתור הנגישות הוא כלי עזר בלבד ואינו מכסה לבדו את הרגולציה. חסרה בדיקת נגישות ידנית מקצועית, לרבות קורא מסך.
- מדיניות הפרטיות והצהרת הנגישות הן בסיס מותאם למידע שנמסר, לא חוות דעת משפטית.
- אין כרגע analytics, pixels, embeds, localStorage או עוגיות מהקוד. יש לבדוק מחדש אם מוסיפים שירותים.
- ציון Lighthouse מקומי אחרון לפני השינויים האחרונים: Performance 98, Accessibility 100, Best Practices 100, SEO 100. זה אינו מבטיח דירוג או עמידה חוקית.
