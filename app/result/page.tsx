import Link from 'next/link';
import styles from './page.module.css';
import { agents } from '../../data';

export default function Result() {
	const agent = agents[0];
	return (
		<main>
			<div className={styles.contentWrapper}>
				<h1>Your Agent: </h1>
				<img src={agent.image} alt={agent.name} />
				<h2>{agent.name}</h2>
				<Link href="/" className="button">
					Go Back
				</Link>
			</div>
		</main>
	);
}
