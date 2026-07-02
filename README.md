# Movieflix

A responsive movie discovery interface for browsing Hindi-language films that are now playing or coming soon. Movie data is loaded from The Movie Database (TMDB).

## Features

- Browse now-playing and upcoming movies
- View movie posters, summaries, release dates, and ratings
- Open dedicated movie detail routes
- Responsive grid layout for mobile, tablet, and desktop
- Loading and empty-result states
- Reusable header and movie-grid components

## Tech stack

- Next.js 15
- React 19
- JavaScript
- Tailwind CSS 4
- TMDB API
- Lucide React
- ESLint

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/meshikhargupta/movieflix.git
   cd movieflix
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file and add a TMDB API key:

   ```env
   NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
   ```

## Running locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```text
src/
├── app/
│   ├── movie/[id]/   # Movie details
│   ├── now-playing/  # Current releases
│   └── upcoming/     # Upcoming releases
└── components/
    ├── Header.js
    └── MovieGrid.js
```

## Future improvements

- Add search and filtering
- Improve API error feedback
- Add automated tests
- Restore a verified production deployment

## License

No license has been added to this repository.
