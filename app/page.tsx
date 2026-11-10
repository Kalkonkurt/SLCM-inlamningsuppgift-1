'use client';

import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
	return (
		<main>
			<div className={styles.content}>
				<h1>Generate your Valorant Agent</h1>
				<Link href="/result" className={styles.button}>
					Generate
				</Link>
			</div>
		</main>
	);
}
