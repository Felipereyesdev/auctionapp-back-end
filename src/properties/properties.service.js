const knex = require("../db/connection");

function list() {
    return knex("properties")
      .select("*")
      
  }

  function create(newProperty) {
    return knex("properties")
      .insert(newProperty)
      .returning("*")
      .then((propertyData) => propertyData[0]);
  }

  module.exports ={
    list,
    create
    
}