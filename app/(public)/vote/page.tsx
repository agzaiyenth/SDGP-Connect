"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Star } from "lucide-react";
import Image from "next/image";

// Mock data for projects
const mockProjects = [
	{
		id: 1,
		title: "AI Tutor",
		subtitle: "An AI-powered personal learning assistant.",
		coverImage: "/public/LEXi/ai-tutor.png",
		tags: ["AI", "Education"],
		votes: 1432,
		voted: true,
	},
	{
		id: 2,
		title: "EcoTrack",
		subtitle: "Track and reduce your carbon footprint.",
		coverImage: "/public/LEXi/ecotrack.png",
		tags: ["Environment", "Web"],
		votes: 1165,
		voted: false,
	},
	{
		id: 3,
		title: "MediConnect",
		subtitle: "Connecting patients with doctors instantly.",
		coverImage: "/public/LEXi/mediconnect.png",
		tags: ["Health", "Mobile"],
		votes: 932,
		voted: false,
	},
	{
		id: 4,
		title: "SmartHomeX",
		subtitle: "Automate your home with IoT.",
		coverImage: "/public/LEXi/smarthomex.png",
		tags: ["IoT", "Home"],
		votes: 614,
		voted: false,
	},
	{
		id: 5,
		title: "AgroVision",
		subtitle: "AI for smart agriculture.",
		coverImage: "/public/LEXi/agrovision.png",
		tags: ["AI", "Agriculture"],
		votes: 432,
		voted: false,
	},
];


export default function VoteProjectsPage() {
	const [projects, setProjects] = useState(mockProjects);
	const [votedId, setVotedId] = useState(1); // Assume user voted for project 1

	const handleVote = (id: number) => {
		setVotedId(id);
		setProjects((prev) =>
			prev.map((p) => ({ ...p, voted: p.id === id }))
		);
	};

	return (
		<div className="min-h-screen bg-background py-10 px-2">
			<div className="max-w-3xl mx-auto bg-card rounded-2xl shadow-lg p-6 md:p-10 border border-border">
				{/* Header */}
				<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
					<div>
						<h1 className="text-3xl font-bold mb-1 flex items-center gap-2 text-foreground">
							The best projects
						</h1>
						<p className="text-muted-foreground text-sm max-w-xl">
							Vote for your favorite project! Discover innovative solutions and
							help your favorite team win.
						</p>
					
					</div>
					{/* Podium */}
					<div className="flex items-end gap-2 md:gap-4 w-full md:w-auto justify-center md:justify-end">
						{[1, 0, 2].map((idx, i) => (
							<div
								key={projects[idx].id}
								className={`flex flex-col items-center justify-end ${
									i === 1 ? "scale-110 z-10" : "opacity-80"
								}`}
							>
								<div
									className={`rounded-full border-4 border-background shadow-lg overflow-hidden w-16 h-16 md:w-20 md:h-20 mb-2 bg-muted`}
								>
									<Image
										src={projects[idx].coverImage}
										alt={projects[idx].title}
										width={80}
										height={80}
										className="object-cover w-full h-full"
									/>
								</div>
								<div
									className={`font-bold text-lg md:text-xl ${
										i === 1
											? "text-yellow-500"
											: i === 0
											? "text-gray-500"
											: "text-orange-400"
									}`}
								>
									{i === 1 ? "1" : i === 0 ? "2" : "3"}
								</div>
								<div className="text-xs text-muted-foreground text-center max-w-[80px] truncate">
									{projects[idx].title}
								</div>
							</div>
						))}
					</div>
				</div>

			
			</div>
            <div className="max-w-3xl mx-auto  shadow-lg p-6 md:p-10">
				

				{/* Project List */}
				<div className="flex flex-col gap-4">
					{projects.map((project, idx) => (
						<div
							key={project.id}
							className={`flex items-center bg-muted rounded-xl shadow-sm px-4 py-3 gap-4 border border-border relative transition-colors ${
								project.voted ? "" : "bg-primary/5"
							}`}
						>
							{/* Rank */}
							<div className="flex flex-col items-center w-8">
								{idx === 0 && <span className="text-2xl">🥇</span>}
								{idx === 1 && <span className="text-2xl">🥈</span>}
								{idx === 2 && <span className="text-2xl">🥉</span>}
								{idx > 2 && (
									<span className="font-bold text-lg text-muted-foreground">
										{idx + 1}
									</span>
								)}
							</div>
							{/* Image */}
							<div className="w-14 h-14 rounded-lg overflow-hidden bg-background flex-shrink-0">
								<Image
									src={project.coverImage}
									alt={project.title}
									width={56}
									height={56}
									className="object-cover w-full h-full"
								/>
							</div>
							{/* Info */}
							<div className="flex-1 min-w-0">
								<div className="font-semibold text-base truncate text-foreground">
									{project.title}
								</div>
								<div className="text-xs text-muted-foreground truncate max-w-xs">
									{project.subtitle}
								</div>
								<div className="flex gap-1 mt-1 flex-wrap">
									{project.tags.map((tag) => (
										<Badge key={tag} variant="secondary" className="text-xs">
											{tag}
										</Badge>
									))}
								</div>
							</div>
							{/* Vote button or check */}
							<div className="flex items-center gap-2">
								{project.voted ? (
									<Button
										variant="secondary"
										size="sm"
										className="pointer-events-none opacity-80"
									>
										<CheckCircle2 className="w-5 h-5 mr-1 text-green-500" /> Voted
									</Button>
								) : (
									<Button
										variant="default"
										size="sm"
										onClick={() => handleVote(project.id)}
									>
										Vote for this!
									</Button>
								)}
							</div>
							{/* Vote count */}
							<div className="flex items-center gap-1 ml-4 min-w-[60px] justify-end">
								<Star className="w-5 h-5 text-blue-500" />
								<span className="font-semibold text-base tabular-nums text-foreground">
									{project.votes.toLocaleString()}
								</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
