const lightboxEnabled = document.getElementsByClassName('lightbox-enabled');

const lightboxContainer = document.querySelector('.lightbox-container');

const lightboxArray = Array.from(lightboxEnabled);

const lightboxImage = document.querySelector('.lightbox-image');

const lightboxBtns = document.querySelectorAll('.lightbox-btn');
const lightboxBtnRight = document.querySelector('#right');
const lightboxBtnleft = document.querySelector('#left');

const toTopBtn = document.getElementById('to-top');

let activeImage;

let lastImage = lightboxArray.length - 1;

// console.log(lastImage);

// console.log(lightboxArray);

// const allImage = lightboxArray.e.dataset.imgsrc;
// console.log(lightboxArray);

// functions

const showlightBox = () => lightboxContainer.classList.add('active');
const hideLightBox = () => lightboxContainer.classList.remove('active');

const setActiveImage = image => {
    lightboxImage.src = image.dataset.imgsrc;
    activeImage = lightboxArray.indexOf(image);
    removeBtnInactiveClass();
    switch (activeImage) {
        case 0:
            lightboxBtnleft.classList.add('inactive');
            break;
        case lastImage:
            lightboxBtnRight.classList.add('inactive');
            break;
        default:
            removeBtnInactiveClass();
    }
    // console.log(activeImage);
};
const removeBtnInactiveClass = () => {
    lightboxBtns.forEach(btn => {
        btn.classList.remove('inactive');
    });
};

const transitionSlideHandler = moveItem => {
    moveItem.includes('left')
        ? transitionSlidesLeft()
        : transitionSlidesRight();
};

const transitionSlidesLeft = () => {
    // lightboxBtnleft.focus();
    activeImage === 0
        ? setActiveImage(lightboxArray[lastImage])
        : setActiveImage(lightboxArray[activeImage - 1]);
    // console.log(activeImage);
    // console.log('left');
};

const transitionSlidesRight = () => {
    activeImage === lastImage
        ? setActiveImage(lightboxArray[0])
        : setActiveImage(lightboxArray[activeImage + 1]);
    // console.log('right');
};

// eventlistner

lightboxArray.forEach(image => {
    image.addEventListener('click', e => {
        showlightBox();
        setActiveImage(image);

        // console.log(e.target.dataset.imgsrc);
    });
});

lightboxContainer.addEventListener('click', () => {
    hideLightBox();
});

lightboxBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        e.stopPropagation();
        transitionSlideHandler(e.currentTarget.id);
        // console.log(e.currentTarget.id);
    });
});

window.addEventListener('keydown', e => {
    // console.log(e.key);
    if (!lightboxContainer.classList.contains('active')) return;

    if (
        (activeImage === 0 && e.key.includes('Left')) ||
        (activeImage === lastImage && e.key.includes('Right'))
    )
        return;
    if (e.key.includes('Left') || e.key.includes('Right')) {
        e.preventDefault();
        transitionSlideHandler(e.key.toLowerCase());
    }
    if (e.key.includes('Escape')) {
        hideLightBox();
    }
});


toTopBtn.addEventListener('click', e =>{
    window.scroll(0,0);
})