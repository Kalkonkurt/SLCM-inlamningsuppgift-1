import Link from 'next/link';
import './globals.css';
import styles from './page.module.css';

export default function Home() {
	return (
		<main>
			<div className="contentWrapper">
				<div className="card">
					<h1 className={styles.h1}>Generate Valorant Agent</h1>
					<Link href="/result" className="button">
						Generate
					</Link>
				</div>
			</div>
		</main>
	);
}
