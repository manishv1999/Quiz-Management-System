/***************************** JS for login and signup page *****************************************/

// JS for login page

let inputPass = document.getElementById("pass");
let eyeImg = document.getElementById("eye-img");

if (inputPass && eyeImg) {
  eyeImg.onclick = function () {
    if (inputPass.type == "password") {
      inputPass.type = "text";
      eyeImg.src = "./assets/visible.png";
    } else {
      inputPass.type = "password";
      eyeImg.src = "./assets/hidden.png";
    }
  };
}

let loginForm = document.querySelector("#login");

if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify([]));
}

function updateLoggedInStatus(emailId, user, users) {
  user.isLoggedIn = true;
  let user1 = users.find((user) => user.emailId === emailId);
  users.forEach((user) => {
    if (user.emailId === user1.emailId) {
      user = user1;
    }
  });
  console.log(user1);
  localStorage.setItem("users", JSON.stringify(users));
}

//Login Credential for Admin Page
let admin_email = "admin@gmail.com";
let admin_password = "admin";

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let emailId = document.querySelector("#email-id").value;
    let password = document.querySelector("#pass").value;
    console.log(password);

    let users = JSON.parse(localStorage.getItem("users"));
    let user = users.find((user) => user.emailId === emailId);

    // login authentication for Admin
    if (emailId === admin_email && password === admin_password) {
      let admin_credential = {
        admin_email: admin_email,
        admin_password: admin_password,
        isLoggedIn: true,
      };
      localStorage.setItem(
        "admin_credential",
        JSON.stringify(admin_credential)
      );
      location.href = "admin.html";
    }
    // login authentication for Users
    else if (user && user.password === password) {
      updateLoggedInStatus(emailId, user, users);

      // user.isLoggedIn = true;
      // let user1 = users.find((user) => user.emailId === emailId);
      // users.forEach((user) => {
      //   if (user.emailId === user1.emailId) {
      //     user = user1;
      //   }
      // });
      // console.log(user1);
      // localStorage.setItem("users", JSON.stringify(users));
      location.href = "quiz-home.html";
    } else {
      alert("Invalid Credentials. Please try again OR try to signup");
      location.reload();
    }
  });
}
// JS for signup page

const passwordPattern =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

function validatePassword(passwordInput) {
  let passwordFeedback = document.querySelector("#password-feedback");

  let password = passwordInput.value;
  if (!password) {
    console.log(passwordFeedback.innerText);
    passwordFeedback.innerText = "";
    return false;
  }

  if (!passwordPattern.test(password)) {
    passwordFeedback.innerText =
      "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.";
    passwordFeedback.className = "error";
    return false;
  } else {
    passwordFeedback.innerText = "Password is OK.";
    passwordFeedback.className = "success";
    return true;
  }
}

const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
function validateEmailId(emailInput) {
  let emailFeedback = document.querySelector("#email-feedback");
  let email = emailInput.value;

  if (!emailPattern.test(email)) {
    emailFeedback.innerText = "Invalid Email";
    emailFeedback.className = "error";
  } else {
    emailFeedback.innerText = "";
  }
}

let signupForm = document.querySelector("#signup");
if (signupForm) {
  // To check for password validation
  let passwordInput = document.querySelector("#pass");
  let emailInput = document.querySelector("#email-id");

  emailInput.addEventListener("input", (e) => {
    validateEmailId(emailInput);
  });

  passwordInput.addEventListener("input", (e) => {
    validatePassword(passwordInput);
  });

  // Logic for form submission
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let name = document.querySelector("#name").value;
    let emailId = document.querySelector("#email-id").value;
    let password = document.querySelector("#pass").value;
    let isLoggedIn = false;

    if (validatePassword(passwordInput)) {
      let users = JSON.parse(localStorage.getItem("users"));
      let user = users.find((user) => user.emailId === emailId);

      if (user) {
        alert("User already registered. Please login.");
      } else {
        users.push({ name, emailId, password, isLoggedIn });
        localStorage.setItem("users", JSON.stringify(users));
        alert("Registration successful. Please login.");
        location.href = "login.html";
      }
    }
  });
}

/***************************** JS for Quiz-home page *****************************************/

let quizMainCard = document.querySelector("#quiz-main");
let quizMainCardBtn = document.querySelector(".quiz-card button");

if (quizMainCard) {
  let fetchUsername = document.querySelector(
    ".nav-right-section .fetch-username"
  );
  let users = JSON.parse(localStorage.getItem("users"));
  let user = users.find((user) => user.isLoggedIn == true);
  let loggedInUsername = user.name;

  let capitaliseString = capitaliseWords(loggedInUsername);
  fetchUsername.innerText = capitaliseString;

  quizMainCardBtn.addEventListener("click", (e) => {
    // e.preventDefault();
    // let name = document.querySelector("#name-for-quiz").value;
    // let email = document.querySelector("#email-for-quiz").value;
    // let contactno = document.querySelector("#contactno-for-quiz").value;

    // if (!localStorage.getItem("quiz_users")) {
    //   localStorage.setItem("quiz_users", JSON.stringify([]));
    // }
    // let quiz_users = JSON.parse(localStorage.getItem("quiz_users"));
    // quiz_users.push({ name, email, contactno });
    // //   console.log(name, email, contactno);

    // localStorage.setItem("quiz_users", JSON.stringify(quiz_users));
    let userConfirmed = confirm("Are you surely want to start the Quiz?");
    if (userConfirmed) {
      location.href = "questions.html";
    }
  });
}

/***************************** JS for Quiz-home And Questions page *****************************************/

let fetchingUserDetailsSection = document.querySelector(
  "#nav-fetching-user-details"
);
let personalAccount = document.querySelector(".account-img");
// console.log(personalAccount);

