let intro = document.querySelector('.intro');
let logo = document.querySelector('.logo-header');
let logoSpan= document.querySelectorAll('.logo');
// waiting for the DOM content to be loaded before executing the following code
window.addEventListener('DOMContentLoaded', ()=>{
    setTimeout(()=>{
        logoSpan.forEach((span, idx)=>{
            setTimeout(()=>{
                span.classList.add('active');
            }, (idx +1)*400);  

        });
        setTimeout(()=>{
            logoSpan.forEach((span, idx)=>{
                setTimeout(()=>{
                    span. classList.remove('active');
                    span.classList.add('fade');
                },(idx + 1)* 50); //Delay increases for each span element

            })

        },2000);
        setTimeout(()=>{
            intro.style.top = '-100vh';
        },2300);
    });
});
setTimeout(() =>{
window.location.href="home.html"
},4000);
 