package com.mtheile.ramadama.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mtheile.ramadama.domain.Action;
import com.mtheile.ramadama.repository.ActionRepository;
import com.mtheile.ramadama.repository.search.ActionSearchRepository;
import com.mtheile.ramadama.service.dto.ActionDTO;

/**
 * Service class for managing actions.
 */
@Service
@Transactional
public class ActionService {

    private final Logger log = LoggerFactory.getLogger(ActionService.class);

    private final ActionRepository actionRepository;

    private final ActionSearchRepository actionSearchRepository;


    public ActionService(ActionRepository actionRepository, ActionSearchRepository actionSearchRepository) {
    	
        this.actionRepository = actionRepository;
        this.actionSearchRepository = actionSearchRepository;
    }

  
    public Action createAction(ActionDTO actionDTO) {
        Action action = new Action();
      
        actionRepository.save(action);
        actionSearchRepository.save(action);
        log.debug("Created Information for Action: {}", action);
        return action;
    }

}