function capitaliseWords(string) {
  return string
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function fetchUserNameAndProfilePic(fetchUsername, personalAccount) {
  let users = JSON.parse(localStorage.getItem("users"));
  let user = users.find((user) => user.isLoggedIn == true);
  // console.log(user);
  if (user) {
    let loggedInUsername = user.name;
    // console.log(fetchUsername);
    let capitaliseString = capitaliseWords(loggedInUsername);
    fetchUsername.innerText = capitaliseString;
  }

  if (user.image) {
    let personalAccountImg = personalAccount.firstElementChild;
    personalAccountImg.src = user.image;
  }
  // console.log(capitaliseString);
}

function fetchingPersonalDetails(accountLogo, nameElem, emailElem) {
  let admin_credential = JSON.parse(localStorage.getItem("admin_credential"));
  //For Admin
  if (admin_credential.isLoggedIn === true) {
    emailElem.innerText = admin_credential.admin_email;
    accountLogo.innerHTML = "<img src='./assets/Admin.png'></img>";
  }
  //For Users
  else {
    let users = JSON.parse(localStorage.getItem("users"));
    let user = users.find((user) => user.isLoggedIn === true);
    // console.log(user)
    accountLogo.innerText = user.name.charAt(0).toUpperCase();
    nameElem.innerText = capitaliseWords(user.name);
    emailElem.innerText = user.emailId;
  }
}

// To display users Image
function displayImage(imgSrc, personalAccount, accountImg) {
  let personalAccountImg = personalAccount.firstElementChild;

  accountImg.innerHTML = "";

  const img = document.createElement("img");

  img.src = imgSrc;
  personalAccountImg.src = imgSrc;

  accountImg.appendChild(img);
}

// To save users image in LocalStorage
function saveImgUrlOfUser(users, imgSrc) {
  users.forEach((user) => {
    if (user.isLoggedIn === true) {
      user.image = imgSrc;
    }
  });

  localStorage.setItem("users", JSON.stringify(users));
}

//logic to upload image file
function imgFileUpload(fileUploader, personalAccount) {
  const accountImg = document.querySelector(
    ".account-logo-wrapper .account-logo"
  );

  const users = JSON.parse(localStorage.getItem("users"));
  const user = users.find((user) => user.isLoggedIn === true);

  const savedImage = user.image;
  if (savedImage) {
    displayImage(savedImage, personalAccount, accountImg);
  }

  fileUploader.addEventListener("change", (event) => {
    const file = event.target.files[0];

    if (file) {
      let reader = new FileReader();
      reader.onload = function (e) {
        const imgSrc = e.target.result;

        saveImgUrlOfUser(users, imgSrc);

        displayImage(imgSrc, personalAccount, accountImg);
      };
      reader.readAsDataURL(file);
    }
  });
}

if (fetchingUserDetailsSection) {
  let logoutCard = document.querySelector(".logout-card");
  let fileUploader = document.getElementById("file-uploader");
  let accountLogo = document.querySelector(".logout-card .account-logo");
  let userName = document.querySelector(".logout-card .account-details .name");
  let userEmail = document.querySelector(
    ".logout-card .account-details .email"
  );
  let logoutBtn = document.querySelector(".logout-card button");
  let fetchUsername = document.querySelector(
    ".nav-right-section .fetch-username"
  );

  // console.log(userName, userEmail);
  // console.log(fetchUsername)
  if (fetchUsername) {
    fetchUserNameAndProfilePic(fetchUsername, personalAccount);
  }

  personalAccount.addEventListener("click", (e) => {
    personalAccount.classList.toggle("clicked");
    logoutCard.classList.toggle("visible");

    fetchingPersonalDetails(accountLogo, userName, userEmail);

    //logic to upload image file
    if (fileUploader) {
      imgFileUpload(fileUploader, personalAccount);
    }
  });

  document.addEventListener("click", (e) => {
    if (!personalAccount.contains(e.target) && !logoutCard.contains(e.target)) {
      personalAccount.classList.remove("clicked");
      logoutCard.classList.add("visible");
    }
  });

  //logic to logout user

  logoutBtn.addEventListener("click", (e) => {
    //For Admin
    let admin_credential = JSON.parse(localStorage.getItem("admin_credential"));
    if (admin_credential.isLoggedIn === true) {
      admin_credential.isLoggedIn = false;
      localStorage.setItem(
        "admin_credential",
        JSON.stringify(admin_credential)
      );
    } else {
      //For Users
      let users = JSON.parse(localStorage.getItem("users"));
      users.forEach((user) => {
        if (user.isLoggedIn === true) {
          user.isLoggedIn = false;
        }
      });
      localStorage.setItem("users", JSON.stringify(users));
    }
    // console.log(users);
    location.href = "login.html";
  });
}

/***************************** JS for Questions page *****************************************/

//for fetching 50 questions from localStorage
let questionsLists = JSON.parse(localStorage.getItem("questions"));

//for swappping question
function getRandomQuestions(array) {
  let randomArray = [];

  while (randomArray.length < 10) {
    let randomIndex = Math.floor(Math.random() * array.length);
    randomArray.push(array[randomIndex]);
    array.splice(randomIndex, 1);
  }

  return randomArray;
}

let questions = getRandomQuestions(questionsLists);


let nextBtn = document.querySelector(".ques-change .next");
let prevBtn = document.querySelector(".ques-change .prev");

let questionsMain = document.querySelector("#questions-main");

// Creating usersTests to save questions given to user and their selected answer in LocalStorage
function saveUserQuizDetails() {
  let usersTests = JSON.parse(localStorage.getItem("usersTests")) || [];

  let users = JSON.parse(localStorage.getItem("users"));
  let user = users.find((user) => user.isLoggedIn === true);
  if (user) {
    let userTest = {
      user_email: user.emailId,
      questions: questions,
      quizStartTime: new Date(),
    };

    usersTests.unshift(userTest);
  }
  localStorage.setItem("usersTests", JSON.stringify(usersTests));
  // console.log("questionsMain saveUserQuizDetails");
}

function findTestUser(usersTests) {
  let users = JSON.parse(localStorage.getItem("users"));
  let user = users.find((user) => user.isLoggedIn === true);
  return usersTests.find((userTest) => userTest.user_email === user.emailId);
}

function displayQuestionAnswer(index, question, quesText) {
  let questionHeading = document.createElement("h3");
  questionHeading.innerText = `${index + 1}. ${question.ques}`;

  let orderedList = document.createElement("ol");
  orderedList.classList.add("options");

  for (let i = 0; i < 4; i++) {
    let listItem = document.createElement("li");
    listItem.innerText = `${question.option[i]}`;
    orderedList.appendChild(listItem);
  }

  quesText.append(questionHeading);
  quesText.appendChild(orderedList);
}

function updateProgressBar(yellowLine, index, questions) {
  yellowLine.style.width = `calc((${index + 1})*(1/${questions.length})*100%)`;
}

function renderSelectedAnswer(index) {
  let usersTests = JSON.parse(localStorage.getItem("usersTests")) || [];
  let userTest = findTestUser(usersTests);
  return userTest.questions[index].selected_ans;
}

function hightlightPreviouslySelectedAns(selectOptions, index) {
  selectOptions.forEach((selectOption) => {
    if (selectOption.innerText === renderSelectedAnswer(index)) {
      selectOption.classList.add("selected");
      selectOption.style.listStyle = "none";
    }
  });
}

// saving selected answer into LocalStorage at given index
function saveSelectedAnswer(selectOpt, index) {
  let usersTests = JSON.parse(localStorage.getItem("usersTests")) || [];

  let userTest1 = findTestUser(usersTests);

  usersTests.forEach((userTest) => {
    if (userTest === userTest1) {
      userTest.questions[index].selected_ans = selectOpt;
    }
  });

  console.log(usersTests);
  localStorage.setItem("usersTests", JSON.stringify(usersTests));
}

function highlightCurrentSelectedAns(selectOptions, index) {
  selectOptions.forEach((selectOption) => {
    selectOption.addEventListener("click", () => {
      //mark the selected option
      selectOption.classList.toggle("selected");

      //for unselected option
      selectOptions.forEach((option) => {
        if (option != selectOption) {
          option.classList.remove("selected");
        }
      });

      //save the selected answer
      if (selectOption.classList.contains("selected")) {
        let selectOpt = selectOption.innerText;
        saveSelectedAnswer(selectOpt, index);
      } else {
        let selectOpt = null;
        saveSelectedAnswer(selectOpt, index);
      }
    });
  });
}

let currentIndex = 0;

function showQuestion(index) {
  let quesNo = document.querySelector(".ques-number h1");
  let quesText = document.querySelector(".ques-text");
  let prevBtn = document.querySelector(".ques-change .prev");
  let nextBtnText = document.querySelector(".ques-change .next p");
  let yellowLine = document.querySelector("#yellow-line");

  let question = questions[index];

  // Clear previous question
  quesText.innerHTML = "";

  if (index == questions.length - 2) {
    quesNo.innerText = `Last 2 Questions Left`;
  } else if (index == questions.length - 1) {
    quesNo.innerText = "Hey this is the Last Question";
  } else {
    quesNo.innerText = `Question ${index + 1} of ${questions.length}`;
  }

  // Create and display question heading and options(Answers)
  displayQuestionAnswer(index, question, quesText);

  // update progress bar w.r.t. question number
  updateProgressBar(yellowLine, index, questions);

  if (index === 0) {
    prevBtn.classList.add("prev-visibility");
  } else {
    prevBtn.classList.remove("prev-visibility");
  }

  if (index === questions.length-1) {
    nextBtnText.innerText = "Submit";
  } else {
    nextBtnText.innerText = "Next";
  }

  let selectOptions = document.querySelectorAll(".options li");

  //highlight previously selected answer
  hightlightPreviouslySelectedAns(selectOptions, index);

  //highlight current selected answer
  highlightCurrentSelectedAns(selectOptions, index);
}

//Calculating total quiz score and saving it in local Storage
function calculateAndSaveTotalScore() {
  let usersTests = JSON.parse(localStorage.getItem("usersTests")) || [];
  let userTest1 = findTestUser(usersTests);

  let score = 0;
  userTest1.questions.forEach((question) => {
    if (question.correct_ans === question.selected_ans) {
      score += 10;
    }
  });

  //saving score in local Storage
  usersTests.forEach((userTest) => {
    if (userTest === userTest1) {
      userTest.score = score;
      userTest.quizEndTime = new Date();
    }
  });
  console.log("score", score);
  localStorage.setItem("usersTests", JSON.stringify(usersTests));
}

function submitQuizzes() {
  let confirmSubmit = confirm("Are you sure want to submit the quiz?");
  if (confirmSubmit) {
    //Calculating total quiz score
    calculateAndSaveTotalScore();

    location.href = "leaderboard.html";
  }
}

// for rendering of initial question
// showQuestion(currentIndex);

// for rendering of next question
if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    if (currentIndex === questions.length-1) {
      submitQuizzes();
    }
    if (currentIndex < questions.length - 1) {
      currentIndex++;
      showQuestion(currentIndex);
    }
  });
}

