"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Star } from "lucide-react";
import Image from "next/image";
import { NumberTicker } from "@/components/ui/number-ticker";

// Contest end date and time
const CONTEST_END_DATE = new Date("2025-12-31T23:59:59");

// Mock data for projects
const mockProjects = [	{
		id: 1,
		title: "LEXi",
		subtitle: "An AI-powered personal learning assistant.",
		coverImage: "./LEXi/icon.png",
		tags: ["AI", "Education"],
		votes: 1432,
		voted: false,
	},
	{
		id: 2,
		title: "EcoTrack",
		subtitle: "Track and reduce your carbon footprint.",
		coverImage: "./home/about-logo/amor.png",
		tags: ["Environment", "Web"],
		votes: 1165,
		voted: false,
	},
	{
		id: 3,
		title: "MediConnect",
		subtitle: "Connecting patients with doctors instantly.",
		coverImage: "./home/about-logo/movemate.jpg",
		tags: ["Health", "Mobile"],
		votes: 932,
		voted: false,
	},
	{
		id: 4,
		title: "SmartHomeX",
		subtitle: "Automate your home with IoT.",
		coverImage: "./home/about-logo/raspberry.jpg",
		tags: ["IoT", "Home"],
		votes: 614,
		voted: false,
	},
	{
		id: 5,
		title: "AgroVision",
		subtitle: "AI for smart agriculture.",
		coverImage: "./home/about-logo/sealanka.jpg",
		tags: ["AI", "Agriculture"],
		votes: 432,
		voted: false,
	},
];

export default function VoteProjectsPage() {
	const [projects, setProjects] = useState(mockProjects);
	const [search, setSearch] = useState("");
	const [timeLeft, setTimeLeft] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0
	});

	// Countdown timer effect
	useEffect(() => {
		const timer = setInterval(() => {
			const now = new Date().getTime();
			const distance = CONTEST_END_DATE.getTime() - now;

			if (distance > 0) {
				const days = Math.floor(distance / (1000 * 60 * 60 * 24));
				const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
				const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
				const seconds = Math.floor((distance % (1000 * 60)) / 1000);

				setTimeLeft({ days, hours, minutes, seconds });
			} else {
				setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
			}
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	const handleVote = (id: number) => {
		setProjects((prev) =>
			prev.map((p) => ({ ...p, voted: p.id === id }))
		);
	};

	return (
		<div className="min-h-screen bg-background py-10 px-2">
			<div className="max-w-7xl flex justify-between items-center mx-auto rounded-2xl  p-6 md:p-4 ">				
				{/* Header */}
				<div className="text-center mb-8">
					{/* Title Section */}
					<div className="mb-6">
						<h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
							Voting LeaderBoard
						</h1>
						<p className="text-muted-foreground text-lg max-w-2xl mx-auto">
							Vote for your favorite project! Discover innovative solutions and help your favorite team win.
						</p>
					</div>

					{/* Stats and Countdown Row */}
					<div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-8">
						{/* Total Votes */}
						<div className="text-center">
							<div className="text-5xl md:text-6xl font-bold text-primary mb-2">
								<NumberTicker value={projects.reduce((total, project) => total + project.votes, 0)} />
							</div>
							<div className="text-sm text-muted-foreground font-medium">
								Total Votes Cast
							</div>
						</div>

						{/* Divider */}
						<div className="hidden md:block w-px h-16 bg-border"></div>						{/* Countdown */}
						<div className="text-center">							<div className="text-2xl md:text-3xl font-bold text-destructive mb-2 font-mono">
								{timeLeft.days > 0 && (
									<span className="inline-block mx-1">
										{String(timeLeft.days).padStart(2, '0')}d
									</span>
								)}
								<span className="inline-block mx-1">
									{String(timeLeft.hours).padStart(2, '0')}H
								</span>
								<span className="inline-block mx-1">
									{String(timeLeft.minutes).padStart(2, '0')}M
								</span>
								<span className="inline-block mx-1">
									{String(timeLeft.seconds).padStart(2, '0')}S
								</span>
							</div><div className="text-sm text-muted-foreground font-medium">
								Voting ends on Dec 31, 2025
							</div>
						</div>
					</div>

					
				</div>
	{/* Podium */}
					<div className="flex items-center justify-center gap-4 md:gap-6">
						{[1, 0, 2].map((idx, i) => (
							<div
								key={projects[idx].id}
								className={`flex flex-col items-center justify-end transition-transform hover:scale-105 ${
									i === 1 ? "scale-110 z-10" : "opacity-90"
								}`}
							>
								{/* Project Image */}
								<div
									className={`rounded-full border-4 border-background shadow-xl overflow-hidden mb-3 bg-muted ${
										i === 1 ? "w-24 h-24 md:w-28 md:h-28" : "w-20 h-20 md:w-24 md:h-24"
									}`}
								>
									<Image
										src={projects[idx].coverImage}
										alt={projects[idx].title}
										width={112}
										height={112}
										className="object-cover w-full h-full"
									/>
								</div>
								
								{/* Position Badge */}
								<div
									className={`rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center font-bold text-lg md:text-xl mb-2 ${
										i === 1
											? "bg-yellow-500 text-white shadow-lg"
											: i === 0
											? "bg-gray-400 text-white shadow-md"
											: "bg-orange-400 text-white shadow-md"
									}`}
								>
									{i === 1 ? "1" : i === 0 ? "2" : "3"}
								</div>
								
								{/* Project Info */}
								<div className="text-center">
									<div className="font-semibold text-sm md:text-base text-foreground mb-1 max-w-[100px] truncate">
										{projects[idx].title}
									</div>
									<div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
										<Star className="w-3 h-3 text-blue-500" />
										<span className="font-medium">
											{projects[idx].votes.toLocaleString()}
										</span>
									</div>
								</div>
							</div>
						))}
					</div>
			
			</div>
		
            <div className="max-w-3xl mx-auto  shadow-lg p-6 md:p-10">
				{/* Search Bar */}
				<div className="mb-6">
					<input
						type="text"
						placeholder="Search projects..."
						className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
						value={search}
						onChange={e => setSearch(e.target.value)}
					/>
				</div>

				{/* Project List */}
				<div className="flex flex-col gap-4">
					{projects
						.filter((project) =>
							project.title.toLowerCase().includes(search.toLowerCase()) ||
							project.subtitle.toLowerCase().includes(search.toLowerCase()) ||
							project.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
						)
						.map((project, idx) => (
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
