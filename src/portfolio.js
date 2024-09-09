/* Change this file to get your personal Portfolio */

// To change portfolio colors globally go to the  _globalColor.scss file

import emoji from "react-easy-emoji";
import splashAnimation from "./assets/lottie/splashAnimation"; // Rename to your file name for custom animation

// Splash Screen

const splashScreen = {
  enabled: true, // set false to disable splash screen
  animation: splashAnimation,
  duration: 2000 // Set animation duration as per your animation
};

// Summary And Greeting Section

const illustration = {
  animated: true // Set to false to use static SVG
};

const greeting = {
  username: "Mohd Owais Ansari",
  title: "Hi all, I'm Owais",
  subTitle: emoji(
    "A passionate Full Stack Software Developer 🚀 having an experience of building Web  applications with JavaScript / Reactjs / Nextjs /Nodejs /  and  AWS some other cool libraries and frameworks."
  ),
  resumeLink:
    "https://drive.google.com/file/d/1q0zQHBEMs4qu2w7PLJVmljGHiSwmqBm1/view?usp=sharing", // Set to empty to hide the button
  displayGreeting: true // Set false to hide this section, defaults to true
};

// Social Media Links

const socialMediaLinks = {
  github: "https://github.com/18owais",
  linkedin: "https://www.linkedin.com/in/owais-mohd-ansar/",
  gmail: "owaismohd857@gmail.com",
  linkTree: "https://linktr.ee/MOHD_OWAIS_ANSARI",
  stackoverflow: "https://stackoverflow.com/users/20510654/mohd-owais-ansari",
  geeksforgeeks:"https://www.geeksforgeeks.org/user/owaismodi5r/",
  codingninjas:"https://www.codingninjas.com/studio/profile/59a69a25-19d9-47a9-bc5d-790b80f08441",
  leetcode:"https://leetcode.com/u/Mohd_Owais__ansari/",
  hackerrank:"https://www.hackerrank.com/profile/MsAnsari",
  linkTree:"https://linktr.ee/MOHD_OWAIS_ANSARI",
  // Instagram, Twitter and Kaggle are also supported in the links!
  // To customize icons and social links, tweak src/components/SocialMedia
  display: true // Set true to display this section, defaults to false
};

// Skills Section

