```bash
Link GitHub: https://github.com/CososchiIrina/cc-project-2023 
Link proiect publicat: https://cc-project-2023.vercel.app/
Link video: https://www.youtube.com/watch?v=nNPfVFHRw3I
 ```
				
Studentă:
Cososchi Irina Elena
Program de Master SIMPRE, an II

  
## Tehnologii cloud utilizate 

Tehnologiile Cloud folosite au fost următoarele:
1.	MongoDB (Atlas & Compass)
MongoDB este un popular sistem de gestionare a bazelor de date NoSQL (non-relaționale) open-source. Este conceput pentru a stoca, prelua și gestiona volume mari de date nestructurate sau semi-structurate. MongoDB oferă scalabilitate, flexibilitate și performanță ridicate, făcându-l potrivit pentru o gamă largă de aplicații.
MongoDB oferă mai multe funcționalități bazate pe cloud prin platforma sa MongoDB Atlas. MongoDB Atlas este un serviciu de baze de date complet gestionat furnizat de MongoDB care rulează pe furnizori importanți de cloud, cum ar fi AWS, Azure și Google Cloud Platform. 
Prin intermediul MongoDB Atlas, am realizat cu ușurință implementarea gratuită a bazei de date NoSQL în cloud, fără a fi nevoie de furnizarea manuală a infrastructurii, folosind ca provider AWS.
 
Ulterior, am utilizat MonogDB Compass si am create o colecție pentru a mă conecta la baza de date MongoDB Atlass. MongoDB Compass este instrumentul oficial de interfață grafică cu utilizatorul (GUI) oferit de MongoDB pentru interacțiunea cu bazele de date MongoDB. Este o aplicație desktop care oferă o interfață vizuală pentru gestionarea și explorarea datelor MongoDB. 
 
2.	Vercel

Vercel este o platformă bazată pe cloud pentru implementarea și găzduirea de aplicații web și site-uri web statice. Oferă un proces de implementare fără întreruperi și eficient, permițând dezvoltatorilor să-și implementeze rapid proiectele cu o configurație și un management minim. Vercel oferă mai multe capabilități cloud care îl fac o alegere populară pentru dezvoltatorii web.  Capacitățile sale cloud, cum ar fi funcțiile serverless, CDN global, scalabilitatea și funcțiile de colaborare, îl fac o platformă eficientă și puternică pentru implementarea și gestionarea proiectelor web moderne.

Folosind această platformă am creat un nou proiect și am făcut deploy folosind contul de GitHub.

Link domeniu pentru proiectul publicat: https://cc-project-2023.vercel.app/ 

## Descrierea aplicației

Aplicația creată afișează  pe pagina principală informații despre cele mai bine vândute albume de muzică din secolul 21, conform Wikipedia. Pe această pagină, se pot observa informații precum titlul albumelor, imagini cu o copertă a acestora, artistul/artiștii, anul lansării, țara de origine și numărul de copii vândute la nivel mondial. Tot din această pagină se pot șterge definitiv înregistrări, apăsând pe butonul „Delete” de sub albumul dorit. 
 

Accesând pagina /insert, utilizatorii pot introduce albume noi in baza de date din cloud prin intermediul unui formular cu 6 câmpuri, dintre care 5 obligatorii. Pentru a salva înregistrarea, este necesară apăsarea butonului de “Submit”. 
 
## Flux de date și secvențe de cod

Principala sursă de date este provenită din baza de date concepută tocmai în acest sens in MongoDB, prezentat in capitoul Tehnologii cloud utilizate. Acolo sunt stocate toate datele despre albume. 

Ulterior, aceste informații sunt accesate prin funcții asincrone de gestionare a API, implementând cadrul Next.js pentru a asifura conexiunea si accesul backend – baze de date. (v. pages/api/records.js)
 
În secvența de cod precedentă se realizează conexiunea la colecția de date din MongoDB, apoi se definesc mai multe funcții asincrone pentru a interacționa cu aceasta:
•	getRecords: Preia toate înregistrările din colecție.
•	getRecord: Preia o anumită înregistrare prin ID-ul său.
•	postRecord: Inserează o înregistrare nouă în colecție.
•	putRecord: Actualizează o înregistrare existentă în colecție.
•	deleteRecord: Șterge o înregistrare din colecție.

