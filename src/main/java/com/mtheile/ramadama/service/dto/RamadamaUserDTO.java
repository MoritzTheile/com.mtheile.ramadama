package com.mtheile.ramadama.service.dto;


import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the RamadamaUser entity.
 */
public class RamadamaUserDTO implements Serializable {

 	private static final long serialVersionUID = -783471923847750944L;
 	
	private Long id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        RamadamaUserDTO ramadamaUserDTO = (RamadamaUserDTO) o;
        if(ramadamaUserDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), ramadamaUserDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RamadamaUserDTO{" +
            "id=" + getId() +
            "}";
    }
}
