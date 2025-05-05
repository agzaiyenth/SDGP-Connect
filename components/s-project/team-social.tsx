import React from 'react'
import { Card } from '../ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { ExternalLink, Linkedin } from 'lucide-react'
import Link from 'next/link'
import { IProjectSocialLink, IProjectTeam } from '@/types/project/type'
import Image from 'next/image'
import { socialPlatformMap } from '@/types/project/mapping'

interface Props {
    teamEmail?: string
    teamPhone?: string
    teamMembers: IProjectTeam[]
    teamSocials: IProjectSocialLink[]
}

const Teamandsocial = ({ teamEmail, teamPhone, teamMembers, teamSocials }: Props) => {
    return (
        <Card className="mt-8 p-6">
            <h2 className="text-2xl font-semibold mb-4">Contact & Team Details</h2>
            <Tabs defaultValue="contact" className="w-full">
                {/* Tabs List with horizontal scroll on mobile */}
                <TabsList className="flex overflow-x-auto whitespace-nowrap sm:grid sm:grid-cols-2 w-full">
                    <TabsTrigger
                        value="contact"
                        className="max-w-[150px] truncate text-center p-2"
                    >
                        Contact
                    </TabsTrigger>
                    <TabsTrigger
                        value="team"
                        className="max-w-[150px] truncate text-center p-2"
                    >
                        Team
                    </TabsTrigger>
                </TabsList>

                {/* Contact Information Tab */}
                <TabsContent value="contact">
                    <div className="grid gap-4 sm:grid-cols-2 mt-5">
                        <Card className="p-4">
                            <h3 className="text-xl font-bold mb-2">Team Email</h3>
                            <Link href={`mailto:${teamEmail || 'team@example.com'}`}>
                                <p>{teamEmail || 'team@example.com'}</p>
                            </Link>
                        </Card>
                        <Card className="p-4">
                            <h3 className="text-xl font-bold mb-2">Team Phone</h3>
                            <Link href={`tel:${teamPhone || '+1 234 567 8900'}`}>
                                <p>{teamPhone || '+1 234 567 8900'}</p>
                            </Link>
                        </Card>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-6 mt-5">
                        {teamSocials.map((social, index) => {
                            const platform = socialPlatformMap[social.link_name];
                            if (!platform) return null;
                            const Icon = platform.icon;
                            return (
                                <Link
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="no-underline"
                                >
                                    <Card className="p-4 flex items-center justify-between hover:bg-muted/40 transition group cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <Icon className="h-6 w-6 text-primary" />
                                            <span className="font-semibold text-lg">{platform.label}</span>
                                        </div>
                                        <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                                    </Card>
                                </Link>
                            );
                        })}
                    </div>
                </TabsContent>

                {/* Team Information Tab */}
                <TabsContent value="team">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-5">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="border rounded-lg p-4 flex flex-col items-center w-full">
                                <Image
                                    src={member.profile_image || "https://picsum.photos/1920/1080"}
                                    alt={member.name}
                                    className="w-20 h-20 rounded-full mb-4"
                                    width={80}
                                    height={80}
                                />
                                <h3
                                    className="text-xl font-bold truncate text-center w-full max-w-full"
                                    title={member.name}
                                >
                                    {member.name}
                                </h3>
                                {member.linkedin_url && (
                                    <Link
                                        href={member.linkedin_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 mt-2 flex items-center gap-2"
                                    >
                                        <Linkedin className="w-5 h-5" />
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </Card>
    )
}

export default Teamandsocial
