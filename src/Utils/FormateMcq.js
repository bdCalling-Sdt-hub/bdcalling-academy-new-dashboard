export const  formatQuestions =(answers, questionsAndAnswers)=> {
    const formattedData = [];

    answers.forEach(answerObj => {
        const questionId = Object.keys(answerObj)[0];
        const correctAnswerKey = answerObj[questionId];
        const questionKey = `Question-${questionId}`;
        const correctAnswer = questionsAndAnswers[correctAnswerKey];
        const question = questionsAndAnswers[questionKey];

        const options = [];
        for (const key in questionsAndAnswers) {
            if (key.startsWith(`answer`) && key.endsWith(questionId)) {
                options.push(questionsAndAnswers[key]);
            }
        }

        formattedData.push({
            question,
            options,
            correctAnswer
        });
    });

    return formattedData;
}