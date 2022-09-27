const knex = require("../db/connection");

function list() {
    return knex("properties")
      .select("*")
      
  }

  module.exports ={
    list,
    
}