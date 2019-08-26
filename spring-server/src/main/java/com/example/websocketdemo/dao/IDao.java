package com.example.websocketdemo.dao;

import java.util.List;
import java.util.Optional;

public interface IDao<T> {
    List<T> getAll();
    Optional<T> get(int id);
    void update(T record);
    void delete(T record);
}
