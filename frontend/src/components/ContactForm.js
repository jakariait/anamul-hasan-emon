"use client";

import { useState } from "react";

export default function ContactForm() {
	const [formData, setFormData] = useState({
		fullName: "",
		emailAddress: "", // renamed from 'email'
		message: "",
	});
	const [status, setStatus] = useState({ type: "", message: "" });
	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setStatus({ type: "", message: "" });

		const apiURL = process.env.NEXT_PUBLIC_API_URL;

		try {
			const res = await fetch(`${apiURL}/contacts`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.error || "Something went wrong");
			}

			setStatus({
				type: "success",
				message: "Message sent successfully! We'll get back to you soon.",
			});
			setFormData({ fullName: "", emailAddress: "", message: "" });
		} catch (error) {
			setStatus({
				type: "error",
				message: error.message || "Failed to send message. Please try again.",
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="w-full">
			<div className="bg-[#1a1a1a]/80 backdrop-blur-sm rounded-xl shadow-2xl p-6 md:p-8 border border-[#EF6C00]/20">
				<h2 className="text-2xl font-bold text-[#EF6C00] mb-2">
					Send Us a Message
				</h2>
				<p className="text-gray-300 mb-6 text-sm">
					Have a question or want to work together? Send us a message and
					we&apos;ll get back to you as soon as possible.
				</p>

				{status.message && (
					<div
						className={`p-4 rounded-lg mb-6 ${
							status.type === "success"
								? "bg-green-900/30 text-green-200 border border-green-800/50"
								: "bg-red-900/30 text-red-200 border border-red-800/50"
						}`}
					>
						{status.message}
					</div>
				)}

				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label
							htmlFor="fullName"
							className="block text-sm font-medium text-gray-300 mb-1"
						>
							Full Name
						</label>
						<input
							type="text"
							id="fullName"
							name="fullName"
							value={formData.fullName}
							onChange={handleChange}
							required
							className="w-full px-4 py-2 bg-[#111]/80 border border-[#EF6C00]/20 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#EF6C00] focus:border-transparent transition duration-200"
							placeholder="John Doe"
						/>
					</div>

					<div>
						<label
							htmlFor="emailAddress"
							className="block text-sm font-medium text-gray-300 mb-1"
						>
							Email
						</label>
						<input
							type="email"
							id="emailAddress"
							name="emailAddress"
							value={formData.emailAddress}
							onChange={handleChange}
							required
							className="w-full px-4 py-2 bg-[#111]/80 border border-[#EF6C00]/20 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#EF6C00] focus:border-transparent transition duration-200"
							placeholder="john@example.com"
						/>
					</div>

					<div>
						<label
							htmlFor="message"
							className="block text-sm font-medium text-gray-300 mb-1"
						>
							Message
						</label>
						<textarea
							id="message"
							name="message"
							value={formData.message}
							onChange={handleChange}
							required
							rows="3"
							className="w-full px-4 py-2 bg-[#111]/80 border border-[#EF6C00]/20 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#EF6C00] focus:border-transparent transition duration-200"
							placeholder="Your message here..."
						/>
					</div>

					<button
						type="submit"
						disabled={loading}
						className={`w-full cursor-pointer py-2.5 px-4 rounded-md text-white font-medium transition duration-300 transform hover:scale-[1.02] ${
							loading
								? "bg-[#EF6C00]/70 cursor-not-allowed"
								: "bg-[#EF6C00] hover:bg-[#d45f00] focus:outline-none focus:ring-2 focus:ring-[#EF6C00] focus:ring-offset-2 focus:ring-offset-[#1a1a1a]"
						}`}
					>
						{loading ? "Sending..." : "Send Message"}
					</button>
				</form>
			</div>
		</div>
	);
}