// for rendering of previous question
if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      showQuestion(currentIndex);
    }
  });
}

/***************************** JS for leaderboard page *****************************************/

// Storing users list who have attempted test
function saveTestAttemptedUsersLists(distinctUserTests) {
  let testAttemptedUsersList =
    JSON.parse(localStorage.getItem("testAttemptedUsersList")) || null;
  // testAttemptedUsersList = [];
  testAttemptedUsersList = distinctUserTests;

  localStorage.setItem(
    "testAttemptedUsersList",
    JSON.stringify(testAttemptedUsersList)
  );
  console.log(distinctUserTests);
}

//sorting usersTests based on score for distinct usersTests
function sortedUsersTests(usersTests) {
  // console.log("usersTests",usersTests)
  let distinctUserTests = [];
  for (let i = 0; i < usersTests.length; i++) {
    for (let j = i + 1; j < usersTests.length; j++) {
      if (usersTests[i] !== null && usersTests[j] !== null) {
        // console.log(usersTests[i] )
        if (usersTests[i].user_email === usersTests[j].user_email) {
          console.log(usersTests[j].user_email);
          usersTests[j] = null;
        }
      }
    }
    if (usersTests[i] !== null) {
      distinctUserTests.push(usersTests[i]);
    }
  }

  // Storing users list who have attempted test
  saveTestAttemptedUsersLists(distinctUserTests);

  return distinctUserTests.sort((a, b) => b.score - a.score);
}

