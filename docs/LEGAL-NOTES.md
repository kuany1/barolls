# Legal notes (not legal advice — have a Ugandan advocate review before launch)

Sources checked: Data Protection and Privacy Act, 2019 (DPPA) and Regulations, 2021; Electronic Transactions Act, 2011 (ETA, full text read); Electronic Signatures Act, 2011.

## What the law requires (statutory) vs. what is good practice

| Topic | Statutory? | What it means for BAROLLS | Status in this project |
|---|---|---|---|
| Register with the Personal Data Protection Office (PDPO, NITA-U) | **Yes** — DPPA s.29 and Regulations (reg. 15); registration is renewed yearly. No general exemption for small businesses was found; PDPO has been prosecuting non-registered collectors. | BAROLLS receives customers' names, phone numbers and orders, so it likely counts as a data collector/controller. | **Owner action.** Not done by this project. Confirm with an advocate / PDPO, register, then optionally add your registration number to the Privacy Policy. |
| Data-subject rights (access, correction/deletion, stop processing, marketing opt-out, complaint to PDPO) | **Yes** (DPPA ss.16, 24–28, 31) | Customers must be able to ask for these. | Explained in `privacy.html`; requests go to the WhatsApp/phone number. |
| Secure the data you hold; notify PDPO of breaches | **Yes** (DPPA ss.20, 23) | Protect the phone/WhatsApp account that holds orders (screen lock, no shared logins). | Mentioned generally; operational action for the owner. |
| ETA s.24(2): let the customer **review the order, correct mistakes and withdraw before ordering** | **Yes** | The order builder shows items, total and a message preview before anything is sent. | Implemented in `order.html`. |
| ETA s.24(1): information sellers must show (legal name and status; physical address and phone; website or email; registration number/directors if a company; description and full price; payment method; terms; delivery time; refund policy; privacy policy …) | **Yes** for goods offered through an "electronic transaction". Whether a WhatsApp order counts is arguable; the safe course is to comply. | Present now: trading name, address, phone, website, descriptions, UGX prices, terms, privacy policy. **Missing:** legal name/status, company registration details (if a company), payment methods, refund/return policy, delivery time. | **Owner input needed** (see BUSINESS-CONFIRMATIONS). Terms use neutral wording meanwhile. |
| ETA ss.14, 27 (contract by data message; order performed within 30 days unless agreed; notify and refund if unavailable) | **Yes** | WhatsApp message = offer, BAROLLS' confirmation = acceptance. | Reflected in Terms (sections 3–4). |
| ETA s.28: clauses excluding these consumer rights are void | **Yes** | Terms must not exclude statutory rights. | Terms say they do not remove legal rights. |
| Electronic Signatures Act, 2011 | Not applicable | No signatures are collected. | None. |
| Trading licence, food-premises/health permits from the local authority | Probably — **not verified here** | Confirm which permits apply in Arua. | Owner action. |
| Cookie banner | Not required for this site | No cookies/trackers are used. Google Maps (Contact page) loads Google content. | Privacy Policy discloses it. |
| Retention period, DPO appointment, written privacy notice | Recommended / depends on size | A fixed retention period is good practice. | Policy says none is set yet. |
