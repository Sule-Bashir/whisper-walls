# 🧱 Whisper Walls

> Read anonymous whispers, react, compete with the community, unlock achievements, and return every day for new challenges.

Whisper Walls is a social, community-driven Reddit game built with **Devvit**, **Phaser**, and **TypeScript** for the **Reddit Games with a Hook Hackathon**.

Instead of simply playing a game, players become part of a living anonymous community by submitting whispers, reacting to other players' confessions, climbing the leaderboard, unlocking achievements, and completing daily challenges.

---

# 🎮 Overview

Every game consists of ten rounds.

Players read anonymous whispers submitted by the community and choose the reaction that best matches each whisper.

Along the way they earn points, complete daily challenges, build achievement streaks, and compete against other players on a live leaderboard.

The game encourages players to return every day because new whispers, new submissions, and fresh community interactions continually expand the experience.

---

# ✨ Features

## 🧱 Anonymous Whisper Feed

Players read anonymous confessions submitted by the community.

Examples include:

- Funny moments
- Personal confessions
- Embarrassing stories
- Brave decisions
- Random thoughts

Each play session presents a different collection of whispers.

---

## 😊 Community Reactions

Players react using one of four reactions:

- 😂 Funny
- 😢 Sad
- 😡 Crazy
- ❤️ Brave

Each reaction contributes to overall community engagement.

---

## ✍ Submit Your Own Whisper

Players can anonymously contribute new whispers.

Submissions immediately become part of the growing community database, allowing future players to discover them.

This creates an ever-growing pool of user-generated content.

---

## 🏆 Leaderboard

Players compete using total score.

The leaderboard displays the highest scoring community members.

This provides friendly competition and encourages replayability.

---

## ⭐ Daily Challenge

Each day players are challenged to:

> Score **8/10 or higher**

Completing the challenge unlocks an achievement.

---

## 🔥 Daily Streak

The game tracks consecutive daily participation.

Returning players build longer streaks over time.

---

## 🏅 Achievements

Players unlock achievements such as:

- 🌱 New Player
- ⭐ Rising Star
- 🏆 Whisper Master
- 👑 Legend

Achievements reward consistent participation.

---

## 📊 Community Statistics

The game displays:

- Total community whispers
- Daily streak
- Current achievement
- Daily challenge
- Live leaderboard

---

## 🔊 Sound Effects

Custom audio provides a polished experience.

Included sounds:

- Button click
- Correct reaction
- Achievement unlocked
- Game over

---

## 🎨 Polished User Interface

Features include:

- Animated buttons
- Sound feedback
- Progress bar
- Mobile-friendly layout
- Smooth scene transitions
- Modern dark theme
- Responsive text
- Interactive menus

---

# 🎯 Gameplay

1. Open Whisper Walls.
2. Read the instructions.
3. Start a game.
4. Read ten anonymous whispers.
5. Choose the best reaction.
6. Earn points.
7. Complete the Daily Challenge.
8. Unlock achievements.
9. View your leaderboard position.
10. Return tomorrow to continue your streak.

---

# 🔄 Replayability

Whisper Walls was designed around long-term engagement.

Replayability comes from:

- Daily Challenge
- Daily Streaks
- Community submissions
- Leaderboards
- Achievements
- Growing whisper database
- Fresh player-generated content

No two communities evolve the same way.

---

# 👥 Community First

Unlike traditional games, Whisper Walls grows because of its players.

Every submitted whisper becomes content for future games.

This creates a positive feedback loop where:

Players → Submit Content → Future Players Discover It → Community Continues Growing

---

# 🏗 Architecture

## Frontend

- Phaser
- TypeScript
- Vite

Scenes:

- Main Menu
- Game
- Submit Whisper
- Leaderboard
- Game Over
- Preloader

---

## Backend

Built using Devvit Web + Hono.

REST API routes include:

- `/api/whispers/random`
- `/api/whispers/count`
- `/api/streak`
- `/api/leaderboard`
- `/api/achievements`
- `/api/stats/game`
- `/api/stats/reaction`

---

# 🛠 Tech Stack

- Devvit
- Reddit Developer Platform
- Devvit Web
- Phaser
- TypeScript
- Vite
- Hono
- Node.js
- HTML5
- CSS
- Web Audio API

---

# 📁 Project Structure

```
src/
 ├── client/
 │    ├── scenes/
 │    ├── data/
 │    ├── game.ts
 │    └── main.ts
 │
 ├── server/
 │    ├── routes/
 │    ├── core/
 │    └── index.ts
 │
 └── shared/

public/
 └── assets/
      ├── audio/
      └── images/
```

---

# 🚀 Running Locally

Install dependencies

```bash
npm install
```

Type check

```bash
npm run type-check
```

Playtest

```bash
npx devvit playtest
```

Build

```bash
npm run build
```

Deploy

```bash
npx devvit upload
```

---

# 📱 Mobile Experience

Whisper Walls was designed with Reddit mobile users in mind.

Features include:

- Large touch targets
- Responsive layout
- Fast loading
- Smooth animations
- Lightweight assets
- Touch-friendly gameplay

---

# 🏆 Hackathon Goals

This project was built for the **Reddit Games with a Hook Hackathon**.

The design focuses on:

- Daily engagement
- Community participation
- User-generated content
- Long-term replayability
- Mobile-first experience
- Polished gameplay

---

# 💡 Inspiration

Social media is full of anonymous stories, confessions, and unexpected moments that spark conversation.

Whisper Walls transforms those moments into an interactive game where every player's contribution helps shape future gameplay.

---

# 🚧 Challenges

Some of the challenges overcome during development included:

- Building a smooth multi-scene Phaser experience
- Integrating Devvit Web APIs
- Managing anonymous community content
- Designing a replayable progression loop
- Implementing leaderboard logic
- Creating achievement and streak systems
- Optimizing for Reddit's mobile environment
- Polishing animations and sound effects

---

# 🎉 Accomplishments

- Fully playable Reddit game
- Anonymous community submissions
- Persistent leaderboard
- Daily challenge system
- Achievement badges
- Daily streak tracking
- Responsive UI
- Audio feedback
- Animated buttons
- Community statistics
- Mobile optimization

---

# 🔮 Future Roadmap

Future versions may include:

- Weekly tournaments
- Community voting on whispers
- Rare achievement badges
- Seasonal events
- More reaction types
- Custom player avatars
- Whisper categories
- Community moderation tools
- Global rankings
- Multiplayer community events

---

# 👨‍💻 Author

**Sule Bashir**

Built for the Reddit Games with a Hook Hackathon using Devvit, Phaser, and TypeScript.

GitHub:

https://github.com/Sule-Bashir/whisper-walls

---

# 📄 License

This project is licensed under the MIT License.

---

# ❤️ Thank You

Thank you to:

- Reddit Developer Platform
- Devvit
- Phaser
- The Reddit community
- Everyone who tested Whisper Walls

Your whispers keep the walls alive.