let leaderboard = document.querySelector("#leaderboard-main");
let rankStatus = document.querySelector(".rank-status h1");
let rankProfileLeft = document.querySelector("#rank-profile-left");
let rankProfileMiddle = document.querySelector("#rank-profile-middle");
let rankProfileRight = document.querySelector("#rank-profile-right");
let profilePics = document.querySelectorAll(".profile-pic img");
let curveContainer = document.querySelector(".curve-container");
let rankList = document.querySelector(".rank-list");
let userTestScores = document.querySelectorAll(".user-test-score");
let userTestNames = document.querySelectorAll(".user-test-name");
let lastThreeRowRanking = document.querySelectorAll(".last-three-row-ranking");

// finding Rank of userTest
function findUserTestRank(userTest, sortedUsersTest) {
  let rank = 0;
  for (let i = 0; i < sortedUsersTest.length; i++) {
    if (sortedUsersTest[i].user_email === userTest.user_email) {
      rank = i;
      break;
    }
  }
  return rank + 1;
}

// Updating Rank of userTest based on user Rank
function updateUserTestRank(userTestRank) {
  if (userTestRank === 1) {
    rankStatus.innerText = `Wow You Rank ${userTestRank}st`;
  } else if (userTestRank === 2) {
    rankStatus.innerText = `Wow You Rank ${userTestRank}nd`;
  } else if (userTestRank === 3) {
    rankStatus.innerText = `Wow You Rank ${userTestRank}rd`;
  } else {
    rankStatus.innerText = `Wow You Rank ${userTestRank}th`;
  }
}

function findUserAgainstTestsUser(sortedUsersTest) {
  let users = JSON.parse(localStorage.getItem("users"));
  let user = users.find((user) => sortedUsersTest.user_email === user.emailId);
  return user;
}

const loadLeaderboardPage = () => {
  let usersTests = JSON.parse(localStorage.getItem("usersTests"));

  let userTest = findTestUser(usersTests);
  let sortedUsersTest = sortedUsersTests(usersTests);

  let userTestRank = findUserTestRank(userTest, sortedUsersTest);
  // console.log(userTestRank);
  updateUserTestRank(userTestRank);

  // console.log(sortedUsersTest);

  for (let i = 0; i < userTestScores.length; i++) {
    if (i <= 2) {
      userTestScores[i].innerText = sortedUsersTest[i].score;

      let userProfilePic = findUserAgainstTestsUser(sortedUsersTest[i]).image;
      if (userProfilePic != undefined) {
        profilePics[i].src = userProfilePic;
      }
    } else {
      if (userTestRank > 6) {
        if (i === 3) {
          userTestScores[i].innerText = sortedUsersTest[userTestRank - 1].score;
          userTestNames[i - 3].innerText = capitaliseWords(
            findUserAgainstTestsUser(sortedUsersTest[userTestRank - 1]).name
          );
          lastThreeRowRanking[i - 3].innerText = `#${userTestRank}`;

          let parentElement = userTestScores[i].parentElement;
          parentElement.style.backgroundColor = "#FBF1CE";
        } else {
          userTestNames[i - 3].innerText = capitaliseWords(
            findUserAgainstTestsUser(sortedUsersTest[i]).name
          );
          userTestScores[i].innerText = sortedUsersTest[i].score;
          lastThreeRowRanking[i - 3].innerText = `#${i}`;
        }
      } else {
        userTestNames[i - 3].innerText = capitaliseWords(
          findUserAgainstTestsUser(sortedUsersTest[i]).name
        );
        userTestScores[i].innerText = sortedUsersTest[i].score;
      }
    }
  }
};

/***************************** JS for Admin page *****************************************/

//For Admin page********************************************************

let sidebarActiveBtn = document.querySelector("#sidebar_active");
let sidebar = document.querySelector("#main-section .sidebar");
let techpsLogo = document.querySelector(".nav-left-section img");

//To toggle sidepanel
if (sidebarActiveBtn) {
  // console.log(sidebarActiveBtn);
  sidebarActiveBtn.addEventListener("click", () => {
    sidebarActiveBtn.classList.toggle("sidebar-active-transform");
    sidebar.classList.toggle("sidebar-margin");
    // techpsLogo.classList.toggle("sidebar-active-btn-margin");
  });
}

let menuItems = document.querySelectorAll(".menu-item");
if (menuItems) {
  menuItems.forEach((menuItem) => {
    menuItem.addEventListener("click", () => {
      let anchorTag = menuItem.querySelector("a").getAttribute("href");
      //to redirect to href link
      location.href = anchorTag;
    });
  });
}

let currentUrl = window.location.href;
function highlightSidebarLinks() {
  if (menuItems) {
    menuItems.forEach((menuItem) => {
      let anchorTag = menuItem.querySelector("a").getAttribute("href");
      if (currentUrl.includes(anchorTag)) {
        menuItem.querySelector("a").style = "color:#F3BD00";
        menuItem.querySelector("i").style = "color:#F3BD00";
      }
    });
  }
}
//To Highlight Sidebar Links
highlightSidebarLinks();

//For Users Page**************************************************

function noOfTestGivenByUser(user) {
  let usersTests = JSON.parse(localStorage.getItem("usersTests"));
  // console.log(usersTests)
  let countOfTest = usersTests.reduce((count, userTest) => {
    if (user.emailId === userTest.user_email) {
      count++;
    }
    return count;
  }, 0);
  return countOfTest;
}

function latestTestScoreOfUser(user) {
  console.log(user.emailId);
  let usersTests = JSON.parse(localStorage.getItem("usersTests"));
  // console.log(usersTests)
  let userTest = usersTests.find((userTest) => {
    console.log(userTest.user_email);

    return user.emailId === userTest.user_email;
  });
  // console.log(userTest);
  if (userTest.score === undefined) {
    userTest.score = 0;
  }

  console.log(userTest.score);
  return userTest.score;
}

