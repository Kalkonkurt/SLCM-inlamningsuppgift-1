'use client';
import { useState } from 'react';
import type { Agent } from '../data';
import Link from 'next/link';
import styles from './page.module.css';

export default function GenerateAgent() {
	const [agent, setAgent] = useState<Agent | null>(null);
	const [error, setError] = useState<string | null>(null);

	async function generate() {
		try {
			const res = await fetch('/api/agent', { cache: 'no-store' });
			if (!res.ok) throw new Error('Request failed');
			setAgent(await res.json());
			setError(null);
		} catch {
			setError('Could not fetch agent. Try again.');
		}
	}

	return (
		<main>
			<div className="contentWrapper">
				<div className="card">
					<h1 className={styles.h1}>Generate Valorant Agent</h1>
					<button className="button" onClick={generate}>
						Generate
					</button>
					{error && <p>{error}</p>}
					{agent && (
						<div className="modalBackdrop" onClick={() => setAgent(null)}>
							<div className="card modalCard" onClick={(e) => e.stopPropagation()}>
								<img src={agent.image} alt={agent.name} />
								<h2>{agent.name}</h2>
								<button className="button" onClick={generate}>
									Again
								</button>
								<button className="button" onClick={() => setAgent(null)}>
									Go back
								</button>
								<Link href="/allAgents" className="button">
									All agents
								</Link>
							</div>
						</div>
					)}
				</div>
			</div>
		</main>
	);
}
