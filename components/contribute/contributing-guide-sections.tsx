// Copyright (c) 2025, Psycode Lab's (https://www.psycodelabs.lk). All Rights Reserved.
//
// This software is the property of Psycode Lab's. and its suppliers, if any.
// Dissemination of any information or reproduction of any material contained
// herein in any form is strictly forbidden, unless permitted by Psycode Lab's expressly.
// You may not alter or remove any copyright or other notice from copies of this content.
"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from 'lucide-react'

export default function ContributingGuideSections({ cardVariants }: { cardVariants: any }) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={cardVariants}
      className="mb-16"
    >
      <h2 className="text-3xl font-bold text-center mb-8">Contributing Guide</h2>
      <p className="text-center text-white/70 mb-8 max-w-2xl mx-auto">
        If you are planning on contributing to the development efforts of SDGP Connect, follow these instructions to set up the project on your local machine. It's as easy as 3 steps, and you can also contribute to an open-source project!
      </p>

      <div className="grid md:grid-cols-2 gap-8 mb-12 items-stretch">
        <motion.div whileHover={{ scale: 1.02, y: -5 }} transition={{ duration: 0.2 }} className="h-full">
          <Card className="h-full bg-white/[0.05] backdrop-blur-lg border border-white/[0.15] shadow-lg text-white">
            <CardHeader>
              <CardTitle className="text-xl">Join Our Community</CardTitle>
              <CardDescription className="text-white/60">Help us on other aspects of the project.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-0 md:p-8 md:pt-0">
              <p className="text-white/70 mb-4">Connect with us on WhatsApp to discuss ideas, get support, and collaborate.</p>
              <Button asChild variant="outline" className="bg-white/[0.05] text-white border-white/[0.1] hover:bg-white/[0.1]">
                <a href="https://chat.whatsapp.com/IFJH9D1sbiT7OsNsBT4neT" target="_blank" rel="noopener noreferrer">
                  Join WhatsApp Community <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02, y: -5 }} transition={{ duration: 0.2 }} className="h-full">
          <Card className="h-full bg-white/[0.05] backdrop-blur-lg border border-white/[0.15] shadow-lg text-white">
            <CardHeader>
              <CardTitle className="text-xl">Explore Our Code</CardTitle>
              <CardDescription className="text-white/60">Dive into the codebase and see how you can contribute.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-0 md:p-8 md:pt-0">
              <p className="text-white/70 mb-4">Access the full project repository on GitHub for detailed documentation and code.</p>
              <Button asChild variant="outline" className="bg-white/[0.05] text-white border-white/[0.1] hover:bg-white/[0.1]">
                <a href="https://github.com/agzaiyenth/SDGP-Connect" target="_blank" rel="noopener noreferrer">
                  Visit GitHub Repository <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
        {/* Cloning */}
        <motion.div whileHover={{ scale: 1.02, y: -5 }} transition={{ duration: 0.2 }} className="h-full">
          <Card className="h-full bg-white/[0.05] backdrop-blur-lg border border-white/[0.15] shadow-lg text-white">
            <CardHeader>
              <CardTitle className="text-xl">1. Cloning the Project</CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0 md:p-8 md:pt-0">
              <p className="text-white/70 mb-4">Clone the project repository:</p>
              <div className="bg-gray-900 p-3 rounded-md text-sm font-mono text-green-400 overflow-x-auto">
                git clone https://github.com/agzaiyenth/SDGP-Connect.git
              </div>
              <p className="text-white/70 mt-4">Navigate into the project directory:</p>
              <div className="bg-gray-900 p-3 rounded-md text-sm font-mono text-green-400 overflow-x-auto">
                cd SDGP-Connect
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Installing Dependencies */}
        <motion.div whileHover={{ scale: 1.02, y: -5 }} transition={{ duration: 0.2 }} className="h-full">
          <Card className="h-full bg-white/[0.05] backdrop-blur-lg border border-white/[0.15] shadow-lg text-white">
            <CardHeader>
              <CardTitle className="text-xl">2. Installing Dependencies</CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0 md:p-8 md:pt-0">
              <p className="text-white/70 mb-4">We use <strong>Yarn</strong> instead of npm. Install all required packages:</p>
              <div className="bg-gray-900 p-3 rounded-md text-sm font-mono text-green-400 overflow-x-auto">
                yarn install
              </div>
              <p className="text-sm text-white/50 mt-4">Note: Do not use npm. Stick to Yarn for dependency management.</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Running the Project */}
        <motion.div whileHover={{ scale: 1.02, y: -5 }} transition={{ duration: 0.2 }} className="h-full">
          <Card className="h-full bg-white/[0.05] backdrop-blur-lg border border-white/[0.15] shadow-lg text-white">
            <CardHeader>
              <CardTitle className="text-xl">3. Running the Project</CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0 md:p-8 md:pt-0">
              <p className="text-white/70 mb-4">To start the development server:</p>
              <div className="bg-gray-900 p-3 rounded-md text-sm font-mono text-green-400 overflow-x-auto">
                yarn run dev
              </div>
              <p className="text-white/70 mt-4">This will launch your application on the local server.</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <p className="text-center text-white/70 mt-12 max-w-2xl mx-auto">
        For more detailed setup instructions, environment variables, database setup, and advanced development workflows, please refer to the full documentation on our <a href="https://github.com/agzaiyenth/SDGP-Connect" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">GitHub repository</a>.
      </p>
    </motion.section>
  )
}
