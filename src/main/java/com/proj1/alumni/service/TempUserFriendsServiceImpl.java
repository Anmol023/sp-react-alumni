package com.proj1.alumni.service;

import com.proj1.alumni.model.User;
import com.proj1.alumni.repository.ITempUserFriendsRepository;
import com.proj1.alumni.repository.IUserRepository;
import com.proj1.alumni.request.UserFriendsListRequest;
import com.proj1.alumni.request.UserFriendsRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class TempUserFriendsServiceImpl implements ITempUserFriendsService{

    @Autowired
    ITempUserFriendsRepository tempUserFriends;

    @Autowired
    IUserRepository repo;

    private User saveIfNotExist(String email) {

        User existingUser = this.tempUserFriends.findByEmail(email);
        if (existingUser == null) {
            existingUser = new User();
            existingUser.setEmail(email);
            return this.tempUserFriends.save(existingUser);
        } else {
            return existingUser;
        }

    }

    @Override
    public ResponseEntity<Map<String, Object>> addFriendRequest(UserFriendsRequest userFriendsRequest) {

        Map<String, Object> result = new HashMap<String, Object>();

        if (userFriendsRequest == null) {
            result.put("Error : ", "Invalid request");
            return new ResponseEntity<Map<String, Object>>(result, HttpStatus.BAD_REQUEST);
        }

        if (CollectionUtils.isEmpty(userFriendsRequest.getFriends())) {
            result.put("Error : ", "Friend list cannot be empty");
            return new ResponseEntity<Map<String, Object>>(result, HttpStatus.BAD_REQUEST);
        }
        if (userFriendsRequest.getFriends().size() != 2) {
            result.put("Info : ", "Please provide 2 emails to make them friends");
            return new ResponseEntity<Map<String, Object>>(result, HttpStatus.BAD_REQUEST);
        }

        String email1 = userFriendsRequest.getFriends().get(0);
        String email2 = userFriendsRequest.getFriends().get(1);

        if (email1.equals(email2)) {
            result.put("Info : ", "Cannot make friends, if users are same");
            return new ResponseEntity<Map<String, Object>>(result, HttpStatus.BAD_REQUEST);
        }

        User user1 = null;
        User user2 = null;
        user1 = this.saveIfNotExist(email1);
        user2 = this.saveIfNotExist(email2);

        if (user1.getUserFriends().contains(user2)) {
            result.put("Info : ", "Can't add, they are already friends");
            return new ResponseEntity<Map<String, Object>>(result, HttpStatus.OK);
        }

        user2.addTempUserFriends(user1);
        this.tempUserFriends.save(user2);
        result.put("Success", true);

        return new ResponseEntity<Map<String, Object>>(result, HttpStatus.OK);
    }

    @Override
    public List<User> getFriendRequestList(UserFriendsListRequest userFriendsListRequest) {

        Map<String, Object> result = new HashMap<String, Object>();

        if (userFriendsListRequest == null) {
            return null;
        }

        User user = this.tempUserFriends.findByEmail(userFriendsListRequest.getEmail());
        List<String> friendListEmail = user.getTempUserFriends().stream().map(User::getEmail).collect(Collectors.toList());

        List friendList = new ArrayList<User>();
        for (String e : friendListEmail){
            friendList.add(repo.findByEmail(e));
        }

        return friendList;

    }


}
