import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
	const [credentialCount, setCredentialCount] = useState(0);
	const [quizCount, setQuizCount] = useState(0);
	const [learnerCount, setLearnerCount] = useState(0);

	// Animate number counters
	useEffect(() => {
		const animateCount = (setFn, target, duration) => {
			let start = 0;
			const startTime = performance.now();
	
			const step = (currentTime) => {
				const progress = Math.min((currentTime - startTime) / duration, 1);
				const current = Math.floor(progress * target);
				setFn(current);
	
				if (progress < 1) {
					requestAnimationFrame(step);
				}
			};
	
			requestAnimationFrame(step);
		};
	
		animateCount(setCredentialCount, 500, 3000); // 3 seconds
		animateCount(setQuizCount, 200, 3000);
		animateCount(setLearnerCount, 1000, 3000);
	}, []);
	

	return (
		<div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-[90vh] flex items-center justify-center">
			{/* Decorative elements */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full filter blur-3xl opacity-20"></div>
				<div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full filter blur-3xl opacity-20"></div>
			</div>

			{/* Main content */}
			<div className="relative z-10 container mx-auto px-4 text-center">
				<motion.h1
					initial={{ opacity: 0, y: -30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
					className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text"
				>
					Learn. Grow. conquer.
				</motion.h1>

				<motion.p
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3, duration: 1 }}
					className="text-gray-300 text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
				>
					Complete quizzes, prove your skills, and unlock verifiable on-chain credentials through smart wallets — all in a decentralized learning experience.
				</motion.p>

				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ delay: 0.6, duration: 0.6 }}
					className="flex justify-center gap-4"
				>
		

					
				</motion.div>

				{/* Quick stats */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 1, duration: 0.8 }}
					className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
				>
					<div className="p-6 bg-gray-800/30 rounded-xl backdrop-blur-sm">
						<h3 className="text-3xl font-bold text-white mb-2">{credentialCount}+</h3>
						<p className="text-gray-400">On-chain Credentials Issued</p>
					</div>
					<div className="p-6 bg-gray-800/30 rounded-xl backdrop-blur-sm">
						<h3 className="text-3xl font-bold text-white mb-2">{quizCount}+</h3>
						<p className="text-gray-400">Completed Quizzes</p>
					</div>
					<div className="p-6 bg-gray-800/30 rounded-xl backdrop-blur-sm">
						<h3 className="text-3xl font-bold text-white mb-2">{learnerCount}+</h3>
						<p className="text-gray-400">Learners Empowered</p>
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default Hero;
