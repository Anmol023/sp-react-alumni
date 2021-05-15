package com.proj1.alumni.model;

import org.springframework.util.CollectionUtils;

import javax.persistence.*;

@Entity
@Table(name = "user_friends")
public class UserFriends {
    @Id
    @Column
    private int friendId;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private User user;

    public int getFriendId() {
        return friendId;
    }

    public void setFriendId(int friendId) {
        this.friendId = friendId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }


}
