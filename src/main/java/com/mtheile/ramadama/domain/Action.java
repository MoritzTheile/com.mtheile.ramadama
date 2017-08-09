package com.mtheile.ramadama.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Action.
 */
@Entity
@Table(name = "action")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "action")
public class Action implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @ManyToOne
    private RamadamaUser ramadamaUser;

    @OneToOne
    @JoinColumn(unique = true)
    private State stateBefore;

    @OneToOne
    @JoinColumn(unique = true)
    private State stateAfter;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public RamadamaUser getRamadamaUser() {
        return ramadamaUser;
    }

    public Action ramadamaUser(RamadamaUser ramadamaUser) {
        this.ramadamaUser = ramadamaUser;
        return this;
    }

    public void setRamadamaUser(RamadamaUser ramadamaUser) {
        this.ramadamaUser = ramadamaUser;
    }

    public State getStateBefore() {
        return stateBefore;
    }

    public Action stateBefore(State state) {
        this.stateBefore = state;
        return this;
    }

    public void setStateBefore(State state) {
        this.stateBefore = state;
    }

    public State getStateAfter() {
        return stateAfter;
    }

    public Action stateAfter(State state) {
        this.stateAfter = state;
        return this;
    }

    public void setStateAfter(State state) {
        this.stateAfter = state;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Action action = (Action) o;
        if (action.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), action.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Action{" +
            "id=" + getId() +
            "}";
    }
}
