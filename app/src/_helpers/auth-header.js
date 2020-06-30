export default authHeader() {
    let token = process.env.VUE_APP_DEV_TOKEN
    console.log(token)

    if (token) {
        return `Bearer ${token}`;
    } else {
        return '';
    }
}