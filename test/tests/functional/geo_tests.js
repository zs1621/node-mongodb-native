/**
 * Example of a simple geoNear query across some documents
 *
 * @_class collection
 * @_function geoNear
 * @ignore
 */
exports.shouldCorrectlyPerformSimpleGeoNearCommand = function(configuration, test) {

  configuration.connect("w=1&maxPoolSize=1", function(err, db) {
  // DOC_LINE // Connect to the server using MongoClient
  // DOC_LINE MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
  // DOC_START
    
    // Fetch the collection
    var collection = db.collection("simple_geo_near_command");
      
    // Add a location based index
    collection.ensureIndex({loc:"2d"}, function(err, result) {

      // Save a new location tagged document
      collection.insert([{a:1, loc:[50, 30]}, {a:1, loc:[30, 50]}], {w:1}, function(err, result) {
       
        // Use geoNear command to find document
        collection.geoNear(50, 50, {query:{a:1}, num:1}, function(err, docs) {
          test.equal(1, docs.results.length);
          
          db.close();
          test.done();
        });          
      });
    });      
  });
  // DOC_END
}

/**
 * Example of a simple geoHaystackSearch query across some documents
 *
 * @_class collection
 * @_function geoHaystackSearch
 * @ignore
 */
exports.shouldCorrectlyPerformSimpleGeoHaystackSearchCommand = function(configuration, test) {

  configuration.connect("w=1&maxPoolSize=1", function(err, db) {
  // DOC_LINE // Connect to the server using MongoClient
  // DOC_LINE MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
  // DOC_START
    
    // Fetch the collection
    var collection = db.collection("simple_geo_haystack_command");
      
    // Add a location based index
    collection.ensureIndex({loc: "geoHaystack", type: 1}, {bucketSize: 1}, function(err, result) {

      // Save a new location tagged document
      collection.insert([{a:1, loc:[50, 30]}, {a:1, loc:[30, 50]}], {w:1}, function(err, result) {
       
        // Use geoNear command to find document
        collection.geoHaystackSearch(50, 50, {search:{a:1}, limit:1, maxDistance:100}, function(err, docs) {
          test.equal(1, docs.results.length);
          
          db.close();
          test.done();
        });          
      });
    });      
  });
  // DOC_END
}