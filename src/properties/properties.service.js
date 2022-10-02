const knex = require("../db/connection");

function list() {
    return knex("properties")
      .select("*")
      .orderBy("properties_id")
      
  }

  function read(propertiesId) {
    return knex("properties")
      .select("*")
      .where({ "properties_id": propertiesId })
      .first();
  }

  function create(newProperty) {
    return knex("properties")
      .insert(newProperty)
      .returning("*")
      .then((propertyData) => propertyData[0]);
  }

  function updateNotBuy(property) {
    return knex("properties")
      .where({ properties_id: property.properties_id })
      .update({status: `notbuy`})
      .returning("*")
      
      
  }
  function updateBuy(property) {
    return knex("properties")
      .where({ properties_id: property.properties_id })
      .update({status: `buy`})
      .returning("*")
      
      
  }
  function updatemaybe(property) {
    return knex("properties")
      .where({ properties_id: property.properties_id })
      .update({status: `maybe`})
      .returning("*")
      
      
  }

  module.exports ={
    list,
    read,
    create,
    updateNotBuy,
    updateBuy,
    updatemaybe

    
}