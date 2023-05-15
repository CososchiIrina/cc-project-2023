// js/components/MainPage.jsx
import {useEffect, useState} from "react";

export default function MainPage() {
	const [records, setRecords] = useState([]);

	useEffect(() => {
		try{
			fetch('/api/records', {
				method: 'GET',
			})
				.then(response => response.json())
				.then(json => setRecords(json.data));
		}
		catch (error) {
			console.log(error);
		}
	}, []);

	const deleteRecord = (event) => {
		event.preventDefault();
		const id = event.target.id;
		try {
			fetch(`/api/records?id=${id}`, {
				method: 'DELETE',
			})
				.then(response => response.json())
				.then(json => {
						setRecords(records.filter(record => record._id !== id));
				});
		}
		catch (error) {
			console.log(error);
		}
	}

	return (
		<section className="bg-white dark:bg-gray-900">
			<div className="container px-6 py-10 mx-auto">
				<h1 className="italic underline w-[1500px] mx-auto text-center text-6xl text-fuchsia-950">Best-selling albums of the 21st century</h1>
				<p className="italic w-[1500px] mx-auto text-center mt-4 text-3xl text-fuchsia-700">This is an app that showcases best-selling albums of the 21st century according to Wikipedia</p>

				<div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 sm:grid-cols-2 xl:grid-cols-3 lg:grid-cols-2">
					{records.map(record => (
						<div
							key={record._id}
							className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
							<h5 className="text-center underline mb-2 text-2xl font-bold tracking-tight text-fuchsia-950 dark:text-white">
								{record.album}
							</h5>
							<div className="mt-4">
								<a href={record.album_cover} target="_blank" rel="noopener noreferrer">
									<img src={record.album_cover}alt="Album Cover" lassName="max-w-full h-auto" />
								</a>
							</div>
							<p className="text-center font-normal text-fuchsia-700 dark:text-fuchsia-950">
								<b>Artist/s:</b> {record.artist}
							</p>
                            <p className="text-center font-normal text-fuchsia-700 dark:text-fuchsia-950">
								<b>Release year:</b> {record.release_year}
							</p>
                            <p className="text-center font-normal text-fuchsia-700 dark:text-fuchsia-950">
								<b>Nationality:</b> {record.nationality}
							</p>
                            <p className="text-center font-normal text-fuchsia-700 dark:text-fuchsia-950">
								<b>Worldwide sales:</b> {record.ww_sales}
							</p>
							<div className={"flex justify-center mt-4"}>
								<button type="button"
								        id={record._id}
								        onClick={deleteRecord}
								        className="focus:outline-none text-white bg-fuchsia-950 hover:bg-pink-900 focus:ring-4 focus:ring-pink-900 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-pink-700 dark:focus:ring-pink-900">Delete
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}