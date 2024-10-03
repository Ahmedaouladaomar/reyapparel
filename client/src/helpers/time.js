const SECONDS_IN_MINUTE = 60;
const SECONDS_IN_HOUR = 3600;
const SECONDS_IN_DAY = 86400;
const SECONDS_IN_WEEK = 604800;
const SECONDS_IN_MONTH = 2419200;

export const timeDiff = (a, b) => {
    // converting time difference from ms to s
    let res = Math.floor((new Date(a) - new Date(b))/1000);

    switch (true) {
        case res < SECONDS_IN_MINUTE:
            res = `${res} seconds ago`;
            break;
    
        case res >= SECONDS_IN_MINUTE && res < SECONDS_IN_HOUR:
            res = Math.floor(res/SECONDS_IN_MINUTE)
            res = `${res} minute${res > 1 ? 's' : ''} ago`;
            break;

        case res >= SECONDS_IN_HOUR && res < SECONDS_IN_DAY:
            res = Math.floor(res/SECONDS_IN_HOUR)
            res = `${res} hour${res > 1 ? 's' : ''} ago`;
            break;

        case res >= SECONDS_IN_DAY && res < SECONDS_IN_WEEK:
            res = Math.floor(res/SECONDS_IN_DAY)
            res = `${res} day${res > 1 ? 's' : ''} ago`;
            break;

        case res >= SECONDS_IN_WEEK && res < SECONDS_IN_MONTH:
            res = Math.floor(res/SECONDS_IN_WEEK)
            res = `${res} week${res > 1 ? 's' : ''} ago`;
            break;
        
        default:
            res = Math.floor(res/SECONDS_IN_MONTH)
            res = `${res} month${res > 1 ? 's' : ''} ago`;
            break;
    }

    return res;
}