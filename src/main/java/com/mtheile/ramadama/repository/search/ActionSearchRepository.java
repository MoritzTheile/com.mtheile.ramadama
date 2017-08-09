package com.mtheile.ramadama.repository.search;

import com.mtheile.ramadama.domain.Action;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Action entity.
 */
public interface ActionSearchRepository extends ElasticsearchRepository<Action, Long> {
}
