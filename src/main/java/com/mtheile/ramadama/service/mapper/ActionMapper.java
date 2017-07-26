package com.mtheile.ramadama.service.mapper;

import com.mtheile.ramadama.domain.*;
import com.mtheile.ramadama.service.dto.ActionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Action and its DTO ActionDTO.
 */
@Mapper(componentModel = "spring", uses = {RamadamaUserMapper.class, StateMapper.class, })
public interface ActionMapper extends EntityMapper <ActionDTO, Action> {

    @Mapping(source = "ramadamaUser.id", target = "ramadamaUserId")

    @Mapping(source = "stateBefore.id", target = "stateBeforeId")

    @Mapping(source = "stateAfter.id", target = "stateAfterId")
    ActionDTO toDto(Action action); 

    @Mapping(source = "ramadamaUserId", target = "ramadamaUser")

    @Mapping(source = "stateBeforeId", target = "stateBefore")

    @Mapping(source = "stateAfterId", target = "stateAfter")
    Action toEntity(ActionDTO actionDTO); 
    default Action fromId(Long id) {
        if (id == null) {
            return null;
        }
        Action action = new Action();
        action.setId(id);
        return action;
    }
}
