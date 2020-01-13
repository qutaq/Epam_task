// простите
(function() {

let itemlist = document.querySelector('#itemList');
let myform = document.forms['myform'];
let btn = document.querySelector('#btn');
let searchbtn = document.querySelector('#searchbtn');
let addbtn = document.querySelector('#addbtn');
let searchInput = document.querySelector('#searchInput');
let sortbynamebtn = document.querySelector('#sortbyname');
let sortbypricebtn = document.querySelector('#sortbyprice');


let items = [
    {
        name: 'Товар 1',
        count: 2,
        price: 200
    },
    {
        name: 'Товар 2',
        count: 4,
        price: 700
    },
    {
        name: 'Товар 3',
        count: 5,
        price: 400
    },
];
function createItem(itemName, itemCount, itemPrice){
    this.name = itemName;
    this.count = itemCount;
    this.price = itemPrice;
};

function tableTemp (item) {
    return `<tr>
    <td>${item.name}</td>
    <td>${item.count}</td>
    <td>${'$' + Intl.NumberFormat('en').format(item.price)}</td>
    <td>
      <div class="text-center">
        <a href="#" class="itemEdit btn btn-danger">Edit</a> 
        <a href="#" class="deleteEdit btn btn-danger">Delete</a></td>
      </div>
  </tr>`
};


function initListeners () {
    itemlist.addEventListener('click', editDeleteItem);
    myform.addEventListener('submit', addUpdateItem);
    addbtn.addEventListener('click', addUpdateItem);
    searchbtn.addEventListener('click', searchItems);
    sortbynamebtn.addEventListener('click', sortByName);
    sortbypricebtn.addEventListener('click', sortByPrice);
    myform.price.addEventListener('blur', formatPrice)
};

function buildItemList (filterSortitems) {
    itemlist.innerHTML = '';
    if(typeof(filterSortitems) !== 'undefined')
    {
        let result = filterSortitems.map(item => tableTemp(item));
        itemlist.innerHTML += result.join('');
    }
    else
    {
        let result = items.map(item => tableTemp(item));
        itemlist.innerHTML += result.join('');
    }
    console.log(items);
    console.log(filterSortitems);
};

function addUpdateItem (e){
        e.preventDefault();
        if(btn.classList.contains('btnUpdate'))
        {
            console.log('kekw')
            console.log(ite);
            items.map(function(item) {
                if(item === ite){
                    item.name = myform.name.value;
                    item.count = myform.count.value;
                    item.price = myform.price.value;
                }
                else
                {
                    console.log('2');
                }
            });
            btn.classList.remove('btnUpdate')
            btn.innerHTML = 'add';
            buildItemList();
            myform.reset();
        }
        else
        {
            if(myform.name.value.trim() && myform.count.value.trim() && myform.price.value.trim() !== '' && myform.name.value.length <= 15)
            {
                let item = new createItem(myform.name.value, myform.count.value, myform.price.value);
                items.push(item);
                buildItemList();
                myform.reset();
            }
            else
            {
                if(myform.checkValidity() === false)
                {
                    e.preventDefault();
                    e.stopPropagation();
                }
                myform.classList.add('was-validated');
            }
};      }

function editDeleteItem (e) {
    e.preventDefault();
    console.log(e.target.getAttribute('class'))

    // console.log(buttons.indexOf(e.target,1));

    // console.log(e.target.getAttribute('class').split(' ')[0]);
    let b = e.target.getAttribute('class') !== null ? e.target.getAttribute('class').split(' ')[0] : console.log('kaw');

    if(b === 'deleteEdit')
    {
        let delbtn = Object.values(itemlist.querySelectorAll('.deleteEdit'));
        console.log(delbtn.indexOf(e.target));
        if(confirm("delete?")){
            items.splice(delbtn.indexOf(e.target),1)
            buildItemList();
        }
        
    }
    else if (b === 'itemEdit')
    {   btn.innerHTML = "Update";
        btn.classList.add("btnUpdate");
        let edtbtn = Object.values(itemlist.querySelectorAll('.itemEdit'));
        console.log(edtbtn.indexOf(e.target));
        //да, это глабальная переменная
        ite = items[edtbtn.indexOf(e.target)];
        console.log(ite);
        myform.name.value = ite.name;
        myform.count.value = ite.count;
        myform.price.value = ite.price;
    }
    else
    {

    }

    // if(e.target.getAttribute('class').split(' ').includes('deleteEdit'))
    // {
    //     items.splice(buttons.indexOf(e.target),1)
    //     buildItemList();
    // }
    // else
    // {
    //     console.log('kekw');
    // }
    
};

function searchItems(e){
    e.preventDefault();
    let value = searchInput.value;
    console.log(value)
    if(value.length == 0 || value.length > 2){
        let exp = new RegExp(value);
        let filteritems = items.filter(item => {
                return exp.test(item.name);
        });
        buildItemList(filteritems);
    }
    
};

function sortByName(e) {
    e.preventDefault();
    console.log('sortbyname')
    sortbynamebtn.classList.toggle('up');
    if(sortbynamebtn.classList.contains('up'))
    {
        let sortName = items.sort( function(a,b){
            return a.name < b.name ? 1 : -1;
        });
        buildItemList(sortName);
        console.log(">");
    }
    else
    {
        let sortName = items.sort( function(a,b){
            return a.name > b.name ? 1 : -1;
        });
        buildItemList(sortName);
        console.log("<");
    }
    

};
function sortByPrice(e) {
    e.preventDefault();
    sortbypricebtn.classList.toggle('up');
    if(sortbypricebtn.classList.contains('up'))
    {
        let sortPrice = items.sort( function(a,b){
            return a.price < b.price ? 1 : -1;
        });
        buildItemList(sortPrice);
    }
    else
    {
        let sortPrice = items.sort( function(a,b){
            return a.price > b.price ? 1 : -1;
        });
        buildItemList(sortPrice);
    }
    
};

function formatPrice(e) {
    e.preventDefault();
    myform.price.value = myform.price.value.replace(/(\d+|\d+\.\d+|\.\d+)([eE][-+]?\d+)/g);
    console.log(myform.price.value.replace(/(\d+|\d+\.\d+|\.\d+)([eE][-+]?\d+)/i))
}

// function checkValidation() {
//     if(myform.name.value.trim() && myform.count.value.trim() && myform.price.value.trim() !== '' 
//     && myform.name.value.length <= 15 && typeof Number(myform.count.value) == 'number')
//     {
//         console.log('check')
//         console.log(typeof Number(myform.count.value));

//         return true;
//     }
//     else
//     {
//         console.log(typeof(myform.count.value))
//         console.log('necheck')

//         return false;
//     }
// };

function init(){
    initListeners();
    buildItemList();
}
init();
}());