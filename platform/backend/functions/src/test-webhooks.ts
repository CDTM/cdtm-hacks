import * as dotenv from "dotenv";
import { webhookService } from "./webhookService";
dotenv.config();

// Test data for team registration
// const teamRegistrationData = {
//   data: {
//     data: {
//       "case-preference": ["Trade Republic", "avi", "beam"],
//       "do-you-have-a-team": "Yes",
//       "team-email-addresses": "test1@example.com, test2@example.com",
//     },
//   },
// };

// Test data for project submission
const projectSubmissionData = {
  data: {
    data: {
      "team-code": "0000",
      repository: "https://gitub.com/Sharezone-App/sharezone-app",
      "pitch-video": "https://www.youtube.com/watch?v=xvFZjo5PgG0",
      welcomeCard: "clicked",
      "how-we-built-it":
        "Our tech stack combines modern tools for a robust, scalable solution:\n\n* Frontend: The UI is built with Next.js 13+ and TypeScript, paired with Tailwind CSS for a sleek, responsive design. This ensures a seamless experience for users across different devices.\n* Backend: We use Supabase for secure user authentication and database management, allowing for easy access control and efficient data handling.\n* AI Processing: HawkWatch uses Google's Gemini Visual Language Model (VLM) for real-time video analysis and TensorFlow.js for processing video streams on the client side. These models enable accurate event detection, ranging from criminal activity to health-related emergencies.\n* Email/Phone Service: Resend API powers our email and phone notification system",
      "what-we-learned":
        "* Advanced video processing techniques in the browser\n* Real-time data handling with WebSocket connections to handle real-time updates effectively\n* AI model optimization for edge cases\n* Complex state management in React applications, especially when dealing with large datasets\n* Integration of multiple third-party services\n* The importance of user experience in security applications",
      "one-sentence-pitch": "Turn lecture slides into flashcards",
      "what-is-your-project":
        "HawkWatch is an intelligent video surveillance platform that detects crime, suspicious activities and life threatening events such as fainting and choking and sends phone alerts to alert security of the issue. Our intelligent model generates time-stamped incident reports with video evidence. It has 4 main features:\n\n1. Real-time detection of dangerous activity is done by sending audio, video, and Tensorflow's body position data to Google's Gemini Visual Language Model, and sending email notification if needed\n2. An upload feature allows existing mp4 files to be analyzed\n3. A library of saved livestream footage and mp4 uploads, with detailed security analysis complete with timeline and information which is saved with each entry",
      djm7t3238fmxa63dvs7q6tvw: "https://web.sharezone.net",
      f9us21kx80ol0k1ln48u9v2l: "The 10x Engineers",
      feno0rbmyhf8vqyxoqndqnz8: "nothing",
      fug36spozqys4uaah0ncnq2e:
        "1. Performance Optimization: Balancing real-time video processing with browser performance and Gemini rate limits\n2. AI Model Accuracy: Fine-tuning detection algorithms to minimize false positives\n3. Video Stream Handling: Managing multiple video streams without overwhelming the system",
      ixmth9vbjz6b9c1qotp9wlf2: "Because we have unicorn potential",
      kvdlw9670moh9t25s8pds8iu: "clicked",
      lrytlj95o6ua2vylb1fi73ha: "AnkiGPT",
      n8q93po2dd5wsnspuguznrl8: "We use GPT 4o :)",
      nfi6gji4lv321c7ompvk2wm8: [
        '"There is no AI without PI" by Celonis',
        '"Most potential to earn real money" by Visionaries Club, Everyday Intelligence & Paid',
      ],
      "what-is-next-for-your-project":
        "1. Advanced AI Features\n* Person identification and recognition\n* Object tracking across multiple cameras\n* Behavioral pattern analysis\n2. Enhanced Security\n* End-to-end encryption\n* GDPR compliance tools\n* Advanced access control\n3. Smart Home Integration",
    },
  },
};

async function testWebhooks() {
  try {
    // console.log("Testing team registration webhook...");
    // await webhookService.handleTeamRegistration(teamRegistrationData);
    // console.log("Team registration test completed successfully");

    console.log("\nTesting project submission webhook...");
    await webhookService.handleProjectSubmission(projectSubmissionData);
    console.log("Project submission test completed successfully");
  } catch (error) {
    console.error("Test failed:", error);
  }
}

// Run the tests
testWebhooks();
