"use client";

import { motion } from "framer-motion";
import type { FC } from "react";

const Footer: FC = () => {
	const footerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				duration: 0.3,
				delay: 0.5,
			},
		},
	};

	return (
		<motion.footer
			className="relative mt-4 dark:bg-background"
			variants={footerVariants}
			initial="hidden"
			animate="visible"
		>
			<div className="container mx-auto px-4">
				<div className="flex flex-wrap items-center justify-center md:justify-between">
					<div className="mx-auto w-full px-4 text-center md:w-6/12">
						<div className="py-1 text-sm font-semibold">
							<motion.span
								className="inline-block text-2xl"
								whileHover={{ scale: 1.1 }}
							>
								&copy; Docu Nest 2024
							</motion.span>{" "}
						</div>
					</div>
				</div>
			</div>
		</motion.footer>
	);
};

export default Footer;
