import Sidebar from "./SideBar";

function Layout({ children }) {
    return (
        <div style={styles.container}>
            <Sidebar username = {localStorage.getItem("name")} email = {localStorage.getItem("email")}/>

            <main style={styles.main}>
                {children}
            </main>
        </div>
    );
}

const styles = {
    container: {
        minHeight: "100vh",
        background: "#f5f7fb",
    },

    main: {
        marginLeft: "260px", // same as sidebar width
        padding: "24px",
        minHeight: "100vh",
    },
};

export default Layout;