const APIURL = "https://api.github.com/users/";

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

async function getUser(username) {
	const resp = await fetch(APIURL + username);
	const respData = await resp.json();

	createUserCard(respData);

	getRepos(username);
}

async function getRepos(username) {
	const resp = await fetch(APIURL + username + '/repos');
	const respData = await resp.json();

	addReposToCard(respData);
}

function createUserCard(user) {
	const cardHTML = `
		<div class="card">
		<div class="userinfo">
			<div id="avatar">
				<img class="avatar" src="${user.avatar_url}" alt="${user.name}" />
			</div>
			<div class="about">
				<h1>${user.name}</h1>
				<h3 class="login">( @${user.login} )</h3>
				<p class="loginbio">${user.bio}</p>
				<ul class="info">
					<li class="inf"><strong>${user.followers}</strong> followers. </li>
					<li class="inf"><strong>${user.following}</strong> following. </li>
					<li class="inf"><strong>${user.public_repos}</strong> public repositories. </li>
				</ul>
				<h3 class="login">${user.blog}</h3>
				<h3>${user.location}</h3>			
			</div>
		</div>
		<h3>R e p o s i t o r i e s</h3>
		<div class="repos" id="repos"></div>
		</div>
	`;
		main.innerHTML = cardHTML;
		gsap.from("#avatar", {y: 0, x: 0, delay: 0.5, duration: 1.5, scale: 0.2, opacity: 0})
		gsap.from(".inf", {y: 0, x: 90, delay: 0.8, duration: 1.5, stagger: 0.5, opacity: 0})		
	}

function addReposToCard(repos) {
	const reposE1 = document.getElementById("repos");
	// console.log(repos);
	repos.forEach(repo => {
		const repoE1 = document.createElement('a');
		repoE1.classList.add('repo');

		repoE1.href = repo.html_url;
		repoE1.target = "_blank";
		repoE1.innerText = repo.name; 

		reposE1.appendChild(repoE1);
		
	})
}

form.addEventListener('submit', (e) => {
	e.preventDefault();
	const user = search.value;
	if(user) {
		getUser(user);
		search.value = "";
	}
});
