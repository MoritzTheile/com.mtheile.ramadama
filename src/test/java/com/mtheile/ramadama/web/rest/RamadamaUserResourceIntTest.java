package com.mtheile.ramadama.web.rest;

import com.mtheile.ramadama.RamadamaApp;

import com.mtheile.ramadama.domain.RamadamaUser;
import com.mtheile.ramadama.repository.RamadamaUserRepository;
import com.mtheile.ramadama.repository.search.RamadamaUserSearchRepository;
import com.mtheile.ramadama.service.dto.RamadamaUserDTO;
import com.mtheile.ramadama.service.mapper.RamadamaUserMapper;
import com.mtheile.ramadama.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the RamadamaUserResource REST controller.
 *
 * @see RamadamaUserResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = RamadamaApp.class)
public class RamadamaUserResourceIntTest {

    @Autowired
    private RamadamaUserRepository ramadamaUserRepository;

    @Autowired
    private RamadamaUserMapper ramadamaUserMapper;

    @Autowired
    private RamadamaUserSearchRepository ramadamaUserSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRamadamaUserMockMvc;

    private RamadamaUser ramadamaUser;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        RamadamaUserResource ramadamaUserResource = new RamadamaUserResource(ramadamaUserRepository, ramadamaUserMapper, ramadamaUserSearchRepository);
        this.restRamadamaUserMockMvc = MockMvcBuilders.standaloneSetup(ramadamaUserResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RamadamaUser createEntity(EntityManager em) {
        RamadamaUser ramadamaUser = new RamadamaUser();
        return ramadamaUser;
    }

    @Before
    public void initTest() {
        ramadamaUserSearchRepository.deleteAll();
        ramadamaUser = createEntity(em);
    }

    @Test
    @Transactional
    public void createRamadamaUser() throws Exception {
        int databaseSizeBeforeCreate = ramadamaUserRepository.findAll().size();

        // Create the RamadamaUser
        RamadamaUserDTO ramadamaUserDTO = ramadamaUserMapper.toDto(ramadamaUser);
        restRamadamaUserMockMvc.perform(post("/api/ramadama-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ramadamaUserDTO)))
            .andExpect(status().isCreated());

        // Validate the RamadamaUser in the database
        List<RamadamaUser> ramadamaUserList = ramadamaUserRepository.findAll();
        assertThat(ramadamaUserList).hasSize(databaseSizeBeforeCreate + 1);
        RamadamaUser testRamadamaUser = ramadamaUserList.get(ramadamaUserList.size() - 1);

        // Validate the RamadamaUser in Elasticsearch
        RamadamaUser ramadamaUserEs = ramadamaUserSearchRepository.findOne(testRamadamaUser.getId());
        assertThat(ramadamaUserEs).isEqualToComparingFieldByField(testRamadamaUser);
    }

    @Test
    @Transactional
    public void createRamadamaUserWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ramadamaUserRepository.findAll().size();

        // Create the RamadamaUser with an existing ID
        ramadamaUser.setId(1L);
        RamadamaUserDTO ramadamaUserDTO = ramadamaUserMapper.toDto(ramadamaUser);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRamadamaUserMockMvc.perform(post("/api/ramadama-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ramadamaUserDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<RamadamaUser> ramadamaUserList = ramadamaUserRepository.findAll();
        assertThat(ramadamaUserList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllRamadamaUsers() throws Exception {
        // Initialize the database
        ramadamaUserRepository.saveAndFlush(ramadamaUser);

        // Get all the ramadamaUserList
        restRamadamaUserMockMvc.perform(get("/api/ramadama-users?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ramadamaUser.getId().intValue())));
    }

    @Test
    @Transactional
    public void getRamadamaUser() throws Exception {
        // Initialize the database
        ramadamaUserRepository.saveAndFlush(ramadamaUser);

        // Get the ramadamaUser
        restRamadamaUserMockMvc.perform(get("/api/ramadama-users/{id}", ramadamaUser.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ramadamaUser.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingRamadamaUser() throws Exception {
        // Get the ramadamaUser
        restRamadamaUserMockMvc.perform(get("/api/ramadama-users/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRamadamaUser() throws Exception {
        // Initialize the database
        ramadamaUserRepository.saveAndFlush(ramadamaUser);
        ramadamaUserSearchRepository.save(ramadamaUser);
        int databaseSizeBeforeUpdate = ramadamaUserRepository.findAll().size();

        // Update the ramadamaUser
        RamadamaUser updatedRamadamaUser = ramadamaUserRepository.findOne(ramadamaUser.getId());
        RamadamaUserDTO ramadamaUserDTO = ramadamaUserMapper.toDto(updatedRamadamaUser);

        restRamadamaUserMockMvc.perform(put("/api/ramadama-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ramadamaUserDTO)))
            .andExpect(status().isOk());

        // Validate the RamadamaUser in the database
        List<RamadamaUser> ramadamaUserList = ramadamaUserRepository.findAll();
        assertThat(ramadamaUserList).hasSize(databaseSizeBeforeUpdate);
        RamadamaUser testRamadamaUser = ramadamaUserList.get(ramadamaUserList.size() - 1);

        // Validate the RamadamaUser in Elasticsearch
        RamadamaUser ramadamaUserEs = ramadamaUserSearchRepository.findOne(testRamadamaUser.getId());
        assertThat(ramadamaUserEs).isEqualToComparingFieldByField(testRamadamaUser);
    }

    @Test
    @Transactional
    public void updateNonExistingRamadamaUser() throws Exception {
        int databaseSizeBeforeUpdate = ramadamaUserRepository.findAll().size();

        // Create the RamadamaUser
        RamadamaUserDTO ramadamaUserDTO = ramadamaUserMapper.toDto(ramadamaUser);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restRamadamaUserMockMvc.perform(put("/api/ramadama-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ramadamaUserDTO)))
            .andExpect(status().isCreated());

        // Validate the RamadamaUser in the database
        List<RamadamaUser> ramadamaUserList = ramadamaUserRepository.findAll();
        assertThat(ramadamaUserList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteRamadamaUser() throws Exception {
        // Initialize the database
        ramadamaUserRepository.saveAndFlush(ramadamaUser);
        ramadamaUserSearchRepository.save(ramadamaUser);
        int databaseSizeBeforeDelete = ramadamaUserRepository.findAll().size();

        // Get the ramadamaUser
        restRamadamaUserMockMvc.perform(delete("/api/ramadama-users/{id}", ramadamaUser.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean ramadamaUserExistsInEs = ramadamaUserSearchRepository.exists(ramadamaUser.getId());
        assertThat(ramadamaUserExistsInEs).isFalse();

        // Validate the database is empty
        List<RamadamaUser> ramadamaUserList = ramadamaUserRepository.findAll();
        assertThat(ramadamaUserList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchRamadamaUser() throws Exception {
        // Initialize the database
        ramadamaUserRepository.saveAndFlush(ramadamaUser);
        ramadamaUserSearchRepository.save(ramadamaUser);

        // Search the ramadamaUser
        restRamadamaUserMockMvc.perform(get("/api/_search/ramadama-users?query=id:" + ramadamaUser.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ramadamaUser.getId().intValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RamadamaUser.class);
        RamadamaUser ramadamaUser1 = new RamadamaUser();
        ramadamaUser1.setId(1L);
        RamadamaUser ramadamaUser2 = new RamadamaUser();
        ramadamaUser2.setId(ramadamaUser1.getId());
        assertThat(ramadamaUser1).isEqualTo(ramadamaUser2);
        ramadamaUser2.setId(2L);
        assertThat(ramadamaUser1).isNotEqualTo(ramadamaUser2);
        ramadamaUser1.setId(null);
        assertThat(ramadamaUser1).isNotEqualTo(ramadamaUser2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(RamadamaUserDTO.class);
        RamadamaUserDTO ramadamaUserDTO1 = new RamadamaUserDTO();
        ramadamaUserDTO1.setId(1L);
        RamadamaUserDTO ramadamaUserDTO2 = new RamadamaUserDTO();
        assertThat(ramadamaUserDTO1).isNotEqualTo(ramadamaUserDTO2);
        ramadamaUserDTO2.setId(ramadamaUserDTO1.getId());
        assertThat(ramadamaUserDTO1).isEqualTo(ramadamaUserDTO2);
        ramadamaUserDTO2.setId(2L);
        assertThat(ramadamaUserDTO1).isNotEqualTo(ramadamaUserDTO2);
        ramadamaUserDTO1.setId(null);
        assertThat(ramadamaUserDTO1).isNotEqualTo(ramadamaUserDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(ramadamaUserMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(ramadamaUserMapper.fromId(null)).isNull();
    }
}
