import { defineConfig } from 'astro/config';
import storyblok from '@storyblok/astro';
import { loadEnv } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';

const env = loadEnv("", process.cwd(), 'STORYBLOK');

export default defineConfig({
    vite: { plugins: [basicSsl()] },
    server: { port: 3000 },
    integrations: [
        storyblok({
            accessToken: env.STORYBLOK_TOKEN,
            components: {
                blogPost: 'storyblok/BlogPost',
                blogPostList: 'storyblok/BlogPostList',
                page: 'storyblok/Page',
            },
            apiOptions: {
                // Choose your Storyblok space region
                region: 'eu', // optional,  or 'eu' (default)
            },
        })
    ],
});