//setting href to view more btn for each user
function addLinkToViewMoreBtn(user, idx) {
  let usersViewBtns = document.querySelectorAll(
    "#users-table .view-user-tests a"
  );
  // console.log(usersViewBtns);

  let testAttemptedUsersList = JSON.parse(
    localStorage.getItem("testAttemptedUsersList") 
  ) || [];

  let testAttemptedUsersListRev = testAttemptedUsersList.reverse();

  let users = JSON.parse(localStorage.getItem("users"));

  console.log(testAttemptedUsersListRev);
  testAttemptedUsersListRev.forEach((testAttemptedUser, idx) => {
    let user = users.find(
      (user) => testAttemptedUser.user_email == user.emailId
    );
    // console.log(testAttemptedUser)
    usersViewBtns[idx].href = `users-testlist.html?name=${capitaliseWords(
      user.name
    )}&email=${user.emailId}`;
  });
}

let usersTable = document.querySelector("#users-table");
let usersTableBody = document.querySelector("#users-table table tbody");
// console.log(usersTableBody);

function hasUserTestGiven(user) {
  let usersTests = JSON.parse(localStorage.getItem("usersTests"));

  if (usersTests.find((userTest) => user.emailId === userTest.user_email)) {
    return true;
  } else {
    return false;
  }
}

function displayUsersQuizDetails() {
  let users = JSON.parse(localStorage.getItem("users"));
  // console.log(users)
  let index = 0;
  users.forEach((user, idx) => {
    if (hasUserTestGiven(user)) {
      console.log(user)
      let tr = document.createElement("tr");
      tr.innerHTML = `<td>${++index}</td>
        <td>${capitaliseWords(user.name)}</td>
        <td>${user.emailId}</td>
        <td>${noOfTestGivenByUser(user)}</td>
        <td>${latestTestScoreOfUser(user)}</td>
        <td class='view-user-tests'><a href='#'>View Tests</a></td>
        `;
      usersTableBody.append(tr);
      index;
    }
  });

  //setting href to view more btn for each user
  addLinkToViewMoreBtn();
}

// displayUsersQuizDetails();

//For Quizzes Page**********************************************************
function saveQuestions(addModal, questions) {
  let questionText = addModal.querySelector("#question-text").value;
  let options = Array.from(addModal.querySelectorAll(".options")).map(
    (option) => option.value
  );
  let correctOption = addModal.querySelector("#correct-option").value;

  console.log(questionText, options);
  let newQuestion = {
    ques: questionText,
    option: options,
    correct_ans: correctOption,
  };

  questions.unshift(newQuestion);

  localStorage.setItem('questions' , JSON.stringify(questions));
  // console.log(questions);
}

// to show Add modal
function showAddModal(addQuestionBtn , addModal , options){
  addQuestionBtn.addEventListener("click", () => {
    addModal.classList.remove("hidden");

    // to populate correct_option options
    let correctOptionLists = addModal.querySelectorAll(
      "#correct-option option"
    );

    options.forEach((option, idx) => {
      option.addEventListener('input' , (e) => {
        correctOptionLists[idx].innerText = e.target.value;
        correctOptionLists[idx].value = e.target.value;
      })
    });
  });
}

function addQuestion(addQuestionBtn, addModal, questions) {
  let closeModalBtn = document.querySelector("#add-modal .close-icon");
  let modalForm = document.querySelector(".modal-form");

  // let questionText = addModal.querySelector("#question-text").value;
  let options = addModal.querySelectorAll(".options");
  // let correctOption = addModal.querySelector("#correct-option");

  // to show modal
  showAddModal(addQuestionBtn , addModal , options);

  // to hide modal
  closeModalBtn.addEventListener("click", () => {
    addModal.classList.add("hidden");
  });

  // on submitting added question
  modalForm.addEventListener("submit", (e) => {
    e.preventDefault();
    saveQuestions(addModal, questions);
    window.location.reload();
  });
}

function handleDeleteModal(element , deleteModal){
  let tbody = document.querySelector("#questions-list table tbody");

  let deleteBtn = document.querySelector('.delete-successs-btn');
  let cancelBtn = document.querySelector('.delete-cancel-btn');

  console.log(element , deleteBtn);
  let questionIndex = element.getAttribute('data-index');
  console.log(questionIndex);

  let questions = JSON.parse(localStorage.getItem("questions")) || [];

  // to delete question
  deleteBtn.addEventListener('click' , (e) => {
    console.log(questionIndex)
    questions.splice(questionIndex , 1);
    
    localStorage.setItem('questions' , JSON.stringify(questions));

    window.location.reload();
  })

  // to cancel delete modal
  cancelBtn.addEventListener('click' , (e) => {
    deleteModal.style = 'display:none';
  })
}

function deleteQuestion(){
  let quizDeleteBtns = document.querySelectorAll('.quiz-delete');
  let deleteModal = document.querySelector('#delete-modal');

  quizDeleteBtns.forEach(element => {
    element.addEventListener('click' , (e) => {
      deleteModal.classList.remove('hidden');
      deleteModal.style = 'display:flex';
    
      handleDeleteModal(e.target , deleteModal);
    })
  })
}


function populateViewModal(element){
  let quesSubtitle = document.querySelector('.view-modal-body .ques-subtitle');
  let quesTitle = document.querySelector('.view-modal-body .ques-title');
  let optTitle = document.querySelectorAll('.view-modal-body .opt-title');
  let correctOptTitle = document.querySelector('.view-modal-body .correct-opt-title');

  let index = element.getAttribute('data-index');
  let questions = JSON.parse(localStorage.getItem("questions")) || [];
  console.log(questions)
  let question = questions[index];
  console.log(index)
  quesSubtitle.innerText = `Question ${++index}`;
  quesTitle.innerText = question.ques;

  question.option.forEach((opt , idx) => {
    optTitle[idx].innerText = opt; 
  })

  correctOptTitle.innerText = question.correct_ans;
}


