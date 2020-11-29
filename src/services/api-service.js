export default class ApiService {
	apiBase = 'https://api.themoviedb.org/3/';

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

	async sendData(url, value) {
		try {
			const res = await fetch(url, {
				method: 'post',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
				},
				body: JSON.stringify({
					value,
				}),
			});

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
		return this.getResource(`${this.apiBase}search/movie?api_key=${this.apiKey}&query=${query}&page=${page}`);
	}

	async getSessionId() {
		const data = await this.getResource(`${this.apiBase}authentication/guest_session/new?api_key=${this.apiKey}`);
		if (data.success) {
			this.guestSessionId = data.guest_session_id;
			return true;
		}

		return false;
	}

	getRatedMovies() {
		return this.getResource(`${this.apiBase}guest_session/${this.guestSessionId}/rated/movies?api_key=${this.apiKey}`);
	}

	rateMovie(value, id) {
		return this.sendData(
			`${this.apiBase}movie/${id}/rating?api_key=${this.apiKey}&guest_session_id=${this.guestSessionId}`,
			value
		);
	}

	getGenres() {
		return this.getResource(`${this.apiBase}genre/movie/list?api_key=${this.apiKey}`);
	}
}
