export const saveAuthResponse = (response) => {
    localStorage.setItem("token", response.token);
    localStorage.setItem("role", response.role);
    localStorage.setItem("email", response.email);
    localStorage.setItem("name", response.name);
}

export const removeAuthResponse = () => {
    localStorage.setItem("token", "");
    localStorage.setItem("role", "");
    localStorage.setItem("email", "");
    localStorage.setItem("name", "");
}
