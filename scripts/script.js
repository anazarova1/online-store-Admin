const cartModal = document.querySelector('.cartModal');
const addLaptopModalCloseBtn = document.querySelector('.cartCloseBtn');
const addBtn  = document.querySelector('.addLaptopBtn');
const cardsRoot = document.querySelector('.cards');
const formItems = document.getElementsByClassName('formItem');
const modalAddBtn = document.querySelector('.modalAddBtn');

const MAIN_URL = 'http://localhost:8080';

const openAddLaptopModal = () => cartModal.classList.remove('cartModalHidden');

addBtn.onclick = openAddLaptopModal;

const closeAddLaptopModal = () => cartModal.classList.add('cartModalHidden');

addLaptopModalCloseBtn.onclick = closeAddLaptopModal;

const getLaptops = async () => {
    try {
        const { data } = await axios.get(`${MAIN_URL}/laptops`);
        renderLaptops(data);
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
};

const renderLaptops = (data) => {
    cardsRoot.innerHTML = "";

    data.forEach(laptop => {
        const div = document.createElement('div');
        div.classList.add('card');
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "Delete";
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';

        const { id, name, image, price } = laptop;

        deleteBtn.onclick = () => {
            deleteLaptop(id);
        };

        div.innerHTML = `
            <h2>${name}</h2>
            <p>${price}</p>
            <img src="${image}" alt="${name}">
        `;
        div.append(deleteBtn);
        div.append(editBtn);

        cardsRoot.append(div)
    });
};


const addNewLaptop = async (event) => {
    event.preventDefault();
    const data = [...formItems].reduce((acc, formItem) => {
        acc[formItem.name] = formItem.value;
        return acc
    }, {});

    try {
        await axios.post(`${MAIN_URL}/laptops`, { 
            ...data, 
            "win-code": 1.2312312312487237e+24 
        });
        getLaptops();
        closeAddLaptopModal();
    } catch (error) {
        console.error(error);
        alert(error.message)
    }

};

modalAddBtn.onclick = addNewLaptop;

const deleteLaptop = async (id) => {
    try {
        await axios.delete(`${MAIN_URL}/laptops/${id}`);
        getLaptops();
    } catch (error) {
        console.error(error);
        alert(error.messsage);
    }
}


getLaptops();



