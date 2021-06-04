const API_KEY = 'AIzaSyCyKMXUad_LOaxvAirtrIayiSYALdq2x6I'

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

    addHome()
}

//“As a user, I want click on a home from the list so that the information (address, picture, name) shows up.”

const getAddressInfo = (data) => {
    let li = document.createElement('li')
    li.className = "home"
    li.innerText = data.name

    document.querySelector('ul#home-list').append(li)

    li.addEventListener('click', (e) => {
        selectAddress(e, data)
    })

    // document.querySelector('ul').addEventListener('mouseover', (e) => {
    //     e.target.style.backgroundColor = "#BDCC94"
    //     setTimeout(() => {e.target.style.backgroundColor = ""}, 1000)
    // })
}

const addHome = () => {
    if (document.querySelector('.home-form') != 'undefined' && document.querySelector('.home-form') != null) {
        document.querySelector('.home-form').remove()
    }

    const homeSelection = document.querySelector("#home-selection")
    const houseForm = document.createElement('form')
    const nameInput = document.createElement('input')
    const imageInput = document.createElement('input')
    const houseInput = document.createElement('input')
    const houseSubmit = document.createElement('input')

    houseForm.className = "home-form"
    nameInput.className = "name"
    nameInput.placeholder = "Show Name"
    imageInput.className = "home-image"
    imageInput.placeholder = "Home Image URL"
    houseInput.className = "home-address"
    houseInput.placeholder = "Show Address"
    houseSubmit.setAttribute("type", "submit")
    houseSubmit.value = "Submit"

    homeSelection.append(houseForm)
    houseForm.append(nameInput,imageInput,houseInput,houseSubmit)

    houseForm.addEventListener('submit', (e) => {
        e.preventDefault()
        // console.log(e.target.childNodes[0].value)

        fetch('http://localhost:3000/addresses', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            Accept: "application/json"
            },
            body: JSON.stringify({
                name: e.target.childNodes[0].value,
                image: e.target.childNodes[1].value,
                address: e.target.childNodes[2].value
            })
        })
        .then(res => res.json())
        .then(() => {
            document.querySelector('#home-list').innerHTML = ""
            getAddresses()})
        .catch(error => console.log("Error: ", error))
    })
}

const selectAddress = (e, data) => {
    // console.log(e)
    const mapArea = document.querySelector('div#map-content')

    document.querySelector('div.embedded-map').innerHTML = ""
    if (document.querySelector('.google-map') != 'undefined' && document.querySelector('.google-map') != null) {
        document.getElementsByTagName('button')[0].remove()
    }

    e.target.style.color = "#fffff4"

    const addressName = document.querySelector('h2.home-name')
    addressName.innerText = ""
    addressName.innerText = data.name

    const addressDesc = document.querySelector('h3.home-address')
    addressDesc.innerText = ""
    addressDesc.innerText = data.address

    const addressImg = document.querySelector('img.home-img')
    addressImg.src = ""
    addressImg.src = data.image

    const addressMapIt = document.createElement('button')
    addressMapIt.className = "google-map"
    addressMapIt.innerText = "Map It!"

    mapArea.append(addressName, addressDesc, addressImg, addressMapIt)

    // “As a user, I want click this "map it" button so that the embedded map locates the home.”
    addressMapIt.addEventListener('click', () => {
        // console.log(data.address)

        const destination = data.address
        const embeddedMap = document.querySelector('div.embedded-map')
        const addressMap = document.createElement('iframe')

        addressMap.className = "home-map"
        addressMap.width= "500"
        addressMap.height="350"
        addressMap.frameborder="0" 
        addressMap.style = "border: 0; padding-top: 50px;"
        addressMap.allowfullscreen = true
        addressMap.src = `https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${destination}`

        mapArea.append(embeddedMap)
        embeddedMap.append(addressMap)

        let addressForm = document.createElement('form')
        let addressInput = document.createElement('input')
        let addressSubmit = document.createElement('input')

        addressForm.className = 'address-form'
        addressInput.className = 'address-input'
        addressInput.placeholder = "Starting Point"
        addressSubmit.className = 'address-submit'
        addressSubmit.setAttribute("type", "submit")
        addressSubmit.value = "Get Directions"

        embeddedMap.append(addressForm)
        addressForm.append(addressInput, addressSubmit)

        // “As a user, I want input my current location so that I can get a route to the selected home.”
        document.querySelector('.address-form').addEventListener('submit', (e) => {      
            e.preventDefault()
            console.log(e)

            const mapFrom = document.createElement('iframe') 
            const origin = e.target.childNodes[0].value

            mapFrom.className = "origin-map"
            mapFrom.width= "500"
            mapFrom.height="350"
            mapFrom.frameborder="0" 
            mapFrom.style = "border: 0; padding-top: 50px;"
            mapFrom.allowfullscreen = true
            mapFrom.src =`https://www.google.com/maps/embed/v1/directions?key=${API_KEY}&origin=${origin}&destination=${destination}`

            const modeDiv = document.createElement('div')
            const modeCar = document.createElement('button')
            const modeCarSpan = document.createElement('span')
            const modeTransit = document.createElement('button')
            const modeTransitSpan = document.createElement('span')
            const modeBike = document.createElement('button')
            const modeBikeSpan = document.createElement('span')
            const modeWalk = document.createElement('button')
            const modeWalkSpan = document.createElement('span')

            modeCarSpan.innerText = "Car"
            modeTransitSpan.innerText = "Transit"
            modeBikeSpan.innerText = "Bike"
            modeWalkSpan.innerText = "Walk"

            embeddedMap.append(modeDiv, mapFrom)
            modeDiv.append(modeCar,modeTransit,modeBike,modeWalk)
            modeCar.append(modeCarSpan)
            modeTransit.append(modeTransitSpan)
            modeBike.append(modeBikeSpan)
            modeWalk.append(modeWalkSpan)

            modeCar.addEventListener('click', () => {
                mapFrom.src =`https://www.google.com/maps/embed/v1/directions?key=${API_KEY}&origin=${origin}&destination=${destination}&mode=driving`
            })

            modeTransit.addEventListener('click', () => {
                mapFrom.src =`https://www.google.com/maps/embed/v1/directions?key=${API_KEY}&origin=${origin}&destination=${destination}&mode=transit`
            })

            modeBike.addEventListener('click', () => {
                mapFrom.src =`https://www.google.com/maps/embed/v1/directions?key=${API_KEY}&origin=${origin}&destination=${destination}&mode=bicycling`
            })

            modeWalk.addEventListener('click', () => {
                mapFrom.src =`https://www.google.com/maps/embed/v1/directions?key=${API_KEY}&origin=${origin}&destination=${destination}&mode=walking`
            })
            
        })
    })
}
