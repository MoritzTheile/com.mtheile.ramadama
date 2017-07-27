package com.mtheile.ramadama.service.dto;


import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Action entity.
 */
public class ActionDTO implements Serializable {

    /**
	 * 
	 */
	private static final long serialVersionUID = 3980758733399963519L;

	private Long id;

    private Long ramadamaUserId;

    private Long stateBeforeId;

    private Long stateAfterId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getRamadamaUserId() {
        return ramadamaUserId;
    }

    public void setRamadamaUserId(Long ramadamaUserId) {
        this.ramadamaUserId = ramadamaUserId;
    }

    public Long getStateBeforeId() {
        return stateBeforeId;
    }

    public void setStateBeforeId(Long stateId) {
        this.stateBeforeId = stateId;
    }

    public Long getStateAfterId() {
        return stateAfterId;
    }

    public void setStateAfterId(Long stateId) {
        this.stateAfterId = stateId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ActionDTO actionDTO = (ActionDTO) o;
        if(actionDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), actionDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ActionDTO{" +
            "id=" + getId() +
            "}";
    }
}
