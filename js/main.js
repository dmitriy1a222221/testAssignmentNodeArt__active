class Slider {
    constructor(wrapSlide1 , wrapSlide2, slide1, slide2, btnPrev, btnNext, dishes) {
        this.btnPrev = (btnPrev) ? document.querySelector(`${btnPrev}`) : undefined;
        this.btnNext = (btnNext) ? document.querySelector(`${btnNext}`) : undefined;
        this.wrapSlide1 = (wrapSlide1) ? document.querySelector(`${wrapSlide1}`) : undefined;
        this.wrapSlide2 = (wrapSlide2) ? document.querySelector(`${wrapSlide2}`) : undefined;
        this.slide1 = (slide1) ? document.querySelectorAll(`${slide1}`) : undefined;
        this.slide2 = (slide2) ? document.querySelectorAll(`${slide2}`) : undefined;
        this.dishes = (dishes) ? document.querySelectorAll(`${dishes}`) : undefined;
        this.wrapSlide1Width = (this.slide1) ? this.slide1.length * 100 : undefined;
        this.wrapSlide2Width = (this.slide2) ? this.slide2.length * 100 : undefined;
        this.slide1Width = (this.slide1) ? 100 / this.slide1.length : undefined;
        this.slide2Width = (this.slide2) ? 100 / this.slide2.length : undefined;
        this.arrPush = [];

        (this.wrapSlide1) ? this.wrapSlide1.style.width = `${this.wrapSlide1Width}%` : undefined;
        (this.wrapSlide2) ? this.wrapSlide2.style.width = `${this.wrapSlide2Width}%` : undefined;
        (this.slide1) ? this.slide1.forEach(item => {
            item.style.width = `${this.slide1Width}%`;
        }) : undefined;
        (this.slide2) ? this.slide2.forEach(item => {
            item.style.width = `${this.slide2Width}%`;
        }) : undefined;

        for(let i = 0; i <= 100; i += this.slide1Width) {
            this.arrPush.push(i)
        }
    }

    logicSlider() {
        let arrPosition = [...this.arrPush],
            counter = 0,
            delNull = arrPosition.pop();

        let set = (pos) => {
            (this.wrapSlide1) ? this.wrapSlide1.style.transform = `translateX(-${pos}%)` : undefined;
            (this.wrapSlide2) ? this.wrapSlide2.style.transform = `translateX(-${pos}%)` : undefined;
        };
        let init = () => {
            set(arrPosition[counter]);
        };
        let prev = () => {
            counter--;
            if(counter < 0 ) counter = arrPosition.length-1;
            set(arrPosition[counter]);
            // this.dishes.forEach(item => {
            //     item.classList.remove('active')
            // });
            // this.dishes[counter].classList.add('active')
        };
        let next = () => {
            counter++;
            if(counter === arrPosition.length) counter = 0;
            set(arrPosition[counter]);
            // this.dishes.forEach(item => {
            //     item.classList.remove('active')
            // });
            // this.dishes[counter].classList.add('active')
        };
        let dishesNav = () => {
            for(let i = 0; i < this.dishes.length; i++) {
                this.dishes[i].addEventListener('click', (e) => {
                    counter = i;
                    set(arrPosition[counter]);
                    this.dishes.forEach(el => {
                        el.classList.remove('active');
                    });
                    this.dishes[i].classList.add('active');
                });
            }
        };
        if(this.dishes){
            dishesNav();
        }
        if (this.btnPrev || this.btnNext){
            this.btnPrev.addEventListener('click', prev);
            this.btnNext.addEventListener('click', next);
        }

        return init();
    }

}

class ValidateForm {
    constructor(form, formElement) {
        this.form = (form) ? document.querySelector(`${form}`) : undefined;
        this.formElement = (formElement) ? this.form.querySelectorAll(`${formElement}`) : undefined;
        this.types = {
            'name': /^[_a-zA-Z0-9а-яА-ЯёЁ ]+$/,
            'phone': /.+/,
            'email': /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
            'text': /.+/
        };

    }
    validateLogic() {
        this.formElement.forEach(item => {
            item.addEventListener('focus', focus = () => {
                item.style.cssText = 'border: 1px solid #8CACA4';
                item.placeholder = '';
                let regEx;
                function valid() {
                    if(!(regEx.test(item.value))){
                        item.style.cssText = 'border: 1px solid #cf5402';
                    } else {
                        item.style.cssText = 'border: 1px solid #02cfb4';
                    }
                }
                switch (item.dataset.id){
                    case 'name':
                        regEx = this.types.name;
                        item.addEventListener('input', valid);
                        break;
                    case 'phone':
                        regEx = this.types.phone;
                        item.addEventListener('input', valid);
                        break;
                    case 'email':
                        regEx = this.types.email;
                        item.addEventListener('input', valid);
                        break;
                    case 'message':
                        regEx = this.types.text;
                        item.addEventListener('input', valid);
                        break;
                }

            });
            item.addEventListener('blur', function refocus() {
                //let spanFocus = item.nextSibling.nextSibling;
                if(item.value !== ''){
                    item.style.cssText = 'border: 1px solid #2EC7A2';
                } else {
                    //spanFocus.classList.remove('span_focus');
                    item.style.cssText = 'border: 1px solid #CD5312; box-shadow: inset 0px 0px 10px #CD5312;';
                    item.placeholder = 'Поле обязательное для заполнения'
                }
            })
        });
    }
}

let feedbackFun = () => {
    let el = document.querySelector('.feedback');
    let feedbackBlock = document.querySelector('.feedback-modal-wrap');
    let feedbackModal = document.querySelector('.feedback-modal');
    let exit = document.querySelector('.exit');
    let substrate = document.querySelector('.substrate');
    el.addEventListener('click', () => {
        feedbackBlock.style.visibility = 'visible';
        feedbackModal.style.transform = 'translateY(0%)'
    });
    substrate.addEventListener('click', () => {
        feedbackModal.style.transform = 'translateY(-150%)';
        setTimeout(() => {
            feedbackBlock.style.visibility = 'hidden';
        }, 100)

    });
    exit.addEventListener('click', () => {
        feedbackModal.style.transform = 'translateY(-150%)';
        setTimeout(() => {
            feedbackBlock.style.visibility = 'hidden';
        }, 100)


    })
};

let asideCategory = () => {
    let el = document.querySelectorAll('.category');
    el.forEach((item) => {
        item.addEventListener('click', () => {
            item.parentNode.classList.toggle('active')
        })
    })
};


document.addEventListener('DOMContentLoaded', () => {
    let slider = new Slider('.slide-list', '', '.slide-item', '', '.btn-prev-block', '.btn-next-block');
    slider.logicSlider();

    let validform = new ValidateForm('.form', '[data-id]');
    validform.validateLogic();

    feedbackFun();
    asideCategory();
});