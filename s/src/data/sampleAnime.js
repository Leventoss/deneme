// src/data/sampleAnime.js
export const sampleAnime = {
  id: 1,
  title: "Demon Slayer",
  description: "In a world where demons exist and threaten humanity, a young man named Tanjiro Kamado becomes a demon slayer after his family is slaughtered and his younger sister Nezuko is turned into a demon.",
  coverImage: "/assets/images/demon-slayer-cover.jpg",
  rating: "8.9",
  totalEpisodes: 12,
  genre: ["Action", "Fantasy", "Adventure"],
  episodes: [
    {
      id: 1,
      number: 1,
      title: "Cruelty",
      thumbnail: "/assets/images/demon-slayer-ep1.jpg",
      sources: {
        "480p": "https://demo-videos.com/demon-slayer/ep1-480p.m3u8",
        "720p": "https://demo-videos.com/demon-slayer/ep1-720p.m3u8",
        "1080p": "https://demo-videos.com/demon-slayer/ep1-1080p.m3u8"
      },
      duration: "23:39"
    },
    {
      id: 2,
      number: 2,
      title: "Trainer Sakonji Urokodaki",
      thumbnail: "/assets/images/demon-slayer-ep2.jpg",
      sources: {
        "480p": "https://demo-videos.com/demon-slayer/ep2-480p.m3u8",
        "720p": "https://demo-videos.com/demon-slayer/ep2-720p.m3u8",
        "1080p": "https://demo-videos.com/demon-slayer/ep2-1080p.m3u8"
      },
      duration: "23:39"
    }
  ]
};