// Copyright (c) 2025, Psycode Lab's (https://www.psycodelabs.lk). All Rights Reserved.
//
// This software is the property of Psycode Lab's. and its suppliers, if any.
// Dissemination of any information or reproduction of any material contained
// herein in any form is strictly forbidden, unless permitted by Psycode Lab's expressly.
// You may not alter or remove any copyright or other notice from copies of this content.
import { Contact, FolderGit2, Home, Info, Upload, Trophy } from "lucide-react";

export const sidebarItems = [
    { icon: Home, href: '/', label: 'Home' },
    { icon: FolderGit2, href: '/project', label: 'Projects' },
    { icon: Trophy, href: '/competitions', label: 'Competition Winners' },
    { icon: Info, href: '/about', label: 'About Us' },
    { icon: Contact, href: '/contact', label: 'Contact Us' },
    { icon: Upload, href: '/submit', label: 'Submit Details' },
  ];