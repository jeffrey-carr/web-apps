package dev.jeffreycarr.javacommon.services;

import java.util.ArrayList;
import java.util.List;

import org.bson.codecs.configuration.CodecRegistry;
import org.bson.codecs.pojo.PojoCodecProvider;
import org.springframework.stereotype.Component;

import static org.bson.codecs.configuration.CodecRegistries.fromProviders;
import static org.bson.codecs.configuration.CodecRegistries.fromRegistries;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;

import com.mongodb.client.model.Filters;
import com.mongodb.client.result.InsertOneResult;
import com.mongodb.client.result.UpdateResult;

import dev.jeffreycarr.javacommon.constants.EnvironmentConstants;
import dev.jeffreycarr.javacommon.models.NotConnectedException;
import dev.jeffreycarr.javacommon.models.NotFoundException;
import dev.jeffreycarr.javacommon.models.VariableNotDefinedException;
import io.github.cdimascio.dotenv.Dotenv;

@Component
public class MongoService<T> {
  private MongoClient client;
  private MongoCollection<T> collection;
  private CodecRegistry pojoCodecRegistry;

  public MongoService() throws VariableNotDefinedException {
    Dotenv dotenv = Dotenv.load();
    String connectionString = dotenv.get(EnvironmentConstants.MongoURL);
    if (connectionString == null) {
      throw new VariableNotDefinedException(EnvironmentConstants.MongoURL);
    }
    
    // We need to define a codec registry to allow the Mongo driver to automatically
    // convert our POJOs to bson documents
      this.pojoCodecRegistry = fromRegistries(
      MongoClientSettings.getDefaultCodecRegistry(),
      fromProviders(PojoCodecProvider.builder().automatic(true).build())
    );
    MongoClientSettings settings = MongoClientSettings.builder()
      .codecRegistry(pojoCodecRegistry)
      .applyConnectionString(new ConnectionString(connectionString))
      .build();

    this.client = MongoClients.create(settings);
  }
  
  public void useCollection(String dbName, String collectionName, Class<T> clazz) throws IllegalArgumentException {
    MongoDatabase database = this.client.getDatabase(dbName).withCodecRegistry(this.pojoCodecRegistry);
    this.collection = database.getCollection(collectionName, clazz);
  }
  
  public T getByUUID(String uuid) throws NotConnectedException, NotFoundException {
    if (this.collection == null) {
      throw new NotConnectedException();
    }
    
    List<T> result = this.getByKey("_id", uuid);
    // getByKey throws not found, so we can safely get first item
    return result.get(0);
  }
  
  public List<T> getByKey(String key, String value) throws NotConnectedException, NotFoundException {
    if (this.collection == null) {
      throw new NotConnectedException();
    }

    FindIterable<T> result = collection.find(Filters.eq(key, value));
    List<T> aggregatedResults = new ArrayList<>();
    MongoCursor<T> it = result.iterator();
    while (it.hasNext()) {
      aggregatedResults.add(it.next());
    }
    
    if (aggregatedResults.isEmpty()) {
      throw new NotFoundException();
    }
    
    return aggregatedResults;
  }
  
  public InsertOneResult insertItem(T item) throws NotConnectedException {
    if (this.collection == null) {
      throw new NotConnectedException();
    }
    
    return this.collection.insertOne(item);
  }
  
  public void updateItem(String uuid, T updatedItem) throws NotConnectedException, NotFoundException {
    if (this.collection == null) {
      throw new NotConnectedException();
    }
    
    UpdateResult result = this.collection.replaceOne(
      Filters.eq("_id", uuid),
      updatedItem
    );
    if (result.getMatchedCount() == 0) {
      throw new NotFoundException();
    }
  }
}
