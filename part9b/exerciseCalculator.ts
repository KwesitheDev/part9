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

if (require.main === module) {
    const result = calculateExercise([3, 0, 2, 4.5, 0, 3, 1], 2)
    console.log(result)
}