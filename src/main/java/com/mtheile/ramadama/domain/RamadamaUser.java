package com.mtheile.ramadama.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A RamadamaUser.
 */
@Entity
@Table(name = "ramadama_user")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class RamadamaUser implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @OneToMany(mappedBy = "ramadamaUser")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Action> actions = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<Action> getActions() {
        return actions;
    }

    public RamadamaUser actions(Set<Action> actions) {
        this.actions = actions;
        return this;
    }

    public RamadamaUser addAction(Action action) {
        this.actions.add(action);
        action.setRamadamaUser(this);
        return this;
    }

    public RamadamaUser removeAction(Action action) {
        this.actions.remove(action);
        action.setRamadamaUser(null);
        return this;
    }

    public void setActions(Set<Action> actions) {
        this.actions = actions;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        RamadamaUser ramadamaUser = (RamadamaUser) o;
        if (ramadamaUser.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), ramadamaUser.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RamadamaUser{" +
            "id=" + getId() +
            "}";
    }
}