Exportul implicit este un handler de funcții asincrone care acționează ca punct final API. Primește parametrii req (cerere) și res (răspuns) de la Next.js.

Codul verifică metoda HTTP a cererii (req.method) pentru a determina acțiunea adecvată de efectuat. Dacă metoda HTTP nu este una dintre GET, POST, PUT sau DELETE, funcția apelează sendMethodNotAllowed(res) din fișierul apiMethods.js importat pentru a trimite un răspuns 405 Method Not Allowed.

Pe baza metodei HTTP și a condițiilor suplimentare, codul apelează funcția corespunzătoare legată de baza de date și trimite rezultatul ca răspuns folosind funcția sendOk(res, data) din apiMethods.js. Răspunsul conține fie înregistrările preluate, o înregistrare specifică, rezultatul unei operațiuni de bază de date, fie un mesaj de eroare.

În final, datele sunt afișate utilizatorilor prin interfața utilizator, prezentată în cele 2 pagini din capitolul Descrierea aplicației. 

1.	Pagina principala (v. js/components/MainPage.jsx)
În general, componenta MainPage preia înregistrări de la un punct final API și le redă într-un aspect de tip grilă. Oferă funcționalitatea de ștergere a înregistrărilor individuale, trimițând cereri DELETE către punctul final API.

In prima parte a codului se face o solicitare de preluare către endpoint-ul /api/records folosind metoda GET. Răspunsul este convertit în JSON folosind metoda response.json(), iar datele preluate sunt setate starii de înregistrări folosind funcția setRecords.

Funcția deleteRecord este definită pentru a gestiona ștergerea unei înregistrări. Acesta preia id-ul înregistrării pentru a fi șters din proprietatea id a elementului țintă din obiectul eveniment. Răspunsul este convertit în JSON, iar funcția setRecords este utilizată pentru a actualiza starea înregistrărilor prin filtrarea înregistrării șterse din matrice.
 
Următoarea secvență returnează marcajul JSX, care reprezintă structura și conținutul secțiunii paginii principale. Marcajul include un titlu, un paragraf și un aspect grilă pentru afișarea înregistrărilor albumului.
Starea înregistrărilor este mapată pentru a reda înregistrări individuale ale albumelor, inclusiv numele albumului, imaginea copertei albumului, artistul, anul lansării, naționalitatea și vânzările la nivel mondial.
Fiecare înregistrare are, de asemenea, asociat un buton „Șterge”, care declanșează funcția de ștergere înregistrare atunci când este făcută clic.

2.	Pagina insert (v. js/components/InsertPage.jsx)

În general, componenta InsertPage oferă un formular în care utilizatorii pot introduce detaliile unei noi înregistrări. Când se face click pe butonul de trimitere, informațiile sunt trimise la punctul final API folosind o solicitare POST. După finalizarea cererii, este înregistrat un mesaj și câmpurile de intrare sunt șterse.

Funcția insertRecord este definită pentru a gestiona inserarea unei noi înregistrări. Aceasta preia valorile introduse de utilizator pentru diferite câmpuri (artist, album, release_year, nationality, ww_sales, album_cover) folosind document.getElementById. 

Se face o solicitare de preluare către punctul final /api/records folosind metoda POST. Solicitarea include antete care specifică tipul de conținut ca JSON, iar corpul conține datele sub forma de text.

După ce solicitarea este finalizată cu succes, este executată o funcție callback, care înregistrează un mesaj pe consolă care indică faptul că a fost inserată o nouă înregistrare. În plus, șterge câmpurile de intrare.

Următoarea secvență returnează marcajul JSX, care reprezintă structura și conținutul secțiunii de inserare a paginii. Marcajul include un titlu, un paragraf și un formular pentru inserarea unei noi înregistrări.

Formularul include diverse câmpuri de introducere pentru a captura artistul, albumul, anul lansării, naționalitatea, vânzările la nivel mondial și adresa URL a copertei albumului. Câmpurile de introducere au etichete asociate și text substituent.

Există de asemenea și un buton de trimitere în formular, care declanșează funcția insertRecord atunci când se face click pe acesta.

## Referințe

1.	https://gurita-alexandru.gitbook.io/cloud-computing-2023-simpre
2.	List of best-selling albums of the 21st century - Wikipedia
3.	https://tailwindcss.com/docs
