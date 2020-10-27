for (let elem of document.querySelectorAll(".disabled")) {
    elem.onclick = e => false;
}
for (let elem of document.querySelectorAll(".notbt")) {
    elem.onclick = e => false;
}
document.querySelector(".main-burger").onclick = (e) => {
    e.target.classList.toggle("active-burger");
    document.querySelector("header nav").classList.toggle("active-menu");
    document.querySelector("body").classList.toggle("lock");
    document.querySelector(".popup").classList.toggle("show");
    if (document.querySelector(".logo").classList.contains("logo-pets") && document.querySelector(".popup").classList.contains("show")) {
        document.querySelector(".logo-pets h1").style.color = "#f1cdb3";
        document.querySelector(".logo-pets p").style.color = "#FFFFFF";
        document.querySelector(".main-burger").src = "../../assets/Burgermain.png";
    } else if (document.querySelector(".logo").classList.contains("logo-pets")) {
        document.querySelector(".logo-pets h1").style.color = "#545454";
        document.querySelector(".logo-pets p").style.color = "#292929";
        document.querySelector(".main-burger").src = "../../assets/Burger.png";
    }

}


document.querySelector(".popup").onclick = (e) => {
    document.querySelector(".main-burger").classList.toggle("active-burger");
    document.querySelector("header nav").classList.toggle("active-menu");
    document.querySelector("body").classList.toggle("lock");
    document.querySelector(".popup").classList.toggle("show");
    if (document.querySelector(".logo").classList.contains("logo-pets") && document.querySelector(".popup").classList.contains("show")) {
        document.querySelector(".logo-pets h1").style.color = "#f1cdb3";
        document.querySelector(".logo-pets p").style.color = "#FFFFFF";
        document.querySelector(".main-burger").src = "../../assets/Burgermain.png";
    } else if (document.querySelector(".logo").classList.contains("logo-pets")) {
        document.querySelector(".logo-pets h1").style.color = "#545454";
        document.querySelector(".logo-pets p").style.color = "#292929";
        document.querySelector(".main-burger").src = "../../assets/Burger.png";
    }
}
document.querySelector(".header-active").onclick = (e) => {
    if (document.querySelector(".main-burger").classList.contains("active-burger")) {
        document.querySelector(".main-burger").classList.toggle("active-burger");
        document.querySelector("header nav").classList.toggle("active-menu");
        document.querySelector("body").classList.toggle("lock");
        document.querySelector(".popup").classList.toggle("show");
        if (document.querySelector(".logo").classList.contains("logo-pets") && document.querySelector(".popup").classList.contains("show")) {
            document.querySelector(".logo-pets h1").style.color = "#f1cdb3";
            document.querySelector(".logo-pets p").style.color = "#FFFFFF";
            document.querySelector(".main-burger").src = "../../assets/Burgermain.png";
        } else if (document.querySelector(".logo").classList.contains("logo-pets")) {
            document.querySelector(".logo-pets h1").style.color = "#545454";
            document.querySelector(".logo-pets p").style.color = "#292929";
            document.querySelector(".main-burger").src = "../../assets/Burger.png";
        }
    }
}


