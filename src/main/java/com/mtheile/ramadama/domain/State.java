package com.mtheile.ramadama.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A State.
 */
@Entity
@Table(name = "state")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class State implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Lob
    @Column(name = "picture_data")
    private byte[] pictureData;

    @Column(name = "picture_data_content_type")
    private String pictureDataContentType;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getPictureData() {
        return pictureData;
    }

    public State pictureData(byte[] pictureData) {
        this.pictureData = pictureData;
        return this;
    }

    public void setPictureData(byte[] pictureData) {
        this.pictureData = pictureData;
    }

    public String getPictureDataContentType() {
        return pictureDataContentType;
    }

    public State pictureDataContentType(String pictureDataContentType) {
        this.pictureDataContentType = pictureDataContentType;
        return this;
    }

    public void setPictureDataContentType(String pictureDataContentType) {
        this.pictureDataContentType = pictureDataContentType;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        State state = (State) o;
        if (state.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), state.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "State{" +
            "id=" + getId() +
            ", pictureData='" + getPictureData() + "'" +
            ", pictureDataContentType='" + pictureDataContentType + "'" +
            "}";
    }
}
