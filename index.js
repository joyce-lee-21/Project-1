const init = () => {
    getAddresses()
    setUpListeners()
}
//need to fetch from db.json file rather than outside link
const updateAddress = (desc) => {
    fetch('url',{
      //  method: "GET"
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ description: desc })
    })
}

const setUpListeners = () => {
    const ...form = document.querySelector('...')
    ...FormData.addEventListner('click,submit,scroll')
}

const getAddresses = () => {
    fetch("url")
    .then(res => res.json())
    .then(console.log(addresses))
}

const getAddressInfo = () => {
    const addressName = document.querySelector('h')
    addressName.innerText = address.name

    const addressImg = document.querySelector('img')
    addressImg.src = address.image_url

    const addressDesc = document.querySelector('description').querySelector('textarea')
    addressDesc.innerText = address.description
}