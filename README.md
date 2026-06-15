# 📸 Post Sharing App

A simple full-stack post-sharing app built with the MERN stack. Users can upload images with captions, which are saved to a database and displayed on the feed.

---

## Features

- Animated floating button to trigger post creation
- Modal-based post creation flow (image + caption)
- Image uploads handled via ImageKit
- Posts persisted in MongoDB and fetched on page load
- Clean single-page layout

---

## Tech Stack

**Frontend**
- React.js
- Tailwind + Ant Design

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB (Mongoose)

**Media Storage**
- ImageKit

---

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB connection string (Atlas or local)
- ImageKit account

### Installation

1. **Clone the repo**

2. **Install backend dependencies**
   ```bash
   cd Backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd Frontend
   npm install
   ```

4. **Set up environment variables**

   Create a `.env` file inside the `Backend/` folder based on `.env.example`:
   ```env
   IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
   MONGODB_URI=your_mongodb_uri
   ```

5. **Run the app**

   Backend:
   ```bash
   cd Backend
   npm run dev
   ```

   Frontend:
   ```bash
   cd Frontend
   npm start
   ```

---

## Environment Variables

| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB connection string |
| `IMAGEKIT_PRIVATE_KEY` | ImageKit Private Key |

---

## Author

**Your Name**  
[GitHub](https://github.com/asfand531) · [LinkedIn](https://linkedin.com/in/muhammadasfandbilal)
