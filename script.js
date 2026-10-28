/* =========================================================
   AI JOB TRACKER - MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   GLOBAL DATA
========================================================= */

let currentResumeText = "";

const careerTips = [
    "Keep your resume updated according to the job description before applying.",
    "Add measurable achievements to your resume instead of only listing responsibilities.",
    "Apply consistently and track every application to understand your progress.",
    "Practice JavaScript, React and problem-solving for frontend developer roles.",
    "Customize your resume keywords according to each job description.",
    "Prepare common interview questions before every interview."
];


/* =========================================================
   DOM ELEMENTS
========================================================= */

const navLinks = document.querySelectorAll(".nav-link");
const pageSections = document.querySelectorAll(".page-section");

const pageTitle = document.getElementById("pageTitle");
const pageSubtitle = document.getElementById("pageSubtitle");

const dashboardSection =
    document.getElementById("dashboardSection");

const applicationsSection =
    document.getElementById("applicationsSection");

const resumeAnalyzerSection =
    document.getElementById("resumeAnalyzerSection");

const analyticsSection =
    document.getElementById("analyticsSection");

const settingsSection =
    document.getElementById("settingsSection");

const homeSection =
    document.getElementById("homeSection");


/* =========================================================
   PAGE TITLES
========================================================= */

const pageInfo = {

    homeSection: {
        title: "Career Command Center",
        subtitle: "Manage your job search with AI-powered tools."
    },

    dashboardSection: {
        title: "Dashboard",
        subtitle: "Track your job applications and career progress."
    },

    applicationsSection: {
        title: "My Applications",
        subtitle: "Manage and track all your job applications."
    },

    resumeAnalyzerSection: {
        title: "Resume Analyzer",
        subtitle: "Analyze your resume and discover missing skills."
    },

    analyticsSection: {
        title: "Analytics",
        subtitle: "Understand your job search performance."
    },

    settingsSection: {
        title: "Settings",
        subtitle: "Manage your AI Job Tracker preferences."
    }

};


/* =========================================================
   PAGE NAVIGATION
========================================================= */

