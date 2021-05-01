/*
 * SmartCursor script by Maxim Dobrovolsky
 * https://github.com/Fenn3c
 * Choose the theme WHITE or BLACK
 * Choose the LAZINESS
 */

///////////////////////////////////////////
const THEME = 'BLACK';
const LAZINESS = 200;
///////////////////////////////////////////


const cursor = document.createElement('div');
const elements = document.querySelectorAll('*');
cursor.id = 'SmartCursor';
document.body.append(cursor);
cursorDefaults();
let IS_LOCKED = false;


function cursorDefaults() {
    let style = cursor.style;
    style.height = '19pt';
    style.width = '19pt';
    style.transform = 'translate(-50%,-50%)';
    style.borderRadius = '50%';
    style.position = 'fixed';
    style.top = '0';
    style.left = '0';
    style.transition = `all ${LAZINESS}ms ease-out`;
    style.zIndex = '2';
    style.pointerEvents = 'none';

    switch (THEME) {
        case 'BLACK':
            style.background = 'rgba(0,0,0,0.2)';
            style.border = '1px solid rgba(20,20,20,0.5)';
            break;
        case 'WHITE':
            style.background = 'rgba(255,255,255,0.2)';
            style.border = '1px solid rgba(230,230,230,0.5)';
            break;
        default:
            style.background = 'rgba(0,0,0,0.2)';
            style.border = '1px solid rgba(20,20,20,0.5)';
            break;
    }

}

function cursorText(targetS) {
    let style = cursor.style;
    style.height = targetS;
    style.width = '1px';
    cursor.style.borderRadius = '2pt';
}

function cursorBlock(targetX, targetY, targetH, targetW) {
    let style = cursor.style;
    style.left = `${targetX}px`;
    style.top = `${targetY}px`;
    style.width = `${targetW + 5}px`;
    style.height = `${targetH + 5}px`;
    style.borderRadius = '2pt';
    style.background = 'rgba(0,0,0,0)';

    switch (THEME) {
        case 'BLACK':
            style.border = '1px solid rgba(20,20,20,0.5)';
            break;
        case 'WHITE':
            style.border = '1px solid rgba(230,230,230,0.5)';
            break;
        default:
            style.border = '1px solid rgba(20,20,20,0.5)';
            break;


    }

}

function lockOnElem(elem) {
    let targetW = elem.getBoundingClientRect().width;
    let targetH = elem.getBoundingClientRect().height;
    let targetX = targetW / 2 + elem.getBoundingClientRect().left;
    let targetY = targetH / 2 + elem.getBoundingClientRect().top;

    if (elem.classList.contains('SC-block')) {
        IS_LOCKED = true;
        cursorBlock(targetX, targetY, targetH, targetW);
    } else if (elem.classList.contains('SC-text')) {
        let targetS = window.getComputedStyle(elem).fontSize;
        cursorText(targetS);
    }
}

for (let i = 0; i < elements.length; i++) {
    elements[i].style.cursor = 'none';
    elements[i].onmouseenter = (event => {
        if (elements[i].tagName !== 'HTML' && elements[i].tagName !== 'BODY') {
            lockOnElem(elements[i]);
        }
    })

    elements[i].onmouseout = (event => {
        if (elements[i].tagName !== 'HTML' && elements[i].tagName !== 'BODY') {
            IS_LOCKED = false;
            cursorDefaults();
        }
    })

    document.onmousemove = (event => {
        let cursorX = event.x;
        let cursorY = event.y;

        if (!IS_LOCKED) {
            cursor.style.top = `${cursorY}px`;
            cursor.style.left = `${cursorX}px`;
        }
    });

}
