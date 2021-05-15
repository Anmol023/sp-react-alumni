package com.proj1.alumni.repository;

import com.proj1.alumni.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ITempUserFriendsRepository extends JpaRepository<User, Integer> {
    User findByEmail(String email);
}
