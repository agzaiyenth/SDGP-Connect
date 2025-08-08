/* Copyright (c) 2025, the contributors of the SDGP Connect project. All Rights Reserved.

This software is the joint property of the contributors to the SDGP Connect project.
Unauthorized distribution, commercial use, or reproduction of any part of this material
in any form is strictly prohibited without the explicit written consent of all contributors.
You may not alter or remove any copyright or attribution notice from this content. */

import { Contact, FolderGit2, Home, Info, Upload, Trophy } from "lucide-react";

export const sidebarItems = [
    { icon: Home, href: '/', label: 'Home' },
    { icon: FolderGit2, href: '/project', label: 'Projects' },
    { icon: Trophy, href: '/competitions', label: 'Competition Winners' },
    { icon: Info, href: '/about', label: 'About Us' },
    { icon: Contact, href: '/contact', label: 'Contact Us' },
    { icon: Upload, href: '/submit', label: 'Submit Details' },
  ];