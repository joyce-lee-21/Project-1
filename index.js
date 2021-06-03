// const init = () => {
//     getAddresses
//     // setUpListeners()
// }

document.addEventListener("DOMContentLoaded", () => {
    getAddresses()
    // setUpListeners()
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

    document.querySelector('ul').append(li)

    li.addEventListener('click', (e) => {
        selectAddress(e, data)
    })
}

const selectAddress = (e, data) => {
    console.log(data)
    // fetch('url',{

    //   //  method: "GET"
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ description: desc })
    // })
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

    mapArea.append(addressName, addressDesc, addressImg)


}

const placeMap = () => {

}

// const setUpListeners = () => {
//     const ...form = document.querySelector('...')
//     ...FormData.addEventListner('click,submit,scroll')
// }

// “As a user, I want click this "map it" button so that the embedded map locates the home.”


// “As a user, I want input my current location so that I can get a route to the selected home.”
