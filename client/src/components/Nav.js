import React, {Component} from 'react';
import {Navbar, Nav, NavItem, NavDropdown, DropdownButton, MenuItem, CollapsibleNav} from 
'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router';

	class NavBarHeader extends Component {
		renderLinks() {
			if(this.props.authenticated) {
				return <NavItem href="/signout">Get Me Out of Here</NavItem>
			} else {
				return [
				<NavItem key={1} href="signin">Sign Me In To This Awesome App</NavItem>,
				<NavItem key={2} href="signup">I Would Pay To Use This But It's Free So I Won't</NavItem>
				];
			}
		}
		
		render() {
			return (
				<Navbar>
				<Navbar.Header>
					<Navbar.Brand>
						<a href='#'>Bucket List</a>
					</Navbar.Brand>
				</Navbar.Header>
				<Nav>
					{this.renderLinks()}
					<NavDropdown key={3} title="Video Options" id="basic-nav-dropdown">
						<MenuItem key={3.1}>Show Me A Video</MenuItem>
						<MenuItem key={3.2}>Show Me An Even Better Video</MenuItem>
						<MenuItem key={3.3}>Show Me A Video To Send My Enemies</MenuItem>
					</NavDropdown>
				</Nav>
				</Navbar>

		
			);
		}
	}

function mapStateToProps(state) {
	return {
		authenticated: state.auth.authenticated
	};
}
	
export default connect(mapStateToProps)(NavBarHeader);
