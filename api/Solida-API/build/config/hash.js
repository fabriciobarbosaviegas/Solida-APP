import { defineConfig, drivers } from '@adonisjs/core/hash';
const hashConfig = defineConfig({
    default: 'scrypt',
    list: {
        scrypt: drivers.scrypt({
            cost: 16384,
            blockSize: 8,
            parallelization: 1,
            maxMemory: 33554432,
        }),
    },
});
export default hashConfig;
//# sourceMappingURL=hash.js.map