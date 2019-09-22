package com.ltm2019.mistory.dao;

import java.util.List;
import java.util.Optional;

public interface IDao<T> {
    List<T> getAll();
    Optional<T> get(String id);
    void update(T record);
    void delete(T record);
}
