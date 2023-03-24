const tmdbApi = {
  movies: {
    getPopularList: `/movie/popular?api_key=${process.env.REACT_APP_API_KEY}`,

    getUpcomingList: `/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}`,

    getTop_ratedList: `/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}`,

    getVideos: ({ id }) =>
      `/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}`,

    getSearch: `/search/movie?api_key=${process.env.REACT_APP_API_KEY}`,

    getDetail: ({ id }) =>
      `/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`,

    getCredits: ({ id }) =>
      `/movie/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}`,

    getSimilar: ({ id }) =>
      `/movie/${id}/similar?api_key=${process.env.REACT_APP_API_KEY}`,
  },

  tv: {
    getPopularList: `/tv/popular?api_key=${process.env.REACT_APP_API_KEY}`,

    getOn_the_airList: `/tv/on_the_air?api_key=${process.env.REACT_APP_API_KEY}`,

    getTop_ratedList: `/tv/top_rated?api_key=${process.env.REACT_APP_API_KEY}`,

    getVideos: ({ id }) =>
      `/tv/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}`,

    getSearch: `/search/tv?api_key=${process.env.REACT_APP_API_KEY}`,

    getDetail: ({ id }) =>
      `/tv/${id}?api_key=${process.env.REACT_APP_API_KEY}`,

    getCredits: ({ id }) =>
      `/tv/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}`,

    getSimilar: ({ id }) =>
      `/tv/${id}/similar?api_key=${process.env.REACT_APP_API_KEY}`,
  },
};

export default tmdbApi;
