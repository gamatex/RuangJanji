# RuangJanji — Release Gate (November 2026)

## Automated CI
On each push to main, GitHub Actions runs `npm test`, builds `dist` with `npm run build`, checks critical pages, and uploads the web build artifact. This does **not** deploy Cloudflare or compile Android APKs.

## Mandatory manual end-to-end test
Use a dedicated sandbox event and test accounts. Do not use real guests or payment credentials.
1. Owner signs up, confirms email and WhatsApp, creates draft. Confirm disabled themes cannot be ordered.
2. Midtrans sandbox checkout + signed webhook; verify only successful matching transaction publishes an event.
3. Owner adds two guests; verify private invitation URLs, valid/invalid RSVP token, deadline and attendee quota. Check wishes and stats.
4. Owner invites a verified staff account; staff sees only assigned event, cannot import/add guests or manage staff.
5. Print QR cards, scan on real Android with camera permission, test manual token fallback and duplicate check-in on two devices simultaneously.
6. Try souvenir before check-in (must fail); after check-in (must succeed once); revoke staff while logged in (subsequent RPC must fail).
7. Import sample CSV and XLSX, including Unicode names, empty rows, invalid quotas, and duplicate names. Export and inspect CSV in Excel.
8. Verify Cloudflare deployment serves updated files and public invitation routes; verify Android WebView links, camera permissions, auth persistence and downloads.
9. Review Supabase RLS, no public guest list access, storage policy, and Midtrans production secrets before enabling production payments.

## Known release blockers
- Supabase currently has no events, guests, paid orders or assigned staff: live end-to-end tests have not been run.
- QR scanner uses native BarcodeDetector: device/browser support varies; manual token entry is the fallback.
- XLSX parser and QR renderer load external ESM modules: verify network availability and Android WebView compatibility.
- Android native projects and signed APK/AAB builds are not validated by this CI.
- Cloudflare deployment is a separate command and has not been confirmed from this workflow.
- Production Midtrans onboarding and keys remain pending.

Do not label either Android application production-ready until all release gates pass.
