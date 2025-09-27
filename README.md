Blog App – Project Overview

Description:
This is a full-featured, modern blog application built with Next.js, designed to provide a smooth and human-friendly user experience. Users can read, create, and manage blog posts, while the admin can monitor users and content. The app emphasizes simplicity, responsiveness, and performance.

Key Features:

User Authentication: Users can sign up, log in, and manage their profiles securely.

Blog Management: Users can create, edit, and delete their own posts.

Search Functionality: Users can search for posts by keywords; if no search is applied, all posts are displayed.


Responsive Design: Works seamlessly on desktop, tablet, and mobile devices.

Image Uploads: Users can upload images for their posts, stored securely in cloud storage (e.g., Cloudinary).

Next.js Features: Utilizes server-side rendering (SSR), API routes, and optimized routing for performance.

Technologies Used:

Frontend: Next.js, React, TailwindCSS

Backend: Next.js API Routes (no separate backend needed)

Database:  MongoDB

Authentication: NextAuth.js

Image Storage: Cloudinary

deployment: in vercel


Project Structure:

app/ – Contains main pages and routing.

components/ – Reusable UI components (Navbar, PostCard, Forms, etc.).

pages/api/ – API routes for handling backend logic like user authentication and blog CRUD operations.

public/ – Static assets like images and icons.

styles/ – Global and modular CSS using TailwindCSS.

Goal:
The app aims to provide a real-world, production-ready blogging platform that can be extended further for additional features like comments, likes, and analytics.


Disclosure of AI Tools Usage

During the development of this blog application, AI tools such as ChatGPT were used only for guidance, problem-solving, and understanding certain concepts. All the actual coding, logic implementation, and design decisions were done manually.

Critical Implementations / Challenging Parts:
Some parts of the project required extra effort and careful problem-solving:

Image Uploads: Integrating Cloudinary for image storage, handling API keys securely, and updating the database with the image URL

Authentication & Authorization: Configuring NextAuth.js to handle secure user sessions, protect routes, and manage user roles.

And i used some other times for error corrections and code structure allignment
1> https://chatgpt.com/share/68d83cab-0358-8012-aa2d-9027b0411dc1
2> 
