import React from 'react';
import {Navbar, Nav, Container } from 'react-bootstrap';
import Link from "next/link";
import Image from "next/image";
import TopBanner from "/static/images/HeadBanner.jpg";
import styles from './Header.module.scss'

export default async function Header(){
    return (
        <header>
            <Image src={TopBanner} alt='logo' priority={true} quality={89} style={{
                width: '100%',
                height: 'auto',
            }}></Image>
            {/*<Navbar bg="dark" expand="lg" className="mx-3">*/}
            {/*    <Container>*/}
            {/*        <Navbar.Brand as={Link} href="/">Моё приложение</Navbar.Brand>*/}
            {/*        <Navbar.Toggle aria-controls="basic-navbar-nav" />*/}
            {/*        <Navbar.Collapse id="basic-navbar-nav">*/}
            {/*            <Nav className="ms-auto">*/}
            {/*                <Nav.Link as={Link} href="/">Главная</Nav.Link>*/}
            {/*                <Nav.Link as={Link} href="/about">О нас</Nav.Link>*/}
            {/*                <Nav.Link as={Link} href="/contact">Контакты</Nav.Link>*/}
            {/*            </Nav>*/}
            {/*        </Navbar.Collapse>*/}
            {/*    </Container>*/}
            {/*</Navbar>*/}
        </header>
    );
};