if (document.querySelector(".logo").classList.contains("logo-pets")) {
    document.querySelector(".logo-pets").onclick = (e) => {
        window.location.href = "../main/index.html";
    }
}
const pet = [
    {
        "name": "Jennifer",
        "img": "../../assets/pets-jennifer.png",
        "type": "Dog",
        "breed": "Labrador",
        "description": "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
        "age": "2 months",
        "inoculations": ["none"],
        "diseases": ["none"],
        "parasites": ["none"]
    },
    {
        "name": "Sophia",
        "img": "../../assets/pets-sophia.png",
        "type": "Dog",
        "breed": "Shih tzu",
        "description": "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
        "age": "1 month",
        "inoculations": ["parvovirus"],
        "diseases": ["none"],
        "parasites": ["none"]
    },
    {
        "name": "Woody",
        "img": "../../assets/pets-woody.png",
        "type": "Dog",
        "breed": "Golden Retriever",
        "description": "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
        "age": "3 years 6 months",
        "inoculations": ["adenovirus", "distemper"],
        "diseases": ["right back leg mobility reduced"],
        "parasites": ["none"]
    },
    {
        "name": "Scarlett",
        "img": "../../assets/pets-scarlet.png",
        "type": "Dog",
        "breed": "Jack Russell Terrier",
        "description": "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
        "age": "3 months",
        "inoculations": ["parainfluenza"],
        "diseases": ["none"],
        "parasites": ["none"]
    },
    {
        "name": "Katrine",
        "img": "../../assets/pets-katrine.png",
        "type": "Cat",
        "breed": "British Shorthair",
        "description": "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
        "age": "6 months",
        "inoculations": ["panleukopenia"],
        "diseases": ["none"],
        "parasites": ["none"]
    },
    {
        "name": "Timmy",
        "img": "../../assets/pets-timmy.png",
        "type": "Cat",
        "breed": "British Shorthair",
        "description": "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
        "age": "2 years 3 months",
        "inoculations": ["calicivirus", "viral rhinotracheitis"],
        "diseases": ["kidney stones"],
        "parasites": ["none"]
    },
    {
        "name": "Freddie",
        "img": "../../assets/pets-freddie.png",
        "type": "Cat",
        "breed": "British Shorthair",
        "description": "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
        "age": "2 months",
        "inoculations": ["rabies"],
        "diseases": ["none"],
        "parasites": ["none"]
    },
    {
        "name": "Charly",
        "img": "../../assets/pets-charly.png",
        "type": "Dog",
        "breed": "Jack Russell Terrier",
        "description": "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
        "age": "8 years",
        "inoculations": ["bordetella bronchiseptica", "leptospirosis"],
        "diseases": ["deafness", "blindness"],
        "parasites": ["lice", "fleas"]
    }
]


for (let elem of document.querySelectorAll(".our-friends-arrow")) {
    elem.onclick = (e) => {
        e.preventDefault();
        let check = [];
        for (let card of document.querySelectorAll(".our-friends-card")) {
            check.push(card.children[1].innerHTML);
        }

        document.querySelector(".our-friends-cards").classList.add("opacity0");
        setTimeout(() => {
            for (let card of document.querySelectorAll(".our-friends-card")) {
                let rand = Math.floor(Math.random() * 8);
                while (check.find(item => item === pet[rand].name) || check.find(item => item === rand) || check.find(item => item === pet[rand].name)) {
                    rand = Math.floor(Math.random() * 8);
                }
                check.push(rand);
                check.push(pet[rand].name);
                card.children[0].src = pet[rand].img;
                card.children[1].innerHTML = pet[rand].name;
            }
            document.querySelector(".our-friends-cards").classList.remove("opacity0");
        }, 500);
    }
}

for (let elem of document.querySelectorAll(".our-friends-card")) {
    elem.onclick = (e) => {
        let namepet = e.target.closest(".our-friends-card").children[1].innerHTML;
        let index = pet.findIndex(item => item.name === namepet);
        img.src = pet[index].img;
        names.innerHTML = namepet;
        type.innerHTML = pet[index].type;
        breed.innerHTML = pet[index].breed;
        description.innerHTML = pet[index].description;
        age.innerHTML = pet[index].age;
        inoculations.innerHTML = pet[index].inoculations.join(",");
        diseases.innerHTML = pet[index].diseases.join(",");
        parasites.innerHTML = pet[index].parasites.join(",");
        document.querySelector(".popup-friends").classList.add("show");
        document.querySelector("body").classList.add("lock");
    }
}

