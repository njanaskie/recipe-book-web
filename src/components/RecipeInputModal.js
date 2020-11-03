import React, { useState } from 'react'
import { Button, Modal } from 'semantic-ui-react'

const RecipeInputModal = ({ children, isModalOpen, handleModalClose }) => {

    return (
        <Modal dimmer='inverted' open={isModalOpen} onClose={handleModalClose}>
            <Modal.Header>Add recipe details...</Modal.Header>
            <Modal.Content>
                {children}
            </Modal.Content>
        </Modal>
    )

}

export default RecipeInputModal