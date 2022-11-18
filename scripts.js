//плавный скролл до объекта (target)

const smoothScroll = function (target, duration = 500) {
    let targetPosition = target.getBoundingClientRect().top;
    let startPosition = window.pageYOffset;
    let startTime = null;

    const ease = function (t, b, c, d) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
    };

    const animation = function (currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, targetPosition, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    };
    requestAnimationFrame(animation);
};

//повесить плавный скролл

const setSmoothScrollEvents = (from, to) => {
    const setOneEvent = (from, to) => {
        from.addEventListener("pointerdown", () => {
            smoothScroll(to);
        });
    };

    const setMultiplyEvents = (from, to) => {
        for (let i = 0; i < from.length; i++) {
            from[i].addEventListener("pointerdown", () => {
                smoothScroll(to);
            });
        }
    };

    from.length ? setMultiplyEvents(from, to) : setOneEvent(from, to);
};

//то же самое через srollIntoView

const setSmoothScrollEvents = (from, to) => {
    const setOneEvent = (from, to) => {
        from.addEventListener("pointerdown", () => {
            to.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "nearest",
            });
        });
    };

    const setMultiplyEvents = (from, to) => {
        for (let i = 0; i < from.length; i++) {
            from[i].addEventListener("pointerdown", () => {
                to.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                    inline: "nearest",
                });
            });
        }
    };

    from.length ? setMultiplyEvents(from, to) : setOneEvent(from, to);
};

//проверка, находится ли объект в окне (см также https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

function visabilityCheck(target) {
    let targetPosition = {
            top: window.pageYOffset + target.getBoundingClientRect().top,
            left: window.pageXOffset + target.getBoundingClientRect().left,
            right: window.pageXOffset + target.getBoundingClientRect().right,
            bottom: window.pageYOffset + target.getBoundingClientRect().bottom,
        },
        windowPosition = {
            top: window.pageYOffset,
            left: window.pageXOffset,
            right: window.pageXOffset + document.documentElement.clientWidth,
            bottom: window.pageYOffset + document.documentElement.clientHeight,
        };
    if (
        targetPosition.bottom > windowPosition.top &&
        targetPosition.top < windowPosition.bottom &&
        targetPosition.right > windowPosition.left &&
        targetPosition.left < windowPosition.right
    ) {
        // Если элемент полностью видно, то запускаем следующий код
        return true;
    } else {
        // Если элемент не видно, то запускаем этот код
        return false;
    }
}

//функция, проверяющая, находится ли объект во вьюпорте относительно центра экрана (верхняя граница выше середины, нижняя ниже)

function visabilityCheck(target) {
    const screenCenter = document.documentElement.clientHeight / 2;
    return target.getBoundingClientRect().top < screenCenter && target.getBoundingClientRect().bottom > screenCenter;
}

//еще одна функция, проверяющая, находится ли объект во вьюпорте (в данном случае, пересек ли он середину экрана верхней границей при прокрутке)

function visabilityCheck(target) {
    const targetTop = window.pageYOffset + target.getBoundingClientRect().top;
    const targetBottom = window.pageYOffset + target.getBoundingClientRect().bottom;
    const windowBottom = window.pageYOffset + document.documentElement.clientHeight;
    const screenCenter = document.documentElement.clientHeight / 2;
    //screenCenter это координаты, относительно которых проводится проверка. уменьшая коэф.деления, двигаем вверх, увеличивая, вниз относительно вьюпорта
    if (windowBottom - targetTop > screenCenter && windowBottom < targetBottom + screenCenter) {
        return true;
    }
    return false;
}

//same через intersectionObserver

const observer = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                //наполовину во вьюпорте
            } else {
                //нет во вьюпорте
            }
        });
    },
    { threshold: [0.5] }
);

observer.observe(el);

//отсортировать элементы по ширине

const list = document.querySelector(".list");
const items = document.querySelectorAll(".items");
const itemsArr = Array.from(items);
itemsArr.sort((x, y) => x.offsetWidth - y.offsetWidth);
list.replaceChildren(...itemsArr);

//debounce

const debounce = (method, delay) => {
    clearTimeout(method._tId);
    method._tId = setTimeout(function () {
        method();
    }, delay);
};

//пример

window.addEventListener("scroll", () => debounce(() => myFunction(), 500));

//throttle

function throttle(fn, wait) {
    let time = Date.now();
    return function () {
        if (time + wait - Date.now() < 0) {
            fn();
            time = Date.now();
        }
    };
}

//пример
window.addEventListener("scroll", throttle(myFunction, 500));

//функции, проверяющие соответствие текущей даты параметрам

function checkCurrentDate(start, end) {
    let answer = false;
    const now = new Date();
    const parsedNow = Date.parse(now);
    const parsedStart = Date.parse(start);
    const parsedEnd = Date.parse(end);
    if (parsedStart < parsedNow && parsedEnd > now) {
        answer = true;
    }
    return answer; //проверка, не настала ли какая-то дата, для таймеров на ПРОМЕЖУТОК ВРЕМЕНИ
}

function checkDateFrom(start) {
    let answer = false;
    const now = new Date();
    const parsedNow = Date.parse(now);
    const parsedStart = Date.parse(start);
    if (parsedStart < parsedNow) {
        answer = true;
    }
    return answer; //проверка, не настала ли какая-то дата, для таймеров ПОСЛЕ
}

function checkDateTo(end) {
    let answer = false;
    const now = new Date();
    const parsedNow = Date.parse(now);
    const parsedEnd = Date.parse(end);
    if (parsedNow < parsedEnd) {
        answer = true;
    }
    return answer; //проверка, не настала ли какая-то дата, для таймеров ДО
}

//определение ОС по юзерагенту

const userDeviceArray = [
    { device: "Android", platform: /Android/ },
    { device: "iOS", platform: /iPhone/ },
    { device: "iOS", platform: /iPad/ },
    { device: "Symbian", platform: /Symbian/ },
    { device: "Windows Phone", platform: /Windows Phone/ },
    { device: "Tablet OS", platform: /Tablet OS/ },
    { device: "Linux", platform: /Linux/ },
    { device: "Windows", platform: /Windows NT/ },
    { device: "MacOS", platform: /Macintosh/ },
];

const platform = navigator.userAgent;

function getPlatform() {
    for (let i in userDeviceArray) {
        if (userDeviceArray[i].platform.test(platform)) {
            return userDeviceArray[i].device;
        }
    }
    return "Неизвестная платформа!" + platform;
}
