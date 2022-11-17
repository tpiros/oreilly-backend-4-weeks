import './style.css';

const response = await fetch('http://localhost:3000', {
  headers: {
    'x-api-key': 123,
  },
});
try {
  const { data: people } = await response.json();
  const ul = document.createElement('ul');
  if (!people) {
    document.querySelector('#app').innerText =
      'You may want to check your API rate limit :)';
  } else {
    people.forEach((person) => {
      const li = document.createElement('li');
      li.innerText = `${person.fname} ${person.lname}`;
      ul.appendChild(li);
    });

    document.querySelector('#app').appendChild(ul);
  }
} catch (error) {
  console.error('error', error);
}
