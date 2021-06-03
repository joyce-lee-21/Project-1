const API_KEY = "AIzaSyCyKMXUad_LOaxvAirtrIayiSYALdq2x6I"

document.addEventListener("DOMContentLoaded", () => {
    getAddresses()
})

//need to fetch from db.json file rather than outside link
//fetched addresses from db.json needs to create list of addresses
const getAddresses = () => {
    fetch('http://localhost:3000/addresses')
    .then(res => res.json())
    .then(data => data.forEach(getAddressInfo))
    .catch(error => console.log("Error: ", error))
}

//“As a user, I want click on a home from the list so that the information (address, picture, name) shows up.”

const getAddressInfo = (data) => {
    // console.log(data)
    let li = document.createElement('li')
    li.innerText = data.name
    li.style.color = "#fffff4"
    li.style.color = "#fffff4"

    document.querySelector('ul').append(li)

    li.addEventListener('click', (e) => {
        selectAddress(e, data)
    })
}

const selectAddress = (e, data) => {
    // console.log(data)
    const mapArea = document.querySelector('div#map-content')

    const addressName = document.querySelector('h2.home-name')
    // addressName.className = "home-name"
    addressName.innerText = ""
    addressName.innerText = data.name

    const addressDesc = document.querySelector('h3.home-address')
    // addressDesc.className = "home-address"
    addressDesc.innerText = ""
    addressDesc.innerText = data.address

    const addressImg = document.querySelector('img.home-img')
    // addressImg.className = "home-img"
    addressImg.src = ""
    addressImg.src = data.image

    const addressMapIt = document.createElement('button')
    addressMapIt.className = "google-map"
    addressMapIt.innerText = "Map It!"

    mapArea.append(addressName, addressDesc, addressImg, addressMapIt)

    // “As a user, I want click this "map it" button so that the embedded map locates the home.”
    addressMapIt.addEventListener('click', () => {
        console.log(data.address)

        const destination = data.address
        const embeddedMap = document.createElement('div')
        embeddedMap.className = "embedded-map"

        const addressMap = document.createElement('iframe')

        addressMap.className = "home-map"
        addressMap.width= "500"
        addressMap.height="350"
        addressMap.frameborder="0" 
        addressMap.style = "border: 0; padding-top: 50px;"
        addressMap.allowfullscreen = true
        addressMap.src = `https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${destination}`
        // `https://www.google.com/maps/embed/v1/directions?key=${API_KEY}&origin=${origin}&destination=${destination}`


        mapArea.append(embeddedMap)
        embeddedMap.append(addressMap)

        let addressForm = document.createElement('form')
        let addressInput = document.createElement('input')
        let addressSubmit = document.createElement('input')

        addressForm.className = 'address-form'
        addressInput.className = 'address-input'
        addressInput.placeholder = "Starting Point"
        addressSubmit.className = 'address-submit'
        addressSubmit.setAttribute("type", "button")
        addressSubmit.value = "Get Directions"

        embeddedMap.append(addressForm)
        addressForm.append(addressInput, addressSubmit)

        // “As a user, I want input my current location so that I can get a route to the selected home.”
        addressSubmit.addEventListener('click', () => {
        })
    })
}



