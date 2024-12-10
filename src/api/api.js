import axios from "axios";

const API_KEY = "89593bb4a6cb4b09b5ca879745c7c476";
const BASE_URL = "https://newsapi.org/v2";

export const fetchNewsByCategory = async (categories) => {
  const url = `${BASE_URL}/top-headlines?apiKey=${API_KEY}&pageSize=20`;

  try {
    const categoryPromises = categories.map((category) =>
      axios.get(`${url}&category=${category}`)
    );

    const results = await Promise.all(categoryPromises);

    const articles = results
      .flatMap((res) => res.data.articles || [])
      .filter((article, index, self) =>
        index === self.findIndex((a) => a.url === article.url)
      );

    return articles;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};
