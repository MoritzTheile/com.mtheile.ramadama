package com.mtheile.ramadama.repository.search;

import com.mtheile.ramadama.domain.RamadamaUser;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the RamadamaUser entity.
 */
public interface RamadamaUserSearchRepository extends ElasticsearchRepository<RamadamaUser, Long> {
}
