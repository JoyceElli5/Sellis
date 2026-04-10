package com.sellis.server.repository;

import com.sellis.server.model.SalonService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface SalonServiceRepository extends MongoRepository<SalonService, String> {

    List<SalonService> findByActiveTrueOrderByCategoryNameAscNameAsc();

    List<SalonService> findByCategoryIdAndActiveTrue(String categoryId);

    Page<SalonService> findByActiveTrue(Pageable pageable);

    Page<SalonService> findByCategoryIdAndActiveTrue(String categoryId, Pageable pageable);

    @Query("{'active': true, 'name': {$regex: ?0, $options: 'i'}}")
    Page<SalonService> searchByName(String keyword, Pageable pageable);

    @Query("{'active': true, '$or': [{'name': {$regex: ?0, $options: 'i'}}, {'categoryName': {$regex: ?0, $options: 'i'}}]}")
    Page<SalonService> searchByNameOrCategory(String keyword, Pageable pageable);
}
