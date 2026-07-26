<?php
// logout.php - تسجيل الخروج والتوجيه إلى صفحة تسجيل الدخول
session_start();

// تدمير جميع بيانات الجلسة
$_SESSION = array();
session_destroy();

// حذف كوكي الجلسة إذا وجد
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}

// التوجيه إلى صفحة تسجيل الدخول
header('Location: index.php');
exit;
?>