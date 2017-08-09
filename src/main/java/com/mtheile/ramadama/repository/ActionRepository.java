package com.mtheile.ramadama.repository;

import com.mtheile.ramadama.domain.Action;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Action entity.
 */
@Repository
public interface ActionRepository extends JpaRepository<Action,Long> {
    
}
