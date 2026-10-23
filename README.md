# Website Mari Tatomir

Website static multipagină pentru programele educaționale de dezvoltare emoțională din instituții. Fără build sau dependențe JavaScript externe.

## Design

Direcție editorială „Emoțiile au loc aici”: portret în prim-plan, ivoire și albastru cerneală, accente de caisă și ilustrații SVG originale construite din linii continue. Titlurile folosesc Source Serif 4, iar textul și controalele folosesc Manrope. Fonturile sunt găzduite local, cu subseturi Latin Extended pentru diacriticele românești; italicul este rezervat citatelor. Dimensiunile comune sunt definite prin variabile CSS, cu text de 17 px pe desktop și 16 px pe mobil. Pictogramele funcționale folosesc sprite-ul local Tabler Icons.

Homepage-ul include un selector accesibil pentru cele trei categorii de vârstă. Fără JavaScript, toate descrierile rămân vizibile. Portretul principal nu are linie animată suprapusă. Animația din secțiunea despre activități respectă `prefers-reduced-motion`; conținutul nu depinde de animații pentru a deveni vizibil.

## Pagini

- `index.html` — prezentare, programe, exemplu orientativ de activitate, colaborare și resurse;
- `programe.html` — preșcolari, școlari și adolescenți;
- `institutii.html` — organizare și informații practice;
- `despre.html` — portret și abordare;
- `resurse.html` — articole educaționale;
- `contact.html` — formularul Web3Forms existent;
- `confidentialitate.html` — informații despre datele din formular.

## Vizualizare locală

Deschide `index.html` sau pornește `python -m http.server 4173 --bind 127.0.0.1` din acest folder și accesează `http://127.0.0.1:4173/`.

## Conținut de completat când este disponibil

- Formarea, certificările și experiența aprobate pentru publicare.
- Date de contact directe, verificate.

Exemplul de activitate de pe homepage este marcat ca orientativ. Nu sunt prezentate statistici, parteneri sau testimoniale inventate. Destinatarul emailurilor se configurează în Web3Forms; verificările locale nu confirmă livrarea unui email real.

## Sitemap

`sitemap.xml` enumeră cele 7 pagini publice de pe https://www.emokid.ro/ și este declarat în `robots.txt`. La modificarea paginilor, actualizează adresele și datele schimbărilor semnificative. La schimbarea domeniului public, actualizează ambele fișiere.
