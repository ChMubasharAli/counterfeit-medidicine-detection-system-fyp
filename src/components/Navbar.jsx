
"use client";
import Link from "next/link";
import { Button, Navbar, } from "flowbite-react";
import Image from "next/image";

export default function NavbarComponent() {
    return (
        <Navbar className="bg-blue-500"
            fluid>
            <Navbar.Brand href="http://localhost:3000">
                <Image src="/logo.png" width={24} height={24} className="mr-3" alt="Logo" />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">AuthentiCare</span>
            </Navbar.Brand>
            <div className="flex md:order-2">
                <Button className="bg-purple-700">
                    <Link href="/pages/login">Login</Link></Button>
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Navbar.Link href="/" className="text-white text-lg">
                    Home
                </Navbar.Link>
                <Navbar.Link href="/pages/drugDictionary" className="text-white text-lg">Drug Dictionary</Navbar.Link>
                <Navbar.Link href="/pages/counterfeit" className="text-white text-lg">Authentication</Navbar.Link>
                <Navbar.Link href="/pages/about" className="text-white text-lg">About</Navbar.Link>
                <Navbar.Link href="/pages/contact" className="text-white text-lg">Contact</Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
}
