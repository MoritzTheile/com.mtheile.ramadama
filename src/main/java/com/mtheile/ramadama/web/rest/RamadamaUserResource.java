package com.mtheile.ramadama.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mtheile.ramadama.domain.RamadamaUser;

import com.mtheile.ramadama.repository.RamadamaUserRepository;
import com.mtheile.ramadama.web.rest.util.HeaderUtil;
import com.mtheile.ramadama.service.dto.RamadamaUserDTO;
import com.mtheile.ramadama.service.mapper.RamadamaUserMapper;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing RamadamaUser.
 */
@RestController
@RequestMapping("/api")
public class RamadamaUserResource {

    private final Logger log = LoggerFactory.getLogger(RamadamaUserResource.class);

    private static final String ENTITY_NAME = "ramadamaUser";

    private final RamadamaUserRepository ramadamaUserRepository;

    private final RamadamaUserMapper ramadamaUserMapper;

    public RamadamaUserResource(RamadamaUserRepository ramadamaUserRepository, RamadamaUserMapper ramadamaUserMapper) {
        this.ramadamaUserRepository = ramadamaUserRepository;
        this.ramadamaUserMapper = ramadamaUserMapper;
    }

    /**
     * POST  /ramadama-users : Create a new ramadamaUser.
     *
     * @param ramadamaUserDTO the ramadamaUserDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new ramadamaUserDTO, or with status 400 (Bad Request) if the ramadamaUser has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/ramadama-users")
    @Timed
    public ResponseEntity<RamadamaUserDTO> createRamadamaUser(@RequestBody RamadamaUserDTO ramadamaUserDTO) throws URISyntaxException {
        log.debug("REST request to save RamadamaUser : {}", ramadamaUserDTO);
        if (ramadamaUserDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new ramadamaUser cannot already have an ID")).body(null);
        }
        RamadamaUser ramadamaUser = ramadamaUserMapper.toEntity(ramadamaUserDTO);
        ramadamaUser = ramadamaUserRepository.save(ramadamaUser);
        RamadamaUserDTO result = ramadamaUserMapper.toDto(ramadamaUser);
        return ResponseEntity.created(new URI("/api/ramadama-users/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /ramadama-users : Updates an existing ramadamaUser.
     *
     * @param ramadamaUserDTO the ramadamaUserDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated ramadamaUserDTO,
     * or with status 400 (Bad Request) if the ramadamaUserDTO is not valid,
     * or with status 500 (Internal Server Error) if the ramadamaUserDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/ramadama-users")
    @Timed
    public ResponseEntity<RamadamaUserDTO> updateRamadamaUser(@RequestBody RamadamaUserDTO ramadamaUserDTO) throws URISyntaxException {
        log.debug("REST request to update RamadamaUser : {}", ramadamaUserDTO);
        if (ramadamaUserDTO.getId() == null) {
            return createRamadamaUser(ramadamaUserDTO);
        }
        RamadamaUser ramadamaUser = ramadamaUserMapper.toEntity(ramadamaUserDTO);
        ramadamaUser = ramadamaUserRepository.save(ramadamaUser);
        RamadamaUserDTO result = ramadamaUserMapper.toDto(ramadamaUser);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, ramadamaUserDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /ramadama-users : get all the ramadamaUsers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of ramadamaUsers in body
     */
    @GetMapping("/ramadama-users")
    @Timed
    public List<RamadamaUserDTO> getAllRamadamaUsers() {
        log.debug("REST request to get all RamadamaUsers");
        List<RamadamaUser> ramadamaUsers = ramadamaUserRepository.findAll();
        return ramadamaUserMapper.toDto(ramadamaUsers);
    }

    /**
     * GET  /ramadama-users/:id : get the "id" ramadamaUser.
     *
     * @param id the id of the ramadamaUserDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the ramadamaUserDTO, or with status 404 (Not Found)
     */
    @GetMapping("/ramadama-users/{id}")
    @Timed
    public ResponseEntity<RamadamaUserDTO> getRamadamaUser(@PathVariable Long id) {
        log.debug("REST request to get RamadamaUser : {}", id);
        RamadamaUser ramadamaUser = ramadamaUserRepository.findOne(id);
        RamadamaUserDTO ramadamaUserDTO = ramadamaUserMapper.toDto(ramadamaUser);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(ramadamaUserDTO));
    }

    /**
     * DELETE  /ramadama-users/:id : delete the "id" ramadamaUser.
     *
     * @param id the id of the ramadamaUserDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/ramadama-users/{id}")
    @Timed
    public ResponseEntity<Void> deleteRamadamaUser(@PathVariable Long id) {
        log.debug("REST request to delete RamadamaUser : {}", id);
        ramadamaUserRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
