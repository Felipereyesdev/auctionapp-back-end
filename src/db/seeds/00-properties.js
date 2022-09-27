const properties = require("./properties.json");
exports.seed = function(knex){
  return knex.raw("TRUNCATE TABLE properties RESTART IDENTITY CASCADE").then(() => {
    return knex("properties").insert(properties)
  })
}
