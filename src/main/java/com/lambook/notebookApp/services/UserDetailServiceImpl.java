package com.lambook.notebookApp.services;

import com.lambook.notebookApp.pages.Users;
import com.lambook.notebookApp.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class UserDetailServiceImpl implements UserDetailsService {


    @Autowired
    private UserRepo userRepo;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Users> users = userRepo.findByUserName(username);
        if (users.isPresent()) {
            return org.springframework.security.core.userdetails.User.builder()
                    .username(users.get().getUserName())
                    .password(users.get().getPassword())
                    .roles(users.get().getRoles().toArray(new String[0])).build();

        }

        throw new UsernameNotFoundException("User not found !");
    }



}
