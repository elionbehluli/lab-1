import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
    return (
        <Menu fixed='top'>
            <Container className='test'>
                <Menu.Item>
                    <Button positive content='Home' />
                </Menu.Item>
                <Menu.Item>
                    <Button positive content='Garat' />
                </Menu.Item>
                <Menu.Item>
                    <Button positive content='Admin' />
                </Menu.Item>
                <Menu.Item>
                    <Button positive content='Antaret' />
                </Menu.Item>
            </Container>
        </Menu>
    )
}