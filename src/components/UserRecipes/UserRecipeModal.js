import React, { useState } from 'react'
import { Button, Modal } from 'semantic-ui-react'

const UserRecipeModal = ({ children, isModalOpen, handleModalClose }) => {

    return (
        <Modal dimmer='inverted' open={isModalOpen} onClose={handleModalClose}>
            <Modal.Header>Recipe Details</Modal.Header>
            <Modal.Content>
                {children}
            </Modal.Content>
        </Modal>
    )

}

export default UserRecipeModal