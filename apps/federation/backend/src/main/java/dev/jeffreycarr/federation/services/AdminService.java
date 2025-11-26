package dev.jeffreycarr.federation.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import dev.jeffreycarr.federation.models.APIKey;
import dev.jeffreycarr.federation.models.APIKeyExists;
import dev.jeffreycarr.federation.models.RevokeRequest;
import dev.jeffreycarr.javacommon.models.NotConnectedException;
import dev.jeffreycarr.javacommon.models.NotFoundException;

@Component
public class AdminService {
  private APIService apiService;

  @Autowired
  public AdminService(APIService apiService) {
    this.apiService = apiService;
  }

  public List<APIKey> getAllAPIKeys() throws NotConnectedException {
    return this.apiService.getAll();
  }

  public APIKey createAPIKey(String app) throws NotConnectedException, APIKeyExists {
    app = app.toLowerCase().trim();

    // Confirm this app has no other active keys
    List<APIKey> appKeys;
    try {
      appKeys = this.apiService.getByApp(app);
    } catch (NotFoundException e) {
      appKeys = new ArrayList<>();
    }

    for (APIKey key : appKeys) {
      if (key.isActive()) {
        throw new APIKeyExists(app);
      }
    }

    return this.apiService.createAPIKey(app);
  }

  public APIKey revokeAPIKey(String keyValue) throws NotConnectedException, NotFoundException {
    return this.apiService.revokeKey(keyValue);
  }
}
