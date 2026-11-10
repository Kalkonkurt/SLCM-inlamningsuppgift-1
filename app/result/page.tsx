import Link from 'next/link';
import styles from './page.module.css';
import { agents } from '../../data';

export default function Result() {
	const agent = agents[0];
	return (
		<main>
			<div className={styles.contentWrapper}>
				<img src={agent.image} alt={agent.name} />
				<h1>You are gonna play: {agent.name}</h1>
				<Link href="/">Back</Link>
			</div>
		</main>
	);
}
