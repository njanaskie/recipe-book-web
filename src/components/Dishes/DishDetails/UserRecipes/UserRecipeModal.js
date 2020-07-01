import React, { useState } from 'react'
import { Button, Modal } from 'semantic-ui-react'

const UserRecipeModal = ({ children, isModalOpen, handleModalClose }) => {

    return (
        <Modal open={isModalOpen} onClose={handleModalClose}>
            <Modal.Header>Add Recipe</Modal.Header>
            <Modal.Content>
                {children}
            </Modal.Content>
        </Modal>
    )

}

export default UserRecipeModal