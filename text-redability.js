import rs from 'text-readability';
import read from "readline";

// Setup the readline interface
const rl=read.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to request text input from the user
const requestText = (textReq) => {
    return new Promise((resolve) => {
        rl.question(textReq, (text) => {
            resolve(text);
        });
    });
};


// Function to calculate the readability score and return the level
const textScore = (text) => {
    const score = rs.fleschKincaidGrade(text);
    
    // Map the score to the readability level
    if (score >= 90) return "A1";
    if (score >= 80) return "A2";
    if (score >= 70) return "B1";
    if (score >= 60) return "B2";
    if (score >= 50) return "C1";
    return "C2";
};

// Main function to execute the process
const main = async () => {
    const text = await requestText("Enter Text: ");
    const level = textScore(text);
    console.log("Readability Level: ", level);

    rl.close()
};

// Run the main function
main();