function viewQuestion(){
  let quizViewBtns = document.querySelectorAll('.quiz-view');
  let viewModal = document.querySelector('#view-modal');
  let closeViewModal = document.querySelector('#view-modal .close-icon');

  // to display/popup view question modal
  quizViewBtns.forEach(element => {
    element.addEventListener('click' , (e) => {
      viewModal.classList.remove('hidden');

      // to populate view modal
      console.log(e.target)
      populateViewModal(e.target);
    })
  })

  // to close view modal
  closeViewModal.addEventListener('click' , (e) => {
    // console.log(closeViewModal)
    viewModal.classList.add('hidden');
  })
}

let editQuestionIndex ;

function populateEditModal(quizEditBtn , quesTitle , selectOptions , correctOptions){
  let modalTitle = document.querySelector('#edit-modal .modal-title');
  let quesSubtitle = document.querySelector('#edit-modal .ques-subtitle');

  modalTitle.innerText = 'Edit Question';

  editQuestionIndex = quizEditBtn.getAttribute('data-index');
  let questions = JSON.parse(localStorage.getItem("questions")) || [];
  let question = questions[editQuestionIndex];

  quesSubtitle.innerHTML = `Question ${++editQuestionIndex} <span class="input-required">*</span>`;
  quesTitle.innerText = question.ques;

  question.option.forEach((opt , idx) => {
    selectOptions[idx].value = opt; 
  })

  // populate value of correctOptions on change event
  selectOptions.forEach((selectOption , idx) => {
    selectOption.addEventListener('change' , () => {
      correctOptions[idx].value = selectOption.value;
      correctOptions[idx].innerText = selectOption.value;
    })
  })  

  // populate value of correctOptions with default values(or after change event) of selectOptions
  correctOptions.forEach((correctOpt , idx) => {
    correctOpt.value = selectOptions[idx].value;
    correctOpt.innerText = selectOptions[idx].value;
  })
}

function savEditedQuestion(quesTitle , selectOptions , correctOpt){
  let options = Array.from(selectOptions).map(opt => opt.value);
  let editedQuestion = {
    ques: quesTitle.value,
    option: options,
    correct_ans: correctOpt.value,
  };

  let questions = JSON.parse(localStorage.getItem("questions")) || [];
  let questionIdx = --editQuestionIndex;

  questions.forEach((question , idx) => {
    if(questionIdx == idx){
      questions[idx] = editedQuestion;
      console.log(idx)
    }
  })

  localStorage.setItem('questions' , JSON.stringify(questions));
  console.log(questions);
}

function editQuestion(){
  let editModal = document.querySelector('#edit-modal');
  let editModalForm = document.querySelector(".edit-modal-form");
  let quesTitle = document.querySelector('#edit-modal .ques-title');
  let selectOptions = document.querySelectorAll('#edit-modal .edit-options');
  let correctOptions = document.querySelectorAll('#edit-modal #correct-option .edit-option');
  let correctOpt = document.querySelector('#edit-modal #correct-option');
  let closeModalBtn = document.querySelector("#edit-modal .close-icon");


  let quizEditBtns = document.querySelectorAll
  ('.quiz-edit');

  quizEditBtns.forEach((quizEditBtn , idx) => {
    quizEditBtn.addEventListener('click' , (e) => {

      // to show edit modal
      editModal.classList.remove("hidden");

      // to populate edit modal
      populateEditModal(e.target , quesTitle , selectOptions , correctOptions);

    })
  })

  // to hide modal
  closeModalBtn.addEventListener("click", () => {
    editModal.classList.add("hidden");
  });

  // on submitting edit modal form
  editModalForm.addEventListener('submit' , (e) => {
    e.preventDefault();

    savEditedQuestion(quesTitle , selectOptions , correctOpt);
    window.location.reload();
  })

  // 

}

let loadQuizzesPage = () => {
  let questionsList = document.querySelector("#questions-list");
  let addQuestionBtn = document.querySelector("#add-question-btn");
  let addModal = document.querySelector("#add-modal");
  let tbody = document.querySelector("#questions-list table tbody");

  let questions = JSON.parse(localStorage.getItem("questions")) || [];
  if (questions.length > 0) {
    questions.forEach((question, idx) => {
      let trow = document.createElement("tr");

      let td1 = document.createElement("td");
      td1.innerText = ++idx;
      trow.appendChild(td1);

      let td2 = document.createElement("td");
      td2.innerText = question.ques;
      trow.appendChild(td2);

      question.option.forEach((opt) => {
        let td3 = document.createElement("td");
        td3.innerText = opt;

        // trow.appendChild(td3);
      });

      let td4 = document.createElement("td");
      td4.innerText = question.correct_ans;
      // trow.appendChild(td4);

      let td5 = document.createElement("td");
      td5.innerHTML = `
        <div class= 'quizzes-actions'>
          <div class='quiz-view' data-index = '${idx-1}'><i class="fa-solid fa-eye" data-index = '${idx-1}'></i></div>
          <div class='quiz-edit' data-index = '${idx-1}'><i class="fa-solid fa-pen" data-index = '${idx-1}'></i></div>
          <div class='quiz-delete' data-index = '${idx-1}'><i class="fa-solid fa-trash" data-index = '${idx-1}'></i></div>
        </div>
      `;
      trow.appendChild(td5);

      tbody.appendChild(trow);
    });
  }

  // to add new Question
  addQuestion(addQuestionBtn, addModal, questions);

  // to add a Question
  deleteQuestion();

  // to view a question
  viewQuestion();

   // to edit a question
  editQuestion();

};

