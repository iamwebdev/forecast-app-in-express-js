// fetch('http://puzzle.mead.io/puzzle').then((data)=> {
//     data.json().then((parsedData) => {
//         console.log([parsedData])
//     })
// })
const form = document.querySelector('form')
const content1 = document.getElementById('content1')
const content2 = document.getElementById('content2')

form.addEventListener('submit',(e) => {
    content1.textContent = ''
    content2.textContent = ''
    e.preventDefault()
    content1.textContent = 'Loading..'
    const city = document.querySelector('input').value
    fetch('http://localhost:3000/weather?city='+city).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                content1.textContent = data.error
            } else {
                content1.textContent = data.location
                content2.textContent = data.forecast
            }
        })
    })
})