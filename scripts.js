//плавный скролл до объекта (target)

const smoothScroll = function (target, duration) {
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

//проверка, находится ли объект в окне

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
    return;
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

