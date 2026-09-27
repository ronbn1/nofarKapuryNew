export const navigation = [
  { label: 'נעים להכיר', href: '#about' },
  { label: 'הכלות שלי', href: '#portfolio' },
  { label: 'כלות מספרות', href: '#reviews' },
  { label: 'איפור ושיער', href: '#services' },
  { label: 'החוויה שלך', href: '#experience' },
  { label: 'שאלות נפוצות', href: '#questions' },
] as const

export const services = [
  {
    number: '01',
    title: 'איפור ועיצוב שיער לכלה',
    description:
      'מראה שלם שמתחיל בך. איפור שמדגיש את היופי הטבעי שלך ועיצוב שיער שמשלים אותו, בהתאמה לסגנון, לשמלה ולאופי האירוע.',
    detail: 'היום שלך. כל תשומת הלב שלי.',
  },
  {
    number: '02',
    title: 'פגישת היכרות על קפה',
    description:
      'אני מזמינה אותך לקפה ועוגה בבית קפה באשדוד. נשב בנחת, נדבר על הסגנון שלך, ההשראות וכל הפרטים לקראת היום הגדול. אני מקשיבה ורושמת הכול, כדי שנגיע ליום שלך עם תמונה ברורה ומשותפת.',
    detail: 'קפה, עוגה וזמן שמוקדש רק לך.',
  },
  {
    number: '03',
    title: 'מלוות, משפחה ואירועים',
    description:
      'גם לאמא, לאחות ולחברה הכי טובה מגיע להרגיש נפלא. איפור למלוות ולמשפחה, ואיפור ועיצוב שיער לערב ולאירועים מיוחדים.',
    detail: 'לרגעים שאת רוצה לזכור.',
  },
] as const

export const steps = [
  {
    title: 'מתחילות בשיחה',
    description: 'ספרי לי על התאריך, מקום ההתארגנות והמראה שאת אוהבת. נבדוק זמינות ונכיר קצת.',
  },
  {
    title: 'נפגשות לקפה',
    description:
      'ניפגש לקפה ועוגה בבית קפה באשדוד, נדבר על כל מה שחשוב לך וארשום את כל הפרטים לקראת יום החתונה.',
  },
  {
    title: 'את פשוט נהנית',
    description:
      'ביום החתונה אגיע למקום ההתארגנות שלך. עם זמן בשבילך, תשומת לב לפרטים ואווירה רגועה.',
  },
] as const

export const reviews = [
  {
    name: 'קייט',
    quote: 'מה שביקשתי זה מה שיצא: איפור לא מוגזם, עמיד, מדגיש את מה שרציתי להדגיש.',
    url: 'https://www.mit4mit.co.il/reviews/68e2663ceeee0d752e0e4bba',
    image: {
      src: '/images/reviews/kate-review.webp',
      alt: 'קייט מחייכת בזמן שנופר מאפרת אותה ביום החתונה',
      width: 730,
      height: 487,
    },
  },
  {
    name: 'ירדן',
    quote: 'האיפור היה מושלם ומותאם לי בדיוק כפי שרציתי וחלמתי... והאיפור היה עמיד לאורך כל הערב.',
    url: 'https://www.mit4mit.co.il/reviews/67bd79fceeee0d2b55381093',
    image: {
      src: '/images/reviews/yarden-review.webp',
      alt: 'ירדן לאחר איפור ועיצוב שיער, עם תלתלים ארוכים ואיפור כלה עדין',
      width: 730,
      height: 973,
    },
  },
  {
    name: 'ענבר',
    quote: 'האיפור היה פשוט מושלם – עדין, זוהר ומדויק, בדיוק כמו שחלמתי. הוא החזיק לאורך כל היום.',
    url: 'https://www.mit4mit.co.il/reviews/67b47e7deeee0db3222635e0',
    image: {
      src: '/images/reviews/inbar-review.webp',
      alt: 'ענבר מחייכת בזמן עיצוב השיער ביום החתונה',
      width: 730,
      height: 973,
    },
  },
] as const

