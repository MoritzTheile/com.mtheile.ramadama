package com.mtheile.ramadama.repository;

import com.mtheile.ramadama.domain.RamadamaUser;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the RamadamaUser entity.
 */
@Repository
public interface RamadamaUserRepository extends JpaRepository<RamadamaUser,Long> {
    
}
