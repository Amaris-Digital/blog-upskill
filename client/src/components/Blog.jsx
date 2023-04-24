const Blog = ({setjwtToken}) => {

    // just testing
    const handleLogout = () => {
        console.log("logout")
        setjwtToken(null)
        localStorage.removeItem("user")
    }

    return (
        <div>
            <h1>Blogs</h1>
            {/* test logout */}
            <button onClick={handleLogout}>Logout</button>
        </div>

    )
}

export default Blog