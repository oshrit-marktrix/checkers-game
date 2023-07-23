// קבועים לקלוט את האלמנטים של הטופס
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

const loginUsernameInput = document.getElementById("loginUsername");
const loginPasswordInput = document.getElementById("loginPassword");

const signupUsernameInput = document.getElementById("signupUsername");
const signupPasswordInput = document.getElementById("signupPassword");

const loginErrorMessage = document.getElementById("loginErrorMessage");
const signupErrorMessage = document.getElementById("signupErrorMessage");

// בדיקה האם יש כבר משתמשים קיימים ב-Local Storage, אם לא - יוצרים מערך ריק
let users = JSON.parse(localStorage.getItem("users")) || [];

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = loginUsernameInput.value;
  const password = loginPasswordInput.value;

  // בודקים אם השם משתמש כבר קיים במערך
  const existingUser = users.find((user) => user.username === username);

  // אם נמצא משתמש קיים והסיסמה תואמת, מבצעים התחברות
  if (existingUser && existingUser.password === password) {
    alert("התחברת בהצלחה!");
    window.location.href = "GameDashboard.html";
  } else {
    loginErrorMessage.textContent = "שם משתמש או סיסמה לא נכונים";
  }
});

signupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = signupUsernameInput.value;
  const password = signupPasswordInput.value;

  // בודקים אם השם משתמש כבר קיים במערך
  const existingUser = users.find((user) => user.username === username);

  // אם נמצא משתמש קיים, מציגים הודעת שגיאה
  if (existingUser) {
    signupErrorMessage.textContent = "שם המשתמש כבר קיים";
  } else {
    // אחרת, מוסיפים אותו כמשתמש חדש
    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("נרשמת בהצלחה!");
    signupForm.reset();
  }
});
