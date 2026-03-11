#🎬 Movie API – Dokumentation

Detta är ett REST-API byggt med Node.js och Express. 
API:et låter användaren hantera en samling filmer genom CRUD-funktionalitet (Create, Read, Update, Delete) samt filtrering och validering.

----------------------------------------------------------------------------------------------
##🚀 Komma igång

###1. Installation

Se till att du har Node.js installerat. 

Kör följande kommandon i terminalen:
Bash
*npm install express
*npm install --save-dev nodemon

-----------------------------------------------------------------------------------------------
##2. Starta servern

För att starta servern med automatisk omstart vid ändringar:
*Bashnpm run dev
Servern körs som standard på http://localhost:3000.

-------------------------------------------------------------------------------------------------
##🛠 API Endpoints

### 1. Filmer (Movies)

| Metod | Endpoint            | Beskrivning                                      | Statuskod |
|-------|----------------------|--------------------------------------------------|-----------|
| GET   | /api/movies         | Hämtar alla filmer                               | 200 OK    |
| GET   | /api/movies/:id     | Hämtar en specifik film via ID                   | 200 / 404 |
| POST  | /api/movies         | Skapar en ny film                                | 201 / 400 |
| PUT   | /api/movies/:id     | Uppdaterar en befintlig film                     | 200 / 404 |
| DELETE| /api/movies/:id     | Tar bort en film                                 | 204 / 404 |

------------------------------------------------------------------------------------------------
##🔍 Avancerade funktioner

###Sök & Filtrering

Du kan filtrera listan baserat på betyg genom att använda Query Parameters.
*URL: GET /api/movies?minRating=4
*Resultat: Returnerar endast filmer med rating 4 eller högre.

----------------------------------------------------------------
##🧩 Valideringsregler (POST)

När en ny film skapas utför backend följande kontroller:
1.Obligatoriska fält: titel, director, year och rating måste finnas.
2.Rating: Måste vara ett nummer mellan 1 och 5.
3.År: Får inte vara i framtiden (max år 2026).

----------------------------------------------------------------
##📋 Exempel på datastruktur (JSON)

När du skickar data via POST eller PUT, använd följande format i Postman (under fliken Body -> raw -> JSON):

JSON{
  "titel": "Inception",
  "director": "Christopher Nolan",
  "year": 2010,
  "rating": 5
}

-----------------------------------------------------------------
##🧪 Testning i Postman

1.GET: 
*Skriv in URL:en och tryck Send.

2.POST/PUT: 
*Välj metod i rullistan.
*Gå till fliken Body.
*Välj raw och ändra formatet till JSON
*Skriv in ditt objekt och tryck Send.

3.DELETE:
*Välj metod DELETE och ange ID i URL:en (t.ex. /api/movies/1).

---------------------------------------------------------------
##💻 Teknisk stack

*Runtime: Node.js
*Ramverk: Express.js
*Verktyg: Nodemon (för utveckling), Postman (för testning)

















