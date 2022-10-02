exports.up = function (knex) {
    return knex.schema.createTable("properties", (table) => {
      table.increments("properties_id").primary();
         table.string("auction_id");
         table.string("address");
         table.string("owner");
         table.string("debt");
         table.string("rating");
         table.string("image_url");
         table.string("status");
        table.timestamps(true, true);
    });
  };
  
  
  
  // exports.up = function (knex) {
  //     return knex.schema.createTable("properties", (table) => {
  //       table.increments("properties_id").primary();
  //       table.string("auction_id");
  //       table.string("address");
  //       table.string("owner");
  //       table.string("debt");
  //       table.string("rating");
  //       table.string("image_url");
  //       table.string("status");
  //       table.timestamps(true, true);
  //     });
  //   };
    
    exports.down = function (knex) {
      return knex.schema.dropTable("properties");
    };
  
