export default class ApiService {
	apiBase = 'https://api.themoviedb.org/3/search/';

	apiKey = '1a312659d57cbdc19acab57a112fc99f';

	async getResource(url) {
		try {
			const res = await fetch(url);

			if (!res.ok) {
				throw new Error(`Could not fetch ${url}, received ${res.status}`);
			}

			try {
				return await res.json();
			} catch (error) {
				throw new Error(`Could not get a JSON object from ${url}`);
			}
		} catch (error) {
			throw new Error(`Could not connect to API`);
		}
	}

	getMovies(query, page) {
		return this.getResource(`${this.apiBase}movie?api_key=${this.apiKey}&query=${query}&page=${page}`);
	}
}
