package com.proj1.alumni.request;

import java.util.List;

public class UserFriendsRequest {
    private List<String> friends;

    public List<String> getFriends() {
        return friends;
    }

    public void setFriends(List<String> friends) {
        this.friends = friends;
    }
}
