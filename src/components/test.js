let count = 10;
const timer = setInterval(() => {
    console.log(count);
    count--;
    if (count === 0) {
        console.log('Liftoff!');
        clearInterval(timer);
    }
}, 1000);