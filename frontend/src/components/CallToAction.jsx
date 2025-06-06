import React from "react";
import ContactForm from "@/components/ContactForm";

const CallToAction = () => {
	return (
		<section id={"contact"} className="bg-[#111] text-white py-8 px-6">
			<div className="max-w-7xl mx-auto">
				<div className="grid md:grid-cols-2 gap-12 items-center">
					{/* Left side - Content */}
					<div className="text-center md:text-left ">
						<h2 className="text-3xl md:text-4xl font-bold text-[#EF6C00] mb-4">
							Let&apos;s Make Your Marketing Work Smarter
						</h2>
						<p className="text-lg text-gray-300 mb-8">
							You&apos;ve seen what I do. 👉 Let&apos;s turn your goals into
							action.
						</p>
						<div className="flex flex-wrap justify-center md:justify-start gap-4">
							<a
								href="mailto:hello@elevatewithrfat.com"
								className="bg-[#EF6C00] hover:bg-[#d45f00] text-white font-bold py-3 px-8 rounded-md transition duration-300 transform hover:scale-105"
							>
								💼 Hire Me
							</a>
							<a
								href="https://wa.me/8801307217573"
								target="_blank"
								rel="noopener noreferrer"
								className="bg-[#EF6C00] hover:bg-[#d45f00] text-white font-bold py-3 px-8 rounded-md transition duration-300 transform hover:scale-105"
							>
								📞 Schedule a Call
							</a>
							<a
								href="mailto:hello@elevatewithrfat.com"
								className="bg-[#EF6C00] hover:bg-[#d45f00] text-white font-bold py-3 px-8 rounded-md transition duration-300 transform hover:scale-105"
							>
								🧾 Request Proposal
							</a>
						</div>
					</div>

					{/* Right side - Form */}
					<div className="relative">
						<ContactForm />
					</div>
				</div>
			</div>
		</section>
	);
};

export default CallToAction;
