const FETCH_URL = ("https://api.github.com/users/Makushenko-Oleksii");
document.addEventListener('DOMContentLoaded', init);


const REPOS_URL = `${FETCH_URL}/repos`;

    function init() {
        const userInfo = document.querySelector('.js-user-info');
        const userImg = document.querySelector('.js-user-img img');
        const userFollower = document.querySelector('.js-user-follower')
        const dateCreation = document.querySelector('.js-date-creation');

        fetch(FETCH_URL)
            .then(response => {
            if(response.status === 200) document.querySelector('.loader-mask').classList.add('none')
            else document.querySelector('.loader-mask').classList.remove('none');
            return response.json();
        })
            .then((json) => {
            showUser(json)

        })


        const showUser = (user) => {
            userInfo.innerHTML = `${user.login}`;
            userFollower.innerHTML = `${user.followers} follower  ${user.following} following`;
            userImg.src = `${user.avatar_url}`;
            dateCreation.textContent = `${new Date(user.created_at).toLocaleString()}`;
        }

        function getRepos(url) {
            fetch(url).then(response => {
                return response.json();
            }).then((json) => {
                outRepos(json)
            })
        }

        getRepos(REPOS_URL);

        function outRepos(info) {
            let out = document.querySelector('.out');
            info.forEach(elem => {
                const name = document.createElement('p');
                name.classList.add('name', 'fw-bolder');
                name.innerHTML = `имя: ${elem.name}`
                out.append(name);
                name.addEventListener('click', function () {
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
                    pushAt.innerHTML = `дата последнего изменения: ${new Date(elem.pushed_at).toLocaleString()}`;

                }, {once: true})
            })
        }
    }
