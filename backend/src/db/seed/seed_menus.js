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
      image_url: 'https://images.pexels.com/photos/20115306/pexels-photo-20115306.jpeg',
    },
    {
      name: 'Veggie Burger',
      price: 7.49,
      image_url: 'https://images.pexels.com/photos/3616956/pexels-photo-3616956.jpeg',
    },
    {
      name: 'Caesar Salad',
      price: 6.99,
      image_url: 'https://images.pexels.com/photos/8251537/pexels-photo-8251537.jpeg',
    },
    {
      name: 'Pepperoni Pizza',
      price: 10.99,
      image_url: 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg',
    },
    {
      name: 'Jalebi',
      price: 3.99,
      image_url: 'https://images.pexels.com/photos/8887054/pexels-photo-8887054.jpeg',
    },
    {
      name: 'Greek Salad',
      price: 7.25,
      image_url: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg',
    },
    {
      name: 'Lemonade',
      price: 2.99,
      image_url: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg',
    },
    {
      name: 'Chocolate Cake',
      price: 4.99,
      image_url: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg',
    },
    {
      name: 'Iced Coffee',
      price: 3.75,
      image_url: 'https://images.pexels.com/photos/1162455/pexels-photo-1162455.jpeg',
    },
  ]);
};

