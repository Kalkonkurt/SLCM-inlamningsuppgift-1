import Link from 'next/link';
import { Suspense } from 'react';
import { connection } from 'next/server';

async function AgentList() {
	await connection();
	const baseUrl = process.env.VALORANT_API_URL ?? 'https://valorant-api.com';

	try {
		const res = await fetch(`${baseUrl}/v1/agents?isPlayableCharacter=true`);
		if (!res.ok) throw new Error(`Upstream responded with status ${res.status}`);

		const { data }: { data: { uuid: string; displayName: string }[] } =
			await res.json();
		const names = data.map((a) => a.displayName).sort();
		console.info(`INFO: Fetched ${names.length} agents for /allAgents`);

		return (
			<ul>
				{names.map((name) => (
					<li key={name}>{name}</li>
				))}
			</ul>
		);
	} catch (err) {
		console.error('ERROR: Could not fetch agents for /allAgents', err);
		return <p>Could not load agents. Try again later.</p>;
	}
}

export default function Agents() {
	return (
		<main>
			<div className="contentWrapper">
				<div className="card">
					<h1>All Agents</h1>
					<Suspense fallback={<p>Loading agents...</p>}>
						<AgentList />
					</Suspense>
					<Link href="/" className="button">
						Go Back
					</Link>
				</div>
			</div>
		</main>
	);
}
