<div style="text-align: center;">
   <img src="./client//public/cerena-logo.png" alt="cerena" style="height: 80px; width: 80px; margin: 0 auto;"/>
</div>
<h1> CERENA</h1>
<h4>All-in-One Healthcare Assistant.
</h4>

## Overview
**CERENA** is an innovative healthcare platform designed to transform how people navigate their health. By harnessing the power of AI,ML. This application is a single destination for all healthcare services, aiming to improve the quality and accessibility of healthcare.

<!-- 
**Key points of CERENA :**
* **`Conventional Healthcare`**: Comprehensive information on Doctors,Medications
* **`Innovative Healthcare`**:Personalized Health Assistant with AI
* **`Interactive Features`**:Engagement of personalized Exercise , Calorie Tracking
* **`Smart Assistance  & Accessibility`**: Chatbot & Sign Speak for Guidance 
* **`Scalable & Comprehensive Infrastructure`** : Monolithic Architecture in Java -->



Watch a demo presentation of **CERENA** [here](https://youtu.be/oZafKTJgqBc).  


## Features
   - ***Doctor Directory***: Comprehensive information on doctors, including degree, area of practice, and contact information.

   - ***Medication Information***: Detailed knowledge about medications, including dosage, effects, and availability etc.

   - ***Personalized Health Tracking***: Tools such as BMI calculators and workout plans to promote a healthy lifestyle.
   - ***Disease Prediction***: Initial diagnosis tool for predicting potential diseases based on symptoms.

   - ***Exercise and Fitness***: Personalized workout regimens and schedules focusing on specific muscles.
   - ***Workout Planner***: Personalized AI workout planner based on necessary info and goals. 

   - ***Calorie Tracking***: Integration with food image recognition technology to estimate calorie intake from meal images.
<!-- - AR Physical Training Game: Optional feature for exercising through augmented reality games. -->

   - ***Disease Prediction with AI Doctor***: Intelligent disease prediction system to inquire about disease based on given symptoms.
   - ***Hand Sign Language***: Feature translating hand gestures into text for improved accessibility for hearing-impaired individuals.

   - ***Blood Bank***: Directory of blood banks and donation centers. Contact information of donors to contact them when required.

   - ***Medication Reminder***: Notifications to remind users to take their medications.
   
   - ***Location Services***: GPS-enabled feature to find nearby blood donors.

   - ***Admin Dashboard***: Monitoring users and adding, updating, modifying informations.

   - ***Prescription and Medical Report Scanner***: Scanning the documents and get detailed info and remarks.

   - ***Diet Planner***: AI suggested diet planner based on various factors.



## System Design
The system is designed using predominantly monolithic architecture in Java, ensuring seamless integration of all features and scalability.
   
   - **UserService**: Role based user authentication, authorization, and profiles.

   - **DoctorService**: Provides information on doctors. 

   - **MedicinenService**: Offers details about medications.

   - **HealthTrackingService and GenericService**: Tracks health metrics like BMI and diet.

   - **FitnessService**: Provides workout plans and exercise information based on muscle group. User can download the workout plan as pdf

   - **DiseasePredictionService**: AI-driven conversation for estimating diseases providing users symptoms.

   - **BloodBankService**: Lists blood banks and donor.

   - **LocationService**: Finds nearby Donor.

   - **SignLanguageService**: Detects ASL(American Sign Language) gestures and converts them into text, has a text to speech feature. Built our custom trained sign language detection model (Datasets were our own). Intrigue quiz system for learning sign languages.

   - **Prescription and Report Service**: Using Gemini Service to create Prescription and Medical Report Scanner.
   - **Diet Planner Service**: Using Gemini Service to create Daily Food Diet planner.

   - **EmailService**: For sending password reset mail, email verification links.

   - **SmsService**: For sending sms to verify phone numbers of Blood Donors.
   - **JwtService**: Handling authentication and authorization for JSON web tokens.
   - **FileStorageService**: Managing Media files and videos.
   - **AuthService**: For handling user authentication, authorization including reset password and email verification.



## Security
User and role based authentication system was implemented. **JSON Web Token** is used with Authorization header for authorization.


## Technologies and Dependencies for ***CERENA***

**Feature** | **Framework / Tool**
--- | ---
**Frontend** | [Next.js](https://nextjs.org/docs)
**Backend** | [Spring Boot](https://spring.io/projects/spring-boot)
**Database & Storage** | [MongoDB](https://www.mongodb.com/docs/)
**AI Models** | [Gemini](https://gemini.google.com/),  **MobileNet** for Sign Language Detection
**CSS Framework** |[Tailwind CSS](https://tailwindcss.com/)
**Design Tool** | [Adobe Illustrator](https://illustrator.adobe.com/home), Stable Diffusion
**Location Services** | [Google Maps Geolocation APIs](https://developers.google.com/maps/documentation/geolocation/overview)
**Others** | [Mediapipe](https://ai.google.dev/edge/mediapipe/solutions/guide) (For Gesture detection), [Opencv](https://opencv.org/) (For Image Processing)






## Local Setup

1. **Clone the Project:**
   - Clone this repository:
      ```
      git clone https://github.com/Khandakar227/javafest24
      ```

2. **Configure Environment Variables:**
   - Navigate to the project's root directory.
   - Env variables are written in a [Google Doc](https://docs.google.com/document/d/1kA7E0Am9aMSDImubvLTc7QsybWJAJjq8sj_RokedHGk/edit?usp=sharing). Access is provided to **javafest@therapservices.net**. You can also request view access.
   - In the *`client`* folder, update the `.env.local` variables with your API keys and required variables.

      ```
      NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = 
      ```
   
   - In the *`server/src/main/resources`* folder, ADD all the variables from the [doc file](https://docs.google.com/document/d/1kA7E0Am9aMSDImubvLTc7QsybWJAJjq8sj_RokedHGk/edit?usp=sharing) to `application.properties`.

3. **Frontend Setup:**
   - Open a terminal in the *`client`* folder.
   - Install project dependencies with:
     ```
     npm install
     ```
   - Start the frontend development server with:
     ```
     npm run dev
     ```

4. **Backend Setup:**
   - Open a terminal in the *`server`* folder.
   - Install dependencies from the `pom.xml` file.
   - Build and Run the application with the following command:
     
     ```
     ./mvnw spring-boot:run
     ```

5. **Database Setup:**
   - Install Mongodb and MongoDB Compass. Go to *`data/mongo`* folder. Import the data into database collection
   (data file name: mongo.`<collection name>`.json). Make sure to run backend before this step. Otherwise mongo collection won't be generated.

6. **Sign Detection Model Server**
    - To use sign detection a custom trained sign language model was built using mobile net, tensorflow, opencv and mediapipe in python. go to *`model-server`* folder. Install necessary packages. model server is created using fast api.
    
    Python version: 3.10.11

    ```
    python -m venv venv
    ./venv/Scripts/activate <------------------ For Windows
    source venv/bin/activate <------------------ For Linux
    pip install mediapipe opencv-python tensorflow==2.15.1  fastapi uvicron cvzone socketio numpy opencv-python
    ```
    To run the server:
    ```
    fastapi run server.py
    ```
   **Note**: It seems fastapi command does not work if virtual environment is not setup.
   
## Conclusion

**CERENA** aims to revolutionize the healthcare sector by offering scalable features and focusing on comprehensive healthcare for all. While it faces challenges like limited access to APIs and the need for efficient models, it strives to create a positive impact on users' health and well-being.


## About the Team
Team name: **new JavaPariNa()**
**Name** | **Email** | **LinkedIn**
--- | --- | ---
Khandakar Shakib Al Hasan | shakibalhasan@iut-dhaka.edu | [Khandakar Shakib](https://www.linkedin.com/in/shakib-hasan-734494249)
Meftahul Jannati Anonna | meftahul@iut-dhaka.edu | [Meftahul Jannati Anonna](https://www.linkedin.com/in/meftahuljannati/)

Thank You.








