# Urplug - News App

## Project info

A modern trading news application built with React, TypeScript, and Tailwind CSS.
Some current screenshot
<img width="1916" height="956" alt="image" src="https://github.com/user-attachments/assets/d878c8b8-9048-43f1-bbaf-d51006095216" />

<img width="1916" height="936" alt="image" src="https://github.com/user-attachments/assets/c6137749-11e3-448e-85d1-cf8fc0b62ec4" />
<img width="1920" height="847" alt="image" src="https://github.com/user-attachments/assets/7239cacd-18ac-4a97-8223-7023662d5dda" />

<img width="1916" height="903" alt="image" src="https://github.com/user-attachments/assets/bd87e3a9-0d39-41c5-83d8-5c78894f623e" />





## How can I edit this code?

There are several ways of editing your application.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

You can deploy this project using various hosting platforms:

- **Vercel**: Connect your GitHub repository and deploy automatically
- **Netlify**: Drag and drop your build folder or connect via Git
- **GitHub Pages**: Use GitHub Actions to build and deploy
- **Any static hosting service**: Build the project with `npm run build` and upload the `dist` folder

## Building for production

```sh
npm run build
```

Export to Github: Click the "Export to Github" button and git pull the project to your local machine
Install dependencies: Run npm install
Add platforms: Run npx cap add ios and/or npx cap add android
Update platforms: Run npx cap update ios or npx cap update android
Build project: Run npm run build
Sync to native: Run npx cap sync
Run on device: Run npx cap run android or npx cap run ios
Requirements:

For iOS: Mac with Xcode installed
For Android: Android Studio installed

This will create a `dist` folder with the production build that you can deploy to any static hosting service.
