package dev.jeffreycarr.webgamesbackend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import dev.jeffreycarr.javacommon.models.NotConnectedException;
import dev.jeffreycarr.javacommon.models.NotFoundException;
import dev.jeffreycarr.javacommon.services.MongoService;
import dev.jeffreycarr.webgamesbackend.constants.BinokuConstants;
import dev.jeffreycarr.webgamesbackend.constants.WordChainConstants;
import dev.jeffreycarr.webgamesbackend.models.UserStats;
import dev.jeffreycarr.webgamesbackend.models.binoku.BinokuStats;
import dev.jeffreycarr.webgamesbackend.models.wordchain.WordChainStats;

@Component
public class UserStatsService {
  private MongoService<UserStats> mongo;

  @Autowired
  public UserStatsService(MongoService<UserStats> mongo) {
    this.mongo = mongo;
    this.mongo.useCollection("web_games", "user_scores", UserStats.class);
  }
  
  public void updateGamesPlayed(String uuid, String gameName) throws NotConnectedException, NotFoundException {
    UserStats stats = this.getUserStats(uuid);
    switch (gameName) {
      case BinokuConstants.GameName:
        BinokuStats binokuStats = stats.getBinoku();
        binokuStats.incrementGamesPlayed();
        stats.setBinoku(binokuStats);
        break;
      case WordChainConstants.GameName:
        WordChainStats wordChainStats = stats.getWordChain();
        wordChainStats.incrementGamesPlayed();
        stats.setWordChain(wordChainStats);
        break;
      default:
        return;
    }
    
    this.putUserStats(uuid, stats);
  }
  
  public UserStats getOrCreateUserStats(String uuid) throws NotConnectedException {
    UserStats stats;
    try {
      stats = this.getUserStats(uuid);
    } catch (NotFoundException e) {
      stats = new UserStats(uuid);
      this.mongo.insertItem(stats);
    }
    
    return stats;
  }
  
  public UserStats getUserStats(String uuid) throws NotConnectedException, NotFoundException {
    return this.mongo.getByUUID(uuid);
  }
  
  public void putUserStats(String userUUID, UserStats stats) throws NotConnectedException, NotFoundException {
    this.mongo.updateItem(userUUID, stats);
  }
}
