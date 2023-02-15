package com.scottlogic.library.Services;

import java.util.List;

public interface ICrudService<T, Id> {
  public List<T> getAll();

  public T get(Id id);

  public T create(T entity);

  public T update(T entity);

  public T delete(Id id);
}