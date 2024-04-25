let product_section=[
    {
        "id":1,
        "name":"iPhone 15 Plus",
        "brand":"Apple",
        "image":"https://m.media-amazon.com/images/I/71xb2xkN5qL._SX679_.jpg",
         "mrp":59000,
         "price":40000,
         "ram":"6GB",
         "internal":"128GB"
         

    },

    {
        "id":2,
        "name":"Galaxy M15 5G ",
        "brand":"Samsung",
        "image":"https://m.media-amazon.com/images/I/818Voe9yzCL._SX679_.jpg",
         "mrp":35000,
         "price":25000,
         "ram":"8GB",
         "internal":"128GB"

    },

    {
        "id":3,
        "name":"iQOO Z7s 5G ",
        "brand":"iQOO",
        "image":"https://m.media-amazon.com/images/I/71k3gOik46L._SX679_.jpg",
         "mrp":30000,
         "price":25000,
         "ram":"8GB",
         "internal":"128GB"

    },


    {
        "id":4,
        "name":"Redmi Note 13 5G ",
        "brand":"Redmi",
        "image":"https://m.media-amazon.com/images/I/71VW8LmqqPL._SX679_.jpg",
         "mrp":25000,
         "price":20000,
         "ram":"6GB",
         "internal":"128GB"

    },


    {
        "id":5,
        "name":"Camon 20s Pro 5G ",
        "brand":"TECNO",
        "image":"https://m.media-amazon.com/images/I/712KUiu03SL._SX679_.jpg",
         "mrp":15000,
         "price":20000,
         "ram":"8GB",
         "internal":"128GB"

    },


    {
        "id":6,
        "name":"Lava Agni 2 5G  ",
        "brand":"Lava",
        "image":"https://m.media-amazon.com/images/I/61Mm0fKH-IL._SX679_.jpg",
         "mrp":15000,
         "price":10000,
         "ram":"8GB",
         "internal":"128GB"

    },


    {
        "id":7,
        "name":"Mi 12 Pro+ 5G ",
        "brand":"Redmi",
        "image":"https://m.media-amazon.com/images/I/71VW8LmqqPL._SX679_.jpg",
         "mrp":27000,
         "price":20000,
         "ram":"8GB",
         "internal":"128GB"

    },

    {
        "id":8,
        "name":"Apple iPhone 15 ",
        "brand":"Apple",
        "image":"https://m.media-amazon.com/images/I/71657TiFeHL._SX679_.jpg",
         "mrp":35000,
         "price":25000,
         "ram":"8GB",
         "internal":"128GB"

    },

];


let product=document.getElementById("produt_page");

let btn_cart=document.querySelector(".btn_cart");
let myModal=new bootstrap.Modal('#modal');
let cart_qty=document.querySelector(".cart_qty");
let modal_div=document.querySelector(".modal");
let t_body=document.querySelector(".tbody");

let cart_items=[];




function load_product(){

    let output="";

    product_section.forEach((product)=>{
   
        output+=`<div class="col p-3 back_cart border border-3 border-white" data-item="${product.brand}" >

        <div class="card">
            <img src="${product.image}" alt="" class="card-img-top img-fluid">
        </div>

        <div class="card-body p-2">
            <div class="text-center">
               <h4>${product.name}</h4>
               <span class="p-2"><b>Brand :</b>${product.brand}</span> <br>
               <span  class="p-2"><b>Storage :</b> ${product.ram +" " +product.internal}</span> <br>
               <span class="text-decoration-line-through text-muted  p-3">${product.mrp}</span> <span class="text-primary fw-bold ">Rs ${product.price}</span>
            </div>

        </div>
        
        <div class="text-center p-2 align-items-center">
            <button class="btn btn-outline-primary btn_button" data-id=${product.id} >Add Cart <i class="bi bi-bag-plus-fill"></i></button>
        </div>

    </div>

`





   })

  product.innerHTML=output;
  
  ///Add produt Name and price

  let button_cart=document.querySelectorAll(".btn_button")

  button_cart.forEach((btn)=>{

    btn.addEventListener("click",addtocart)

  })




}





load_product();

btn_cart.addEventListener("click",function(){
myModal.show();


});

function addtocart(){
  
 this.disabled=true;
//  this.innerHTML="allready add"

  let clickproduct_id=this.dataset.id
  let product_details=product_section.filter((product)=>product.id==clickproduct_id)[0];

   let product_list={

    ...product_details,
    quantity:1,
    amount:product_details.price,

   };

   cart_items.push(product_list)
  
   cart_qty.textContent=cart_items.length;
   update_total()
}

modal_div.addEventListener("shown.bs.modal",()=>{

  let output=``;
  
  cart_items.forEach((product)=>{

 output+=`<tr>
                
               <td><img src="${product.image}" class="img-fluid" width="100px"alt=""></td>

               <td > ${product.name} </td>
               <td> ${product.price.toFixed(2)} </td>
               <td>  <input type="number" class="form-control txt_qty"  min="1" value="${product.quantity}"    data-id="${product.id}">  </td>
               <td> ${product.amount.toFixed(2)} </td>
               <td > <button data-id="${product.id}" class="btn btn-danger btn-sm re_btn"><i class="bi bi-trash3"></i></button> </td>
               
         </tr>`;

});

 t_body.innerHTML=output; 


 let removebtn=document.querySelectorAll(".re_btn");
 removebtn.forEach((btn)=>{


        btn.addEventListener("click",removefrom_cart);


             });



let txt_qty=document.querySelectorAll(".txt_qty");

txt_qty.forEach((txt)=>{

    txt.addEventListener("change",update)
})




});


function removefrom_cart(){

   let id_remov=this.dataset.id;
   let trr=this.closest("tr");
   

   cart_items=cart_items.filter((product)=>product.id != id_remov);
   trr.remove();
   update_total()

}



function update(){

let id=this.dataset.id;
let new_qty=this.value;
let amoount_td=this.parentElement.nextElementSibling;
let productindex=cart_items.findIndex((product)=>product.id==id);
cart_items[productindex].quantity=new_qty;
cart_items[productindex].amount=(new_qty*cart_items[productindex].price);
amoount_td.textContent=(new_qty*cart_items[productindex].price).toFixed(2);
update_total();

}


modal_div.addEventListener("hide.bs.modal",()=>{

    cart_qty.textContent=cart_items.length;

    ///check product button

    let button_cart=document.querySelectorAll(".btn_button");

    button_cart.forEach((btn)=>{

        let pid=btn.dataset.id;

        if(!isIdPresent(pid)){

            btn.disabled=false;
        }
    })

});

function update_total(){
  
    let totalamount=0;
    cart_items.forEach((product)=>{

        totalamount+=product.amount;
    });

    let total_Td=document.querySelector(".atotal")
    total_Td.textContent=`Total Rs : ${totalamount.toFixed(2)} `

}

let isIdPresent=(id)=>{

  for(let product of cart_items ){

    if(product.id==id){
        return true;
    }
  }
      return false;

};

console.log(product_section);














