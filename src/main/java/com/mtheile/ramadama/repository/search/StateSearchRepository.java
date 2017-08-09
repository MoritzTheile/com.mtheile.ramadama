package com.mtheile.ramadama.repository.search;

import com.mtheile.ramadama.domain.State;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the State entity.
 */
public interface StateSearchRepository extends ElasticsearchRepository<State, Long> {
}