let loadQuizzesPage1 = () => {
  let questionsList = document.querySelector("#questions-list");
  let addQuestionBtn = document.querySelector("#add-question-btn");
  let questionTemplate = document.querySelector("#question-template").innerHTML;
  let questionCount = 0;

  function loadQuestions() {
    let questions = JSON.parse(localStorage.getItem("questions")) || [];
    // console.log(questions)
    if (questions.length > 0) {
      questions.forEach((question, idx) => addQuestion(question, idx));
    }
  }

  function saveQuestions() {
    let mcqQuestions = [];
    questionsList
      .querySelectorAll(".question-item")
      .forEach((questionElement) => {
        let questionText =
          questionElement.querySelector(".question-text").value;
        let options = Array.from(
          questionElement.querySelectorAll(".option")
        ).map((option) => option.value);
        let correctOption =
          questionElement.querySelector(".correct-option").value;

        let question = {
          ques: questionText,
          option: options,
          correct_ans: correctOption,
        };
        mcqQuestions.push(question);
      });
    localStorage.setItem("questions", JSON.stringify(mcqQuestions));
  }

  function addQuestion(question, idx) {
    questionCount++;

    const questionHTML = questionTemplate.replace(
      "Question",
      `Question ${questionCount}`
    );

    let questionElement = document.createElement("div");
    questionElement.innerHTML = questionHTML;
    questionsList.appendChild(questionElement);

    if (question) {
      questionElement.querySelector(".question-text").value = question.ques;
      questionElement.querySelectorAll(".option").forEach((option, index) => {
        option.value = question.option[index];
      });
      questionElement.querySelector(".correct-option").value =
        question.correct_ans;
    }

    const editBtn = questionElement.querySelector(".edit-btn");
    const deleteBtn = questionElement.querySelector(".delete-btn");

    editBtn.addEventListener("click", () => {
      console.log("edit", questionElement);
      editQuestion(questionElement);
      saveQuestions();
    });

    deleteBtn.addEventListener("click", () => {
      deleteQuestions(questionElement);
      saveQuestions();
    });

    saveQuestions();
  }

  function deleteQuestions(questionElement) {
    window.location.reload();
    questionsList.removeChild(questionElement);
  }

  function editQuestion(questionElement) {
    let textArea = questionElement.querySelector(".question-text");
    let options = questionElement.querySelectorAll(".option");
    let correctOption = questionElement.querySelector(".correct-option");
    // console.log(textArea,options,correctOption)
    textArea.disabled = !textArea.disabled;
    options.forEach((option) => (option.disabled = !option.disabled));
    correctOption.disabled = !correctOption.disabled;

    const editBtn = questionElement.querySelector(".edit-btn");
    editBtn.textContent = textArea.disabled ? "Edit" : "Save";
  }

  loadQuestions();

  if (addQuestionBtn) {
    addQuestionBtn.addEventListener("click", () => addQuestion());
  }
};

//For users-testlist Page**********************************************************

function fetchUserTestFromUrl() {
  let queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const name = urlParams.get("name");
  const email = urlParams.get("email");
  const index = urlParams.get("index");

  console.log(name, email);
  return { email, name, index };
}

function saveFetchedUserTestFromUrl(userName, userEmail) {
  let { name, email } = fetchUserTestFromUrl();
  userName.innerText = name;
  userEmail.innerText = email;
}

function findNoOfCorrectAns(user) {
  let questions = user.questions;
  console.log(questions);
  let count = 0;
  questions.forEach((question) => {
    if (question.correct_ans === question.selected_ans) {
      count++;
    }
  });
  return count;
}

function addLinkToViewTestBtn(userTests, userDetails) {
  let { name, email } = userDetails;
  let viewUserTestBtns = document.querySelectorAll(".view-user-test a");
  console.log(userTests);
  userTests.forEach((userTest, idx) => {
    viewUserTestBtns[
      idx
    ].href = `users-test.html?name=${name}&email=${email}&index=${idx}`;
  });
}

function populateTestListTable(testlistTableBody, userDetails) {
  let { email } = userDetails;

  let usersTests = JSON.parse(localStorage.getItem("usersTests"));

  let userTests = usersTests.filter((userTest) => {
    return userTest.user_email === email;
  });

  userTests.forEach((userTest, idx) => {
    let trow = document.createElement("tr");

    trow.innerHTML = `
      <td>${idx + 1}</td>
      <td>${getTestDate(userTest.quizEndTime)}</td>
      <td>${userTest.score}</td>
      <td>${findNoOfCorrectAns(userTest)}</td>
      <td class='view-user-test'><a href=''>View Test</a></td>
    `;

    testlistTableBody.appendChild(trow);
  });

  //To add Link To ViewTest button
  addLinkToViewTestBtn(userTests, userDetails);
}

const loadUsersTestlistPage = () => {
  let userName = document.querySelector("#user-details .user-details-name");
  let userEmail = document.querySelector("#user-details .user-details-email");
  let testlistTableBody = document.querySelector("#testlist-table tbody");

  // To save fetched User Details From Url
  saveFetchedUserTestFromUrl(userName, userEmail);

  let userDetails = fetchUserTestFromUrl();

  // To populate TestList Table
  populateTestListTable(testlistTableBody, userDetails);
};

//For users-test Page**********************************************************

function getTestDate(testDate) {
  let date = new Date(testDate);

  let day = String(date.getDate()).padStart(2, "0");
  let month = String(date.getMonth() + 1).padStart(2, "0");

  return `${day}-${month}-${date.getFullYear()}`;
}

function calculateTestDuration(startTime, endTime) {
  let t1 = new Date(startTime);
  let t2 = new Date(endTime);

  let timeDiff = Math.abs(t2 - t1);

  let hours = Math.floor(timeDiff / (1000 * 60 * 60));
  let minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  let sec = Math.floor(((timeDiff % (1000 * 60 * 60)) % (1000 * 60)) / 1000);

  return `${minutes}min ${sec}sec`;
}