for (let elem of document.querySelectorAll(".cards-container li")) {
    elem.onclick = (e) => {
        let namepets = e.target.closest(".cards-container li").children[1].innerHTML;
        let index = pet.findIndex(item => item.name === namepets);
        img.src = pet[index].img;
        names.innerHTML = namepets;
        type.innerHTML = pet[index].type;
        breed.innerHTML = pet[index].breed;
        description.innerHTML = pet[index].description;
        age.innerHTML = pet[index].age;
        inoculations.innerHTML = pet[index].inoculations.join(",");
        diseases.innerHTML = pet[index].diseases.join(",");
        parasites.innerHTML = pet[index].parasites.join(",");
        document.querySelector(".popup-friends").classList.add("show");
        document.querySelector("body").classList.add("lock");
    }
}

document.querySelector(".popup-friends").onclick = (e) => {
    if (e.target.closest('.mod-close')) {
        document.querySelector(".popup-friends").classList.remove("show");
        document.querySelector("body").classList.remove("lock");
        document.querySelector('.mod-close').style.background = "";
    }
    if (e.target.closest('.popup-friends-body')) return;
    document.querySelector(".popup-friends").classList.remove("show");
    document.querySelector("body").classList.remove("lock");
    document.querySelector('.mod-close').style.background = "";
}

/*-----------------------------------------------------------------------------------*/
document.querySelector(".popup-friends").onmouseover = (e) => {
    if (e.target.closest('.mod-close') || e.target.closest('.popup-friends-body')) {
        document.querySelector('.mod-close').style.background = "";
    } else {
        document.querySelector('.mod-close').style.background = "#fddcc4";
    }
}


/*---------------------------------------------------------------------*/


let pets = [
    {
        "name": "Katrine",
        "img": "../../assets/pets-katrine.png",
        "type": "Cat",
        "breed": "British Shorthair",
        "description": "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
        "age": "6 months",
        "inoculations": ["panleukopenia"],
        "diseases": ["none"],
        "parasites": ["none"]
    },
    {
        "name": "Jennifer",
        "img": "../../assets/pets-jennifer.png",
        "type": "Dog",
        "breed": "Labrador",
        "description": "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
        "age": "2 months",
        "inoculations": ["none"],
        "diseases": ["none"],
        "parasites": ["none"]
    },
    {
        "name": "Woody",
        "img": "../../assets/pets-woody.png",
        "type": "Dog",
        "breed": "Golden Retriever",
        "description": "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
        "age": "3 years 6 months",
        "inoculations": ["adenovirus", "distemper"],
        "diseases": ["right back leg mobility reduced"],
        "parasites": ["none"]
    },
    {
        "name": "Sophia",
        "img": "../../assets/pets-sophia.png",
        "type": "Dog",
        "breed": "Shih tzu",
        "description": "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
        "age": "1 month",
        "inoculations": ["parvovirus"],
        "diseases": ["none"],
        "parasites": ["none"]
    },
    {
        "name": "Timmy",
        "img": "../../assets/pets-timmy.png",
        "type": "Cat",
        "breed": "British Shorthair",
        "description": "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
        "age": "2 years 3 months",
        "inoculations": ["calicivirus", "viral rhinotracheitis"],
        "diseases": ["kidney stones"],
        "parasites": ["none"]
    },
    {
        "name": "Charly",
        "img": "../../assets/pets-charly.png",
        "type": "Dog",
        "breed": "Jack Russell Terrier",
        "description": "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
        "age": "8 years",
        "inoculations": ["bordetella bronchiseptica", "leptospirosis"],
        "diseases": ["deafness", "blindness"],
        "parasites": ["lice", "fleas"]
    },
    {
        "name": "Scarlett",
        "img": "../../assets/pets-scarlet.png",
        "type": "Dog",
        "breed": "Jack Russell Terrier",
        "description": "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
        "age": "3 months",
        "inoculations": ["parainfluenza"],
        "diseases": ["none"],
        "parasites": ["none"]
    },
    {
        "name": "Freddie",
        "img": "../../assets/pets-freddie.png",
        "type": "Cat",
        "breed": "British Shorthair",
        "description": "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
        "age": "2 months",
        "inoculations": ["rabies"],
        "diseases": ["none"],
        "parasites": ["none"]
    },
]

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function getRandomArray(size) {
    const arr = Array(size).fill().map((el, i) => el = i);
    shuffle(arr);
    return arr;

}

