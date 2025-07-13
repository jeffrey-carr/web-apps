package dev.jeffreycarr.webgamesbackend.models;

import dev.jeffreycarr.javacommon.models.CommonUser;

public class GetUserResponse{
  public final CommonUser user;
  public final UserStats stats;

  public GetUserResponse(CommonUser user, UserStats stats) {
    this.user = user;
    this.stats = stats;
  }
}
