package com.proj1.alumni.service;

import com.proj1.alumni.model.User;
import com.proj1.alumni.request.UserFriendsListRequest;
import com.proj1.alumni.request.UserFriendsRequest;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface ITempUserFriendsService {
    ResponseEntity<Map<String, Object>> addFriendRequest(UserFriendsRequest userFriendsRequestEntity);

    List<User> getFriendRequestList(UserFriendsListRequest userFriendsListRequestEntity);

}
