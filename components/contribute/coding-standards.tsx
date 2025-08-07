// Copyright (c) 2025, Psycode Lab's (https://www.psycodelabs.lk). All Rights Reserved.
//
// This software is the property of Psycode Lab's. and its suppliers, if any.
// Dissemination of any information or reproduction of any material contained
// herein in any form is strictly forbidden, unless permitted by Psycode Lab's expressly.
// You may not alter or remove any copyright or other notice from copies of this content.
"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CodingStandards({ cardVariants }: { cardVariants: any }) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={cardVariants}
      className="mb-16"
    >
      <h2 className="text-3xl font-bold text-center mb-8">Coding Standards</h2>
      <motion.div whileHover={{ scale: 1.02, y: -5 }} transition={{ duration: 0.2 }}>
        <Card className="bg-white/[0.05] backdrop-blur-lg border border-white/[0.15] shadow-lg text-white">
          <CardHeader>
            <CardTitle className="text-xl">Branch Naming Convention</CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-0 md:p-8 md:pt-0">
            <p className="text-white/70 mb-4">When creating a new branch, follow this pattern:</p>
            <div className="bg-gray-900 p-3 rounded-md text-sm font-mono text-green-400 overflow-x-auto mb-4">
              type/location/name
            </div>
            <p className="text-white/70 mb-2">Types:</p>
            <ul className="list-disc list-inside text-white/70 mb-4">
              <li>`feature` (new additions)</li>
              <li>`fix` (fixing issues)</li>
              <li>`improvement` (enhancing existing features)</li>
            </ul>
            <p className="text-white/70 mb-2">Example:</p>
            <div className="bg-gray-900 p-3 rounded-md text-sm font-mono text-green-400 overflow-x-auto">
              feature/product-showcase<br/>
              fix/login-form<br/>
              improvement/home-page
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.section>
  )
}
