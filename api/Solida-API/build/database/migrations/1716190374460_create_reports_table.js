import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'reports';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE');
            table.string('category').notNullable();
            table.string('cords').notNullable();
            table.string('title').notNullable();
            table.string('description').notNullable();
            table.string('image_url').notNullable();
            table.boolean('status').notNullable();
            table.timestamp('created_at');
            table.timestamp('updated_at');
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1716190374460_create_reports_table.js.map