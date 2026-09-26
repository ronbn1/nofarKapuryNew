# Google Analytics 4

מזהה המדידה `G-MENXJSNJ8Y` שהמשתמש סיפק הוגדר ב־`src/config/site.ts`. המדידה מופעלת אוטומטית בדומייני האתר הציבורי. לפי בקשת המשתמש מ־26.09.2026 הוסרו חלונית ההסכמה והעדפות המדידה.

## הפעלה

1. ב־Google Analytics בוחרים/יוצרים נכס של האתר, אזור זמן ישראל ומטבע ILS. יוצרים Web data stream עבור `https://www.nofarkapury.co.il/` ומעתיקים Measurement ID מסוג `G-...`.
2. בהגדרות מקור הנתונים מכבים **Enhanced measurement**. האתר שולח page_view ואירועים ממוקדים בעצמו. כך נמנעים מכפילויות עקב ניווט בעוגנים וממדידה אוטומטית של קישורי וואטסאפ הכוללים טקסט בהודעה.
3. המזהה האמיתי כבר מוגדר בקוד, ולכן אין צורך להזינו שוב ב־Cloudflare. ניתן לדרוס אותו באמצעות `VITE_GA_MEASUREMENT_ID`; ערך ריק מפורש מכבה את המדידה. משאירים `VITE_GA_ALLOWED_HOSTS=www.nofarkapury.co.il,nofarkapury.co.il`. נדרשת בנייה ופריסה מחדש להפעלת השינויים. מזהה המדידה הוא ציבורי, לא מפתח סודי.
4. Google Signals, איסוף נתונים שהמשתמש מספק ותכונות פרסום אינם נחוצים לחיבור זה; אין להפעילם במסגרת ההתקנה הבסיסית. ניתן לבחור שמירת נתוני משתמש ואירועים ל־2 חודשים בהגדרות הנכס.
5. לאחר הפריסה, בודקים ב־Realtime צפייה ואירוע `whatsapp_click` בעת טעינת העמוד. אין צורך לשלוח הודעה בפועל. בדיקות הקוד משתמשות בתג מדומה ואינן מאמתות הגעה לנכס האמיתי.

## מדדים

| אירוע | משמעות | פרמטרים |
|---|---|---|
| `page_view` | צפייה בעמוד בעת טעינת העמוד | כתובת ללא query/hash; כותרת העמוד |
| `whatsapp_click` | לחיצה לפתיחת וואטסאפ, לא ליד מאומת | `button_location`, `service_id` בשירותים |
| `phone_click` | לחיצה לחיוג, לא שיחה שהושלמה | `button_location` |
| `gallery_open` | פתיחת תמונה מהגלריה | `image_id` |
| `section_view` | לפחות חצי מכותרת המלצות/קשר הופיע במסך | `section_id` (`reviews-title` או `contact-title`) |

מיקומי הפנייה: `home`, `header`, `mobile_menu`, `floating`, `services`, `contact`, `footer`, מקטעים נוספים או `other`. מזהי שירותים הם 01–03 לפי הסדר באתר.

מומלץ לסמן `whatsapp_click` כ־Key event ולהגדיר Custom dimensions בהיקף Event עבור `button_location`, `service_id`, `image_id`, `section_id`. אין לסכום פתיחות וואטסאפ כמספר לקוחות או הזמנות.

להבחנה בין קמפיינים אפשר להשתמש ב־UTM, למשל `?utm_source=instagram&utm_medium=social&utm_campaign=profile`. אין להכניס שמות, טלפונים או מידע אישי לפרמטרי UTM. רק פרמטרי הקמפיין המוכרים נקראים; query/hash אחרים ותוכן הודעת וואטסאפ אינם נשלחים באירועים המותאמים.

## הפעלה אוטומטית

- gtag נטען ללא צורך בלחיצה או באחסון העדפה מקומית.
- בחירות מהגרסה הקודמת אינן משמשות עוד להפעלה או לכיבוי המדידה.
- תכונות הפרסום ו־Google Signals נשארות כבויות.
- דומייני פיתוח ותצוגה מקדימה מוחרגים. הבדיקות משתמשות בתג מדומה ובחסימת בקשות Google.
- מדיניות הפרטיות מתארת הפעלה אוטומטית ושימוש בעוגיות.

## מקורות

- https://developers.google.com/tag-platform/security/guides/consent
- https://developers.google.com/analytics/devguides/collection/ga4/views
- https://support.google.com/analytics/answer/9304153
