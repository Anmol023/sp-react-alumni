package com.proj1.alumni.service;

import com.proj1.alumni.request.UserFriendsListRequest;
import com.proj1.alumni.request.UserFriendsRequest;
import org.springframework.http.ResponseEntity;

import java.util.Map;

public interface IUserFriendsService {
    ResponseEntity<String> addUserFriends(UserFriendsRequest userFriendsRequest);

    Object getUserFriendsList(UserFriendsListRequest userFriendsListRequest);

    ResponseEntity deleteFriend(String email);

    ResponseEntity<Map<String, Object>> getCommonUserFriends(UserFriendsRequest userFriendsRequest);
}
