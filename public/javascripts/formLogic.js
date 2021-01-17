
document.getElementById("bookForm").addEventListener('submit', async (e) => {
    e.preventDefault()

    let form = document.getElementById("bookForm");
    let formData = new FormData(form);

    let object = {};
    formData.forEach((value, key) => {object[key] = value});

    let response = await fetch('/booking/api/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(object)
    });

    let result = await response.blob();
    let message = await result.text();

    let modalMessage = document.getElementById("message-body");

    if (response.status === 200)
        modalMessage.innerHTML = `Ваш столик забронирован. <br>Код: <span class="code">${message}</span>`
    else
        modalMessage.innerText = `Все столы в этот день заняты`

    document.location.href = "#message";
}, false)

document.getElementById("deleteForm").addEventListener('submit', async (e) => {
    e.preventDefault()

    let form = document.getElementById("deleteForm");
    let formData = new FormData(form);

    let object = {};
    formData.forEach((value, key) => {object[key] = value});

    let response = await fetch('/booking/api/delete', {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(object)
    });

    let result = await response.blob();
    let message = await result.text();

    let modalMessage = document.getElementById("message-body");

    if (response.status === 200)
        modalMessage.innerText = "Бронь успешно снята"
    else
        modalMessage.innerText = "Бронь с таким кодом отсутствует"

    document.location.href = "#message";
}, false)