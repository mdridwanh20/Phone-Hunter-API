// load function call below on the input (it is sniper function )
const loadAllPhones = async(status, brandName) => {
    // console.log(brandName);
    document.getElementById('spinner').style.display = "none"

    // get the api form (async using)
    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${brandName?brandName:'iphone'}`)
    const data = await response.json();
        console.log(data);
        
    
    // show all btn condition (when you will click the show button)
    if (status === true){
        displayAllPhone(data.data)

    } else{
        displayAllPhone(data.data.slice(0,6))
    }
    // display all phones function

}

// display phone All phone function;
const displayAllPhone = (phones) => {
    const phoneContainer = document.getElementById('phones-container');
    phones.forEach(phone => {
        // console.log(phone);

        // data get from array (like destruction);
        const {brand, phone_name, image, slug} = phone;
    
        // new div create in the innerHtml:
        const div = document.createElement('div')
        div.innerHTML = `
                <div class="card bg-base-100 w-96  mb-8 shadow-xl">
                    <figure class="px-6 pt-10">
                        <img
                        src="${image}"
                        class="rounded-xl" />
                    </figure>
                        
                    <div class="card-body items-center text-center">
                        <h2 class="card-title">${brand}</h2>
                        <p>${phone_name}</p>
                        <div class="card-actions">
                        <button onclick="phoneDetails('${slug}')" class="bg-blue-600 px-4 py-1 rounded text-white">Show Details</button>
                        </div>
                    </div>
                </div>
        `;
        phoneContainer.append(div)
    })
}


// phone all details button function create:
    const phoneDetails = async(id) =>{
       const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
       const data = await res.json();
       console.log(data.data);

       const {brand } = data.data

       const modalContainer = document.getElementById('modalContainer');
       modalContainer.innerHTML = `
       
        <dialog id="my_modal_3" class="modal">
            <div class="modal-box">
            <form method="dialog">
                <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
                <h3 class="text-lg font-bold">${brand}</h3>
            </div>
        </dialog>
       
       `;

       my_modal_3.showModal()
       
    }


// click show all  Btn function:
const handleShowAll = () =>{
   loadAllPhones(true)
}


// input button click: and with function create.
const handlerSearch  = () => {
    document.getElementById('spinner').style.display ="block";

    // input value call with id.
    const searchText = document.getElementById('search-box').value;

    setTimeout (function () {
        loadAllPhones(false, searchText)
    }, 1000)
};


// call load phone
loadAllPhones(false, 'iphone')