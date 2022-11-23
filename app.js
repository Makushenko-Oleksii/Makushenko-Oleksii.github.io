const userInfo = document.querySelector('.user-info');
const userImg = document.querySelector('.user-img img');
const userFollower = document.querySelector('.user-follower')
const dateCreation = document.querySelector('.date-creation');
const repositories = document.querySelector('.repositories');

const showUser = (user) => {
    // userImg.textContent = user.;
    userInfo.innerHTML = `${user.login}`;
    userFollower.innerHTML = `${user.followers} follower  ${user.following} following`;
    userImg.src = `${user.avatar_url}`;
    dateCreation.textContent = `${user.created_at}`;
}

document.addEventListener('DOMContentLoaded', function () {
    setTimeout(()=>{
        const loader = document.querySelector('.loader');
        const container = document.querySelector('.container');
        container.classList.remove('none')
        loader.classList.add('none')
    },2000)
})


document.addEventListener('DOMContentLoaded', function () {
    fetch("https://api.github.com/users/Makushenko-Oleksii").then(response => {
        return response.json();
    }).then((json) => {
        showUser(json)
    })
});

let url = 'https://api.github.com/users/Makushenko-Oleksii/repos';

document.addEventListener('DOMContentLoaded', getRepos);

function getRepos(url) {
    fetch(url).then(response => {
        return response.json();
    }).then((json) => {
        outRepos(json)
    })
}

getRepos(url);

function outRepos(info) {
    console.log(info)

    let out = document.querySelector('.out');
    info.map(elem => {
        const name = document.createElement('p');
        name.classList.add('name', 'fw-bolder');
        name.innerHTML = `имя: ${elem.name}`
        out.append(name);
        name.addEventListener('click', () => {
            console.log(info.length)
            let pLength = document.querySelectorAll('p');
            // console.log(pLength.length)
            // if (pLength.length > 6) return;
            const branch = document.createElement('p');
            branch.classList.add('branch', 'mt-3');
            name.append(branch);
            branch.innerHTML = `ветка: ${elem.default_branch}`;
            const visibility = document.createElement('p');
            visibility.classList.add('visibility');
            name.append(visibility);
            visibility.innerHTML = `видимость: ${elem.visibility}`;
            const issuesOpen = document.createElement('p');
            issuesOpen.classList.add('open_issues');
            name.append(issuesOpen);
            issuesOpen.innerHTML = `open issues: ${elem.open_issues}`;
            const pushAt = document.createElement('p');
            pushAt.classList.add('push-at');
            name.append(pushAt);
            pushAt.innerHTML = `дата последнего изменения: ${elem.pushed_at}`;

        })

    })
}