function showSection(sectionId) {

    pageSections.forEach(section => {

        section.hidden = section.id !== sectionId;

    });


    navLinks.forEach(link => {

        link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${sectionId}`
        );

    });
    if (pageInfo[sectionId]) {

    if (pageTitle) {
        pageTitle.textContent =
            pageInfo[sectionId].title;
    }

    if (pageSubtitle) {
        pageSubtitle.textContent =
            pageInfo[sectionId].subtitle;
    }

}


    


    if (sectionId === "applicationsSection") {
        renderApplicationsPage();
    }

}


/* Navigation click */

navLinks.forEach(link => {

    link.addEventListener("click", function(event) {

        event.preventDefault();

        const target =
            this.getAttribute("href");

        if (!target || target === "#") {
            return;
        }

        const sectionId =
            target.substring(1);

        showSection(sectionId);

    });

});


/* =========================================================
   INITIAL PAGE
========================================================= */

showSection("homeSection");


/* =========================================================
   JOB ELEMENTS
========================================================= */

function getJobs() {

    return Array.from(
        document.querySelectorAll("#dashboardJobs .job")
    );

}


/* =========================================================
   UPDATE ANALYTICS
========================================================= */

function updateAnalytics() {

    const jobs = getJobs();

    const total = jobs.length;

    let interviews = 0;
    let rejected = 0;
    let selected = 0;


    jobs.forEach(job => {

        const statusSelect =
            job.querySelector(".status-select");

        if (!statusSelect) {
            return;
        }

        const status =
            statusSelect.value;


        if (status === "Interview") {
            interviews++;
        }

        if (status === "Rejected") {
            rejected++;
        }

        if (status === "Selected") {
            selected++;
        }

    });


    /* Dashboard */

    const dashboardApplications =
        document.getElementById("dashboardApplications");

    const dashboardInterviews =
        document.getElementById("dashboardInterviews");

    const dashboardRejected =
        document.getElementById("dashboardRejected");

    const dashboardSelected =
        document.getElementById("dashboardSelected");


    if (dashboardApplications)
        dashboardApplications.textContent = total;

    if (dashboardInterviews)
        dashboardInterviews.textContent = interviews;

    if (dashboardRejected)
        dashboardRejected.textContent = rejected;

    if (dashboardSelected)
        dashboardSelected.textContent = selected;


    /* Analytics */

    const totalApplications =
        document.getElementById("totalApplications");

    const totalInterviews =
        document.getElementById("totalInterviews");

    const totalRejected =
        document.getElementById("totalRejected");

    const totalSelected =
        document.getElementById("totalSelected");

    const interviewRate =
        document.getElementById("interviewRate");

    const selectionRate =
        document.getElementById("selectionRate");


    if (totalApplications)
        totalApplications.textContent = total;

    if (totalInterviews)
        totalInterviews.textContent = interviews;

    if (totalRejected)
        totalRejected.textContent = rejected;

    if (totalSelected)
        totalSelected.textContent = selected;


    const interviewPercentage =
        total === 0
            ? 0
            : Math.round((interviews / total) * 100);


    const selectionPercentage =
        total === 0
            ? 0
            : Math.round((selected / total) * 100);


    if (interviewRate)
        interviewRate.textContent =
            `${interviewPercentage}%`;

    if (selectionRate)
        selectionRate.textContent =
            `${selectionPercentage}%`;


    updateHomeProgress();

    updateUpcomingInterviews();

}


/* =========================================================
   STATUS CHANGE
========================================================= */

document.addEventListener("change", function(event) {

    if (
        event.target.classList.contains("status-select")
    ) {

        updateAnalytics();

    }

});


/* =========================================================
   ADD APPLICATION
========================================================= */

function addApplication() {

    const company =
        prompt("Enter company name:");

    if (!company || !company.trim()) {
        return;
    }


    const jobTitle =
        prompt("Enter job title:");

    if (!jobTitle || !jobTitle.trim()) {
        return;
    }


    const status =
        prompt(
            "Enter status:\nApplied\nInterview\nRejected\nSelected",
            "Applied"
        );


    const allowedStatuses = [
        "Applied",
        "Interview",
        "Rejected",
        "Selected"
    ];


    let finalStatus = "Applied";


    if (
        status &&
        allowedStatuses.includes(status.trim())
    ) {

        finalStatus = status.trim();

    }


    createJob(
        company.trim(),
        jobTitle.trim(),
        finalStatus
    );


    updateAnalytics();

}


/* =========================================================
   CREATE JOB
========================================================= */

function createJob(company, jobTitle, status = "Applied") {

    const jobsContainer =
        document.getElementById("dashboardJobs");

    if (!jobsContainer) {
        return;
    }


    const job =
        document.createElement("div");

    job.className = "job";

    job.dataset.company = company;
    job.dataset.title = jobTitle;


    const firstLetter =
        company.charAt(0).toUpperCase();


    job.innerHTML = `

        <div class="company-logo">
            ${firstLetter}
        </div>


        <div class="job-info">

            <h3>
                ${escapeHTML(jobTitle)}
            </h3>

            <p>
                ${escapeHTML(company)}
            </p>

        </div>


        <select class="status-select">

            <option ${status === "Applied" ? "selected" : ""}>
                Applied
            </option>

            <option ${status === "Interview" ? "selected" : ""}>
                Interview
            </option>

            <option ${status === "Rejected" ? "selected" : ""}>
                Rejected
            </option>

            <option ${status === "Selected" ? "selected" : ""}>
                Selected
            </option>

        </select>


        <button
            class="edit-btn"
            title="Edit"
        >
            <i class="fa-solid fa-pen"></i>
        </button>


        <button
            class="delete-btn"
            title="Delete"
        >
            <i class="fa-solid fa-trash"></i>
        </button>

    `;


    jobsContainer.appendChild(job);

}


/* =========================================================
   HTML SECURITY
========================================================= */

function escapeHTML(value) {

    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


/* =========================================================
   ADD BUTTONS
========================================================= */

const addJobBtn =
    document.getElementById("addJobBtn");

const applicationsAddBtn =
    document.getElementById("applicationsAddBtn");


if (addJobBtn) {

    addJobBtn.addEventListener(
        "click",
        addApplication
    );

}


if (applicationsAddBtn) {

    applicationsAddBtn.addEventListener(
        "click",
        addApplication
    );

}


/* =========================================================
   HOME ADD APPLICATION
========================================================= */

const homeAddJob =
    document.getElementById("homeAddJob");


if (homeAddJob) {

    homeAddJob.addEventListener(
        "click",
        function() {

            showSection("dashboardSection");

            addApplication();

        }
    );

}


/* =========================================================
   DELETE APPLICATION
========================================================= */

document.addEventListener("click", function(event) {

    const deleteButton =
        event.target.closest(".delete-btn");


    if (!deleteButton) {
        return;
    }


    const job =
        deleteButton.closest(".job");


    if (!job) {
        return;
    }


    const company =
        job.dataset.company ||
        job.querySelector(".job-info p")?.textContent;


    const confirmDelete =
        confirm(
            `Delete application for ${company}?`
        );


    if (!confirmDelete) {
        return;
    }


    job.remove();

    updateAnalytics();

});


/* =========================================================
   EDIT APPLICATION
========================================================= */

document.addEventListener("click", function(event) {

    const editButton =
        event.target.closest(".edit-btn");


    if (!editButton) {
        return;
    }


    const job =
        editButton.closest(".job");


    if (!job) {
        return;
    }


    const companyElement =
        job.querySelector(".job-info p");

    const titleElement =
        job.querySelector(".job-info h3");


    const company =
        prompt(
            "Edit company name:",
            companyElement.textContent.trim()
        );


    if (!company || !company.trim()) {
        return;
    }


    const title =
        prompt(
            "Edit job title:",
            titleElement.textContent.trim()
        );


    if (!title || !title.trim()) {
        return;
    }


    companyElement.textContent =
        company.trim();

    titleElement.textContent =
        title.trim();


    job.dataset.company =
        company.trim();

    job.dataset.title =
        title.trim();


    job.querySelector(".company-logo")
        .textContent =
        company.trim()
            .charAt(0)
            .toUpperCase();


    updateAnalytics();

});


/* =========================================================
   SEARCH
========================================================= */

const searchInput =
    document.getElementById("searchInput");

const statusFilter =
    document.getElementById("statusFilter");


function filterApplications() {

    const searchValue =
        searchInput
            ? searchInput.value.toLowerCase().trim()
            : "";


    const selectedStatus =
        statusFilter
            ? statusFilter.value
            : "all";


    getJobs().forEach(job => {

        const company =
            job.dataset.company
                .toLowerCase();

        const title =
            job.dataset.title
                .toLowerCase();


        const statusSelect =
            job.querySelector(".status-select");


        const status =
            statusSelect
                ? statusSelect.value
                : "";


        const matchesSearch =
            company.includes(searchValue) ||
            title.includes(searchValue);


        const matchesStatus =
            selectedStatus === "all" ||
            status === selectedStatus;


        job.style.display =
            matchesSearch && matchesStatus
                ? "flex"
                : "none";

    });

}


if (searchInput) {

    searchInput.addEventListener(
        "input",
        filterApplications
    );

}


if (statusFilter) {

    statusFilter.addEventListener(
        "change",
        filterApplications
    );

}


/* =========================================================
   APPLICATIONS PAGE
========================================================= */

function renderApplicationsPage() {

    const container =
        document.getElementById("applicationsList");

    if (!container) {
        return;
    }


    container.innerHTML = "";


    const jobs =
        getJobs();


    if (jobs.length === 0) {

        container.innerHTML = `

            <div class="empty-interview">

                <i class="fa-solid fa-briefcase"></i>

                <p>
                    No applications found.
                </p>

            </div>

        `;

        return;

    }


    jobs.forEach(job => {

        const clone =
            job.cloneNode(true);


        container.appendChild(clone);

    });

}


/* =========================================================
   APPLICATIONS PAGE CLICK HANDLING
========================================================= */

const applicationsList =
    document.getElementById("applicationsList");


if (applicationsList) {

    applicationsList.addEventListener(
        "change",
        function(event) {

            if (
                !event.target.classList.contains(
                    "status-select"
                )
            ) {
                return;
            }


            const clonedJob =
                event.target.closest(".job");


            const company =
                clonedJob.dataset.company;


            const originalJob =
                getJobs().find(job =>
                    job.dataset.company === company &&
                    job.dataset.title ===
                        clonedJob.dataset.title
                );


            if (originalJob) {

                originalJob.querySelector(
                    ".status-select"
                ).value =
                    event.target.value;

            }


            updateAnalytics();

        }
    );


    applicationsList.addEventListener(
        "click",
        function(event) {

            const deleteButton =
                event.target.closest(".delete-btn");


            if (deleteButton) {

                const job =
                    deleteButton.closest(".job");


                const company =
                    job.dataset.company;

                const title =
                    job.dataset.title;


                const originalJob =
                    getJobs().find(original =>
                        original.dataset.company === company &&
                        original.dataset.title === title
                    );


                if (originalJob) {

                    originalJob.remove();

                }


                updateAnalytics();

                renderApplicationsPage();

                return;

            }


            const editButton =
                event.target.closest(".edit-btn");


            if (editButton) {

                const job =
                    editButton.closest(".job");


                const company =
                    job.dataset.company;

                const title =
                    job.dataset.title;


                const originalJob =
                    getJobs().find(original =>
                        original.dataset.company === company &&
                        original.dataset.title === title
                    );


                if (originalJob) {

                    const newCompany =
                        prompt(
                            "Edit company name:",
                            company
                        );


                    if (
                        !newCompany ||
                        !newCompany.trim()
                    ) {
                        return;
                    }


                    const newTitle =
                        prompt(
                            "Edit job title:",
                            title
                        );


                    if (
                        !newTitle ||
                        !newTitle.trim()
                    ) {
                        return;
                    }


                    originalJob.dataset.company =
                        newCompany.trim();

                    originalJob.dataset.title =
                        newTitle.trim();


                    originalJob.querySelector(
                        ".job-info p"
                    ).textContent =
                        newCompany.trim();


                    originalJob.querySelector(
                        ".job-info h3"
                    ).textContent =
                        newTitle.trim();


                    originalJob.querySelector(
                        ".company-logo"
                    ).textContent =
                        newCompany
                            .trim()
                            .charAt(0)
                            .toUpperCase();

                }


                updateAnalytics();

                renderApplicationsPage();

            }

        }
    );

}


/* =========================================================
   HOME PROGRESS
========================================================= */

function updateHomeProgress() {

    const progressText =
        document.getElementById(
            "homeProgressText"
        );

    const progressBar =
        document.getElementById(
            "homeProgress"
        );


    const total =
        getJobs().length;


    const target = 20;


    const percentage =
        Math.min(
            (total / target) * 100,
            100
        );


    if (progressText) {

        progressText.textContent =
            `${total} / ${target}`;

    }


    if (progressBar) {

        progressBar.style.width =
            `${percentage}%`;

    }

}


/* =========================================================
   UPCOMING INTERVIEWS
========================================================= */

function updateUpcomingInterviews() {

    const container =
        document.getElementById(
            "homeInterviews"
        );


    if (!container) {
        return;
    }


    const interviewJobs =
        getJobs().filter(job => {

            const status =
                job.querySelector(
                    ".status-select"
                )?.value;

            return status === "Interview";

        });


    if (interviewJobs.length === 0) {

        container.innerHTML = `

            <div class="empty-interview">

                <i class="fa-regular fa-calendar"></i>

                <p>
                    No upcoming interviews
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML = "";


    interviewJobs.forEach(job => {

        const company =
            job.dataset.company;

        const title =
            job.dataset.title;


        const item =
            document.createElement("div");


        item.className =
            "interview-item";


        item.innerHTML = `

            <strong>
                ${escapeHTML(title)}
            </strong>

            <p>
                ${escapeHTML(company)}
            </p>

            <span>
                Interview Scheduled
            </span>

        `;


        container.appendChild(item);

    });

}


/* =========================================================
   AI CAREER TIP
========================================================= */

const newTipBtn =
    document.getElementById("newTipBtn");

const aiCareerTip =
    document.getElementById("aiCareerTip");


if (newTipBtn && aiCareerTip) {

    newTipBtn.addEventListener(
        "click",
        function() {

            const randomIndex =
                Math.floor(
                    Math.random() *
                    careerTips.length
                );


            aiCareerTip.textContent =
                careerTips[randomIndex];

        }
    );

}


/* =========================================================
   HOME QUICK ACTIONS
========================================================= */

const homeAnalyzeResume =
    document.getElementById(
        "homeAnalyzeResume"
    );


const homeAnalytics =
    document.getElementById(
        "homeAnalytics"
    );


if (homeAnalyzeResume) {

    homeAnalyzeResume.addEventListener(
        "click",
        function() {

            showSection(
                "resumeAnalyzerSection"
            );

        }
    );

}


if (homeAnalytics) {

    homeAnalytics.addEventListener(
        "click",
        function() {

            showSection(
                "analyticsSection"
            );

        }
    );

}


/* =========================================================
   RESUME ANALYZER
========================================================= */

const resumeInput =
    document.getElementById("resumeInput");

const uploadResumeBtn =
    document.getElementById(
        "uploadResumeBtn"
    );

const fileName =
    document.getElementById("fileName");


if (uploadResumeBtn && resumeInput) {

    uploadResumeBtn.addEventListener(
        "click",
        function() {

            resumeInput.click();

        }
    );


    resumeInput.addEventListener(
        "change",
        function() {

            const file =
                this.files[0];


            if (!file) {
                return;
            }


            fileName.textContent =
                file.name;


            readResume(file);

        }
    );

}


/* =========================================================
   STANDALONE RESUME ANALYZER
========================================================= */

const standaloneInput =
    document.getElementById(
        "resumeInputStandalone"
    );

const standaloneButton =
    document.getElementById(
        "uploadStandaloneBtn"
    );


if (standaloneButton && standaloneInput) {

    standaloneButton.addEventListener(
        "click",
        function() {

            standaloneInput.click();

        }
    );


    standaloneInput.addEventListener(
        "change",
        function() {

            const file =
                this.files[0];


            if (!file) {
                return;
            }


            const standaloneName =
                document.getElementById(
                    "standaloneFileName"
                );


            if (standaloneName) {

                standaloneName.textContent =
                    file.name;

            }


            readResume(
                file,
                true
            );

        }
    );

}


/* =========================================================
   READ RESUME
========================================================= */

async function readResume(
    file,
    standalone = false
) {

    if (file.type !== "application/pdf") {

        alert(
            "Please upload a PDF resume."
        );

        return;

    }


    if (!window.pdfjsLib) {

        alert(
            "PDF.js is not loaded. Please refresh the page."
        );

        return;

    }


    try {

        const arrayBuffer =
            await file.arrayBuffer();


        const pdf =
            await window.pdfjsLib
                .getDocument({
                    data: arrayBuffer
                })
                .promise;


        let text = "";


        for (
            let pageNumber = 1;
            pageNumber <= pdf.numPages;
            pageNumber++
        ) {

            const page =
                await pdf.getPage(
                    pageNumber
                );


            const content =
                await page.getTextContent();


            const pageText =
                content.items
                    .map(item => item.str)
                    .join(" ");


            text += pageText + " ";

        }


        currentResumeText =
            text;


        analyzeResume(
            text,
            standalone
        );


    } catch (error) {

        console.error(
            "PDF Error:",
            error
        );


        alert(
            "Unable to read this PDF."
        );

    }

}


/* =========================================================
   RESUME ANALYSIS
========================================================= */

function analyzeResume(
    text,
    standalone = false
) {

    const normalizedText =
        text.toLowerCase();


    const skills = [

        "html",
        "css",
        "javascript",
        "react",
        "python",
        "java",
        "c++",
        "sql",
        "node.js",
        "nodejs",
        "express",
        "mongodb",
        "git",
        "github",
        "bootstrap",
        "tailwind",
        "django",
        "api",
        "figma"

    ];


    const foundSkills =
        skills.filter(skill =>
            normalizedText.includes(
                skill.toLowerCase()
            )
        );


    const importantSkills = [
        "html",
        "css",
        "javascript",
        "react",
        "git",
        "sql"
    ];


    const missingSkills =
        importantSkills.filter(skill =>
            !foundSkills.includes(skill)
        );


    let score =
        40 +
        (foundSkills.length * 4);


    score =
        Math.min(score, 100);


    const suggestion =
        missingSkills.length === 0

            ? "Your resume contains the important skills. Add measurable projects and achievements."

            : `Consider adding: ${missingSkills.join(", ")}.`;


    if (standalone) {

        const result =
            document.getElementById(
                "standaloneAnalysisResult"
            );

        if (result) {
            result.hidden = false;
        }


        const scoreElement =
            document.getElementById(
                "standaloneResumeScore"
            );

        const skillsElement =
            document.getElementById(
                "standaloneSkillsFound"
            );

        const missingElement =
            document.getElementById(
                "standaloneMissingSkills"
            );

        const suggestionElement =
            document.getElementById(
                "standaloneSuggestions"
            );


        if (scoreElement)
            scoreElement.textContent =
                `${score}%`;

        if (skillsElement)
            skillsElement.textContent =
                foundSkills.length
                    ? foundSkills.join(", ")
                    : "No skills found.";

        if (missingElement)
            missingElement.textContent =
                missingSkills.length
                    ? missingSkills.join(", ")
                    : "No major missing skills.";

        if (suggestionElement)
            suggestionElement.textContent =
                suggestion;


        return;

    }


    const analysisResult =
        document.getElementById(
            "analysisResult"
        );


    if (analysisResult) {
        analysisResult.hidden = false;
    }


    const resumeScore =
        document.getElementById(
            "resumeScore"
        );

    const skillsFound =
        document.getElementById(
            "skillsFound"
        );

    const missingSkillsElement =
        document.getElementById(
            "missingSkills"
        );

    const resumeSuggestions =
        document.getElementById(
            "resumeSuggestions"
        );


    if (resumeScore)
        resumeScore.textContent =
            `${score}%`;


    if (skillsFound)
        skillsFound.textContent =
            foundSkills.length
                ? foundSkills.join(", ")
                : "No skills found.";


    if (missingSkillsElement)
        missingSkillsElement.textContent =
            missingSkills.length
                ? missingSkills.join(", ")
                : "No major missing skills.";


    if (resumeSuggestions)
        resumeSuggestions.textContent =
            suggestion;

}


/* =========================================================
   JOB MATCHING
========================================================= */

const matchJobBtn =
    document.getElementById(
        "matchJobBtn"
    );


if (matchJobBtn) {

    matchJobBtn.addEventListener(
        "click",
        matchJobWithResume
    );

}


function matchJobWithResume() {

    const jobDescription =
        document.getElementById(
            "jobDescription"
        );


    if (!jobDescription) {
        return;
    }


    const jobText =
        jobDescription.value
            .toLowerCase()
            .trim();


    if (!jobText) {

        alert(
            "Please paste a job description first."
        );

        return;

    }


    if (!currentResumeText) {

        alert(
            "Please upload your resume first."
        );

        return;

    }


    const skills = [

        "html",
        "css",
        "javascript",
        "react",
        "python",
        "java",
        "c++",
        "sql",
        "node.js",
        "nodejs",
        "express",
        "mongodb",
        "git",
        "github",
        "bootstrap",
        "tailwind",
        "django",
        "api",
        "figma"

    ];


    const requiredSkills =
        skills.filter(skill =>
            jobText.includes(
                skill.toLowerCase()
            )
        );


    const matchedSkills =
        requiredSkills.filter(skill =>
            currentResumeText
                .toLowerCase()
                .includes(
                    skill.toLowerCase()
                )
        );


    const missing =
        requiredSkills.filter(skill =>
            !matchedSkills.includes(skill)
        );


    let matchScore = 0;


    if (requiredSkills.length > 0) {

        matchScore =
            Math.round(
                (matchedSkills.length /
                    requiredSkills.length) *
                100
            );

    } else {

        matchScore = 0;

    }


    const result =
        document.getElementById(
            "jobMatchResult"
        );


    const score =
        document.getElementById(
            "jobMatchScore"
        );


    const required =
        document.getElementById(
            "requiredSkills"
        );


    const matched =
        document.getElementById(
            "matchedSkills"
        );


    const missingElement =
        document.getElementById(
            "jobMissingSkills"
        );


    if (result)
        result.hidden = false;


    if (score)
        score.textContent =
            `${matchScore}%`;


    if (required)
        required.textContent =
            requiredSkills.length
                ? requiredSkills.join(", ")
                : "No recognized skills found";


    if (matched)
        matched.textContent =
            matchedSkills.length
                ? matchedSkills.join(", ")
                : "None";


    if (missingElement)
        missingElement.textContent =
            missing.length
                ? missing.join(", ")
                : "None";

}


/* =========================================================
   VIEW ALL
========================================================= */

const viewAllBtn =
    document.querySelector(".view-btn");


if (viewAllBtn) {

    viewAllBtn.addEventListener(
        "click",
        function() {

            showSection(
                "applicationsSection"
            );

        }
    );

}


/* =========================================================
   THEME BUTTON
========================================================= */

const themeBtn =
    document.querySelector(".theme-btn");


if (themeBtn) {

    themeBtn.addEventListener(
        "click",
        function() {

            alert(
                "Theme settings will be added later."
            );

        }
    );

}


/* =========================================================
   LOGOUT
========================================================= */

const logoutLink =
    document.querySelector(
        ".logout-link"
    );


if (logoutLink) {

    logoutLink.addEventListener(
        "click",
        function(event) {

            event.preventDefault();


            const confirmLogout =
                confirm(
                    "Do you want to logout?"
                );


            if (confirmLogout) {

                alert(
                    "Logout feature will be connected with backend later."
                );

            }

        }
    );

}


/* =========================================================
   START APPLICATION
========================================================= */

updateAnalytics();

filterApplications();

console.log(
    "AI Job Tracker JavaScript loaded successfully."
);
// =========================
// SETTINGS
// =========================


const saveSettingBtn = document.getElementById("saveSettingsBtn");
if(saveSettingsBtn){
    saveSettingsBtn.addEventListener("click",function(){

        const name = document.getElementById("settingsName").value.trim();
        const email =  document.getElementById("settingsEmail").value.trim();
        const role = document.getElementById("settingsRole").value.trim();
        const preferredRole = document.getElementById("preferredRole").value.trim();
        const preferredLoaction = document.getElementById("preferredLocation").value.trim();
        const workMode = document.getElementById("workMode").value;
        const minimumSalary = document.getElementById("minimumSalary").value;
        if(name  === "" ||  email === ""|| role === "") {
            alert("please fill all profile fields.");
            return;
        }
        alert("settings saved successfully!");
        console.log("Name:",name);
                console.log("Email:", email);
        console.log("Target Role:", role);
        console.log("Preferred Role:", preferredRole);
        console.log("Preferred Location:", preferredLocation);
        console.log("Work Mode:", workMode);
        console.log("Minimum Salary:", minimumSalary);
 });
}

const jobTypeInputs = [
    document.getElementById("fullTime"),
    document.getElementById("internship"),
    document.getElementById("freelance")
];
jobTypeInputs.forEach(function(input){
    if(input){
        input.addEventListener("change",function(){
            if(this.checked){
                console.log(this.id+"selected");
            }else{

                console.log(this.id+"unselected");
            }
        });
    }
});
const aipreferences = [
    document.getElementById("aiResumeSuggestions"),
    document.getElementById("aiSkillRecommendations"),
    document.getElementById("aiJobMatching")
];
aipreferences.forEach(function(toggle){

    if(toggle){
toggle.addEventListener("change",function(){
    if(this.checked){

        console.log(this.id + "enabled");

    }else{
        console.log(this.id+"disabled");
    }

});
    }

});
const interviewNotification =
    document.getElementById("interviewNotification");

const applicationNotification =
    document.getElementById("applicationNotification");


if (interviewNotification) {
    interviewNotification.addEventListener("change", function () {

        if (this.checked) {
            console.log("Interview notifications enabled 🔔");
        } else {
            console.log("Interview notifications disabled 🔕");
        }

    });
}


if (applicationNotification) {
    applicationNotification.addEventListener("change", function () {

        if (this.checked) {
            console.log("Application notifications enabled 🔔");
        } else {
            console.log("Application notifications disabled 🔕");
        }

    });
}
const deleteAllApplicationsBtn =
    document.getElementById("deleteAllApplicationsBtn");

if (deleteAllApplicationsBtn) {
    deleteAllApplicationsBtn.addEventListener("click", function () {

        const confirmDelete = confirm(
            "Are you sure you want to delete all applications?"
        );

        if (!confirmDelete) {
            return;
        }

        const jobs = document.querySelectorAll("#dashboardJobs .job");

        jobs.forEach(function (job) {
            job.remove();
        });

        updateAnalytics();
        renderApplicationsPage();

        alert("All applications deleted successfully! 🗑️");
    });
}
const resetDashboardBtn =
    document.getElementById("resetDashboardBtn");

if (resetDashboardBtn) {
    resetDashboardBtn.addEventListener("click", function () {

        const confirmReset = confirm(
            "Are you sure you want to reset the dashboard?"
        );

        if (!confirmReset) {
            return;
        }

        // Remove all applications
        const jobs = document.querySelectorAll("#dashboardJobs .job");

        jobs.forEach(function (job) {
            job.remove();
        });

        // Reset profile fields
        document.getElementById("settingsName").value = "";
        document.getElementById("settingsEmail").value = "";
        document.getElementById("settingsRole").value = "";

        // Reset career preferences
        document.getElementById("preferredRole").value = "";
        document.getElementById("preferredLocation").value = "";

        // Reset selects
        document.getElementById("workMode").selectedIndex = 0;
        document.getElementById("minimumSalary").selectedIndex = 0;

        // Reset job types
        document.getElementById("fullTime").checked = false;
        document.getElementById("internship").checked = false;
        document.getElementById("freelance").checked = false;

        // Reset AI preferences
        document.getElementById("aiResumeSuggestions").checked = false;
        document.getElementById("aiSkillRecommendations").checked = false;
        document.getElementById("aiJobMatching").checked = false;

        // Reset notifications
        document.getElementById("interviewNotification").checked = false;
        document.getElementById("applicationNotification").checked = false;

        // Update dashboard
        updateAnalytics();
        renderApplicationsPage();

        alert("Dashboard has been reset successfully! 🔄");
    });
}