exports.up = async function (knex) {
  // Create enum type if not exists
  await knex.raw(`
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'order_status_enum') THEN
        CREATE TYPE order_status_enum AS ENUM (
          'pending',
          'cooking',
          'out_for_delivery',
          'delivered'
        );
      END IF;
    END
    $$;
  `);

  // Drop default temporarily
  await knex.raw(`
    ALTER TABLE orders
    ALTER COLUMN status DROP DEFAULT;
  `);

  // Replace invalid values
  await knex('orders').where('status', 'preparing').update('status', 'cooking');
  await knex('orders').where('status', 'paid').update('status', 'pending');

  // Alter column to enum type
  await knex.raw(`
    ALTER TABLE orders
    ALTER COLUMN status TYPE order_status_enum
    USING (status::text::order_status_enum);
  `);

  // Restore default
  await knex.raw(`
    ALTER TABLE orders
    ALTER COLUMN status SET DEFAULT 'pending';
  `);
};

exports.down = async function (knex) {
  // Revert status column back to text and drop enum type
  await knex.raw(`
    ALTER TABLE orders
    ALTER COLUMN status DROP DEFAULT;
  `);

  await knex.raw(`
    ALTER TABLE orders
    ALTER COLUMN status TYPE text;
  `);

  await knex.raw(`
    DROP TYPE IF EXISTS order_status_enum;
  `);

  // Optionally reset default if needed
  await knex.raw(`
    ALTER TABLE orders
    ALTER COLUMN status SET DEFAULT 'pending';
  `);
};




