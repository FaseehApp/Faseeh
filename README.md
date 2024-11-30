# Text Readability Score

This Node.js application calculates the readability level of a given text using the Flesch-Kincaid readability score.

## How It Works

The application prompts the user to input some text and then calculates the Flesch-Kincaid Grade Level of the text. Based on the score, it maps the result to a language proficiency level (A1, A2, B1, B2, C1, or C2).

## Readability Levels Mapping
- **A1**: Very Easy (Flesch-Kincaid score ≥ 90)
- **A2**: Easy (Flesch-Kincaid score 80–89)
- **B1**: Intermediate (Flesch-Kincaid score 70–79)
- **B2**: Upper Intermediate (Flesch-Kincaid score 60–69)
- **C1**: Advanced (Flesch-Kincaid score 50–59)
- **C2**: Proficient (Flesch-Kincaid score < 50)

## Requirements

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Dependencies

This project uses the following packages:
- `text-readability` - For calculating the readability score.
- `readline` - For user input via the command line.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/<repo-name>.git
