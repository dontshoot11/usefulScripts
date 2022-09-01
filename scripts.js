//плавный скролл до объекта (target)

const smoothScroll = function (target, duration=500) {
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
        from.addEventListener('pointerdown', () => {
            smoothScroll(to);
        });
    };

    const setMultiplyEvents = (from, to) => {
        for (let i = 0; i < from.length; i++) {
            from[i].addEventListener('pointerdown', () => {
                smoothScroll(to);
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

//debounce

function debounce(f, ms) {
    let isCooldown = false;

    return function () {
        if (isCooldown) return;

        f.apply(this, arguments);

        isCooldown = true;

        setTimeout(() => (isCooldown = false), ms);
    };
}

//пример 

   window.addEventListener(
        'scroll',
        debounce(() => {
            console.log('dsds');
        }, 500)
    );

//еще одна функция, проверяющая, находится ли объект во вьюпорте (в данном случае, зашел ли он на нижнюю половину экрана)

function sectionCheck(target) {
    const targetTop = window.pageYOffset + target.getBoundingClientRect().top;
    const targetBottom =
      window.pageYOffset + target.getBoundingClientRect().bottom;
    const windowBottom =
      window.pageYOffset + document.documentElement.clientHeight;
    const screenCenter = document.documentElement.clientHeight / 2;
    if (
      windowBottom - targetTop > screenCenter &&
      windowBottom < targetBottom + screenCenter
    ) {
      return true;
    }
    return false;
}

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
  { device: 'Android', platform: /Android/ },
  { device: 'iOS', platform: /iPhone/ },
  { device: 'iOS', platform: /iPad/ },
  { device: 'Symbian', platform: /Symbian/ },
  { device: 'Windows Phone', platform: /Windows Phone/ },
  { device: 'Tablet OS', platform: /Tablet OS/ },
  { device: 'Linux', platform: /Linux/ },
  { device: 'Windows', platform: /Windows NT/ },
  { device: 'MacOS', platform: /Macintosh/ },
 ];

const platform = navigator.userAgent;

function getPlatform() {
  for (let i in userDeviceArray) {
    if (userDeviceArray[i].platform.test(platform)) {
      return userDeviceArray[i].device;
        }
      }
  return 'Неизвестная платформа!' + platform;
  }
