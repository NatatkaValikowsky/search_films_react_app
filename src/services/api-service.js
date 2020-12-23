class ApiService {
	apiBase = 'https://api.themoviedb.org/3/';

	apiKey = '1a312659d57cbdc19acab57a112fc99f';

	async sendRequest(url, value) {
		const sendData = value
			? {
					method: 'post',
					headers: {
						'Content-Type': 'application/json;charset=utf-8',
					},
					body: JSON.stringify({
						value,
					}),
			  }
			: {};
		try {
			const res = await fetch(url, sendData);
			return await res.json();
		} catch (error) {
			throw new Error(`Could not connect to API`);
		}
	}

	getMovies(query, page) {
		return this.sendRequest(`${this.apiBase}search/movie?api_key=${this.apiKey}&query=${query}&page=${page}`);
	}

	async getSessionId() {
		const data = await this.sendRequest(`${this.apiBase}authentication/guest_session/new?api_key=${this.apiKey}`);
		if (data.success) {
			this.guestSessionId = data.guest_session_id;
			return true;
		}

		return false;
	}

	getRatedMovies() {
		return this.sendRequest(`${this.apiBase}guest_session/${this.guestSessionId}/rated/movies?api_key=${this.apiKey}`);
	}

	rateMovie(value, id) {
		return this.sendRequest(
			`${this.apiBase}movie/${id}/rating?api_key=${this.apiKey}&guest_session_id=${this.guestSessionId}`,
			value
		);
	}

	getGenres() {
		return this.sendRequest(`${this.apiBase}genre/movie/list?api_key=${this.apiKey}`);
	}
}

export default new ApiService();
