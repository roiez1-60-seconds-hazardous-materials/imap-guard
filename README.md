# 🧭 NavGuard - ניווט חירום

> כלי ניסיוני לניווט בתנאי הפרעות GPS | פותח ע״י רועי צוקרמן

## מה זה?

אפליקציית ניווט שעובדת גם כשה-GPS מופרע. משתמשת במקורות מיקום חלופיים:

- **GPS** — כשזמין (דיוק 5-20 מטר)
- **WiFi Positioning** — לפי רשתות WiFi בסביבה (דיוק 20-50 מטר)
- **Cell Tower** — לפי אנטנות סלולריות (דיוק 100-500 מטר)
- **Sensor Fusion** — מצפן + אקסלרומטר מחיישני הטלפון

## יכולות

- 📍 מיקום לייב על מפה עם fallback אוטומטי
- 🔵 עיגול דיוק שמראה את טווח השגיאה
- 🧭 מצפן מחיישני הטלפון
- 🔍 חיפוש יעד עם קו ניווט
- 📡 מעקב רציף עם עדכון חי
- ⚡ אינדיקציה ברורה של מקור המיקום

## התקנה

1. Clone the repo
2. Deploy to Vercel — it's a static site, no build needed
3. Open on your phone and allow location permissions

## טכנולוגיה

- Leaflet.js + OpenStreetMap / CartoDB tiles
- Geolocation API with automatic fallback
- DeviceOrientation API for compass
- Pure HTML/CSS/JS — no framework needed

---

*כלי ניסיוני · פותח ע״י רועי צוקרמן*
