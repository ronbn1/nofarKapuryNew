export const navigation = [
  { label: 'נעים להכיר', href: '#about' },
  { label: 'הכלות שלי', href: '#portfolio' },
  { label: 'איפור ושיער', href: '#services' },
  { label: 'החוויה שלך', href: '#experience' },
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

export const portfolioImages = [
  {
    id: 'soft',
    src: '/images/optimized/nofar-05.webp',
    title: 'בדיוק כמו שאת',
    category: 'שיער אסוף',
    alt: 'כלה בשמלת קולר לבנה, איפור ורדרד ושיער אסוף עם קווצות עדינות סביב הפנים',
    position: '50% 40%',
    postUrl: 'https://www.instagram.com/nofar_kapury/p/Dc9E5txDCwK/',
  },
  {
    id: 'waves',
    src: '/images/optimized/nofar-08.webp',
    title: 'רכות בכל תנועה',
    category: 'גלים ותנועה',
    alt: 'כלה עם שיער חום גלי פזור, איפור עיניים מודגש ושפתיים בגוון טבעי',
    position: '50% 40%',
    postUrl: 'https://www.instagram.com/nofar_kapury/p/DcG-aAKjCs6/',
  },
  {
    id: 'updo',
    src: '/images/optimized/nofar-09.webp',
    title: 'היופי שבפרטים',
    category: 'שיער אסוף',
    alt: 'כלה מביטה לאחור, עם תסרוקת אסופה נמוכה, קווצות סביב הפנים ושמלת תחרה',
    position: '50% 35%',
    postUrl: 'https://www.instagram.com/nofar_kapury/p/DcEYgkXjNjm/',
  },
  {
    id: 'romantic',
    src: '/images/optimized/nofar-06.webp',
    title: 'רגע של קסם',
    category: 'גלים ותנועה',
    alt: 'כלה בשמלת תחרה לבנה מחזיקה זר פרחים, עם שיער כהה גלי ואיפור רך',
    position: '50% 40%',
    postUrl: 'https://www.instagram.com/nofar_kapury/p/Dcq-xwTDGwn/',
  },
  {
    id: 'pearls',
    src: '/images/optimized/nofar-07.webp',
    title: 'נגיעה רומנטית',
    category: 'גלים ותנועה',
    alt: 'כלה בשמלה לבנה עם שיער כהה ארוך וגלי המעוטר בפנינים',
    position: '50% 40%',
    postUrl: 'https://www.instagram.com/nofar_kapury/p/Dcgqo9iDKTS/',
  },
  {
    id: 'glow',
    src: '/images/optimized/nofar-12.webp',
    title: 'זוהר שנשאר איתך',
    category: 'שיער אסוף',
    alt: 'דיוקן כלה עם שיער בלונדיני אסוף, קווצות מסביב לפנים ואיפור עיניים עדין',
    position: '50% 35%',
    postUrl: 'https://www.instagram.com/nofar_kapury/p/DZsjWNdjO7f/',
  },
] as const
