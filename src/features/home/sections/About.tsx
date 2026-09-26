import { SectionHeading } from '@/components/shared/SectionHeading'

export function About() {
  return (
    <section id="about" className="section-space" aria-labelledby="about-title">
      <div className="page-container grid items-center gap-10 md:grid-cols-[.85fr_1.15fr] md:gap-24">
        <div>
          <SectionHeading eyebrow="נעים להכיר, אני נופר" id="about-title">
            מאחורי כל מראה יפה,
            <br />
            <span className="text-primary">יש מישהי שמקשיבה.</span>
          </SectionHeading>
          <img
            src="/images/optimized/nofar-13-640.webp"
            srcSet="/images/optimized/nofar-13-320.webp 320w, /images/optimized/nofar-13-640.webp 640w"
            sizes="(max-width: 767px) 240px, 280px"
            alt="נופר קפורי, מאפרת ומעצבת שיער לכלות"
            width={1122}
            height={1402}
            loading="lazy"
            decoding="async"
            className="mx-auto mt-8 h-auto w-60 max-w-full rounded-t-full border border-border p-2 md:mx-0 md:w-70"
          />
        </div>
        <div className="max-w-140 text-[15px] leading-8 text-muted-foreground">
          <p>
            אני נופר, מאפרת ומעצבת שיער לכלות מאשדוד, עם 10 שנות ניסיון ובוגרת בית הספר לאיפור של
            נטשה דנונה. לאורך השנים איפרתי ועיצבתי שיער למאות לקוחות מרוצות, וכל מפגש מחדש מזכיר לי
            כמה אני אוהבת את מה שאני עושה.
          </p>
          <p className="mt-4">
            אני מקדישה את היום לכלה אחת בלבד. מההיכרות הראשונה ועד הנגיעה האחרונה, אני כאן להקשיב
            לך, לדייק איתך את הפרטים ולהדגיש את היופי שכבר יש בך.
          </p>
          <details className="about-story mt-4">
            <summary className="min-h-11 w-fit cursor-pointer py-2 text-sm text-primary underline underline-offset-4">
              עוד קצת עליי ועל הבוקר שלך
            </summary>
            <p className="mt-3">
              מעבר למברשות ולסיכות, אני נשואה באושר ואמא לשניים — אן בת השלוש ושלו בן השנה. אני
              מאמינה שהמראה הכי יפה מתחיל בתחושה טובה: ברגע שבו את מסתכלת במראה, מחייכת ומרגישה שזו
              בדיוק את.
            </p>
            <p className="mt-4">
              בבוקר החתונה שלך אני שם גם כמו עוד מלווה. לצד האיפור והשיער, אני שמה לב לשעון, דואגת
              שנעמוד בלוח הזמנים ושומרת על אווירה קלילה ונעימה, כדי שיהיה לך מקום לנשום, לצחוק
              ולהתרגש.
            </p>
          </details>
          <p className="mt-5 font-heading text-3xl text-primary">מחכה להכיר אותך, נופר</p>
        </div>
      </div>
    </section>
  )
}
