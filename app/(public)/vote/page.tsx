"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Star, Search, Loader2 } from "lucide-react";
import Image from "next/image";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Toast, ToastTitle, ToastDescription, ToastClose, ToastProvider } from "@/components/ui/toast";
import { useVoteProjects, useVoteStats, useCastVote, useVoteStatus } from "@/hooks/project";
import { useDebounce } from "@/hooks/use-debounce";
import { useToast } from "@/hooks/contact/use-toast";
import IPStatusComponent from "@/components/IPStatusComponent";
import Preloader from "./preloader";

// Contest end date and time
const CONTEST_END_DATE = new Date("2025-12-31T23:59:59");

export default function VoteProjectsPage() {
	const [search, setSearch] = useState("");
	const [timeLeft, setTimeLeft] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0
	});
	const [isInitialDataLoaded, setIsInitialDataLoaded] = useState(false);
	// Debounce search input
	const debouncedSearch = useDebounce(search, 500);
		// Toast for notifications
	const { toast, toasts, dismiss } = useToast();
	
	// Hooks for voting functionality
	const { stats, isLoading: statsLoading } = useVoteStats();
	const { status: voteStatus, refetch: refetchVoteStatus } = useVoteStatus();
	const { castVote, isLoading: castingVote, error: voteError, clearError } = useCastVote();
	const { 
		projects, 
		isLoading: projectsLoading, 
		error, 
		hasMore, 
		loadMore,
		refresh 
	} = useVoteProjects({
		title: debouncedSearch || undefined,
		limit: 10
	});
	// Check if initial data is loaded
	useEffect(() => {
		// Only check for initial load when there's no search (initial page load)
		// Wait for both stats and projects to be loaded
		if (!debouncedSearch && !statsLoading && !projectsLoading && stats && projects.length > 0) {
			// Add a small delay to ensure all data is properly rendered
			setTimeout(() => {
				setIsInitialDataLoaded(true);
			}, 500);
		}
	}, [statsLoading, projectsLoading, stats, projects, debouncedSearch]);

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
	const handleVote = async (projectId: string) => {
		// Clear any previous errors
		clearError();
		
		const result = await castVote(projectId);
		if (result?.success) {
			// Only refresh vote status to avoid constant API calls
			refetchVoteStatus();
			
			// Show success toast
			toast({
				title: "Vote Cast Successfully!",
				description: result.message,
				variant: "default"
			});
		} else if (voteError) {
			// Show error toast
			toast({
				title: "Failed to Cast Vote",
				description: voteError,
				variant: "destructive"
			});
		}
	};
	// Infinite scroll handler
	useEffect(() => {
		const handleScroll = () => {
			if (
				window.innerHeight + document.documentElement.scrollTop >= 
				document.documentElement.offsetHeight - 1000 &&
				hasMore && 
				!projectsLoading
			) {
				loadMore();
			}
		};

		const throttledScroll = throttle(handleScroll, 200); // Throttle scroll events
		window.addEventListener('scroll', throttledScroll);
		return () => window.removeEventListener('scroll', throttledScroll);
	}, [hasMore, projectsLoading, loadMore]);

	// Throttle function to limit scroll event frequency
	function throttle(func: Function, wait: number) {
		let timeout: NodeJS.Timeout | null = null;
		return function executedFunction(...args: any[]) {
			const later = () => {
				timeout = null;
				func(...args);
			};
			if (!timeout) {
				timeout = setTimeout(later, wait);
			}
		};	}
		// Show preloader during initial data loading
	// Keep showing preloader until we have both stats and initial projects loaded
	if (!isInitialDataLoaded || statsLoading || (projectsLoading && projects.length === 0)) {
		return <Preloader onComplete={() => setIsInitialDataLoaded(true)} />;
	}

	return (
		<div className="min-h-screen bg-background py-10 px-2">
			<div className="max-w-7xl flex justify-between items-center mx-auto rounded-2xl p-6 md:p-4">				
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
					<div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-8">						{/* Total Votes */}
						<div className="text-center">
							<div className="text-5xl md:text-6xl font-bold text-primary mb-2">
								<NumberTicker value={stats?.totalVotes || 0} />
							</div>
							<div className="text-sm text-muted-foreground font-medium">
								Total Votes Cast
							</div>
						</div>

						{/* Divider */}
						<div className="hidden md:block w-px h-16 bg-border"></div>
						
						{/* Countdown */}
						<div className="text-center">
							<div className="text-2xl md:text-3xl font-bold text-destructive mb-2 font-mono">
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
							</div>
							<div className="text-sm text-muted-foreground font-medium">
								Voting ends on Dec 31, 2025
							</div>
						</div>
					</div>
				</div>

				{/* Podium - Show top 3 projects */}
				{projects.length >= 3 && (
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
										src={projects[idx].coverImage || "/placeholder.svg"}
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
											{projects[idx].voteCount.toLocaleString()}
										</span>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		
			<div className="max-w-3xl mx-auto shadow-lg p-6 md:p-10">
				{/* Search Bar */}
				<div className="mb-6 relative">
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
					<Input
						type="text"
						placeholder="Search projects..."
						className="pl-10 w-full"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>

				{/* Error State */}
				{error && (
					<div className="text-center py-8">
						<p className="text-red-500">{error}</p>
						<Button onClick={refresh} className="mt-4">
							Try Again
						</Button>
					</div>
				)}				{/* Loading State for subsequent searches */}
				{projectsLoading && projects.length === 0 && debouncedSearch && (
					<div className="text-center py-8">
						<Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
						<p className="text-muted-foreground">Searching projects...</p>
					</div>
				)}

				{/* Project List */}
				<div className="flex flex-col gap-4">
					{projects.map((project, idx) => {
						const isVoted = voteStatus?.votedProjectId === project.id;
						
						return (
							<div
								key={project.id}
								className={`flex items-center bg-muted rounded-xl shadow-sm px-4 py-3 gap-4 border border-border relative transition-colors ${
									isVoted ? "bg-green-50 dark:bg-green-950/20" : "bg-primary/5"
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
										src={project.coverImage || "/placeholder.svg"}
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
										{project.projectTypes.map((type) => (
											<Badge key={type} variant="secondary" className="text-xs">
												{type}
											</Badge>
										))}
										{project.domains.map((domain) => (
											<Badge key={domain} variant="outline" className="text-xs">
												{domain}
											</Badge>
										))}
									</div>
								</div>
								
								{/* Vote button or check */}
								<div className="flex items-center gap-2">
									{isVoted ? (
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
											disabled={castingVote}
										>
											{castingVote ? <Loader2 className="w-4 h-4 animate-spin" /> : "Vote for this!"}
										</Button>
									)}
								</div>
								
								{/* Vote count */}
								<div className="flex items-center gap-1 ml-4 min-w-[60px] justify-end">
									<Star className="w-5 h-5 text-blue-500" />
									<span className="font-semibold text-base tabular-nums text-foreground">
										{project.voteCount.toLocaleString()}
									</span>
								</div>
							</div>
						);
					})}
				</div>

				{/* Load More Button */}
				{hasMore && (
					<div className="text-center mt-6">
						<Button 
							onClick={loadMore} 
							disabled={projectsLoading}
							variant="outline"
						>
							{projectsLoading ? (
								<>
									<Loader2 className="w-4 h-4 animate-spin mr-2" />
									Loading...
								</>
							) : (
								"Load More"
							)}
						</Button>
					</div>
				)}				{/* No projects found */}
				{!projectsLoading && projects.length === 0 && !error && (
					<div className="text-center py-8">
						<p className="text-muted-foreground">No projects found.</p>
					</div>
				)}
			</div>
					{/* Toast Provider for notifications */}
			<ToastProvider>
				{toasts.map((toastItem) => (
					<Toast
						key={toastItem.id}
						variant={toastItem.variant}
						visible={toastItem.visible}
					>
						<div className="grid gap-1">
							<ToastTitle>{toastItem.title}</ToastTitle>
							<ToastDescription>{toastItem.description}</ToastDescription>
						</div>
						<ToastClose onClick={() => dismiss(toastItem.id)} />
					</Toast>
				))}
			</ToastProvider>
			
			{/* IP Status Component - only show in development */}
			{process.env.NODE_ENV === 'development' && (
				<IPStatusComponent />
			)}
		</div>
	);
}
