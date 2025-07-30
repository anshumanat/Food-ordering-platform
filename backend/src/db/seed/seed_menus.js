/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('menus').del();

  // Inserts seed entries
  await knex('menus').insert([
    {
      name: 'Margherita Pizza',
      price: 9.99,
      image_url: 'https://via.placeholder.com/300x200?text=Pizza',
    },
    {
      name: 'Cheeseburger',
      price: 7.49,
      image_url: 'https://via.placeholder.com/300x200?text=Burger',
    },
    {
      name: 'Veggie Pasta',
      price: 8.25,
      image_url: 'https://via.placeholder.com/300x200?text=Pasta',
    },
  ]);
};
