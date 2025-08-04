/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  //Deletes all existing entries
  await knex('menus').del();

await knex('menus').insert([
  {
    name: 'Margherita Pizza',
    price: 9.99,
    image_url: '/images/margherita-pizza.webp',
  },
  {
    name: 'Veggie Burger',
    price: 7.49,
    image_url: '/images/veggie-burger.webp',
  },
  {
    name: 'Caesar Salad',
    price: 6.99,
    image_url: '/images/caesar-salad.webp',
  },
  {
    name: 'Pepperoni Pizza',
    price: 10.99,
    image_url: '/images/pepperoni-pizza.webp',
  },
  {
    name: 'Jalebi',
    price: 3.99,
    image_url: '/images/jalebi.webp',
  },
  {
    name: 'Greek Salad',
    price: 7.25,
    image_url: '/images/greek-salad.webp',
  },
  {
    name: 'Lemonade',
    price: 2.99,
    image_url: '/images/lemonade.webp',
  },
  {
    name: 'Chocolate Cake',
    price: 4.99,
    image_url: '/images/chocolate-cake.webp',
  },
  {
    name: 'Iced Coffee',
    price: 3.75,
    image_url: '/images/iced-coffee.webp',
  },
]);
};

