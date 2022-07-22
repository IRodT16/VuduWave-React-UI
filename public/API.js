const API = () => {
  const response = fetch('https://35.207.27.218/racers', {
    method: 'GET',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },

    credentials: 'include',
  }).then((res) => res.json());
};

export default API;
