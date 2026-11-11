import Link from 'next/link';
import { Suspense } from 'react';
import { connection } from 'next/server';
import styles from './page.module.css';
import { agents } from '../../data';

async function RandomAgent() {
	await connection();
	const agent = agents[Math.floor(Math.random() * agents.length)];
	return (
		<>
			<img src={agent.image} alt={agent.name} />
			<h2>{agent.name}</h2>
		</>
	);
}

export default function Result() {
	return (
		<main>
			<div className="contentWrapper">
				<div className={`card ${styles.resultCard}`}>
					<h1>Your Agent: </h1>
					<Suspense fallback={<p>Picking an agent...</p>}>
						<RandomAgent />
					</Suspense>
					<Link href="/" className="button">
						Go Back
					</Link>
				</div>
			</div>
		</main>
	);
}