export const questions = [
  {
    question: 'את מגיעה למקום ההתארגנות?',
    answer:
      'כן. אני יוצאת מאשדוד ומגיעה למקומות התארגנות ברחבי הארץ, בתיאום מראש. שלחי לי את המיקום ואת תאריך החתונה ונוכל לדבר על כל הפרטים.',
  },
  {
    question: 'אפשר לעשות איפור ושיער יחד?',
    answer:
      'בהחלט. אפשר לתאם איתי איפור ועיצוב שיער לכלה, כדי ליצור מראה שלם והרמוני שמתאים לך ולסגנון החתונה שלך.',
  },
  {
    question: 'מה כוללת פגישת ההיכרות ואיפה נפגשים?',
    answer:
      'אני מזמינה אותך לקפה ועוגה בבית קפה באשדוד. נכיר, נדבר על ההשראות שלך לאיפור ולשיער, על ההתארגנות ועל כל השאלות והבקשות שלך. אני רושמת את כל הפרטים שסיכמנו. זו פגישת שיחה ותכנון, ללא ביצוע איפור או עיצוב שיער בפגישה.',
  },
  {
    question: 'את מקבלת יותר מכלה אחת ביום?',
    answer: 'אני מלווה כלה אחת ביום, כדי להקדיש לך את מלוא תשומת הלב וליצור בוקר נעים ואישי.',
  },
  {
    question: 'איך בודקים אם התאריך שלי פנוי?',
    answer:
      'פשוט שולחים הודעה בוואטסאפ עם תאריך החתונה ומקום ההתארגנות. משם נמשיך בשיחה אישית על מה שחשוב לך.',
  },
] as const

export const brunetteImageIds: readonly string[] = [
  'natural-brunette',
  'gal-brunette',
  'updo',
  'eden-brunette',
  'linoy-brunette',
  'roni-brunette',
]

export const portfolioCollections = [
  { id: 'brunettes', label: 'ברונטיות', imageIds: brunetteImageIds },
  {
    id: 'light-hair',
    label: 'שיער בהיר / גוונים',
    imageIds: ['shani-light', 'evelin-light', 'anna-light', 'shelly-light', 'miri-light', 'dana-light'],
  },
] as const

