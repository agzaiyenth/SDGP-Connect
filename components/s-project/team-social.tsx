import React from 'react'
import { Card } from '../ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Linkedin } from 'lucide-react'
import Link from 'next/link'
import { IProjectSocialLink, IProjectTeam } from '@/types/project/type'
import Image from 'next/image'

interface Props {
    teamEmail?: string
    teamPhone?: string
    teamMembers: IProjectTeam[]
    teamSocials: IProjectSocialLink[]
}

const Teamandsocial = ({ teamEmail, teamPhone, teamMembers, teamSocials }: Props) => {
    return (

        // TODO : loop the data from the backend
        <Card className="mt-8 p-6">
            <h2 className="text-2xl font-semibold mb-4">Contact & Team Details</h2>
            <Tabs defaultValue="contact" className="w-full" >
                <TabsList className="grid  grid-cols-2 w-[400px]">
                    <TabsTrigger value="contact">Contact</TabsTrigger>
                    <TabsTrigger value="team">Team</TabsTrigger>
                </TabsList>
                <TabsContent value="contact">
                    <div className="grid gap-4 sm:grid-cols-2 mt-5">
                    <Card className="p-4">
                        <h3 className="text-xl font-bold mb-2">Team Email</h3>
                        <p>team@example.com</p>
                    </Card>
                    <Card className="p-4">
                        <h3 className="text-xl font-bold mb-2">Team Phone</h3>
                        <p>+1 234 567 8900</p>
                    </Card>
                </div>

            </TabsContent>
            <TabsContent value="team">
                <div className="grid gap-4 sm:grid-cols-6 mt-5">
                    {/* loop through the team members */}
                    <div className="border rounded-lg p-4 flex flex-col items-center">
                        <Image src="https://picsum.photos/1920/1080" alt="John Doe" className="w-20 h-20 rounded-full mb-4" width={80} height={80} />
                        <h3 className="text-xl font-bold">John Doe</h3>
                        <Link
                            href="https://linkedin.com/in/janesmith"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 mt-2 flex items-center gap-2"
                        >
                            <Linkedin className="w-5 h-5" />

                        </Link>
                    </div>

                    <div className="border rounded-lg p-4 flex flex-col items-center">
                        <Image src="https://picsum.photos/1920/1080" alt="Jane Smith" className="w-20 h-20 rounded-full mb-4" width={80} height={80} />
                        <h3 className="text-xl font-bold">Jane Smith</h3>
                        <Link
                            href="https://linkedin.com/in/janesmith"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 mt-2 flex items-center gap-2"
                        >
                            <Linkedin className="w-5 h-5" />

                        </Link>
                    </div>
                </div>
            </TabsContent>

        </Tabs>
        </Card >
    )
}

export default Teamandsocial
