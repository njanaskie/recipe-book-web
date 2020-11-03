import React, { useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Button, Menu, Icon } from 'semantic-ui-react'
import { useFirebaseContext } from '../../context/firebase-context'
import { startLogout } from '../actions/auth';
import RecipeInputModal from './RecipeInputModal';
import AddRecipe from './AddRecipe'

export const SubHeader = ({ startLogout }) => {
    const { isAdmin } = useFirebaseContext()
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleModalOpen = () => {
        setIsModalOpen(true)
    }

    const handleModalClose = () => {
        setIsModalOpen(false)
    }

    return (
        <div>
            <Menu secondary>
                <Menu.Item as={Button} onClick={handleModalOpen}><Icon name='plus'/>Add Recipe</Menu.Item>
                {isAdmin && <Menu.Item as={NavLink} to='/ingredients'><Icon name='lemon'/>Manage Ingredients</Menu.Item>}
                <Menu.Item><Button onClick={startLogout}>Logout</Button></Menu.Item>
            </Menu>
            <RecipeInputModal isModalOpen={isModalOpen} handleModalClose={handleModalClose}>
                <AddRecipe handleModalClose={handleModalClose}/>
            </RecipeInputModal>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(SubHeader);