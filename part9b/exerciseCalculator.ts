interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

export const calculateExercise = (dailyHours: number[], target: number): Result => {
    const periodLength = dailyHours.length
    const trainingDays = dailyHours.filter(hours => hours > 0).length
    const average = dailyHours.reduce((a, b) => a + b, 0) / periodLength
    const success = average >= target

    let rating = 1
    let ratingDescription = 'you have to work harder'

    if (average >= target) {
        rating = 3
        ratingDescription = 'well done'
    } else if (average > target * 0.75) {
        rating = 2
        ratingDescription = 'not too bad but could be better'
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    }
}

const parseArguments = (args: string[],):{
    dailyHours: number[],
    target: number
} => {
    
    if (args.length < 4) throw new Error('Not enough arguments')
    const numbers = args.slice(2).map(n => {
        if (isNaN(Number(n))) {
            throw new Error(`Provided value "${n}" is not a number`)
        }
        return Number(n)
    })
    const dailyHours = args.slice(2).map(Number)
    const target = Number(args[2])

    return {
        dailyHours,
        target
    }
}

if (require.main === module) {
    try {
        const { dailyHours, target } = parseArguments(process.argv)
        const result  = calculateExercise(dailyHours, target)
        console.log(result)
    } catch(e : unknown){
        if (e instanceof Error) {
            console.log('Error: ', e.message)
        }
    }
}