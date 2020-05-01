import React, { Component } from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink, 
} from 'reactstrap';


class AppNav extends Component {
  
    render(){
        return (
            <div>
              <Navbar color="dark" dark expand="md">
                <NavbarBrand href="/">Gestion de Dépenses</NavbarBrand>
                  <Nav className="ml-auto" navbar>
                    <NavItem>
                      <NavLink href="/">Accueil</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/categories">Catégories</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/expenses">Dépenses</NavLink>
                    </NavItem>
                  </Nav>
              </Navbar>
            </div>
            );
        
}
}
export default AppNav;