package dev.jeffreycarr.javacommon.services;

import java.util.ArrayList;
import java.util.List;

import org.bson.codecs.configuration.CodecRegistry;
import org.bson.codecs.pojo.PojoCodecProvider;
import org.springframework.context.annotation.Scope;
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
@Scope("prototype")
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

  public List<T> getAll() throws NotConnectedException {
    if (this.collection == null) {
      throw new NotConnectedException();
    }

    // Not scalable.
    return this.readFindIntoList(
      this.collection.find()
    );
  }
  
  public T getByUUID(String uuid) throws NotConnectedException, NotFoundException {
    if (this.collection == null) {
      throw new NotConnectedException();
    }
    
    List<T> result = this.getByKey("_id", uuid);
    // getByKey throws not found, so we can safely get first item
    return result.get(0);
  }

  public List<T> getByUUIDs(List<String> uuids) throws NotConnectedException {
    if (uuids.size() == 0) {
      return new ArrayList<T>();
    }

    return getMultipleByKey("_id", uuids);
  }
  
  public List<T> getByKey(String key, String value) throws NotConnectedException, NotFoundException {
    if (this.collection == null) {
      throw new NotConnectedException();
    }

    List<T> results = this.readFindIntoList(this.collection.find(Filters.eq(key, value)));
    if (results.isEmpty()) {
      throw new NotFoundException();
    }
    
    return results;
  }

  public List<T> getMultipleByKey(String key, List<String> values) throws NotConnectedException {
    if (this.collection == null) {
      throw new NotConnectedException();
    }

    int offset = 0;
    int step = 1000;
    List<T> results = new ArrayList<>();
    while (offset < values.size()-1) {
      int end = Math.min(values.size(), offset+step);

      String[] currentValues = values.subList(offset, end).toArray(new String[0]);
      List<T> currentItems = this.readFindIntoList(
        this.collection.find(Filters.in(key, currentValues))
      );

      results.addAll(currentItems);
      offset += end;
    }

    return results;
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

  private List<T> readFindIntoList(FindIterable<T> iter) {
    List<T> aggregatedResults = new ArrayList<>();
    MongoCursor<T> it = iter.iterator();
    while (it.hasNext()) {
      aggregatedResults.add(it.next());
    }

    return aggregatedResults;
  }
}
