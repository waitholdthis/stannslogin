/* ============================================================
   St. Ann Catholic School — Newsletter Data
   ============================================================
   HOW TO UPDATE:
   1. Open admin-newsletter.html in a browser
   2. Fill in the new weekly newsletter and click "Generate File"
   3. Download the new newsletter-data.js that appears
   4. Upload it here (replace this file)
   The newsletter page updates automatically.
   ============================================================ */

window.NEWSLETTER_DATA = {
  intro: "The St. Ann Weekly Newsletter is posted here every Friday. It is also emailed to all families via Gradelink.",
  newsletters: [
    {
      id: "2026-05-15",
      date: "May 15, 2026",
      title: "Week of May 19, 2026",
      items: [
        {
          title: "Piano Recital",
          body: "Performance scheduled for Tuesday, May 19th at 6pm in the sanctuary. All families are welcome to attend.",
          category: "event"
        },
        {
          title: "Pre-K Last Day",
          body: "Final day for Pre-Kindergarten students is Thursday, May 21st. Families will receive additional details from the Pre-K teacher.",
          category: "announcement"
        },
        {
          title: "No School – Memorial Day",
          body: "School will be closed on Monday, May 25th in observance of Memorial Day. Enjoy the long weekend!",
          category: "no-school"
        },
        {
          title: "Awards Ceremony",
          body: "End-of-year recognition event on Friday, May 29th at 11am in the sanctuary. All students and families are encouraged to attend.",
          category: "event"
        },
        {
          title: "Financial Accounts Notice",
          body: "All financial accounts (Gradelink and FACTS) must be paid in full prior to final report cards being distributed. Please contact the school office with any questions.",
          category: "reminder",
          urgent: true
        }
      ]
    }
  ]
};
