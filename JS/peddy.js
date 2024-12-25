
const load_all_pet_category = async () => {
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/categories`);
    const data = await response.json();

    display_all_pet_category(data.categories);

    remove_active_button(); 

    // const active_button = document.getElementById(`btn-${category}`);
    // // active_button.classList.add("active"); 
};

const remove_active_button = () => {
    const category_btn = document.getElementsByClassName('category_btn'); 
    for (const btn of category_btn) {
        btn.classList.remove('active'); 
    }
};

const display_all_pet_category = (pets_category) => {
    const pet_category_container = document.getElementById('pet_category_container');
    pet_category_container.innerHTML = ""; 
    pets_category.forEach(pet => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="flex justify-between mt-12 gap-6">
            <button id="btn-${pet.category}" 
                onclick="display_pet_category('${pet.category}')" 
                class="category_btn flex items-center gap-6 p-6 rounded-2xl border border-[#0E7A8126] hover:bg-[#0E7A811A] transition duration-500 cursor-pointer">
                <img src="${pet.category_icon}" alt="">
                <h4 class="text-2xl font-bold">${pet.category}</h4>
            </button>
        </div>
        `;
        pet_category_container.appendChild(div);
    });
};


document.getElementById('spinner').style.display = 'none';

const show_loading_spinner = () => {
    document.getElementById('spinner').style.display = 'block'; 
};

const hide_loading_spinner = () => {
    document.getElementById('spinner').style.display = 'none'; 
};

