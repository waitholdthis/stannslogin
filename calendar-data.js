// ================================================================
//  St. Ann Catholic School — Academic Calendar Data
//  2025–2026 School Year
// ================================================================
//
//  HOW TO ADD OR EDIT EVENTS
//  ─────────────────────────
//  Each event is one entry in the CALENDAR_EVENTS array below.
//  Copy any existing line and change the values.
//
//  Required fields:
//    date        →  "YYYY-MM-DD"  e.g. "2025-09-01"
//    title       →  Event name    e.g. "Labor Day – No School"
//    type        →  One of the five types listed below
//
//  Optional field:
//    description →  A short note shown when a parent clicks the date
//
//  EVENT TYPES (controls the color shown on the calendar)
//  ──────────────────────────────────────────────────────
//    "school"          Navy   – Milestones: first/last day, report cards, conferences
//    "no-school"       Red    – Holidays, breaks, or any day school is closed
//    "early-release"   Gold   – Early dismissal days
//    "faith"           Purple – Holy days, school Mass, Reconciliation services
//    "special"         Teal   – Field trips, performances, or other school events
//
//  EXAMPLE — adding a new event:
//    { date: "2026-02-14", title: "Valentine's Day Party", type: "special" },
//
// ================================================================

var CALENDAR_EVENTS = [

    // ── August 2025 ──────────────────────────────────────────────
    { date: "2025-08-18", title: "First Day of School",                    type: "school",        description: "All students report. Full school day." },
    { date: "2025-08-19", title: "School Picture Day",                     type: "special" },

    // ── September 2025 ───────────────────────────────────────────
    { date: "2025-09-01", title: "Labor Day – No School",                  type: "no-school",     description: "School closed. Enjoy the long weekend!" },
    { date: "2025-09-08", title: "Nativity of the Blessed Virgin Mary",    type: "faith",         description: "School Mass in honor of Our Lady's birthday." },
    { date: "2025-09-26", title: "End of Quarter 1",                       type: "school" },

    // ── October 2025 ─────────────────────────────────────────────
    { date: "2025-10-13", title: "Columbus Day – No School",               type: "no-school" },
    { date: "2025-10-17", title: "Report Cards Distributed",               type: "school" },
    { date: "2025-10-31", title: "All Hallows Eve",                        type: "special",       description: "School-approved costumes welcome." },

    // ── November 2025 ────────────────────────────────────────────
    { date: "2025-11-01", title: "All Saints Day",                         type: "faith",         description: "Holy Day of Obligation. School Mass." },
    { date: "2025-11-02", title: "All Souls Day",                          type: "faith",         description: "Day of prayer for the faithful departed." },
    { date: "2025-11-11", title: "Veterans Day – No School",               type: "no-school",     description: "School closed in honor of our veterans." },
    { date: "2025-11-21", title: "End of Quarter 2",                       type: "school" },
    { date: "2025-11-26", title: "Thanksgiving Break",                     type: "no-school" },
    { date: "2025-11-27", title: "Thanksgiving Day – No School",           type: "no-school",     description: "School closed. Happy Thanksgiving!" },
    { date: "2025-11-28", title: "Thanksgiving Break",                     type: "no-school" },

    // ── December 2025 ────────────────────────────────────────────
    { date: "2025-12-08", title: "Immaculate Conception",                  type: "faith",         description: "Holy Day of Obligation. School Mass." },
    { date: "2025-12-12", title: "Report Cards Distributed",               type: "school" },
    { date: "2025-12-18", title: "Christmas Program",                      type: "special",       description: "Annual Christmas performance. All families welcome." },
    { date: "2025-12-19", title: "Last Day Before Christmas Break",        type: "early-release",  description: "Early dismissal. Christmas Break begins." },
    { date: "2025-12-22", title: "Christmas Break",                        type: "no-school" },
    { date: "2025-12-23", title: "Christmas Break",                        type: "no-school" },
    { date: "2025-12-24", title: "Christmas Eve",                          type: "no-school" },
    { date: "2025-12-25", title: "Christmas Day",                          type: "no-school" },
    { date: "2025-12-26", title: "Christmas Break",                        type: "no-school" },
    { date: "2025-12-29", title: "Christmas Break",                        type: "no-school" },
    { date: "2025-12-30", title: "Christmas Break",                        type: "no-school" },
    { date: "2025-12-31", title: "New Year's Eve",                         type: "no-school" },

    // ── January 2026 ─────────────────────────────────────────────
    { date: "2026-01-01", title: "New Year's Day",                         type: "no-school" },
    { date: "2026-01-02", title: "Christmas Break",                        type: "no-school" },
    { date: "2026-01-05", title: "School Resumes",                         type: "school",        description: "Welcome back from Christmas Break!" },
    { date: "2026-01-19", title: "Martin Luther King Jr. Day – No School", type: "no-school",     description: "School closed." },

    // ── February 2026 ────────────────────────────────────────────
    { date: "2026-02-13", title: "End of Quarter 3",                       type: "school" },
    { date: "2026-02-16", title: "Presidents' Day – No School",            type: "no-school",     description: "School closed." },
    { date: "2026-02-17", title: "Mardi Gras",                             type: "special",       description: "Fat Tuesday celebration." },
    { date: "2026-02-18", title: "Ash Wednesday",                          type: "faith",         description: "Lenten season begins. Ash Wednesday prayer service." },
    { date: "2026-02-27", title: "Report Cards Distributed",               type: "school" },

    // ── March 2026 ───────────────────────────────────────────────
    { date: "2026-03-16", title: "Spring Break",                           type: "no-school" },
    { date: "2026-03-17", title: "Spring Break",                           type: "no-school" },
    { date: "2026-03-18", title: "Spring Break",                           type: "no-school" },
    { date: "2026-03-19", title: "Spring Break",                           type: "no-school" },
    { date: "2026-03-20", title: "Spring Break",                           type: "no-school" },
    { date: "2026-03-23", title: "School Resumes",                         type: "school",        description: "Welcome back from Spring Break!" },

    // ── April 2026 ───────────────────────────────────────────────
    { date: "2026-04-02", title: "Holy Thursday",                          type: "faith",         description: "School Mass." },
    { date: "2026-04-03", title: "Good Friday – No School",                type: "no-school",     description: "School closed in observance of Good Friday." },
    { date: "2026-04-05", title: "Easter Sunday",                          type: "faith",         description: "He is risen! Alleluia!" },
    { date: "2026-04-06", title: "Easter Monday – No School",              type: "no-school",     description: "School closed." },

    // ── May 2026 ─────────────────────────────────────────────────
    { date: "2026-05-01", title: "May Crowning",                           type: "faith",         description: "Annual Mary crowning ceremony." },
    { date: "2026-05-25", title: "Memorial Day – No School",               type: "no-school",     description: "School closed. We honor those who served." },

    // ── June 2026 ────────────────────────────────────────────────
    { date: "2026-06-03", title: "Last Day of School",                     type: "school",        description: "8th Grade Graduation & End-of-Year Celebration. Early release." },

];
