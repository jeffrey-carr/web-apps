package dev.jeffreycarr.federation.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import dev.jeffreycarr.federation.constants.MongoConstants;
import dev.jeffreycarr.federation.models.APIKey;
import dev.jeffreycarr.javacommon.models.NotConnectedException;
import dev.jeffreycarr.javacommon.models.NotFoundException;
import dev.jeffreycarr.javacommon.services.MongoService;
import dev.jeffreycarr.javacommon.utils.StringUtils;

// APIService manages access to the API
@Component
public class APIService {
  private MongoService<APIKey> mongo;

  @Autowired
  public APIService(MongoService<APIKey> mongo) {
    this.mongo = mongo;
    this.mongo.useCollection(MongoConstants.FEDERATION_DB, MongoConstants.API_KEY_COLL, APIKey.class);
  }

  public List<APIKey> getAll() throws NotConnectedException {
    return this.mongo.getAll();
  }

  public List<APIKey> getByApp(String app) throws NotConnectedException, NotFoundException {
    return this.mongo.getByKey("app", app);
  }

  public APIKey createAPIKey(String app) throws NotConnectedException {
    APIKey key = new APIKey(StringUtils.newUUID(), app);
    this.mongo.insertItem(key);

    return key;
  }

  public boolean isKeyValid(String guess) throws NotConnectedException {
    APIKey key;
    try {
      key = this.mongo.getByUUID(guess);
    } catch (NotFoundException e) {
      return false;
    }

    if (!key.isActive()) {
      return false;
    }

    key.seen();

    try {
      this.mongo.updateItem(key.getKey(), key);
    } catch (NotFoundException e) {
      return false;
    }

    return true;
  }

  public APIKey revokeKey(String keyValue) throws NotConnectedException, NotFoundException {
    APIKey key = this.mongo.getByUUID(keyValue);
    key.revoke();
    this.mongo.updateItem(keyValue, key);
    return key;
  }
}