const display_pet_category = async (category) => {
    const pet_container = document.getElementById('pet_container');
    pet_container.innerHTML = '';

    show_loading_spinner();

    setTimeout(async () => {

        const response = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`);
        const data = await response.json();
        pet_handler(data.data);
        remove_active_button();
        const active_button = document.getElementById(`btn-${category}`);
        active_button.classList.add("active");
        hide_loading_spinner();
        
    }, 2000);
};




const pet_handler = (pet_handler) => {
    // const btn = document.getElementById (`btn-${pet_handler}`);
    // console.log(pet_handler);


    const pet_container = document.getElementById('pet_container');
    pet_container.innerHTML = '';

    if (pet_handler.length === 0) {
        pet_container.classList.remove('grid');
        pet_container.innerHTML = `
        <div class="min-h-96 flex flex-col justify-center items-center bg-[#13131308] rounded-3xl py-24 px-10 mr-5">
        <img class="w-[140px] h-[140px]" src="./images/error.webp" alt="">
        <h1 class="text-[32px] font-bold text-[#171717] text-center mt-10">No Information Available</h1>
        <p class="mt-4 text-[#131313B3] text-xl text-center">It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
its layout. The point of using Lorem Ipsum is that it has a.</p>
        </div>
        `;
    }
    else {
        pet_container.classList.add('grid');
    }


    pet_handler.forEach(single_pet => {

        const div = document.createElement('div');
        div.innerHTML = `
         <!-- card -->
                <div class="border w-[300px] border-[#1313131A] p-5 rounded-xl">
                    <img class="w-[272px] h-[160px] rounded-lg" src="${single_pet.image}" alt="">
                    <div class="mt-6">
                        <p class="text-xl font-bold">${single_pet.pet_name}</p>
                        <div class="flex items-center gap-2 mt-2 text-[#131313B3]">
                            <img src="./icons/scanner.png" alt="">
                            <p>Breed: ${single_pet.breed ?? 'Not Available'}</p>
                        </div>
                        <div class="flex items-center gap-2 mt-2 text-[#131313B3]">
                            <img src="./icons/calender.png" alt="">
                            <p>Birth: ${single_pet.date_of_birth ?? 'Not Available'}</p>
                        </div>
                        <div class="flex items-center gap-2 mt-2 text-[#131313B3]">
                            <img src="./icons/pet.png" alt="">
                            <p>Gender: ${single_pet.gender ?? 'Not Available'}</p>
                        </div>
                        <div class="flex items-center gap-2 mt-2 text-[#131313B3]">
                            <img src="./icons/doller.png" alt="">
                            <p>Price : ${single_pet.price ?? 'Not Available'}$</p>
                        </div>
                        <div class="divider"></div>
                        <div class="flex justify-between items-center">
                            <div onclick="show_image('${single_pet.image}')"
                                class="px-[18px] py-[9px] rounded-lg border border-[#0E7A8126] cursor-pointer hover:bg-[#0E7A81] hover:text-white text-[#0E7A81] transition duration-500">
                                <i class="fa-solid fa-thumbs-up"></i>
                            </div>
                            <div 
                                class="px-[18px] py-[9px] rounded-lg border border-[#0E7A8126] cursor-pointer hover:bg-[#0E7A81] hover:text-white text-[#0E7A81] transition duration-500">
                                <button class="text-[18px] font-bold">Adopt</button>
                            </div>
                            <div
                                class="px-[18px] py-[9px] rounded-lg border border-[#0E7A8126] cursor-pointer hover:bg-[#0E7A81] hover:text-white text-[#0E7A81] transition duration-500">
                                <button onclick="load_details(${single_pet.petId})" class=" text-[18px] font-bold ">Details</button>
                            </div>
                        </div>
                    </div>
                </div>
        `;
        pet_container.appendChild(div);
    });

    
};


document.getElementById('sort_by_price').addEventListener('click', async () => {
    const pet_container = document.getElementById('pet_container');
    const spinner = document.getElementById('spinner');

    pet_container.innerHTML = '';

    spinner.style.display = 'block';

    setTimeout(async () => {
        const response = await fetch(`https://openapi.programming-hero.com/api/peddy/pets`);
        const data = await response.json();

        const sortedPets = data.pets.sort((a, b) => b.price - a.price);

        sortedPets.forEach(pet => {
            const div = document.createElement('div');
            div.innerHTML = `
                <!-- card -->
                <div class="border w-[300px] border-[#1313131A] p-5 rounded-xl">
                    <img class="w-[272px] h-[160px] rounded-lg" src="${pet.image}" alt="">
                    <div class="mt-6">
                        <p class="text-xl font-bold">${pet.pet_name}</p>
                        <div class="flex items-center gap-2 mt-2 text-[#131313B3]">
                            <img src="./icons/scanner.png" alt="">
                            <p>Breed: ${pet.breed ?? 'Not Available'}</p>
                        </div>
                        <div class="flex items-center gap-2 mt-2 text-[#131313B3]">
                            <img src="./icons/calender.png" alt="">
                            <p>Birth: ${pet.date_of_birth ?? 'Not Available'}</p>
                        </div>
                        <div class="flex items-center gap-2 mt-2 text-[#131313B3]">
                            <img src="./icons/pet.png" alt="">
                            <p>Gender: ${pet.gender ?? 'Not Available'}</p>
                        </div>
                        <div class="flex items-center gap-2 mt-2 text-[#131313B3]">
                            <img src="./icons/doller.png" alt="">
                            <p>Price : ${pet.price ?? 'Not Available'}$</p>
                        </div>
                        <div class="divider"></div>
                        <div class="flex justify-between items-center">
                            <div onclick="show_image('${pet.image}')"
                                class="px-[18px] py-[9px] rounded-lg border border-[#0E7A8126] cursor-pointer hover:bg-[#0E7A81] hover:text-white text-[#0E7A81] transition duration-500">
                                <i class="fa-solid fa-thumbs-up"></i>
                            </div>
                            <div
                                class="px-[18px] py-[9px] rounded-lg border border-[#0E7A8126] cursor-pointer hover:bg-[#0E7A81] hover:text-white text-[#0E7A81] transition duration-500">
                                <p class="text-[18px] font-bold">Adopt</p>
                            </div>
                            <div
                                class="px-[18px] py-[9px] rounded-lg border border-[#0E7A8126] cursor-pointer hover:bg-[#0E7A81] hover:text-white text-[#0E7A81] transition duration-500">
                                <button onclick="load_details(${pet.petId})" class=" text-[18px] font-bold ">Details</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            pet_container.appendChild(div);
        });

        spinner.style.display = 'none';
    }, 2000); 
});




document.getElementById('sort_by_price').addEventListener('click', async () => {
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/pets`);
    const data = await response.json();

    descending_order(data.pets);
});




const load_all_pet = async () => {
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/pets`);
    const data = await response.json();
    display_all_pet(data.pets)
};

const display_all_pet = (pets) => {
    const pet_container = document.getElementById('pet_container');
    pet_container.innerHTML = '';
    pets.forEach(pet => {
        const div = document.createElement('div');
        div.innerHTML = `
         <!-- card -->
                <div class="border w-[300px] border-[#1313131A] p-5 rounded-xl">
                    <img class="w-[272px] h-[160px] rounded-lg" src="${pet.image}" alt="">
                    <div class="mt-6">
                        <p class="text-xl font-bold">${pet.pet_name}</p>
                        <div class="flex items-center gap-2 mt-2 text-[#131313B3]">
                            <img src="./icons/scanner.png" alt="">
                            <p>Breed: ${pet.breed ?? 'Not Available'}</p>
                        </div>
                        <div class="flex items-center gap-2 mt-2 text-[#131313B3]">
                            <img src="./icons/calender.png" alt="">
                            <p>Birth: ${pet.date_of_birth ?? 'Not Available'}</p>
                        </div>
                        <div class="flex items-center gap-2 mt-2 text-[#131313B3]">
                            <img src="./icons/pet.png" alt="">
                            <p>Gender: ${pet.gender ?? 'Not Available'}</p>
                        </div>
                        <div class="flex items-center gap-2 mt-2 text-[#131313B3]">
                            <img src="./icons/doller.png" alt="">
                            <p>Price : ${pet.price ?? 'Not Available'}$</p>
                        </div>
                        <div class="divider"></div>
                        <div class="flex justify-between items-center">
                            <div onclick="show_image('${pet.image}')"
                                class="px-[18px] py-[9px] rounded-lg border border-[#0E7A8126] cursor-pointer hover:bg-[#0E7A81] hover:text-white text-[#0E7A81] transition duration-500">
                                <i class="fa-solid fa-thumbs-up"></i>
                            </div>
                            <div  
                                class="px-[18px] py-[9px] rounded-lg border border-[#0E7A8126] cursor-pointer hover:bg-[#0E7A81] hover:text-white text-[#0E7A81] transition duration-500">
                                <button id="adopt_button" class="text-[18px] font-bold">Adopt</button>
                            </div>
                            <div
                                class="px-[18px] py-[9px] rounded-lg border border-[#0E7A8126] cursor-pointer hover:bg-[#0E7A81] hover:text-white text-[#0E7A81] transition duration-500">
                                <button onclick="load_details(${pet.petId})" class=" text-[18px] font-bold ">Details</button>
                            </div>
                        </div>
                    </div>
                </div>
        `;
        pet_container.appendChild(div);
    });
};



const show_image = (imageUrl) => {
    const show_container = document.getElementById('show_container');
    const imageDiv = document.createElement('div');
    imageDiv.classList.add('mt-2');
    imageDiv.innerHTML = `
        <img src="${imageUrl}" alt="Pet Image" class="w-[300px] rounded-lg">
    `;
    show_container.appendChild(imageDiv);
};


const load_details = async (details) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${details}`);
    const data = await response.json();
    details_handler(data.petData);


};
const load_details1 = async (details) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${details}`);
    const data = await response.json();
    show_image(data.petData);

};


const details_handler = (handler) => {
    const modal_content = document.getElementById('modal_content');
    modal_content.innerHTML = `
       <img class="w-[636px] h-[320px]" src="${handler.image}" alt="">
       <div class="mt-6">
           <p class="text-xl font-bold">${handler.pet_name}</p>
           <div class="flex items-center gap-5">
               <div class="flex items-center gap-2 mt-2 text-[#131313B3]">
                   <img src="./icons/scanner.png" alt="">
                   <p>Breed: ${handler.breed ?? 'Not Available'}</p>
               </div>
               <div class="flex items-center gap-2 mt-2 text-[#131313B3]">
                   <img src="./icons/calender.png" alt="">
                   <p>Birth: ${handler.date_of_birth ?? 'Not Available'}</p>
               </div>
           </div>
           <div class="flex items-center gap-5">
               <div class="flex items-center gap-2 mt-2 text-[#131313B3]">
                   <img src="./icons/pet.png" alt="">
                   <p>Gender: ${handler.gender ?? 'Not Available'}</p>
               </div>
               <div class="flex items-center gap-2 mt-2 text-[#131313B3]">
                   <img src="./icons/doller.png" alt="">
                   <p>Price : ${handler.price ?? 'Not Available'}$</p>
               </div>
           </div>
           <div class=" flex items-center gap-2 mt-2 text-[#131313B3]">
               <img src="./icons/pet.png" alt="">
               <p>Vaccinated status: ${handler.vaccinated_status ?? 'Not Available'}</p>
           </div>
           <div class="divider"></div>
           <p class="font-semibold">Details Information</p>
           <p class="mt-3">${handler.pet_details}</p>
       </div>
    `;

    document.getElementById('my_modal_5').showModal();
};



load_all_pet();
load_all_pet_category();




const scroll_to_section = () => {
    const section = document.getElementById("main-section");
    section.scrollIntoView({ behavior: "smooth" });
}


document.addEventListener("click", (event) => {
    if (event.target && event.target.id === "adopt_button") {
        const modal = document.getElementById("adopt_modal");
        const countdownElement = document.getElementById("countdown");

        modal.classList.remove("hidden");

        let countdown = 3;
        countdownElement.textContent = countdown;

        const interval = setInterval(() => {
            countdown--;
            countdownElement.textContent = countdown;

            if (countdown <= 0) {
                clearInterval(interval);
                modal.classList.add("hidden");
            }
            
        }, 1000);

       
    }
});





