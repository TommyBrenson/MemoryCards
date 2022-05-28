
const getRandomNumber = (min: number, max: number): number => (Math.floor(Math.random()*(max - min) + min));

const getRandomSet = (min: number, max: number, quantity: number): number[] => {
    let array: number[] = [];
    try {
        if ((max - min + 1) < quantity) throw new Error("Set cannot be created, if alphabet less than quantity of items!")
        while(array.length < quantity) {
            let num = getRandomNumber(min, max);
            if (!array.includes(num)) {
                array.push(num);
            }
        }
    }
    catch(e) {
        console.log(e.getMessage());
    }

    return array;
}

const shuffle = <T>(array: T[]): T[] => {
    return array.sort((a, b) => (-Math.random() + 0.51));
}

export { shuffle, getRandomNumber, getRandomSet };