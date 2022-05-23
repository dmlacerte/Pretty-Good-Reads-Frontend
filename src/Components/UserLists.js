function UserLists() {
    return (
        <>
            <div>
                <p>Currently Reading</p>
                <p>TBR</p>
                <p>Past Reads</p>
            </div>
            {/* To add filters, below likely will be a second component */}
            <div>
                <div>
                    <h3>Title</h3>
                    <h4>Author</h4>
                </div>
            </div>
        </>
    )
}

export default UserLists;