function fetchAndLoadUserDetails(userName, userEmail) {
  let { name, email, index } = fetchUserTestFromUrl();

  userName.innerText = name;
  userEmail.innerText = email;

  let userQuizDetails = document.querySelector("#user-quiz-details");
  let testDetails = document.querySelector(".test-details");
  let quizTableHTML = document.querySelector(".quiz-table").innerHTML;
  // console.log(quizTableHTML);
  // console.log(userQuizDetails);
  let usersTests = JSON.parse(localStorage.getItem("usersTests"));

  let userTest = usersTests
    .filter((userTest) => {
      return email === userTest.user_email;
    })
    .find((user, idx) => idx == index);

  testDetails.querySelector(".test-num").innerText = `Test ${++index}`;
  testDetails.querySelector(
    ".test-score"
  ).innerText = `Score ${userTest.score}`;
  testDetails.querySelector(
    ".test-date"
  ).innerText = `Test Date: ${getTestDate(userTest.quizEndTime)}`;
  testDetails.querySelector(
    ".test-duration"
  ).innerText = `Time Taken: ${calculateTestDuration(
    userTest.quizStartTime,
    userTest.quizEndTime
  )}`;

  userTest.questions.forEach((question, idx) => {
    let quizTable = document.createElement("table");
    quizTable.innerHTML = quizTableHTML;
    quizTable.classList.add("quiz-table");

    quizTable.querySelector(".ques-num").innerText = `Question ${++idx}`; //edited
    quizTable.querySelector(".ques-num-value").innerText = question.ques;

    let options = quizTable.querySelectorAll(".options");

    console.log(question.selected_ans);
    question.option.forEach((opt, idx) => {
      options[idx].innerText = opt;

      //highlight the selected option
      if (question.selected_ans === question.correct_ans) {
        if (question.selected_ans === options[idx].innerText) {
          let correctOptionWrapper = document.createElement("div");

          let correctAns = document.createElement("p");
          correctAns.textContent = options[idx].innerText;
          correctOptionWrapper.appendChild(correctAns);

          let iconContainer = document.createElement("div");
          iconContainer.classList.add("correct-ans-icon");
          iconContainer.innerHTML = `<i class="fa-solid fa-check"></i>`;
          correctOptionWrapper.appendChild(iconContainer);

          options[idx].innerText = "";

          //to create option container for correct option text and correct option font
          options[idx].appendChild(correctOptionWrapper);

          options[idx].classList.add("correct-selected-ans");
        }
      } else {
        if (question.selected_ans === options[idx].innerText) {
          let correctOptionWrapper = document.createElement("div");

          let correctAns = document.createElement("p");
          correctAns.textContent = options[idx].innerText;
          correctOptionWrapper.appendChild(correctAns);

          let iconContainer = document.createElement("div");
          iconContainer.classList.add("wrong-ans-icon");
          iconContainer.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
          correctOptionWrapper.appendChild(iconContainer);

          options[idx].innerText = "";

          //to create option container for wrong option text and wrong option font
          options[idx].appendChild(correctOptionWrapper);

          options[idx].classList.add("incorrect-selected-ans");
        }
        if (question.correct_ans === options[idx].innerText) {
          options[idx].classList.add("default-correct-ans");
        }
      }
    });
    // quizTable.querySelectorAll(".options").forEach((option, idx) => {
    //   option.innerText = question.option[idx];

    //   if(question.selected_ans === question.correct_ans){
    //     option.style.backgroundColor = "green";
    //   }

    //   //highlight the selected option
    //   // if (question.option[idx] == question.correct_ans) {
    //   //   option.style.backgroundColor = "#f8f9fd";
    //   // }
    // });

    // quizTable.querySelector(".correct-opt").innerText = question.correct_ans;

    userQuizDetails.appendChild(quizTable);
  });

  let testNo = 1;
  usersTests.forEach((usersTest, idx) => {
    // if (email === usersTest.user_email) {
    //   // let testDetails = document.createElement("div");
    //   // testDetails.innerHTML = testDetailsHTML;
    //   // testDetails.classList.add("test-details");
    //   // // userQuizDetails.append(testDetails);
    //   // testDetails.querySelector("h2").innerText = `Test ${testNo}`;
    //   // if (usersTest.score == undefined) {
    //   //   testDetails.querySelector("p").innerText = `Score 0`;
    //   // } else {
    //   //   testDetails.querySelector("p").innerText = `Score ${usersTest.score}`;
    //   // }
    //   let quizlistTableContainer = document.createElement("div");
    //   quizlistTableContainer.classList.add("quizlist-table-container");
    //   usersTest.questions.forEach((question, idx) => {
    //     let quizlistTable = document.createElement("table");
    //     quizlistTable.innerHTML = testlistTableHTML;
    //     quizlistTable.classList.add("quizlist-table");
    //     quizlistTableContainer.append(quizlistTable);
    //     quizlistTable.querySelector(
    //       ".ques-num"
    //     ).innerText = `Question ${++idx}`;
    //     quizlistTable.querySelector(".ques-num-value").innerText =
    //       question.ques;
    //     quizlistTable.querySelectorAll(".options").forEach((option, idx) => {
    //       option.innerText = question.option[idx];
    //       //highlight the selected option
    //       if (question.option[idx] == question.correct_ans) {
    //         option.style.backgroundColor = "#f8f9fd";
    //       }
    //     });
    //     quizlistTable.querySelector(".correct-opt").innerText =
    //       question.correct_ans;
    //   });
    //   userQuizTable.append(quizlistTableContainer);
    //   testNo++;
    // }
  });

  // let toggleArrows = userQuizDetails.querySelectorAll(
  //   ".test-details .up-down-arrow"
  // );
  // let quizlistTableContainer = document.querySelectorAll(
  //   ".quizlist-table-container"
  // );
  // let arrow = document.querySelectorAll(".up-down-arrow i");
  // console.log(arrow);
  // toggleArrows.forEach((toggleArrow, idx) => {
  //   toggleArrow.addEventListener("click", () => {
  //     quizlistTableContainer[idx].classList.toggle("hidden");
  //     // arrow[idx].className = 'fa-solid fa-angle-up';

  //     if (arrow[idx].className === "fa-solid fa-angle-down") {
  //       arrow[idx].className = "fa-solid fa-angle-up";
  //     } else {
  //       arrow[idx].className = "fa-solid fa-angle-down";
  //     }
  //   });
  // });
}
let loadUsersTestPage = () => {
  let userName = document.querySelector("#user-details .user-details-name");
  let userEmail = document.querySelector("#user-details .user-details-email");

  fetchAndLoadUserDetails(userName, userEmail);
};
