import express from "express";
const app = express();
const PORT = 3000;
app.use(express.json()); // Gör att vi kan läsa req.body

// Din "databas"
// Din uppdaterade "databas"
let filmer = [
  {
    id: 1,
    titel: "Oppenheimer",
    director: "Christopher Nolan",
    year: 2023,
    rating: 5,
  },
  {
    id: 2,
    titel: "Barbie",
    director: "Greta Gerwig",
    year: 2023,
    rating: 4,
  },
  {
    id: 3,
    titel: "Dune: Part Two",
    director: "Denis Villeneuve",
    year: 2024,
    rating: 5,
  },
  {
    id: 4,
    titel: "Poor Things",
    director: "Yorgos Lanthimos",
    year: 2023,
    rating: 4,
  },
  {
    id: 5,
    titel: "Spider-Man: Across the Spider-Verse",
    director: "Kemp Powers",
    year: 2023,
    rating: 5,
  },
  {
    id: 6,
    titel: "The Holdovers",
    director: "Alexander Payne",
    year: 2023,
    rating: 4,
  },
];

//Startsida
app.get("/", (req, res) => {
  res.json({ meddelande: "Välkommen till Filmlistan" });
});

// 1. Get Hämta alla
app.get("/api/movies", (req, res) => {
  const minRating = Number(req.query.minRating);

  // Om användaren har skrivit in en query (t.ex. ?minRating=4)
  if (req.query.minRating) {
    const filtreradeFilmer = filmer.filter((f) => f.rating >= minRating);
    return res.json(filtreradeFilmer);
  }

  // Annars skicka hela listan
  res.json(filmer);
});

// 2. Get Hämta en via ID
app.get("/api/movies/:id", (req, res) => {
  // Din kod här...(Tips: använd Number() och .find())
  const id = Number(req.params.id);
  const film = filmer.find((u) => u.id === id);

  if (!film) {
    return res.status(404).json({ fel: "Filmen hittades inte" });
  }

  res.json(film);
});

//  POST: Lägg till en ny film ---
app.post("/api/movies", (req, res) => {
  const { titel, director, year, rating } = req.body;

  // 1. Kontrollera att alla fält finns med
  if (!titel || !director || !year || !rating) {
    return res.status(400).json({
      fel: "Alla fält (titel, director, year, rating) måste fyllas i.",
    });
  }

  // 2. Kontrollera att rating är en siffra mellan 1 och 5
  if (typeof rating !== "number" || rating < 1 || rating > 5) {
    return res.status(400).json({
      fel: "Rating måste vara en siffra mellan 1 och 5.",
    });
  }

  // 3. Kontrollera att year inte är i framtiden (2026)
  const currentYear = new Date().getFullYear(); // Dynamiskt år, i år är det 2026
  if (year > currentYear) {
    return res.status(400).json({
      fel: `Produktionsår kan inte vara i framtiden (max ${currentYear}).`,
    });
  }

  // Om allt är OK - skapa filmen
  const nyFilm = {
    id: filmer.length > 0 ? filmer[filmer.length - 1].id + 1 : 1,
    titel,
    director,
    year,
    rating,
  };

  filmer.push(nyFilm);
  res.status(201).json(nyFilm);
});

// --- PUT: Uppdatera en film ---
app.put("/api/movies/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = filmer.findIndex((f) => f.id === id);

  if (index === -1) {
    return res.status(404).json({ fel: "Filmen hittades inte" });
  }

  // Uppdatera objektet med data från req.body
  filmer[index] = { ...filmer[index], ...req.body };

  res.json(filmer[index]);
});

// --- DELETE: Ta bort en film ---
app.delete("/api/movies/:id", (req, res) => {
  const id = Number(req.params.id);
  const ursprungligLangd = filmer.length;

  // Filtrera bort filmen med det ID:t
  filmer = filmer.filter((f) => f.id !== id);

  if (filmer.length === ursprungligLangd) {
    return res.status(404).json({ fel: "Filmen hittades inte" });
  }

  res.status(204).send(); // 204 betyder "No Content" (lyckad borttagning)
});

app.listen(PORT, () => {
  console.log(`
  🚀 Movie API är igång!
  🌍 URL: http://localhost:${PORT}
  
  Endpoints som kan testas:
  -------------------------
  📜 GET    /api/movies             - Hämta alla (prova även ?minRating=4)
  🔍 GET    /api/movies/:id         - Hämta en specifik film
  ➕ POST   /api/movies             - Lägg till (kräver JSON: titel, director, year, rating)
  📝 PUT    /api/movies/:id         - Uppdatera en film
  🗑️  DELETE /api/movies/:id         - Ta bort en film
  -------------------------
  Använd CTRL+C för att stoppa servern.
  `);
});
