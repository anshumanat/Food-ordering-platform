const knex = require('../db');

module.exports = async function getMenu(){
    const items = await knex('menus').select('*');
    return items;
};