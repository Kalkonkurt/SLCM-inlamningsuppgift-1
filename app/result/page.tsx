import Link from 'next/link';
import { Suspense } from 'react';
import { connection } from 'next/server';
import styles from './page.module.css';

interface ApiAgent {
	displayName: string;
	displayIcon: string;
}

async function RandomAgent() {
	await connection();
	const logLevel = process.env.LOG_LEVEL ?? 'info';
	const baseUrl = process.env.VALORANT_API_URL ?? 'https://valorant-api.com';

	try {
		const res = await fetch(`${baseUrl}/v1/agents?isPlayableCharacter=true`);
		if (!res.ok) throw new Error(`Status ${res.status}`);
		const { data }: { data: ApiAgent[] } = await res.json();

		if (logLevel === 'debug') {
			console.debug(`DEBUG: Fetched ${data.length} agents from ${baseUrl}`);
		}

		const agent = data[Math.floor(Math.random() * data.length)];
		console.info(`INFO: Agent generated: ${agent.displayName}`);
		return (
			<>
				<img src={agent.displayIcon} alt={agent.displayName} />
				<h2>{agent.displayName}</h2>
			</>
		);
	} catch (error) {
		console.error('ERROR: Could not fetch agents', error);
		return <p>Could not load an agent. Try again later.</p>;
	}
}

export default function Result() {
	return (
		<main>
			<div className="contentWrapper">
				<div className={`card ${styles.resultCard}`}>
					<h1>Your Agent </h1>
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
