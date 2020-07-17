export default authHeader() {
    let token = localStorage.getItem('user');
    console.log(token)

    if (token) {
        return `Bearer ${token}`;
    } else {
        return '';
    }
}