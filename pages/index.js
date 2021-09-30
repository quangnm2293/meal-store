import Head from 'next/head';
import Modal from '../components/Modal';
import StoreMeal from '../components/StoreMeal';

export default function Home() {
	return (
		<div className='bg-gray-100'>
			<Head>
				<title>Meals Store</title>
			</Head>

			<Modal />

			<main>
				<StoreMeal />
			</main>
		</div>
	);
}
