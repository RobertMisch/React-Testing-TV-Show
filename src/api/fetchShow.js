import axios from "axios";

export const fetchShow = () => {
    return axios.get("https://api.tvmaze.com/singlesearch/shows?q=stranger-things&embed=episodes")
      .then(res => {return res}) // or res.data, however you want to set that up
  }

// export const fetchShow = () => {
//     axios
//       .get(
//         "https://api.tvmaze.com/singlesearch/shows?q=stranger-things&embed=episodes"
//       )
//       .then(res => {
//         setShow(res.data);
//         setSeasons(formatSeasons(res.data._embedded.episodes));
//       });
//   };