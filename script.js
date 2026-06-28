// ===============================
// ELEMENTOS
// ===============================

const pages = document.querySelectorAll(".page");
const steps = document.querySelectorAll(".step");
const canams = document.querySelectorAll(".canam");
const gifts = document.querySelectorAll(".gift");

const music = document.getElementById("music");
const restart = document.getElementById("restart");
const particles = document.getElementById("particles");

let current = 0;
let musicStarted = false;
let busy = false;

// ===============================
// CAMBIAR PANTALLA
// ===============================

function showPage(index){

    pages[current].style.opacity="0";

    pages[current].style.transform="translateY(30px)";

    setTimeout(()=>{

        pages.forEach(page=>{

            page.classList.remove("active");

            page.style.opacity="";

            page.style.transform="";

        });

        steps.forEach(step=>step.classList.remove("active"));

        pages[index].classList.add("active");

        steps[index].classList.add("active");

        current=index;

    },250);

}

    pages.forEach(page=>page.classList.remove("active"));
    steps.forEach(step=>step.classList.remove("active"));

    pages[index].classList.add("active");
    steps[index].classList.add("active");

    current=index;

}

// ===============================
// SIGUIENTE
// ===============================

function nextPage(){

    if(busy) return;

    if(current>=pages.length-1) return;

    busy=true;

    setTimeout(()=>{

        showPage(current+1);

        busy=false;

        if(current===pages.length-1){

    revealGift();

}

    },450);

}

// ===============================
// MÚSICA
// ===============================

function startMusic(){

    if(musicStarted) return;

    musicStarted=true;

    music.volume=0;

    music.play().catch(()=>{});

    let volume=0;

    const fade=setInterval(()=>{

        volume+=0.05;

        if(volume>=1){

            volume=1;

            clearInterval(fade);

        }

        music.volume=volume;

    },100);

}

// ===============================
// CANAM
// ===============================

canams.forEach(canam=>{

    canam.addEventListener("click",()=>{

        startMusic();

        canam.style.transition="0.45s";

        canam.style.transform="translateX(420px) rotate(8deg)";

        setTimeout(()=>{

            canam.style.transform="";

            nextPage();

        },420);

    });

});

// ===============================
// CAJAS
// ===============================

gifts.forEach(gift=>{

    gift.addEventListener("click",()=>{

        gift.animate([

            {transform:"scale(1) rotate(0deg)"},

            {transform:"scale(.9) rotate(-3deg)"},

            {transform:"scale(1.08) rotate(3deg)"},

            {transform:"scale(1)"}

        ],{

            duration:450

        });

        if(navigator.vibrate){

            navigator.vibrate(60);

        }

        setTimeout(()=>{

            nextPage();

        },350);

    });

});

// ===============================
// CONFETI FINAL
// ===============================

function finalAnimation(){

    confetti({

        particleCount:180,

        spread:90,

        origin:{y:.6}

    });

}

// ===============================
// CORAZONES
// ===============================

function createHeart(){

    const heart=document.createElement("div");

    heart.className="heart";

    heart.innerHTML="❤";

    heart.style.left=Math.random()*100+"vw";

    heart.style.animationDuration=(6+Math.random()*5)+"s";

    heart.style.fontSize=(12+Math.random()*22)+"px";

    particles.appendChild(heart);

    setTimeout(()=>{

        heart.remove();

    },11000);

}

setInterval(createHeart,700);

// ===============================
// REINICIAR
// ===============================

restart.addEventListener("click",()=>{

    current=0;

    showPage(0);

    window.scrollTo(0,0);

    confetti.reset?.();

});
// ==========================================
// REVELACIÓN FINAL
// ==========================================

const finalPage = document.querySelector(".final");
const giftImage = document.querySelector(".gift-image");

function revealGift(){
setTimeout(()=>{

    typeWriter();

},1200);

    // baja un poco la música
    let fade = setInterval(()=>{

        if(music.volume > 0.45){

            music.volume -= 0.03;

        }else{

            clearInterval(fade);

        }

    },120);

    // flash blanco
    const flash=document.createElement("div");

    flash.style.position="fixed";
    flash.style.left="0";
    flash.style.top="0";
    flash.style.width="100vw";
    flash.style.height="100vh";
    flash.style.background="white";
    flash.style.opacity="0";
    flash.style.transition=".5s";
    flash.style.zIndex="9999";

    document.body.appendChild(flash);

    setTimeout(()=>{

        flash.style.opacity="1";

    },80);

    setTimeout(()=>{

        flash.style.opacity="0";

    },450);

    setTimeout(()=>{

        flash.remove();

    },900);

    confetti({

        particleCount:300,

        spread:180,

        startVelocity:50,

        scalar:1.3

    });

    giftImage.style.opacity="0";
    giftImage.style.transform="scale(.6)";

    setTimeout(()=>{

        giftImage.style.transition="1.3s";

        giftImage.style.opacity="1";

        giftImage.style.transform="scale(1)";

    },400);

}
const finalText=document.querySelector(".final p");

const originalText=finalText.innerHTML;

finalText.innerHTML="";

function typeWriter(){

    let i=0;

    const typing=setInterval(()=>{

        finalText.innerHTML+=originalText.charAt(i);

        i++;

        if(i>=originalText.length){

            clearInterval(typing);

        }

    },35);

}
// ===============================
// REINICIAR EXPERIENCIA COMPLETA
// ===============================

function restartExperience(){

    current = 0;

    pages.forEach(page => page.classList.remove("active"));
    steps.forEach(step => step.classList.remove("active"));

    pages[0].classList.add("active");
    steps[0].classList.add("active");

    music.pause();
    music.currentTime = 0;
    music.volume = 1;
    musicStarted = false;

    if(giftImage){

        giftImage.style.opacity = "";
        giftImage.style.transform = "";
        giftImage.style.transition = "";

    }

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

}

restart.addEventListener("click", restartExperience);
// ===============================
// ENTRADA SUAVE
// ===============================

window.addEventListener("load",()=>{

    document.body.style.opacity="0";

    document.body.style.transition="1s";

    setTimeout(()=>{

        document.body.style.opacity="1";

    },100);

});