export const portfolioImages = [
  {
    id: 'soft',
    width: 480,
    height: 640,
    detail: 'איפור ורדרד וקווצות סביב הפנים',
    src: '/images/optimized/nofar-05.webp',
    title: 'בדיוק כמו שאת',
    category: 'שיער אסוף',
    alt: 'כלה בשמלת קולר לבנה, איפור ורדרד ושיער אסוף עם קווצות עדינות סביב הפנים',
    position: '50% 40%',
    postUrl: 'https://www.instagram.com/nofar_kapury/p/Dc9E5txDCwK/',
  },
  {
    id: 'waves',
    width: 480,
    height: 640,
    detail: 'גלים רכים ואיפור עיניים מודגש',
    src: '/images/optimized/nofar-08.webp',
    title: 'רכות בכל תנועה',
    category: 'שיער פזור',
    alt: 'כלה עם שיער חום גלי פזור, איפור עיניים מודגש ושפתיים בגוון טבעי',
    position: '50% 40%',
    postUrl: 'https://www.instagram.com/nofar_kapury/p/DcG-aAKjCs6/',
  },
  {
    id: 'updo',
    width: 1280,
    height: 1707,
    detail: 'איפור עיניים עדין ושפתיים בגוון טבעי',
    src: '/images/optimized/nofar-09.webp',
    title: 'איפור כלה עדין',
    category: 'שיער אסוף',
    alt: 'כלה בשמלת תחרה עם איפור עיניים עדין ושפתיים בגוון טבעי',
    position: '50% 35%',
    postUrl: 'https://www.instagram.com/nofar_kapury/p/DcEYgkXjNjm/',
  },
  {
    id: 'romantic',
    width: 482,
    height: 640,
    detail: 'גלים כהים ואיפור רך',
    src: '/images/optimized/nofar-06.webp',
    title: 'רגע של קסם',
    category: 'שיער פזור',
    alt: 'כלה בשמלת תחרה לבנה מחזיקה זר פרחים, עם שיער כהה גלי ואיפור רך',
    position: '50% 40%',
    postUrl: 'https://www.instagram.com/nofar_kapury/p/Dcq-xwTDGwn/',
  },
  {
    id: 'pearls',
    width: 480,
    height: 640,
    detail: 'גלים ארוכים בשילוב פנינים',
    src: '/images/optimized/nofar-07.webp',
    title: 'נגיעה רומנטית',
    category: 'שיער פזור',
    alt: 'כלה בשמלה לבנה עם שיער כהה ארוך וגלי המעוטר בפנינים',
    position: '50% 40%',
    postUrl: 'https://www.instagram.com/nofar_kapury/p/Dcgqo9iDKTS/',
  },
  {
    id: 'glow',
    width: 1280,
    height: 1707,
    detail: 'שיער גלי ואיפור עדין',
    src: '/images/optimized/nofar-12.webp',
    title: 'זוהר שנשאר איתך',
    category: 'שיער פזור',
    alt: 'כלה מחייכת בחלוק לבן עם שיער ארוך וגלי בגווני חום ואיפור עדין',
    position: '50% 35%',
    postUrl: 'https://www.instagram.com/p/DTYPyl_DCPO/?img_index=1',
  },
  {
    id: 'natural-brunette',
    width: 1280,
    height: 1707,
    detail: 'איפור בגוונים טבעיים עם סומק עדין ושפתיים בגוון ניוד',
    src: '/images/optimized/nofar-14.webp',
    title: 'איפור טבעי',
    category: 'שיער פזור',
    alt: 'תקריב של איפור טבעי עם סומק עדין ושפתיים בגוון ניוד',
    position: '50% 40%',
    postUrl: 'https://www.instagram.com/nofar_kapury/p/DdCQ_tJsCDY/',
  },
  {
    id: 'gal-brunette',
    width: 1024,
    height: 1365,
    detail: 'איפור עיניים בגווני חום ושפתיים בגוון ורוד חום',
    src: '/images/optimized/nofar-15.webp',
    title: 'איפור בגוונים חמים',
    category: 'שיער פזור',
    alt: 'כלה בשמלת קולר לבנה עם איפור עיניים חום ושפתיים בגוון ורוד חום',
    position: '50% 40%',
    postUrl: 'https://www.instagram.com/nofar_kapury/p/DdoxRrsjDPh/',
  },
  {
    id: 'eden-brunette',
    width: 1280,
    height: 1706,
    detail: 'עיניים מודגשות, סומק ושפתיים ורודות',
    src: '/images/optimized/nofar-16.webp',
    title: 'עיניים מודגשות ושפתיים ורודות',
    category: 'שיער פזור',
    alt: 'כלה בשמלת סטרפלס עם עיניים מודגשות, סומק ושפתיים ורודות',
    position: '50% 40%',
    postUrl: 'https://www.instagram.com/nofar_kapury/p/DZe4fI8jL9v/',
  },
  {
    id: 'linoy-brunette',
    credit: 'איפור: נופר קפורי. עיצוב שיער: אופק שרי.',
    width: 1280,
    height: 1600,
    detail: 'סומק ורדרד, איפור עיניים עדין ושפתיים ורודות',
    src: '/images/optimized/nofar-17.webp',
    title: 'איפור בגווני ורוד',
    category: 'שיער פזור',
    alt: 'תקריב של איפור עדין עם סומק ורדרד ושפתיים ורודות',
    position: '50% 40%',
    postUrl: 'https://www.instagram.com/linoybenshoshan/p/DEAmGzXoJzB/',
  },
  {
    id: 'roni-brunette',
    width: 1280,
    height: 1707,
    detail: 'אייליינר עדין, סומק ושפתיים בגוון טבעי',
    src: '/images/optimized/nofar-18.webp',
    title: 'אייליינר עדין',
    category: 'שיער פזור',
    alt: 'כלה בחלוק תחרה לבן עם אייליינר עדין ושפתיים בגוון טבעי',
    position: '50% 35%',
    postUrl: 'https://www.instagram.com/nofar_kapury/p/DTLbOl5gh8k/',
  },
  {
    id: 'shani-light',
    width: 954,
    height: 1011,
    detail: 'איפור עיניים בגווני חום ושפתיים בגוון ניוד',
    src: '/images/optimized/nofar-19.webp',
    title: 'איפור בגווני חום',
    category: 'שיער בהיר / גוונים',
    alt: 'כלה בחלוק סאטן לבן עם איפור עיניים בגווני חום ושפתיים בגוון ניוד',
    position: '50% 40%',
    postUrl: 'https://www.instagram.com/nofar_kapury/p/DUBX1RCjP52/',
  },
  {
    id: 'evelin-light',
    width: 1280,
    height: 1706,
    detail: 'צלליות חומות, ריסים מודגשים ושפתיים בגוון טבעי',
    src: '/images/optimized/nofar-20.webp',
    title: 'איפור עיניים מודגש',
    category: 'שיער בהיר / גוונים',
    alt: 'תקריב של איפור עם צלליות חומות, ריסים מודגשים ושפתיים בגוון טבעי',
    position: '50% 40%',
    postUrl: 'https://www.instagram.com/nofar_kapury/p/DY43qTsDLfI/',
  },
  {
    id: 'anna-light',
    width: 1280,
    height: 1707,
    detail: 'איפור עדין שמשאיר את הנמשים גלויים',
    src: '/images/optimized/nofar-21.webp',
    title: 'איפור עדין עם נמשים',
    category: 'שיער בהיר / גוונים',
    alt: 'כלה מחייכת עם איפור עדין, נמשים גלויים ושפתיים בגוון טבעי',
    position: '50% 35%',
    postUrl: 'https://www.instagram.com/nofar_kapury/p/DZLEjYoDEmo/',
  },
  {
    id: 'shelly-light',
    width: 1280,
    height: 1707,
    detail: 'אייליינר, ריסים מודגשים ושפתיים ורדרדות',
    src: '/images/optimized/nofar-22.webp',
    title: 'אייליינר וריסים מודגשים',
    category: 'שיער בהיר / גוונים',
    alt: 'כלה בשמלת מחוך לבנה עם אייליינר, ריסים מודגשים ושפתיים ורדרדות',
    position: '50% 35%',
    postUrl: 'https://www.instagram.com/nofar_kapury/p/DTqRRUuDMQV/',
  },
  {
    id: 'miri-light',
    width: 1280,
    height: 1707,
    detail: 'סומק ושפתיים בגוון אפרסק עם איפור עיניים עדין',
    src: '/images/optimized/nofar-23.webp',
    title: 'איפור בגווני אפרסק',
    category: 'שיער בהיר / גוונים',
    alt: 'כלה מחייכת עם סומק ושפתיים בגוון אפרסק ואיפור עיניים עדין',
    position: '50% 35%',
    postUrl: 'https://www.instagram.com/nofar_kapury/p/DSpt3YMDCKK/',
  },
  {
    id: 'dana-light',
    width: 1080,
    height: 1433,
    detail: 'איפור טבעי עם סומק עדין והדגשה קלה של העיניים',
    src: '/images/optimized/nofar-24.webp',
    title: 'איפור טבעי עם סומק',
    category: 'שיער בהיר / גוונים',
    alt: 'כלה מחייכת בחלוק לבן עם איפור טבעי, סומק עדין ועיניים מודגשות',
    position: '50% 35%',
    postUrl: 'https://www.instagram.com/nofar_kapury/p/DRxZ0YyjPdO/?img_index=3',
  },
] as const
