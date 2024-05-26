import env from '#start/env';
import app from '@adonisjs/core/services/app';
import { defineConfig, targets } from '@adonisjs/core/logger';
const loggerConfig = defineConfig({
    default: 'app',
    loggers: {
        app: {
            enabled: true,
            name: env.get('APP_NAME'),
            level: env.get('LOG_LEVEL'),
            transport: {
                targets: targets()
                    .pushIf(!app.inProduction, targets.pretty())
                    .pushIf(app.inProduction, targets.file({ destination: 1 }))
                    .toArray(),
            },
        },
    },
});
export default loggerConfig;
//# sourceMappingURL=logger.js.map