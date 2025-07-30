const knex = require('../db');


// getMenu tested via Postman on localhost

module.exports = async function getMenu(){
    const items = await knex('menus').select('*');
    return items;
};