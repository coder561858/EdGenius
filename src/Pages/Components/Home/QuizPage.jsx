import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { mintCredentialNFT } from "../../../utils/mintCredential";
import { usePrivy } from "@privy-io/react-auth";

const QuizPage = () => {
	const { wallet } = usePrivy();
	const [level, setLevel] = useState(null);
	const [timeLeft, setTimeLeft] = useState(null);
	const [started, setStarted] = useState(false);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [userAnswers, setUserAnswers] = useState([]);
	const [showResults, setShowResults] = useState(false);
	const [score, setScore] = useState(0);
	const [answerSelected, setAnswerSelected] = useState(false);
	const [isMinting, setIsMinting] = useState(false);

	const questions = [
		{ question: "What is a synonym for 'happy'?", options: ["Sad", "Glad", "Mad", "Angry"], answer: "Glad" },
		{ question: "Choose the correct spelling:", options: ["Recieve", "Receive", "Recive", "Receeve"], answer: "Receive" },
		{ question: "Which is a noun?", options: ["Run", "Blue", "Cat", "Quickly"], answer: "Cat" },
		{ question: "Which is an antonym of 'hot'?", options: ["Warm", "Cold", "Boiling", "Spicy"], answer: "Cold" },
        { question: "What is a synonym for 'quick'?", options: ["Fast", "Late", "Slow", "Tired"], answer: "Fast" },
        { question: "Choose the correct spelling:", options: ["Definately", "Definitely", "Definatly", "Definetly"], answer: "Definitely" },
        { question: "Which is an adjective?", options: ["Run", "Happiness", "Beautiful", "Jump"], answer: "Beautiful" },
        { question: "What is a plural form of 'mouse'?", options: ["Mouses", "Mouse", "Mices", "Mice"], answer: "Mice" },
        { question: "Which is a verb?", options: ["Sing", "Song", "Singer", "Singing"], answer: "Sing" },
        { question: "What is a synonym for 'angry'?", options: ["Happy", "Upset", "Calm", "Joyful"], answer: "Upset" },
        { question: "Choose the correct spelling:", options: ["Accomodate", "Acommodate", "Accommodate", "Acommadate"], answer: "Accommodate" },
        { question: "Which is a conjunction?", options: ["Because", "Quick", "Blue", "Run"], answer: "Because" },
        { question: "Which is a noun?", options: ["Drive", "Careful", "Tree", "Fast"], answer: "Tree" },
        { question: "Which word is an adverb?", options: ["Slowly", "Slow", "Slowness", "Slowed"], answer: "Slowly" },
        { question: "Choose the correct spelling:", options: ["Febuary", "February", "Februry", "Febrery"], answer: "February" }

		

	];

	useEffect(() => {
		if ((level === "medium" || level === "hard") && started) {
			const interval = setInterval(() => {
				setTimeLeft(prev => {
					if (prev <= 1) {
						clearInterval(interval);
						calculateScore();
						setShowResults(true);
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
		setCurrentQuestion(0);
		setUserAnswers([]);
		setShowResults(false);
		setScore(0);
		if (chosenLevel === "medium") setTimeLeft(300); // 5 minutes
		if (chosenLevel === "hard") setTimeLeft(120);   // 2 minutes
	};

	const handleAnswerClick = (selectedOption) => {
		if (answerSelected) return;
		
		setAnswerSelected(true);
		const isCorrect = selectedOption === questions[currentQuestion].answer;
		
		const newUserAnswers = [...userAnswers];
		newUserAnswers[currentQuestion] = { 
			selected: selectedOption, 
			correct: isCorrect 
		};
		setUserAnswers(newUserAnswers);
		
		setTimeout(() => {
			if (currentQuestion === questions.length - 1) {
				calculateScore();
				setShowResults(true);
			} else {
				setCurrentQuestion(currentQuestion + 1);
				setAnswerSelected(false);
			}
		}, 1000);
	};

	const calculateScore = () => {
		const correctAnswers = userAnswers.filter(answer => answer && answer.correct).length;
		setScore(correctAnswers);
	};

	const restartQuiz = () => {
		setStarted(false);
		setShowResults(false);
		setUserAnswers([]);
		setCurrentQuestion(0);
		setLevel(null);
	};

	const formatTime = (seconds) => {
		const m = Math.floor(seconds / 60);
		const s = seconds % 60;
		return `${m}:${s < 10 ? '0' + s : s}`;
	};

	const handleMint = async () => {
		try {
			setIsMinting(true);
			const provider = await wallet.getEthersProvider();
			const address = wallet.address;

			const success = await mintCredentialNFT(provider, address);
			if (success) {
				alert("NFT minted successfully! 🎉");
			} else {
				alert("Failed to mint NFT.");
			}
		} catch (err) {
			console.error(err);
			alert("Error minting NFT. See console for details.");
		} finally {
			setIsMinting(false);
		}
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
				) : showResults ? (
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.5 }}
						className="bg-gray-800/60 p-8 rounded-xl backdrop-blur-lg"
					>
						<h2 className="text-3xl font-bold mb-4">Quiz Results</h2>
						<p className="text-2xl mb-6">Your Score: <span className="font-bold text-green-400">{score}</span> out of {questions.length}</p>
						
						<div className="mb-8 space-y-4">
							{questions.map((q, index) => (
								<div key={index} className="text-left p-4 bg-gray-700/50 rounded-lg">
									<p className="font-medium">{index + 1}. {q.question}</p>
									<p className="mt-2">
										Your answer: 
										<span className={`ml-2 font-semibold ${userAnswers[index]?.correct ? 'text-green-400' : 'text-red-400'}`}>
											{userAnswers[index]?.selected || "No answer"}
										</span>
									</p>
									{!userAnswers[index]?.correct && (
										<p className="text-green-400">Correct answer: {q.answer}</p>
									)}
								</div>
							))}
						</div>
						
						<button 
							onClick={restartQuiz}
							className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-lg mr-4"
						>
							Try Again
						</button>
						<button 
							onClick={handleMint}
							disabled={isMinting}
							className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg text-lg"
						>
							{isMinting ? "Minting..." : "Claim NFT Credential"}
						</button>
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

						<div className="text-sm text-gray-400 mb-2">
							Question {currentQuestion + 1} of {questions.length}
						</div>

						<div className="p-4 bg-gray-800/40 rounded-xl backdrop-blur-md">
							<h3 className="text-xl font-semibold mb-4">{questions[currentQuestion].question}</h3>
							<div className="grid grid-cols-2 gap-4">
								{questions[currentQuestion].options.map((opt, i) => (
									<button 
										key={i} 
										onClick={() => handleAnswerClick(opt)}
										className={`py-3 px-4 rounded-md transition-colors ${
											answerSelected 
												? opt === questions[currentQuestion].answer 
													? "bg-green-600" 
													: userAnswers[currentQuestion]?.selected === opt 
														? "bg-red-600" 
														: "bg-gray-700 opacity-50"
												: "bg-gray-700 hover:bg-gray-600"
										}`}
									>
										{opt}
									</button>
								))}
							</div>
						</div>

						<div className="flex justify-between items-center pt-4">
							<div className="w-full bg-gray-700 rounded-full h-2.5">
								<div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}></div>
							</div>
						</div>
					</motion.div>
				)}
			</div>
		</div>
	);
};

export default QuizPage;
