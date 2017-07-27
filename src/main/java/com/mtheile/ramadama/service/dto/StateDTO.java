package com.mtheile.ramadama.service.dto;


import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Lob;
 
/**
 * A DTO for the State entity.
 */
public class StateDTO implements Serializable {

	private static final long serialVersionUID = 4853519680594912362L;

	private Long id;

    @Lob
    private byte[] pictureData;
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

    public void setPictureData(byte[] pictureData) {
        this.pictureData = pictureData;
    }

    public String getPictureDataContentType() {
        return pictureDataContentType;
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

        StateDTO stateDTO = (StateDTO) o;
        if(stateDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), stateDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "StateDTO{" +
            "id=" + getId() +
            ", pictureData='" + getPictureData() + "'" +
            "}";
    }
}