const skillsSection = {
  title: "What I do",
  subTitle: "CRAZY FULL STACK DEVELOPER WHO WANTS TO EXPLORE EVERY TECH STACK AND CONVERT IDEAS INTO REALITY",
  skills: [
    emoji(
      "⚡ Develop highly interactive Front end / User Interfaces for your web applications"
    ),
    emoji("⚡ Progressive Web Applications ( PWA ) in NEXT.JS and MERN Stacks"),
    emoji(
      "⚡ Develop Chrome Extension for Web Exploration Recorder and some other cool stuff" 
    ),    
    emoji(
      "⚡ Integration of third party services such as Firebase/ AWS / Digital Ocean"
    )
  ],

  /* Make Sure to include correct Font Awesome Classname to view your icon
https://fontawesome.com/icons?d=gallery */

  softwareSkills: [
    {
      skillName: "html-5",
      fontAwesomeClassname: "fab fa-html5"
    },
    {
      skillName: "css3",
      fontAwesomeClassname: "fab fa-css3-alt"
    },
    {
      skillName: "sass",
      fontAwesomeClassname: "fab fa-sass"
    },
    {
      skillName: "JavaScript",
      fontAwesomeClassname: "fab fa-js"
    },
    {
      skillName: "reactjs",
      fontAwesomeClassname: "fab fa-react"
    },
    {
      skillName: "nodejs",
      fontAwesomeClassname: "fab fa-node"
    },
    {
      skillName: "npm",
      fontAwesomeClassname: "fab fa-npm"
    },
    {
      skillName: "sql-database",
      fontAwesomeClassname: "fas fa-database"
    },
    {
      skillName: "MongoDB",
      fontAwesomeClassname: "fas fa-database" // General database icon
    },
    {
      skillName: "Git",
      fontAwesomeClassname: "fab fa-git"
    },
    {
      skillName: "GitHub",
      fontAwesomeClassname: "fab fa-github"
    },
    {
      skillName: "C++",
      fontAwesomeClassname: "fas fa-file-code"
    },
    {
      skillName: "aws",
      fontAwesomeClassname: "fab fa-aws"
    },
    {
      skillName: "firebase",
      fontAwesomeClassname: "fas fa-fire"
    },
    {
      skillName: "python",
      fontAwesomeClassname: "fab fa-python"
    },
    {
      skillName: "docker",
      fontAwesomeClassname: "fab fa-docker"
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Education Section

const educationInfo = {
  display: true, // Set false to hide this section, defaults to true
  schools: [
    {
      schoolName: "NATIONAL INSTITUTE OF TECHNOLOGY, WARANGAL",
      logo: require("./assets/images/NITWLOGO.png"),
      subHeader: "B.Tech in Computer Science and Engineering",
      duration: "DECEMBER 2021 - JUNE 2025",
      desc: "Participated in the hackathon like trinit-hackathon and others college tech projects.",
      descBullets: [
        "I am currently pursuing a Bachelor of Technology (B.Tech) in Computer Science and Engineering at the National Institute of Technology, Warangal (NITW), one of India's premier engineering institutions. Alongside my core studies, I have actively developed my skills in software development, particularly in full stack engineering, microservices, and serverless architectures. My education has provided a strong foundation in both engineering principles and advanced technology, enabling me to integrate technical expertise with problem-solving and analytical skills through hands-on projects and coursework."
      ]
    },
    {
      schoolName: "SHRI GURU RAM RAI EDUCATION MISSION",
      logo: require("./assets/images/school.jpeg"),
      subHeader: "Intermediate",
      duration: "April 2019 - June 2020",
      desc: "I have attended Shri Guru Ram Rai Public School, where you excelled academically, achieving an outstanding 97% in your CBSE exams in 2020. This remarkable performance earned you the distinction of being the district topper, highlighting your dedication and commitment to your studies during your school years."
    }
  ]
};

// Your top 3 proficient stacks/tech experience

const techStack = {
  viewSkillBars: true, //Set it to true to show Proficiency Section
  experience: [
    {
      Stack: "Frontend/Design", //Insert stack or technology you have experience in
      progressPercentage: "70%" //Insert relative proficiency in percentage
    },
    {
      Stack: "Backend",
      progressPercentage: "80%"
    },
    {
      Stack: "Programming",
      progressPercentage: "80%"
    }
  ],
  displayCodersrank: false // Set true to display codersrank badges section need to changes your username in src/containers/skillProgress/skillProgress.js:17:62, defaults to false
};

// Work experience section

const workExperiences = {
  display: true, //Set it to true to show workExperiences Section
  experience: [
    {
      role: "Backend Developer Intern",
      company: "OSH",
      companylogo: require("./assets/images/osh.jpeg"),
      date: "March 2024 – May 2024",
      desc:  "Engineered a backend system for an Aadhaar Enabled Payment System (AEPS) to facilitate merchant onboarding and financial transactions. Integrated Eko API for e-KYC biometric verification and implemented JWT encryption to secure data. Designed and developed RESTful APIs, ensuring seamless communication between clients and servers."
    },
    {
      role: "Software Engineer Intern",
      company: "Tripolymath",
      companylogo: require("./assets/images/tripolymath.jpeg"),
      date: "May 2024 – August 2024",
      desc: "Developed and optimized scalable serverless functions using Node.js, PostgreSQL, AWS Lambda, and API Gateway for an e-commerce platform. Key contributions include microservices for user authentication, product catalog, inventory management, and transaction processing. Utilized AWS CloudFormation and AWS CDK for infrastructure as code, ensuring efficient deployment and management of cloud resources."
    }
  ]
};

/* Your Open Source Section to View Your Github Pinned Projects
To know how to get github key look at readme.md */

const openSource = {
  showGithubProfile: "true", // Set true or false to show Contact profile using Github, defaults to true
  display: true // Set false to hide this section, defaults to true
};

// Some big projects you have worked on

const bigProjects = {
  title: "Big Projects",
  subtitle: "SOME STARTUPS AND COMPANIES THAT I HELPED TO CREATE THEIR TECH",
  projects: [
    {
      image: require("./assets/images/awslambda.png"),
      projectName: "AWS LAMBDA",
      projectDesc: "Developed a scalable serverless architecture for an e-commerce platform using Node.js, PostgreSQL, AWS Lambda, and API Gateway. Designed and implemented key microservices for user authentication, product management, notifications, and transactions. Utilized AWS CloudFormation and AWS CDK to manage infrastructure as code, ensuring a robust and efficient deployment process.",
      footerLink: [
        {
          name: "Visit System Design",
          url: "https://whimsical.com/nodejs-microservice-with-sls-U8x7rhE232reoZEVhH6RrR"
        },
        {
          name: "Visit Codebase",
          url: "https://github.com/thisIsOwais/ecommerceServerless"
        }
        //  you can add extra buttons here.
      ]
    },
    {
      image: require("./assets/images/eshop.jpeg"),
      projectName: "Eshop",
      projectDesc: "Node.js Microservices Architecture for Online Shop (E-Commerce)project, you transformed a monolithic application into a modular microservices architecture. The project involved using Node.js, MongoDB, and Nginx for efficient request redirection, alongside AMQPLIB for inter-service communication. This setup significantly improved the scalability and maintainability of the e-commerce platform.",
      footerLink: [
        {
          name: "Visit Code",
          url: "https://github.com/GENIUSMICRO/microservices"
        }
        //  you can add extra buttons here.
      ]
    },
    {
      image: require("./assets/images/genius.jpg"),
      projectName: "GENIUS AI-SaaS",
      projectDesc: "Genius AI-SaaS project, I developed an innovative platform that integrates OpenAI and Replicate AI to address coding queries and multimedia creation. The application features a user-friendly interface with modern UI elements, secure authentication using Clerk and Stripe, and real-time streaming of API responses. My work enhanced transaction security for over 1,500 users and reduced unauthorized access incidents by 40%. This project highlights my ability to create advanced AI-driven solutions with a strong focus on user experience and security.",
      footerLink: [
        {
          name: "Visit Website",
          url: "https://genius-roan-iota.vercel.app/"
        }
      ]
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Achievement Section
// Include certificates, talks etc

const achievementSection = {
  title: emoji("Achievements And Certifications 🏆 "),
  subtitle:
    "Achievements, Certifications, Award Letters and Some Cool Stuff that I have done !",

  achievementsCards: [
    {
      title: "Graph Contest By The Job Overflow By AlgoUniversity",
      subtitle:
        "I achieved a top 3 rank in the Graph Theory Coding Contest hosted by theJobOverflow and AlgoUniversity, organized by Candidate Master Manas Kumar and CEO of theJobOverflow and AlgoUniversity. ",
      image: require("./assets/images/graph.png"),
      imageAlt: "Google Code-In Logo",
      footerLink: [
        {
          name: "Certification",
          url: "https://drive.google.com/file/d/1SlKrbEwoJSJpAoETBfufKAvrBHBB_6pQ/view?usp=sharing"
        },
      ]
    },
    {
      title: "TRINIT HACKATHON",
      subtitle:
        "Developed a chrome extension that allows users to record their work during solving any bug in code and pushing on githubs . The extension features a user-friendly interface with drag-and-drop functionality, real-time updates, and secure authentication using Firebase. My work on this project earned me a top 3 rank in the hackathon, highlighting my ability to create innovative solutions with a strong focus on user experience and functionality.",
      image: require("./assets/images/trinit.jpg"),
      imageAlt: "Google Assistant Action Logo",
      footerLink: [
        {
          name: "Source Code",
          url: "https://github.com/thisIsOwais/Web-Exploration-Recorder-Extension"
        },
        {
          name: "Certification",
          url: "https://drive.google.com/file/d/1oVTYgABJxEnhWcv5N0auKXRM0MsYjnf7/view?usp=sharing"
        }
      ]
    },

  ],
  display: true // Set false to hide this section, defaults to true
};

// Blogs Section

const blogSection = {
  title: "Blogs",
  subtitle:
    "With Love for Developing cool stuff, I love to write and teach others what I have learnt.",
  displayMediumBlogs: "true", // Set true to display fetched medium blogs instead of hardcoded ones
  blogs: [
    {
      url: "https://stackoverflow.com/questions/71913692/module-not-found-error-cant-resolve-react-dom-client/76654890?noredirect=1#comment135171044_76654890",
      title: "Error Solving contribution for react-dom-client",
      description:
        "Do you want to win $200 and Google Assistant Tshirt by creating a Google Assistant Action in less then 30 min?"
    },
  ],
  display: true // Set false to hide this section, defaults to true
};

// Talks Sections

const talkSection = {
  title: "TALKS",
  subtitle: emoji(
    "I LOVE TO SHARE MY LIMITED KNOWLEDGE AND GET A SPEAKER BADGE 😅"
  ),

  talks: [
    {
      title: "Build Actions For Google Assistant",
      subtitle: "Codelab at GDG DevFest Karachi 2019",
      slides_url: "https://bit.ly/saadpasta-slides",
      event_url: "https://www.facebook.com/events/2339906106275053/"
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Podcast Section

const podcastSection = {
  title: emoji("Podcast 🎙️"),
  subtitle: "I LOVE TO TALK ABOUT MYSELF AND TECHNOLOGY",

  // Please Provide with Your Podcast embeded Link
  podcast: [
    "https://anchor.fm/codevcast/embed/episodes/DevStory---Saad-Pasta-from-Karachi--Pakistan-e9givv/a-a15itvo"
  ],
  display: true // Set false to hide this section, defaults to true
};

// Resume Section
const resumeSection = {
  title: "Resume",
  subtitle: "Feel free to download my resume",

  // Please Provide with Your Podcast embeded Link
  display: true // Set false to hide this section, defaults to true
};

const contactInfo = {
  title: emoji("Contact Me ☎️"),
  subtitle:
    "Discuss a project or just want to say hi? My Inbox is open for all.",
  number: "+91-8218422403",
  email_address: "owaismohd857@gmail.com"
};

// Twitter Section

const twitterDetails = {
  userName: "twitter", //Replace "twitter" with your twitter username without @
  display: true // Set true to display this section, defaults to false
};

const isHireable = false; // Set false if you are not looking for a job. Also isHireable will be display as Open for opportunities: Yes/No in the GitHub footer

export {
  illustration,
  greeting,
  socialMediaLinks,
  splashScreen,
  skillsSection,
  educationInfo,
  techStack,
  workExperiences,
  openSource,
  bigProjects,
  achievementSection,
  blogSection,
  talkSection,
  podcastSection,
  contactInfo,
  twitterDetails,
  isHireable,
  resumeSection
};
