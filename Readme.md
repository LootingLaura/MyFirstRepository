<!-- filepath: /Users/mahmoudtamaa/projects/proposals/portfolio-custom/contact.md -->

# Project Overview: 

This project is a **this  website** built using **VitePress**, a static site generator powered by **Vue.js**. The showcases various creative works, including detailed descriptions, images, and videos for each project. The site is styled with **Tailwind CSS** and includes custom components for a dynamic and visually appealing user experience.

---

## Features

### 1. **Dynamic Content**
   - The website includes multiple sections such as:
     - **Home**: A landing page and A gallery of projects with detailed descriptions..
     - **About**: A guide for creating project proposals.
  
   - Each project is represented as an `ArticleCard` component, dynamically rendered with props like title, excerpt, image, and date.
   - <P5Sketch :sketch="exampleSketch" />

### 2. **Custom Theme**
   - The project uses a custom theme for VitePress, defined in the `.vitepress/theme` directory.
   - Components include:
     - NavBar.vue: A responsive navigation bar.
     - HomePage.vue: A custom homepage layout.
     - ArticleCard.vue: A reusable card component for displaying project summaries.

### 3. **Styling**
   - Tailwind CSS is used for styling, providing utility-first CSS classes for rapid UI development.
   - The `@tailwindcss/typography` plugin enhances the typography for better readability.

### 4. **Responsive Design**
   - The site is fully responsive, ensuring a seamless experience across devices.

### 5. **Static Site Generation**
   - VitePress generates a static site, making it fast and easy to deploy.

---

## Technologies Used

### 1. **VitePress**
   - A static site generator built on Vue.js.
   - Documentation: [VitePress Official Guide](https://vitepress.dev/)

### 2. **Vue.js**
   - A progressive JavaScript framework for building user interfaces.
   - Documentation: [Vue.js Official Guide](https://vuejs.org/)

### 3. **Tailwind CSS**
   - A utility-first CSS framework for styling.
   - Documentation: [Tailwind CSS Official Guide](https://tailwindcss.com/)

### 4. **PostCSS**
   - A tool for transforming CSS with JavaScript plugins.
   - Documentation: [PostCSS Official Guide](https://postcss.org/)

### 5. **Node.js**
   - A JavaScript runtime for building and running the project.
   - Download: [Node.js Official Website](https://nodejs.org/)

### 6. **GitLab CI/CD**
   - Used for continuous integration and deployment.
   - Documentation: [GitLab CI/CD Guide](https://docs.gitlab.com/ee/ci/)

---

## Project Structure

```
portfolio-custom/
├── about.md
├── websiteoverview.md
├── index.md
├── .vitepress/
│   ├── config.mts
│   ├── theme/
│   │   ├── Layout.vue
│   │   ├── style.css
│   │   ├── components/
│   │   │   ├── NavBar.vue
│   │   │   ├── HomePage.vue
│   │   │   ├── ArticleCard.vue
│   │   └── index.ts
```

---

## How to Set Up the Project

### 1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd proposals
   ```

### 2. **Install Dependencies**
   Ensure you have Node.js installed, then run:
   ```bash
   npm install
   ```

### 3. **Run the Development Server**
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:5173`.

### 4. **Build the Static Site**
   ```bash
   npm run build
   ```
   The static files will be generated in the `public` directory.

### 5. **Preview the Build**
   ```bash
   npm run preview
   ```

---

## Deployment

The project uses **GitLab CI/CD** for deployment. The .gitlab-ci.yml file defines the pipeline to build and deploy the site. The static files are stored in the `public` directory, ready to be served.

---

## Resources and Links

- **VitePress**: [https://vitepress.dev/](https://vitepress.dev/)
- **Vue.js**: [https://vuejs.org/](https://vuejs.org/)
- **Tailwind CSS**: [https://tailwindcss.com/](https://tailwindcss.com/)
- **PostCSS**: [https://postcss.org/](https://postcss.org/)
- **Node.js**: [https://nodejs.org/](https://nodejs.org/)
- **GitLab CI/CD**: [https://docs.gitlab.com/ee/ci/](https://docs.gitlab.com/ee/ci/)

---

This website project is a great example of combining modern web technologies to create a visually appealing and functional static site.