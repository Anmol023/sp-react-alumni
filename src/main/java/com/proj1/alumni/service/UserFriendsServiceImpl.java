package com.proj1.alumni.service;

import com.proj1.alumni.model.User;
import com.proj1.alumni.repository.IUserFriendsRepository;
import com.proj1.alumni.repository.IUserRepository;
import com.proj1.alumni.request.UserFriendsListRequest;
import com.proj1.alumni.request.UserFriendsRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserFriendsServiceImpl implements IUserFriendsService {

    @Autowired
    private IUserFriendsRepository userFriend;

    @Autowired
    private IUserRepository repo;



    @Override
    public ResponseEntity<String> addUserFriends(UserFriendsRequest userFriendsRequest) {

        Map<String, Object> result = new HashMap<String, Object>();

        if (userFriendsRequest == null) {
            return ResponseEntity.badRequest().body("Error : Invalid request");
        }

        if (CollectionUtils.isEmpty(userFriendsRequest.getFriends())) {

            return ResponseEntity.badRequest().body("Error : Friend list cannot be empty");
        }
        if (userFriendsRequest.getFriends().size() != 2) {

            return ResponseEntity.badRequest().body("Info : , Please provide 2 emails to make them friends");
        }

        String email1 = userFriendsRequest.getFriends().get(0);
        String email2 = userFriendsRequest.getFriends().get(1);

        if (email1.equals(email2)) {

            return ResponseEntity.badRequest().body("Info : Cannot make friends, if users are same");
        }

        User user1 = null;
        User user2 = null;

        if (user1.getUserFriends().contains(user2)) {

            return ResponseEntity.ok("Info : Can't add, they are already friends");
        }

        user1.addUserFriends(user2);
        user2.addUserFriends(user1);

        return  ResponseEntity.ok("Success");
    }

    @Override
    public List<User> getUserFriendsList(UserFriendsListRequest userFriendsListRequest) {

        if (userFriendsListRequest == null) {
            return null;
        }

        User user = this.userFriend.findByEmail(userFriendsListRequest.getEmail());
        List<String> friendListEmail = user.getUserFriends().stream().map(User::getEmail).collect(Collectors.toList());

        List friendList = new ArrayList<User>();
        for (String e : friendListEmail){
            friendList.add(repo.findByEmail(e));
        }

        return friendList;

    }

    @Override
    public ResponseEntity<Map<String, Object>> getCommonUserFriends(UserFriendsRequest userFriendsRequest) {

        Map<String, Object> result = new HashMap<String, Object>();

        if (userFriendsRequest == null) {
            result.put("Error : ", "Invalid request");
            return new ResponseEntity<Map<String, Object>>(result, HttpStatus.BAD_REQUEST);
        }

        User user1 = null;
        User user2 = null;
        user1 = this.userFriend.findByEmail(userFriendsRequest.getFriends().get(0));
        user2 = this.userFriend.findByEmail(userFriendsRequest.getFriends().get(1));

        if (user1.getEmail().equals(user2.getEmail())) {
            result.put("Info : ", "Both users are same");
            return new ResponseEntity<Map<String, Object>>(result, HttpStatus.BAD_REQUEST);
        }

        Set<User> friends = null;
        friends = user1.getUserFriends();
        friends.retainAll(user2.getUserFriends());

        result.put("success", true);
        result.put("friends", friends.stream().map(User::getEmail).collect(Collectors.toList()));
        result.put("count", friends.size());

        return new ResponseEntity<Map<String, Object>>(result, HttpStatus.OK);
    }

    public ResponseEntity deleteFriend(String email){
        User existingUser = this.userFriend.findByEmail(email);
        userFriend.delete(existingUser);
        return ResponseEntity.ok("Deleted Successfully");
    }
}
