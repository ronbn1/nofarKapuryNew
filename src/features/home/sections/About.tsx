import { SectionHeading } from '@/components/shared/SectionHeading'

export function About() {
  return (
    <section id="about" className="section-space" aria-labelledby="about-title">
      <div className="page-container grid items-center gap-10 md:grid-cols-[.85fr_1.15fr] md:gap-24">
        <SectionHeading eyebrow="נעים להכיר, אני נופר" id="about-title">
          מאחורי כל מראה יפה,
          <br />
          <span className="text-primary">יש מישהי שמקשיבה.</span>
        </SectionHeading>
        <div className="max-w-140 text-[15px] leading-8 text-muted-foreground">
          <p>
            אני מאמינה שהמראה הכי יפה מתחיל בתחושה טובה. ברגע שבו את מסתכלת במראה, מחייכת, ומרגישה
            שזו בדיוק את.
          </p>
          <p className="mt-4">
            אני נופר, מאפרת ומעצבת שיער לכלות מאשדוד. מההיכרות הראשונה ועד הנגיעה האחרונה ביום
            החתונה, אני כאן כדי להקשיב, לדייק איתך את הפרטים ולהדגיש את היופי שכבר יש בך.
          </p>
          <p className="mt-4">
            אני מקדישה את היום לכלה אחת בלבד — עם מקום להתרגשות, זמן לנשום והרבה תשומת לב אלייך.
          </p>
          <p className="mt-5 font-heading text-3xl text-primary">מחכה להכיר אותך, נופר</p>
        </div>
      </div>
    </section>
  )
}
