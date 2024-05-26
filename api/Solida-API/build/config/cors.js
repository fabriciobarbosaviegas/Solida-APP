import { defineConfig } from '@adonisjs/cors';
const corsConfig = defineConfig({
    enabled: true,
    origin: true,
    methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE'],
    headers: true,
    exposeHeaders: [],
    credentials: true,
    maxAge: 90,
});
export default corsConfig;
//# sourceMappingURL=cors.js.map