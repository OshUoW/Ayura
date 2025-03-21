document.addEventListener('DOMContentLoaded',() => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemCount= document.querySelector('.cart-icon span');
    const cartItemsList= document.querySelector('.cart-items');
    const cartTotal= document.querySelector('.cart-total');
    const cartIcon= document.querySelector('.cart-icon');
    const sidebar= document.getElementById('sidebar');
    const checkoutButton = document.querySelector('.checkout-btn');
    //Initializing variables to manage cart items and total amount
    let cartItems =[];
    let totalAmount = 0;
    //Adding click event listeners to each "Add to Cart" button
    addToCartButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const item = {                              //Creating an object representing the item being added to cart
                name: document.querySelectorAll('.card .card--title')[index].textContent,
                price: parseFloat(
                    document.querySelectorAll('.price')[index].textContent.slice(1),
                ),
                quantity: 1,
            };
            //Cheking if the item already exists in the cart
            const exisitingItem = cartItems.find(
                (cartItem) => cartItem.name === item.name,
            );
            if(exisitingItem){
                exisitingItem.quantity++;
            }else{
                cartItems.push(item);
            }
            //Updating total amount anf cart ui
            totalAmount += item.price;

            updateCartUI();
        });
        //function to update the cart ui 
        function updateCartUI(){
            updateCartItemCount(cartItems.length);
            updateCartItemList();
            updateCartTotal(); 
        }
        //funtion to  update the cart item count displayed on the cart icon
        function updateCartItemCount(count){
            cartItemCount.textContent = count;
        }
        //function to update the cart items list displayed in the sidebar
        function updateCartItemList(){
            cartItemsList.innerHTML = '';
            cartItems.forEach((item,index)=>{
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-items','individual-cart-item');
                cartItem.innerHTML=`
                <span>(${item.quantity}x)${item.name}</span>
                <span class="cart-item-price">$${(item.price * item.quantity).toFixed(
                    2,
                )}
                <button class="remove-btn" data-index="${index}">X</button>
                </span>
                `;

                cartItemsList.append(cartItem);
            });
            //adding click event listeners to remove buttons in the cart items list
            const removeButtons= document.querySelectorAll('.remove-btn');
            removeButtons.forEach((button)=>{
                button.addEventListener('click' , (event) => {
                    const index = event.target.dataset.index;
                    removeItemFromCart(index);    
                });
            });
        }
        //function to remove an item from the cart
        function removeItemFromCart(index){
            const removeItem = cartItems.splice(index, 1)[0];
            totalAmount -= removeItem.price * removeItem.quantity;
            updateCartUI();
        }
        //function to update the total amount displayed in the cart
        function updateCartTotal() {
            cartTotal.textContent = `$${totalAmount.toFixed(2)}`;
        }
        //adding click event listener to toggle the sidebar visibility
        cartIcon.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
        //adding click event listener to close the sidebar
        const closeButton = document.querySelector('.sidebar-close');
        closeButton.addEventListener('click', ()=>{
            sidebar.classList.remove('open');
        });
    });
    //adding click event listener to the checkout button
    checkoutButton.addEventListener('click',() => {
        console.log(cartItems)
        if (cartItems.length === 0){
            alert('Your cart is empty please add items to proceed')    // checking if the cart is empty if yes providing an alert
            return

        }else{
            window.location.href = 'checkout.html';
        }
    })

    

});
