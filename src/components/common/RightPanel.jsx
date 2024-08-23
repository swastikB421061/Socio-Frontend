import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import useFollow from "../../hooks/useFollow";

import RightPanelSkeleton from "../skeletons/RightPanelSkeleton";
import LoadingSpinner from "./LoadingSpinner";

const RightPanel = () => {
	const { data: suggestedUsers, isLoading } = useQuery({
		queryKey: ["suggestedUsers"],
		queryFn: async () => {
			try {
				const res = await fetch("/api/users/suggested");
				const data = await res.json();
				if (!res.ok) {
					throw new Error(data.error || "Something went wrong!");
				}
				return data;
			} catch (error) {
				throw new Error(error.message);
			}
		},
	});


	const { follow, isPending } = useFollow();
	const [searchQuery, setSearchQuery] = useState("");

	const handleSearch = (event) => {
		setSearchQuery(event.target.value);
	};

	const filteredUsers = suggestedUsers?.filter(
		(user) =>
			(user.fullName && user.fullName.toLowerCase().includes(searchQuery.toLowerCase())) ||
			(user.username && user.username.toLowerCase().includes(searchQuery.toLowerCase()))
	);


	return (
		<div className="hidden md:block my-2 mx-2">
			<div className="bg-[#16181C] p-4 rounded-md sticky top-2 shadow-lg">
				<p className="font-bold text-lg mb-4">Search here...</p>
				<div className="my-2">
					<input
						type="text"
						placeholder="Search users..."
						value={searchQuery}
						onChange={handleSearch}
						className="input input-bordered min-w-full px-4 py-2 rounded-md border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
				<div className="flex flex-col gap-4 w-full">
					{/* Loading Skeletons */}
					{isLoading && (
						<>
							<RightPanelSkeleton />
							<RightPanelSkeleton />
							<RightPanelSkeleton />
							<RightPanelSkeleton />
						</>
					)}
					{/* Filtered Users */}
					{!isLoading && searchQuery && filteredUsers?.map((user) => (
						<Link
							to={`/profile/${user.username}`}
							className="flex items-center justify-between gap-4 p-2 hover:bg-gray-700 rounded-md transition-all duration-150"
							key={user._id}
						>
							<div className="flex gap-2 items-center">
								<div className="avatar">
									<div className="w-10 h-10 rounded-full overflow-hidden">
										<img
											src={user.profileImg || "/avatar-placeholder.png"}
											alt={`${user.fullName}'s avatar`}
											className="w-full h-full object-cover"
										/>
									</div>
								</div>
								<div className="flex flex-col">
									{/* <span className="font-semibold tracking-tight truncate w-10 text-white">
										{user.fullName.substring(0, 7)}
									</span> */}
									<span className="text-sm text-slate-400">@{`${user.username.substring(0, 7)}...`}</span>
								</div>
							</div>
							<div>
								<button
									className="btn bg-blue-500 text-white hover:bg-blue-600 hover:opacity-90 rounded-full btn-sm px-4 py-1"
									onClick={(e) => {
										e.preventDefault();
										follow(user._id);
									}}
								>
									{isPending ? <LoadingSpinner size="sm" /> : "Follow"}
								</button>
							</div>
						</Link>
					))}
					{/* No Users Found */}
					{!isLoading && searchQuery && filteredUsers?.length === 0 && (
						<div className="text-center text-slate-500">No users found.</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default RightPanel;
