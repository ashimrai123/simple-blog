# Simple Blog Application

This project is a **Simple Blog Application** built with modern web technologies, ensuring a fast, fully responsive, and accessible user experience.

## Technologies Used

- **Next.js**: For both Static Site Generation (SSG) and Server-Side Rendering (SSR).
- **TailwindCSS**: Provides responsive, utility-first CSS styling.
- **Shadcn UI Library**: Offers a consistent and accessible set of UI components, including a theme provider for light and dark modes.
- **useContext API**: Manages the state of the collapsible sidebar (open/closed) across the app.

## API Endpoints

- **Posts API**: Blog post data sourced from [JSONPlaceholder](https://jsonplaceholder.typicode.com/posts).
- **Images API**: Random images fetched from [Picsum.photos](https://picsum.photos/) to visually enhance posts.

## Features

- **Fully Responsive Design**:

  - The application adapts seamlessly to different screen sizes with mobile-first responsiveness.
  - **Collapsible Sidebar**: A state-managed sidebar built using `useContext`, allowing users to toggle it open and closed, especially handy for mobile views.
  - **Theme Support**: Built-in **theme provider** from Shadcn for light and dark modes, ensuring a consistent user experience across devices.

  ```bash
  # Example of starting the development server
  npm run dev
  ```

- **SSG (Static Site Generation)**: Pre-builds static pages for faster load times.

  ```bash
  # Generates static pages for blog posts
  npm run build
  ```

- **SSR (Server-Side Rendering)**: Renders blog post pages dynamically when requested by users.

  ```bash
  # Renders dynamic content on the server
  npm run start
  ```

## Shadcn Components Used

- **Button**: Interactive buttons throughout the UI.
- **Card**: Displays blog post previews.
- **Dialog**: For modal windows like delete confirmations.
- **Input & Label**: For form inputs in post creation and updates.
- **Pagination**: Navigating through paginated blog posts.
- **Textarea**: For multi-line post content.
- **Toast**: Provides notifications like "Post created" or "Error".
- **Tooltip**: Helpful hover text for additional info.

## Project Setup

To run this project locally:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/username/blog-app.git
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. **Build for production:**

   ```bash
   npm run build
   ```

5. **Start the production server:**
   ```bash
   npm run start
   ```

## Deployment

Deploy the application to Netlify, Vercel, or any other hosting service and enjoy the fully responsive blog with theme support, collapsible sidebar, and dynamic content powered by SSR/SSG.
