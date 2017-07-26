package com.mtheile.ramadama.service.mapper;

import com.mtheile.ramadama.domain.*;
import com.mtheile.ramadama.service.dto.RamadamaUserDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity RamadamaUser and its DTO RamadamaUserDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface RamadamaUserMapper extends EntityMapper <RamadamaUserDTO, RamadamaUser> {
    
    @Mapping(target = "users", ignore = true)
    RamadamaUser toEntity(RamadamaUserDTO ramadamaUserDTO); 
    default RamadamaUser fromId(Long id) {
        if (id == null) {
            return null;
        }
        RamadamaUser ramadamaUser = new RamadamaUser();
        ramadamaUser.setId(id);
        return ramadamaUser;
    }
}
