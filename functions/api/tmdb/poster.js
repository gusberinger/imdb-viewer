/**
 *  cloudflare worker function
 * @param {} context
 * @returns 
 */
export async function onRequest(context) {

    
    console.log("Hello, world!", context)
    const [_, tconst] = context.request.url.split("?tconst=")
    try {
      const tmdb_api_key = context.env.TMDB_API_KEY
      const tmdb_url = `https://api.themoviedb.org/3/find/${tconst}?api_key=${tmdb_api_key}&language=en-US&external_source=imdb_id`
      const tmdb_response = await fetch(tmdb_url)
      const tmdb_json = await tmdb_response.json()
      const tv_results = tmdb_json.tv_results
      if (tv_results.length == 0) {
        return new Response({}, {status: 404})
      }

      const expires = new Date()
      expires.setDate(expires.getDate() + 7)

      return new Response(JSON.stringify(tv_results[0]), {
        headers: {
          "cache-control": "public, max-age=604800",
          "expires": expires.toUTCString(),
        }
      })

    } catch (err) {
      console.error(err)
    }
  }
  