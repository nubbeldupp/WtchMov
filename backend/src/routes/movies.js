const express = require('express');
const router = express.Router();
const { db } = require('../database');
const axios = require('axios');

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// Get all movies
router.get('/', (req, res) => {
  db.all('SELECT * FROM movies ORDER BY created_at DESC', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Add a new movie
router.post('/', async (req, res) => {
  const { title, category } = req.body;
  
  try {
    // Search TMDB for movie details
    const tmdbResponse = await axios.get(`${TMDB_BASE_URL}/search/multi`, {
      params: {
        api_key: TMDB_API_KEY,
        query: title
      }
    });

    const result = tmdbResponse.data.results[0];
    if (!result) {
      throw new Error('No results found');
    }

    // Get additional details including videos
    const detailsResponse = await axios.get(
      `${TMDB_BASE_URL}/${result.media_type}/${result.id}`, {
        params: {
          api_key: TMDB_API_KEY,
          append_to_response: 'videos,watch/providers'
        }
      }
    );

    const details = detailsResponse.data;
    const trailer = details.videos?.results.find(v => v.type === 'Trailer');

    db.run(`
      INSERT INTO movies (
        title, tmdb_id, poster_path, category, genres, 
        overview, release_date, trailer_url, streaming_links
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      title,
      details.id,
      details.poster_path,
      category,
      JSON.stringify(details.genres),
      details.overview,
      details.release_date || details.first_air_date,
      trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null,
      JSON.stringify(details['watch/providers']?.results?.US || {})
    ], function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        id: this.lastID,
        message: 'Movie added successfully'
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update movie category
router.patch('/:id/category', (req, res) => {
  const { id } = req.params;
  const { category } = req.body;

  db.run(
    'UPDATE movies SET category = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
    [category, id],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ message: 'Category updated successfully' });
    }
  );
});

// Delete a movie
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM movies WHERE id = ?', id, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Movie deleted successfully' });
  });
});

// Get categories
router.get('/categories', (req, res) => {
  db.all('SELECT * FROM categories ORDER BY name', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

module.exports = router;
