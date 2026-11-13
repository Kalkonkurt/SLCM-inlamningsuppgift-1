import { connection } from 'next/server';

interface ApiAgent {
	displayName: string;
	displayIcon: string;
}

export async function GET() {
	await connection();
	const baseUrl = process.env.VALORANT_API_URL ?? 'https://valorant-api.com';

	try {
		const res = await fetch(`${baseUrl}/v1/agents?isPlayableCharacter=true`);
		if (!res.ok) throw new Error(`Upstream responded with status ${res.status}`);

		const { data }: { data: ApiAgent[] } = await res.json();
		if (!data?.length) throw new Error('Upstream returned no agents');

		const agent = data[Math.floor(Math.random() * data.length)];
		console.info(`INFO: Agent generated: ${agent.displayName}`);
		return Response.json({ name: agent.displayName, image: agent.displayIcon });
	} catch (err) {
		console.error('ERROR: Could not fetch agents', err);
		return Response.json({ error: 'Could not fetch agent' }, { status: 502 });
	}
}
