# 🌱 RootVenture

RootVenture is a full-stack Next.js web application where startup dreams take root. It is a community-driven platform designed for aspiring entrepreneurs to showcase their concepts, receive valuable feedback, discover innovative global ideas, and collaborate with potential co-founders and mentors.

---

## 🚀 Key Features

*   **Share Your Vision:** Post your startup concepts with tags, categories, and descriptive details.
*   **Discover Unique Ideas:** Browse and search a global feed of innovative startup ideas from around the world.
*   **Engage & Upvote:** Support interesting ideas through upvotes and keep track of trending concepts.
*   **Save for Later:** Bookmark ideas you want to revisit.
*   **User Profiles:** Build an entrepreneur profile showcasing your contributions, shared ideas, and saved posts.
*   **Fully Responsive UI:** Optimized for all screen sizes, featuring a fluid mobile bottom navigation system.

---

## 🛠️ Tech Stack

*   **Frontend:** React (Next.js App Router), Tailwind CSS (for modern UI styling), Radix UI (accessible primitives).
*   **Backend:** Next.js Server-Side Route Handlers.
*   **Database:** MongoDB with Mongoose (ODM).
*   **Authentication:** Custom JWT-based authentication (NextAuth-ready).
*   **Utilities:** `date-fns` (date formatting), `lucide-react` (icon set).

---

## 🏁 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org) and [MongoDB](https://www.mongodb.com) installed.

### Installation

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/Nishikakansal/RootVenture.git
    cd RootVenture
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env.local` file in the root directory and configure your MongoDB URI and authentication secrets:
    ```env
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    NEXTAUTH_SECRET=your_nextauth_secret
    ```

4.  **Run the Development Server:**
    ```bash
    npm run dev
    ```

    Open [http://localhost:3001](http://localhost:3001) in your browser to view the application.

---

## 📁 Directory Structure

```
rootventure/
├── app/                  # Next.js pages, API routes, and layouts
│   ├── api/              # Backend endpoint route handlers (auth, ideas)
│   ├── dashboard/        # Dashboard view (Community, Profile, etc.)
│   ├── login/            # Auth pages
│   ├── signup/           # Signup pages
│   └── page.js           # Public landing page
├── components/           # Reusable React components (Navbar, Main, Feed)
├── lib/                  # Helper utilities (db connection, auth config)
├── models/               # MongoDB schema models (User, Idea)
└── public/               # Static assets (images, gifs)
```

---