function get48() {
    let a6 = [], a8 = [], a48 = [];

    while (a48.length !== 48) {
        let index = 0;

        if (a6.length === 6) a48.push(...a6.splice(0));
        if (a8.length === 0) a8 = getRandomArray(8);
        while (a6.includes(a8[index])) index++;

        a6.push(...a8.splice(index, 1));
    }

    return a48;
}
let goodarr = get48()

if (document.querySelector(".logo").classList.contains("logo-pets")) {
    let a = 0;
    let arrpag = [];


    for (let i = 0; i < 48; i++) {
        arrpag[i] = pets[goodarr[i] % 8];
    }


    if (document.querySelector("body").offsetWidth >= 1280) {

        for (let elem of document.querySelectorAll(".pagination li")) {
            elem.children[0].src = arrpag[a].img;
            elem.children[1].innerHTML = arrpag[a].name;
            a++;
        }

        a = 8;
        // for (let i = 0; i < document.querySelectorAll(".pagination li p").length; i++) {
        //     arrpag[i] = document.querySelectorAll(".pagination li p")[i].innerHTML;
        // }

        // for (let i = 1; i < 6; i++) {
        //     let checked = [];
        //     for (let j = 0; j < 8; j++) {
        //         let randoms = Math.floor(Math.random() * 8);

        //         while (checked.find(item => item === pets[randoms].name)) {
        //             // || arrpag[i*8-8+j] === pet[randoms].name
        //             randoms = Math.floor(Math.random() * 8);
        //         }
        //         checked.push(pets[randoms].name);
        //         arrpag.push(pets[randoms].name);
        //     }
        // }
    }



    document.querySelector(".next-one").onclick = (e) => {

        if (a === 48) return;
        document.querySelector(".pagination").classList.add("opacity0");
        setTimeout(() => {
            for (let elem of document.querySelectorAll(".pagination li")) {
                elem.children[0].src = arrpag[a].img;
                elem.children[1].innerHTML = arrpag[a].name;
                a++;
            }

            document.querySelector(".page-num").innerHTML = +(document.querySelector(".page-num").innerHTML) + 1;
            for (let el of document.querySelectorAll(".dis")) {
                if (!el.classList.contains("nextlink")) {
                    el.removeAttribute("disabled");
                    el.classList.add("nextlink");
                }
            }
            if (a === 48) {
                for (let elems of document.querySelectorAll(".next-one , .next-last")) {
                    elems.setAttribute("disabled", true);
                    elems.classList.remove("nextlink");
                }
            }
            document.querySelector(".pagination").classList.remove("opacity0");
        }, 500);
    }
    document.querySelector(".next-last").onclick = (e) => {
        if (a >= 48) return;
        a = 40;
        document.querySelector(".pagination").classList.add("opacity0");
        setTimeout(() => {
            for (let elem of document.querySelectorAll(".pagination li")) {
                elem.children[0].src = arrpag[a].img;
                elem.children[1].innerHTML = arrpag[a].name;
                a++;

            }

            document.querySelector(".page-num").innerHTML = 6;
            for (let el of document.querySelectorAll(".dis")) {
                if (!el.classList.contains("nextlink")) {
                    el.removeAttribute("disabled");
                    el.classList.add("nextlink");
                }
            }
            if (a === 48) {
                for (let elems of document.querySelectorAll(".next-one , .next-last")) {
                    elems.setAttribute("disabled", true);
                    elems.classList.remove("nextlink");
                }
            }
            document.querySelector(".pagination").classList.remove("opacity0");
        }, 500);
    }
    document.querySelector(".back-one").onclick = (e) => {
        if (a <= 8) return;
        a = a - 16;
        document.querySelector(".pagination").classList.add("opacity0");
        setTimeout(() => {
            for (let elem of document.querySelectorAll(".pagination li")) {
                elem.children[0].src = arrpag[a].img;
                elem.children[1].innerHTML = arrpag[a].name;
                a++;

            }

            document.querySelector(".page-num").innerHTML = +(document.querySelector(".page-num").innerHTML) - 1;
            for (let el of document.querySelectorAll(".dis")) {
                if (a <= 8) {
                    el.setAttribute("disabled", true);
                    el.classList.remove("nextlink");
                }
            }
            for (let el of document.querySelectorAll(".next-last , .next-one")) {
                if (!el.classList.contains("nextlink")) {
                    el.removeAttribute("disabled");
                    el.classList.add("nextlink");
                }
            }
            document.querySelector(".pagination").classList.remove("opacity0");
        }, 500);
    }
    document.querySelector(".back-all").onclick = (e) => {
        if (a <= 8) return;
        a = 0;
        document.querySelector(".pagination").classList.add("opacity0");
        setTimeout(() => {
            for (let elem of document.querySelectorAll(".pagination li")) {
                elem.children[0].src = arrpag[a].img;
                elem.children[1].innerHTML = arrpag[a].name;
                a++;
            }
            document.querySelector(".page-num").innerHTML = 1;
            for (let el of document.querySelectorAll(".dis")) {
                if (a <= 8) {
                    el.setAttribute("disabled", true);
                    el.classList.remove("nextlink");
                }
            }
            for (let el of document.querySelectorAll(".next-last , .next-one")) {
                if (!el.classList.contains("nextlink")) {
                    el.removeAttribute("disabled");
                    el.classList.add("nextlink");
                }
            }
            document.querySelector(".pagination").classList.remove("opacity0");
        }, 500);
    }



    if (document.querySelector("body").offsetWidth >= 768 && document.querySelector("body").offsetWidth < 1280) {

        for (let elem of document.querySelectorAll(".lisix")) {
            elem.children[0].src = arrpag[a].img;
            elem.children[1].innerHTML = arrpag[a].name;
            a++;
        }

        a = 6;

        // for (let i = 0; i < 6; i++) {
        //     arrpag[i] = document.querySelectorAll(".six")[i].innerHTML;
        // }

        // for (let i = 1; i < 8; i++) {
        //     let checked = [];
        //     for (let j = 0; j < 6; j++) {
        //         let randoms = Math.floor(Math.random() * 6);

        //         while (checked.find(item => item === pets[randoms].name)) {
        //             // || arrpag[i*8-8+j] === pet[randoms].name
        //             randoms = Math.floor(Math.random() * 6);
        //         }
        //         checked.push(pets[randoms].name);
        //         arrpag.push(pets[randoms].name);
        //     }
        // }

        document.querySelector(".next-one").onclick = (e) => {

            if (a === 48) return;
            document.querySelector(".pagination").classList.add("opacity0");
            setTimeout(() => {
                for (let elem of document.querySelectorAll(".lisix")) {
                    elem.children[0].src = arrpag[a].img;
                    elem.children[1].innerHTML = arrpag[a].name;
                    a++;
                }

                document.querySelector(".page-num").innerHTML = +(document.querySelector(".page-num").innerHTML) + 1;
                for (let el of document.querySelectorAll(".dis")) {
                    if (!el.classList.contains("nextlink")) {
                        el.removeAttribute("disabled");
                        el.classList.add("nextlink");
                    }
                }
                if (a === 48) {
                    for (let elems of document.querySelectorAll(".next-one , .next-last")) {
                        elems.setAttribute("disabled", true);
                        elems.classList.remove("nextlink");
                    }
                }
                document.querySelector(".pagination").classList.remove("opacity0");
            }, 500);
        }
        document.querySelector(".next-last").onclick = (e) => {
            if (a >= 48) return;
            a = 42;
            document.querySelector(".pagination").classList.add("opacity0");
            setTimeout(() => {
                for (let elem of document.querySelectorAll(".lisix")) {
                    elem.children[0].src = arrpag[a].img;
                    elem.children[1].innerHTML = arrpag[a].name;
                    a++;

                }

                document.querySelector(".page-num").innerHTML = 8;
                for (let el of document.querySelectorAll(".dis")) {
                    if (!el.classList.contains("nextlink")) {
                        el.removeAttribute("disabled");
                        el.classList.add("nextlink");
                    }
                }
                if (a === 48) {
                    for (let elems of document.querySelectorAll(".next-one , .next-last")) {
                        elems.setAttribute("disabled", true);
                        elems.classList.remove("nextlink");
                    }
                }
                document.querySelector(".pagination").classList.remove("opacity0");
            }, 500);
        }
        document.querySelector(".back-one").onclick = (e) => {
            if (a <= 6) return;
            a = a - 12;
            document.querySelector(".pagination").classList.add("opacity0");
            setTimeout(() => {
                for (let elem of document.querySelectorAll(".lisix")) {
                    elem.children[0].src = arrpag[a].img;
                    elem.children[1].innerHTML = arrpag[a].name;
                    a++;

                }

                document.querySelector(".page-num").innerHTML = +(document.querySelector(".page-num").innerHTML) - 1;
                for (let el of document.querySelectorAll(".dis")) {
                    if (a <= 6) {
                        el.setAttribute("disabled", true);
                        el.classList.remove("nextlink");
                    }
                }
                for (let el of document.querySelectorAll(".next-last , .next-one")) {
                    if (!el.classList.contains("nextlink")) {
                        el.removeAttribute("disabled");
                        el.classList.add("nextlink");
                    }
                }
                document.querySelector(".pagination").classList.remove("opacity0");
            }, 500);
        }
        document.querySelector(".back-all").onclick = (e) => {
            if (a <= 6) return;
            a = 0;
            document.querySelector(".pagination").classList.add("opacity0");
            setTimeout(() => {
                for (let elem of document.querySelectorAll(".lisix")) {
                    elem.children[0].src = arrpag[a].img;
                    elem.children[1].innerHTML = arrpag[a].name;
                    a++;
                }
                document.querySelector(".page-num").innerHTML = 1;
                for (let el of document.querySelectorAll(".dis")) {
                    if (a <= 6) {
                        el.setAttribute("disabled", true);
                        el.classList.remove("nextlink");
                    }
                }
                for (let el of document.querySelectorAll(".next-last , .next-one")) {
                    if (!el.classList.contains("nextlink")) {
                        el.removeAttribute("disabled");
                        el.classList.add("nextlink");
                    }
                }
                document.querySelector(".pagination").classList.remove("opacity0");
            }, 500);
        }
    }

    if (document.querySelector("body").offsetWidth < 768) {

        for (let elem of document.querySelectorAll(".lithree")) {
            elem.children[0].src = arrpag[a].img;
            elem.children[1].innerHTML = arrpag[a].name;
            a++;
        }
        a = 3;
        // for (let i = 0; i < 3; i++) {
        //     arrpag[i] = document.querySelectorAll(".three")[i].innerHTML;
        // }

        // for (let i = 1; i < 16; i++) {
        //     let checked = [];
        //     for (let j = 0; j < 3; j++) {
        //         let randoms = Math.floor(Math.random() * 3);

        //         while (checked.find(item => item === pets[randoms].name)) {
        //             // || arrpag[i*8-8+j] === pet[randoms].name
        //             randoms = Math.floor(Math.random() * 3);
        //         }
        //         checked.push(pets[randoms].name);
        //         arrpag.push(pets[randoms].name);
        //     }
        // }

        document.querySelector(".next-one").onclick = (e) => {

            if (a === 48) return;
            document.querySelector(".pagination").classList.add("opacity0");
            setTimeout(() => {
                for (let elem of document.querySelectorAll(".lithree")) {
                    elem.children[0].src = arrpag[a].img;
                    elem.children[1].innerHTML = arrpag[a].name;
                    a++;
                }

                document.querySelector(".page-num").innerHTML = +(document.querySelector(".page-num").innerHTML) + 1;
                for (let el of document.querySelectorAll(".dis")) {
                    if (!el.classList.contains("nextlink")) {
                        el.removeAttribute("disabled");
                        el.classList.add("nextlink");
                    }
                }
                if (a === 48) {
                    for (let elems of document.querySelectorAll(".next-one , .next-last")) {
                        elems.setAttribute("disabled", true);
                        elems.classList.remove("nextlink");
                    }
                }
                document.querySelector(".pagination").classList.remove("opacity0");
            }, 500);
        }
        document.querySelector(".next-last").onclick = (e) => {
            if (a >= 48) return;
            a = 45;
            document.querySelector(".pagination").classList.add("opacity0");
            setTimeout(() => {
                for (let elem of document.querySelectorAll(".lithree")) {
                    elem.children[0].src = arrpag[a].img;
                    elem.children[1].innerHTML = arrpag[a].name;
                    a++;

                }

                document.querySelector(".page-num").innerHTML = 16;
                for (let el of document.querySelectorAll(".dis")) {
                    if (!el.classList.contains("nextlink")) {
                        el.removeAttribute("disabled");
                        el.classList.add("nextlink");
                    }
                }
                if (a === 48) {
                    for (let elems of document.querySelectorAll(".next-one , .next-last")) {
                        elems.setAttribute("disabled", true);
                        elems.classList.remove("nextlink");
                    }
                }
                document.querySelector(".pagination").classList.remove("opacity0");
            }, 500);
        }
        document.querySelector(".back-one").onclick = (e) => {
            if (a <= 3) return;
            a = a - 6;
            document.querySelector(".pagination").classList.add("opacity0");
            setTimeout(() => {
                for (let elem of document.querySelectorAll(".lithree")) {
                    elem.children[0].src = arrpag[a].img;
                    elem.children[1].innerHTML = arrpag[a].name;
                    a++;

                }

                document.querySelector(".page-num").innerHTML = +(document.querySelector(".page-num").innerHTML) - 1;
                for (let el of document.querySelectorAll(".dis")) {
                    if (a <= 3) {
                        el.setAttribute("disabled", true);
                        el.classList.remove("nextlink");
                    }
                }
                for (let el of document.querySelectorAll(".next-last , .next-one")) {
                    if (!el.classList.contains("nextlink")) {
                        el.removeAttribute("disabled");
                        el.classList.add("nextlink");
                    }
                }
                document.querySelector(".pagination").classList.remove("opacity0");
            }, 500);
        }
        document.querySelector(".back-all").onclick = (e) => {
            if (a <= 3) return;
            a = 0;
            document.querySelector(".pagination").classList.add("opacity0");
            setTimeout(() => {
                for (let elem of document.querySelectorAll(".lithree")) {
                    elem.children[0].src = arrpag[a].img;
                    elem.children[1].innerHTML = arrpag[a].name;
                    a++;
                }
                document.querySelector(".page-num").innerHTML = 1;
                for (let el of document.querySelectorAll(".dis")) {
                    if (a <= 3) {
                        el.setAttribute("disabled", true);
                        el.classList.remove("nextlink");
                    }
                }
                for (let el of document.querySelectorAll(".next-last , .next-one")) {
                    if (!el.classList.contains("nextlink")) {
                        el.removeAttribute("disabled");
                        el.classList.add("nextlink");
                    }
                }
                document.querySelector(".pagination").classList.remove("opacity0");
            }, 500);
        }
    }

}
