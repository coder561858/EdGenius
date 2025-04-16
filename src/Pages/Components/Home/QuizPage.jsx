import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const QuizPage = () => {
	const [level, setLevel] = useState(null);
	const [timeLeft, setTimeLeft] = useState(null);
	const [started, setStarted] = useState(false);

	const questions = [
		{ question: "What is a synonym for 'happy'?", options: ["Sad", "Glad", "Mad", "Angry"], answer: "Glad" },
		{ question: "Choose the correct spelling:", options: ["Recieve", "Receive", "Recive", "Receeve"], answer: "Receive" },
		{ question: "Which is a noun?", options: ["Run", "Blue", "Cat", "Quickly"], answer: "Cat" }
	];

	useEffect(() => {
		if ((level === "medium" || level === "hard") && started) {
			const interval = setInterval(() => {
				setTimeLeft(prev => {
					if (prev <= 1) {
						clearInterval(interval);
						alert("Time's up!");
						return 0;
					}
					return prev - 1;
				});
			}, 1000);
			return () => clearInterval(interval);
		}
	}, [started, level]);

	const startQuiz = (chosenLevel) => {
		setLevel(chosenLevel);
		setStarted(true);
		if (chosenLevel === "medium") setTimeLeft(300); // 5 minutes
		if (chosenLevel === "hard") setTimeLeft(120);   // 2 minutes
	};

	const formatTime = (seconds) => {
		const m = Math.floor(seconds / 60);
		const s = seconds % 60;
		return `${m}:${s < 10 ? '0' + s : s}`;
	};

	return (
		<div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-screen flex items-center justify-center">
			{/* Background blur elements */}
			<div className="absolute inset-0 overflow-hidden z-0">
				<div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full filter blur-3xl opacity-20"></div>
				<div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full filter blur-3xl opacity-20"></div>
			</div>

			<div className="relative z-10 text-white w-full max-w-3xl px-4 text-center">
				{!started ? (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
					>
						<h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
							Choose Your Quiz Level
						</h2>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<button onClick={() => startQuiz("easy")} className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg">Easy</button>
							<button onClick={() => startQuiz("medium")} className="bg-yellow-500 hover:bg-yellow-600 px-6 py-3 rounded-lg">Medium</button>
							<button onClick={() => startQuiz("hard")} className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-lg">Hard</button>
						</div>
					</motion.div>
				) : (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.6 }}
						className="space-y-6"
					>
						{(level === "medium" || level === "hard") && (
							<p className="text-lg text-gray-300">⏳ Time Left: <span className="font-bold text-white">{formatTime(timeLeft)}</span></p>
						)}

						{questions.map((q, index) => (
							<div key={index} className="p-4 bg-gray-800/40 rounded-xl backdrop-blur-md">
								<h3 className="text-xl font-semibold mb-2">{q.question}</h3>
								<div className="grid grid-cols-2 gap-4">
									{q.options.map((opt, i) => (
										<button key={i} className="bg-gray-700 hover:bg-gray-600 rounded-md py-2">{opt}</button>
									))}
								</div>
							</div>
						))}
					</motion.div>
				)}
			</div>
		</div>
	);
};

export default QuizPage;
