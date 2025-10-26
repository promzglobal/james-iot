
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generatePrd = async (): Promise<string> => {
    const prompt = `
    Generate a Product Requirements Document (PRD) for an IoT Dashboard application with the following specifications. The PRD should be well-structured, professional, and formatted in Markdown.

    **Application Name:** IoT Control Dashboard

    **Core Concept:** A mobile-first web application that allows users to monitor real-time sensor data and control various settings of their IoT devices. The application simulates fetching data from and sending data to a backend service like Firebase.

    **Key Features:**
    1.  **Main Dashboard:**
        -   Display the current date.
        -   A summary section showing key sensor readings at a glance (e.g., Temperature, Humidity, Pressure).
        -   A detailed metrics section with progress bars for technical data (e.g., Voltage, Current, Power) showing current value vs. maximum value.
        -   A "Refresh" button to fetch the latest sensor data (simulated).
    2.  **Device Controls:**
        -   A list of controllable devices or parameters (e.g., "Fan Speed", "Light Intensity").
        -   Each item in the list has controls to increment or decrement its value (e.g., plus/minus buttons).
        -   A master toggle switch for a primary function (e.g., "System Power").
    3.  **Data Synchronization:**
        -   A "Send" button that simulates pushing the updated control settings to the IoT devices via a backend.

    **Target Audience:**
    -   IoT Hobbyists and DIY electronics enthusiasts.
    -   Home automation users.
    -   Developers prototyping IoT interfaces.

    **Please structure the PRD with the following sections:**
    1.  **Introduction:** Overview, problem statement, and goals.
    2.  **User Personas:** Briefly describe 1-2 typical users.
    3.  **Functional Requirements (User Stories):** Detail the features mentioned above in the format "As a [user type], I want to [action] so that [benefit]."
    4.  **UI/UX Design Principles:** High-level guidelines on the look and feel (e.g., clean, responsive, intuitive).
    5.  **Non-Functional Requirements:** Mention aspects like performance (simulated latency), and scalability (conceptual).
    6.  **Success Metrics:** How would we measure the success of this application?
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error generating PRD with Gemini API:", error);
        return "Error: Could not generate the Product Requirements Document. Please check the API key and network connection.";
    }
};
