# Doublem - Vue JS

Doublem is a web-cv designed to tell your motivations, experiences and skills.
It is developed in **Vue JS**, with **Vite JS** for an optimized development experience and integrates **Dato CMS** for content management.

View in action: [doublem.dev](https://www.doublem.dev)

## Installation
After cloning the repository, move into the project directory:

```
cd doublem_vue
```

Install dependencies:
```
# npm
npm install

# yarn
yarn install
```

Once all the dependencies are installed, you can start the local development server:

```
# npm
npm run dev

# yarn
yarn dev
```

## Setup
To integrate Dato CMS you will need to configure your environment variables. Create an `.env` or `.env.local` file in the root of project with:

```
VITE_APP_VERSION=version_to_show_on_footer
VITE_CMS_DATOCMS_API_TOKEN=your_datocms_api_token
VITE_BASE_URL=/
VITE_DEFAULT_LOCALE=en
VITE_FALLBACK_LOCALE=en
VITE_SUPPORTED_LOCALES=en,it
```


