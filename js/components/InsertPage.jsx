// js/components/InsertPage.jsx
export default function InsertPage() {
	const insertRecord = (event) => {
		event.preventDefault();
		const artist = document.getElementById("artist").value;
		const album = document.getElementById("album").value;
        const release_year = document.getElementById("release_year").value;
        const nationality = document.getElementById("nationality").value;
        const ww_sales = document.getElementById("ww_sales").value;
		const data = {artist, album, release_year, nationality, ww_sales};
		fetch("/api/records", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		}).then(() => {
			console.log("New record inserted");
			document.getElementById("artist").value = "";
			document.getElementById("album").value = "";
            document.getElementById("release_year").value = "";
            document.getElementById("nationality").value = "";
            document.getElementById("ww_sales").value = "";
		});
	}

	return (
		<section className="bg-white dark:bg-gray-900">
			<div className="container px-6 py-10 mx-auto">
                <h1 className="w-[1500px] mx-auto text-center text-6xl">Best-selling albums of the 21st century</h1>
				<p className="w-[1500px] mx-auto text-center mt-4 text-3xl">This is an app that showcases best-selling albums of the 21st century according to Wikipedia</p>
				<form>
					<div className="mb-6">
						<label htmlFor="artist" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Insert artist</label>
						<input type="text" id="artist"
						       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						       placeholder="Adele"  required/>
					</div>
					<div className="mb-6">
						<label htmlFor="album"
						       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Insert album title</label>
						<textarea id="album"
						       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						       placeholder="21" required/>
					</div>
                    <div className="mb-6">
						<label htmlFor="release_year" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Insert the release year</label>
						<input type="text" id="release_year"
						       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						       placeholder="2011" required/>
					</div>
                    <div className="mb-6">
						<label htmlFor="nationality" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Insert nationality</label>
						<input type="text" id="nationality"
						       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						       placeholder="UK" required/>
					</div>
                    <div className="mb-6">
						<label htmlFor="ww_sales" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Insert no. of worldwide sales</label>
						<input type="text" id="ww_sales"
						       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						       placeholder="31000000" required/>
					</div>
					<button type="submit"
					        onClick={ insertRecord }
					        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit
					</button>
				</form>
			</div>
		</section>
	)
}